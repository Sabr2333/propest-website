import { loadKnowledge } from "@/lib/propest-chat/knowledge.js";
import { parseAttachments } from "@/lib/propest-chat/parseAttachment.js";
import { formatContext, retrieve } from "@/lib/propest-chat/retrieve.js";
import { PROPEST_SYSTEM_PROMPT } from "@/lib/propest-chat/systemPrompt.js";

export const runtime = "nodejs";
export const maxDuration = 30;

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response(
      "Server-configuratie ontbreekt (OPENAI_API_KEY). Mail naar info@propest.ai.",
      { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  let body: {
    messages?: { role: string; content: string }[];
    attachments?: unknown[];
  };
  try {
    body = await request.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const incoming = Array.isArray(body?.messages) ? body.messages : [];
  const messages = incoming
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-12)
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response("Geen geldige user-message", { status: 400 });
  }

  const lastUser = messages[messages.length - 1].content || "";
  const { images, textBlocks } = await parseAttachments(
    (Array.isArray(body?.attachments) ? body.attachments : []) as {
      name: string;
      type: string;
      kind: string;
      dataUrl: string;
    }[]
  );

  const retrievalQuery = [
    lastUser,
    ...textBlocks.map((t) => t.text.slice(0, 400)),
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 2000);

  const reqOrigin = request.headers.get("x-forwarded-proto")
    ? `${request.headers.get("x-forwarded-proto")}://${request.headers.get("x-forwarded-host") || request.headers.get("host")}`
    : new URL(request.url).origin;

  const kb = await loadKnowledge(reqOrigin);
  const chunks = retrievalQuery ? retrieve(kb.chunks || [], retrievalQuery, 6) : [];
  const context = formatContext(chunks);

  const system = `${PROPEST_SYSTEM_PROMPT}

# Kennisbank-context (alleen voor deze beurt — herhaal niet letterlijk)

${context}`;

  const userTurn = messages[messages.length - 1];
  const priorTurns = messages.slice(0, -1);

  let userContent: string | { type: string; text?: string; image_url?: { url: string; detail: string } }[];
  if (images.length === 0 && textBlocks.length === 0) {
    userContent = userTurn.content;
  } else {
    const parts: { type: string; text?: string; image_url?: { url: string; detail: string } }[] = [];
    const textParts: string[] = [];
    if (userTurn.content) textParts.push(userTurn.content);
    if (textBlocks.length) {
      textParts.push(
        "\n\n# Bijgevoegde bestanden (geüpload door de gebruiker)\n" +
          textBlocks.map((b) => `## ${b.name}\n${b.text}`).join("\n\n---\n\n")
      );
    }
    if (textParts.length) parts.push({ type: "text", text: textParts.join("\n") });
    for (const img of images) {
      parts.push({
        type: "image_url",
        image_url: { url: img.dataUrl, detail: "auto" },
      });
    }
    userContent = parts;
  }

  const model = process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini";

  let upstream: Response;
  try {
    upstream = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.4,
        max_tokens: 700,
        messages: [
          { role: "system", content: system },
          ...priorTurns,
          { role: "user", content: userContent },
        ],
      }),
    });
  } catch (err) {
    console.error("[/api/propest-chat] fetch failed:", err);
    return new Response(
      "Kan OpenAI niet bereiken. Probeer het zo opnieuw of mail info@propest.ai.",
      { status: 502 }
    );
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    console.error("[/api/propest-chat] OpenAI error", upstream.status, text);
    return new Response(
      "OpenAI gaf een fout terug. Probeer het zo opnieuw of mail info@propest.ai.",
      { status: 502 }
    );
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let nlIdx: number;
          while ((nlIdx = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nlIdx).trim();
            buffer = buffer.slice(nlIdx + 1);
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              /* ignore */
            }
          }
        }
        controller.close();
      } catch (err) {
        console.error("[/api/propest-chat] stream error", err);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store, no-transform",
    },
  });
}
