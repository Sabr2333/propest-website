/**
 * Loads knowledge.json once per cold start of the serverless function.
 * Looks first at the file system (works in Vercel Node runtime), falls
 * back to fetching from the public URL if needed.
 */
import fs from "node:fs";
import path from "node:path";

let cached = null;

async function loadFromDisk() {
  const candidates = [
    path.join(process.cwd(), "public", "chat-assistant", "knowledge.json"),
    path.join(process.cwd(), "public", "knowledge.json"),
    path.join(process.cwd(), "knowledge.json"),
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, "utf8");
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn(`[knowledge] read ${p} failed:`, err.message);
    }
  }
  return null;
}

async function loadFromUrl(reqUrl) {
  try {
    const u = new URL("/chat-assistant/knowledge.json", reqUrl);
    const res = await fetch(u.toString());
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn("[knowledge] fetch fallback failed:", err.message);
    return null;
  }
}

export async function loadKnowledge(reqUrl) {
  if (cached) return cached;
  let kb = await loadFromDisk();
  if (!kb && reqUrl) kb = await loadFromUrl(reqUrl);
  if (!kb || !Array.isArray(kb.chunks)) {
    cached = { chunks: [], meta: { empty: true } };
    return cached;
  }
  cached = kb;
  return cached;
}
