/**
 * Extracts text from user-uploaded attachments (DOCX, TXT/MD/CSV).
 * Images are returned as-is for OpenAI vision. PDF parsing is disabled in Next.js.
 */

function dataUrlToBuffer(dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string") return null;
  const m = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!m) return null;
  try {
    return { mime: m[1], buffer: Buffer.from(m[2], "base64") };
  } catch {
    return null;
  }
}

const MAX_TEXT_CHARS = 15000;

async function extractPdf() {
  /* pdf-parse is not compatible with Next.js/Turbopack; text-only uploads still work */
  return "";
}

async function extractDocx(buffer) {
  try {
    const mammoth = await import("mammoth");
    const out = await mammoth.extractRawText({ buffer });
    return (out.value || "").slice(0, MAX_TEXT_CHARS);
  } catch (err) {
    console.warn("[parseAttachment] mammoth failed:", err.message);
    return "";
  }
}

function extractText(buffer) {
  try {
    return buffer.toString("utf8").slice(0, MAX_TEXT_CHARS);
  } catch {
    return "";
  }
}

/**
 * @param {Array<{name:string,type:string,kind:string,dataUrl:string}>} attachments
 * @returns {Promise<{images: Array<{name:string,dataUrl:string}>, textBlocks: Array<{name:string,text:string}>}>}
 */
export async function parseAttachments(attachments) {
  const images = [];
  const textBlocks = [];

  if (!Array.isArray(attachments)) return { images, textBlocks };

  for (const att of attachments.slice(0, 5)) {
    if (!att || !att.dataUrl) continue;
    if (att.kind === "image") {
      images.push({ name: att.name || "image", dataUrl: att.dataUrl });
      continue;
    }
    const decoded = dataUrlToBuffer(att.dataUrl);
    if (!decoded) continue;
    let text = "";
    if (att.kind === "pdf") text = await extractPdf(decoded.buffer);
    else if (att.kind === "docx") text = await extractDocx(decoded.buffer);
    else if (att.kind === "text") text = extractText(decoded.buffer);
    text = text.trim();
    if (text) textBlocks.push({ name: att.name || "bestand", text });
  }

  return { images, textBlocks };
}
