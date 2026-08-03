import { NextRequest, NextResponse } from "next/server";
import { getHubspotElaraWaitlistSubmitUrl } from "@/lib/hubspotElaraWaitlist";
import {
  getHubspotPrivateAppToken,
  upsertHubspotContactByEmail,
} from "@/lib/hubspotPrivateApp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type HubspotField = { name: string; value: string };
type HubspotContext = {
  pageUri?: string;
  pageName?: string;
  hutk?: string;
  ipAddress?: string;
};
type HubspotPayload = {
  fields: HubspotField[];
  context?: HubspotContext;
  legalConsentOptions?: unknown;
};

function readCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(/;\s*/);
  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq === -1) continue;
    if (p.slice(0, eq) === name) return decodeURIComponent(p.slice(eq + 1));
  }
  return null;
}

function firstIp(value: string | null): string | undefined {
  if (!value) return undefined;
  const first = value.split(",")[0]?.trim();
  return first && first.length > 0 ? first : undefined;
}

export async function POST(req: NextRequest) {
  const submitUrl = getHubspotElaraWaitlistSubmitUrl();
  const submittedAt = new Date().toISOString();

  let body: HubspotPayload;
  try {
    body = (await req.json()) as HubspotPayload;
  } catch (err) {
    console.error("[elara-waitlist] invalid JSON body", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const cookieHeader = req.headers.get("cookie");
  const hutk = readCookie(cookieHeader, "hubspotutk") || undefined;
  const ipAddress =
    firstIp(req.headers.get("x-forwarded-for")) ||
    firstIp(req.headers.get("x-real-ip"));

  const context: HubspotContext = {
    ...(body.context || {}),
    ...(hutk ? { hutk } : {}),
    ...(ipAddress ? { ipAddress } : {}),
  };
  const payload: HubspotPayload = { ...body, context };

  const safeContact = {
    email:
      payload.fields.find((f) => f.name === "email")?.value || "(none)",
    name:
      [
        payload.fields.find((f) => f.name === "firstname")?.value,
        payload.fields.find((f) => f.name === "lastname")?.value,
      ]
        .filter(Boolean)
        .join(" ") || "(none)",
    company:
      payload.fields.find((f) => f.name === "bedrijfsnaam")?.value || "(none)",
    phone:
      payload.fields.find((f) => f.name === "phone")?.value || "(none)",
  };

  console.log(
    "[elara-waitlist] inbound",
    JSON.stringify({ submittedAt, hutk: Boolean(hutk), ipAddress, safeContact }),
  );

  let formsOk = false;
  let formsStatus = 0;
  let formsData: Record<string, unknown> = {};

  try {
    const res = await fetch(submitUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    formsStatus = res.status;
    const rawText = await res.text();
    try {
      formsData = rawText
        ? (JSON.parse(rawText) as Record<string, unknown>)
        : {};
    } catch {
      formsData = { raw: rawText };
    }

    if (res.ok) {
      formsOk = true;
      console.log(
        "[elara-waitlist] hubspot OK",
        JSON.stringify({ status: res.status, safeContact }),
      );
    } else {
      console.error(
        "[elara-waitlist] hubspot REJECTED — lead niet opgeslagen via Forms",
        JSON.stringify({
          status: res.status,
          response: formsData,
          payload,
          safeContact,
        }),
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(
      "[elara-waitlist] hubspot NETWORK ERROR via Forms",
      JSON.stringify({ message, payload, safeContact }),
    );
    formsData = { error: message };
  }

  // Vangnet: upsert contact via Private App token zodat er altijd
  // een contactpersoon ontstaat, ook als Forms API faalt of weigert.
  const token = getHubspotPrivateAppToken();
  if (token) {
    const props: Record<string, string> = {};
    for (const f of payload.fields) {
      if (!f.value) continue;
      if (
        f.name === "email" ||
        f.name === "firstname" ||
        f.name === "lastname" ||
        f.name === "phone" ||
        f.name === "bedrijfsnaam"
      ) {
        props[f.name] = f.value;
      }
    }
    try {
      const r = await upsertHubspotContactByEmail(token, props);
      if (r.ok) {
        console.log(
          "[elara-waitlist] contact upsert OK",
          JSON.stringify({ status: r.status, safeContact }),
        );
      } else {
        console.error(
          "[elara-waitlist] contact upsert FAILED",
          JSON.stringify({ status: r.status, data: r.data, safeContact, props }),
        );
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(
        "[elara-waitlist] contact upsert NETWORK ERROR",
        JSON.stringify({ message, safeContact, props }),
      );
    }
  } else {
    console.warn(
      "[elara-waitlist] HUBSPOT_PRIVATE_APP_TOKEN niet gezet — geen contact-upsert vangnet actief",
    );
  }

  if (formsOk) {
    return NextResponse.json(formsData, { status: formsStatus });
  }
  // Forms faalde: laat de browser succes zien wanneer er een token-vangnet is,
  // anders de oorspronkelijke fout doorgeven.
  if (token) {
    return NextResponse.json(
      { inlineMessage: "", via: "contacts-upsert" },
      { status: 200 },
    );
  }
  return NextResponse.json(formsData, { status: formsStatus || 502 });
}
