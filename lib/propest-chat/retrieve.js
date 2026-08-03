/**
 * Lightweight keyword retrieval over knowledge.json. No embeddings, no DB.
 * Uses BM25-ish scoring on Dutch tokens.
 */

const STOP = new Set([
  "de","het","een","en","of","is","zijn","was","waren","ben","bent","heb","hebt","heeft","hebben","had","hadden",
  "ik","jij","je","u","hij","zij","wij","we","jullie","ze","mij","mijn","jouw","uw","zijn","haar","hun","ons","onze",
  "die","dat","dit","deze","daar","hier","er","aan","af","om","over","voor","door","met","zonder","naar","tot","tegen",
  "op","in","uit","bij","tussen","onder","boven","achter","voor","na","binnen","buiten","als","dan","want","maar","ook",
  "niet","wel","geen","wat","wie","hoe","waar","wanneer","welk","welke","welkom","hallo","hi","hey","hé",
  "the","a","an","of","and","or","is","are","was","were","be","been","being","i","you","he","she","we","they","what","how","when","where"
]);

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

function tf(tokens) {
  const m = new Map();
  for (const t of tokens) m.set(t, (m.get(t) || 0) + 1);
  return m;
}

/**
 * @param {Array<{source_url:string,title:string,content:string,tokens?:Map}>} chunks
 * @param {string} query
 * @param {number} topK
 */
export function retrieve(chunks, query, topK = 6) {
  if (!Array.isArray(chunks) || chunks.length === 0 || !query) return [];

  const N = chunks.length;
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];

  // Inverse doc frequency
  const df = new Map();
  for (const t of qTokens) {
    let count = 0;
    for (const c of chunks) {
      const m = c.tokens || tf(tokenize(c.content + " " + (c.title || "")));
      c.tokens = m;
      if (m.has(t)) count++;
    }
    df.set(t, count);
  }

  const avgdl =
    chunks.reduce((s, c) => s + (c.tokens?.size || 0), 0) / Math.max(1, N);

  const k1 = 1.4;
  const b = 0.75;

  const scored = chunks.map((c) => {
    const m = c.tokens;
    const dl = m.size || 1;
    let score = 0;
    for (const t of qTokens) {
      const f = m.get(t) || 0;
      if (f === 0) continue;
      const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + b * (dl / avgdl))));
    }
    // light boost when query terms appear in title
    if (c.title) {
      const titleTokens = tokenize(c.title);
      for (const t of qTokens) if (titleTokens.includes(t)) score += 0.5;
    }
    // STRONG boost for live propest.ai content (preferred over bundled docs)
    if (typeof c.source_url === "string" && c.source_url.startsWith("https://")) {
      score *= 2.2;
    }
    return { c, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored
    .filter((s) => s.score > 0)
    .slice(0, topK)
    .map((s) => ({
      source_url: s.c.source_url,
      title: s.c.title,
      content: s.c.content,
      score: s.score,
    }));
}

export function formatContext(chunks) {
  if (!chunks.length) {
    return "[Geen extra context gevonden. Gebruik alleen de algemene instructies.]";
  }
  return chunks
    .map((c, i) => {
      const head = c.title ? `### Bron ${i + 1} — ${c.title}` : `### Bron ${i + 1}`;
      const url =
        c.source_url && c.source_url.startsWith("http")
          ? `URL: ${c.source_url}\n`
          : "";
      return `${head}\n${url}${c.content.trim()}`;
    })
    .join("\n\n---\n\n");
}
