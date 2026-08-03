/* Propest AI chat front-end — pure browser JS, no build step. */

const STORAGE_KEY = "propest-ai-chat-v1";

function chatApiUrl() {
  try {
    const base = new URLSearchParams(location.search).get("apiBase");
    if (base) return new URL("/api/propest-chat", base).toString();
  } catch (_) {}
  return "/api/chat";
}
const PROPEST_URL = /https?:\/\/(?:www\.)?propest\.ai[^\s)<>"']*/gi;

const $ = (sel) => document.querySelector(sel);
const els = {
  start: $("#startScreen"),
  thread: $("#thread"),
  ta: $("#taInput"),
  send: $("#btnSend"),
  mic: $("#btnMic"),
  attach: $("#btnAttach"),
  fileInput: $("#fileInput"),
  attBox: $("#attachments"),
  newBtn: $("#btnNew"),
  closeBtn: $("#btnClose"),
  quick: $("#quickActions"),
};

const MAX_FILES = 5;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = {
  image: /^image\//,
  pdf: /^application\/pdf$/,
  docx: /(officedocument\.wordprocessingml|application\/msword|\.docx$)/i,
  text: /^text\/|\.(txt|md|csv)$/i,
};

const state = {
  messages: loadHistory(),
  busy: false,
  abort: null,
  attachments: [], // {id, name, type, size, kind: 'image'|'pdf'|'docx'|'text', dataUrl}
};

const isWidget = document.body.dataset.mode === "widget";

// ---------- History ----------
function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (m) => m && typeof m.role === "string" && typeof m.content === "string"
    );
  } catch {
    return [];
  }
}
function saveHistory() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages.slice(-40)));
  } catch {
    /* quota */
  }
}
function clearHistory() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ---------- Markdown (small, safe) ----------
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
function renderMarkdown(src) {
  if (!src) return "";
  const lines = src.split(/\r?\n/);
  const out = [];
  let inList = null; // 'ul' | 'ol'
  let para = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inlineMd(para.join(" "))}</p>`);
      para = [];
    }
  };
  const closeList = () => {
    if (inList) { out.push(`</${inList}>`); inList = null; }
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) { flushPara(); closeList(); continue; }
    const ul = line.match(/^\s*[-*•]\s+(.*)$/);
    const ol = line.match(/^\s*(\d+)\.\s+(.*)$/);
    const h  = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara(); closeList();
      const lvl = Math.min(h[1].length + 2, 6);
      out.push(`<h${lvl}>${inlineMd(h[2])}</h${lvl}>`);
      continue;
    }
    if (ul) {
      flushPara();
      if (inList !== "ul") { closeList(); out.push("<ul>"); inList = "ul"; }
      out.push(`<li>${inlineMd(ul[1])}</li>`);
      continue;
    }
    if (ol) {
      flushPara();
      if (inList !== "ol") { closeList(); out.push("<ol>"); inList = "ol"; }
      out.push(`<li>${inlineMd(ol[2])}</li>`);
      continue;
    }
    closeList();
    para.push(line);
  }
  flushPara(); closeList();
  return out.join("");
}
function inlineMd(s) {
  let t = escapeHtml(s);
  // code spans
  t = t.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  // bold
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  // italic
  t = t.replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s),.!?]|$)/g, "$1<em>$2</em>");
  t = t.replace(/(^|[\s(])_([^_\s][^_]*?)_(?=[\s),.!?]|$)/g, "$1<em>$2</em>");
  // markdown links [text](url)
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, label, url) =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
  );
  // autolink emails
  t = t.replace(/(^|[\s])([\w.+-]+@[\w-]+\.[\w.-]+)/g, '$1<a href="mailto:$2">$2</a>');
  // autolink bare URLs (skip ones already inside href="…" or anchor text)
  t = t.replace(
    /(^|[\s(])(https?:\/\/[^\s<>")]+)/g,
    (_, pre, url) => `${pre}<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
  return t;
}

// ---------- Link cards ----------
function extractPropestUrls(text) {
  const matches = text.match(PROPEST_URL) || [];
  const out = [];
  const seen = new Set();
  for (const raw of matches) {
    const clean = raw.replace(/[.,;:!?)\]]+$/, "");
    if (!seen.has(clean)) { seen.add(clean); out.push(clean); }
  }
  return out;
}
function titleFromUrl(url) {
  try {
    const u = new URL(url);
    const p = u.pathname.replace(/^\/|\/$/g, "");
    if (!p) return "Propest AI";
    const last = p.split("/").pop() || "";
    return last.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  } catch { return url; }
}
function hostFromUrl(url) {
  try { return new URL(url).host.replace(/^www\./, ""); } catch { return url; }
}

// ---------- Rendering ----------
function renderStartScreen() {
  if (state.messages.length === 0) {
    els.start.hidden = false;
    els.thread.hidden = true;
    els.thread.innerHTML = "";
  } else {
    els.start.hidden = true;
    els.thread.hidden = false;
  }
}
function renderAllMessages() {
  els.thread.innerHTML = "";
  for (const m of state.messages) {
    els.thread.appendChild(makeMsgEl(m));
  }
  scrollToBottom();
}
function makeMsgEl(m) {
  const wrap = document.createElement("div");
  wrap.className = `msg ${m.role}`;
  wrap.dataset.id = m.id;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (m.role === "user") {
    if (m.content) {
      bubble.textContent = m.content;
    }
    if (Array.isArray(m.attachments) && m.attachments.length) {
      const atts = document.createElement("div");
      atts.className = "bubble-attachments";
      for (const a of m.attachments) {
        if (a.kind === "image" && a.dataUrl) {
          const img = document.createElement("img");
          img.className = "att-thumb";
          img.src = a.dataUrl;
          img.alt = a.name;
          atts.appendChild(img);
        } else {
          const p = document.createElement("span");
          p.className = "att-pill";
          p.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg><span class="att-name">${escapeHtml(a.name)}</span>`;
          atts.appendChild(p);
        }
      }
      bubble.appendChild(atts);
    }
  } else {
    bubble.innerHTML = renderMarkdown(m.content) || "";
  }
  wrap.appendChild(bubble);
  if (m.role === "assistant") {
    const urls = extractPropestUrls(m.content || "");
    if (urls.length) wrap.appendChild(makeLinkCards(urls));
  }
  return wrap;
}
function makeLinkCards(urls) {
  const wrap = document.createElement("div");
  wrap.className = "link-cards";
  for (const u of urls) {
    const a = document.createElement("a");
    a.className = "link-card";
    a.href = u;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `
      <span class="lc-logo">P</span>
      <span class="lc-text">
        <span class="lc-title">${escapeHtml(titleFromUrl(u))}</span>
        <span class="lc-host">${escapeHtml(hostFromUrl(u))}</span>
      </span>
      <svg class="lc-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
    `;
    wrap.appendChild(a);
  }
  return wrap;
}
function updateAssistantMsg(id, content, { streaming } = {}) {
  const node = els.thread.querySelector(`[data-id="${id}"]`);
  if (!node) return;
  const bubble = node.querySelector(".bubble");
  bubble.innerHTML = renderMarkdown(content) + (streaming ? '<span class="cursor"></span>' : "");
  // Update link cards
  const existing = node.querySelector(".link-cards");
  if (existing) existing.remove();
  const urls = extractPropestUrls(content);
  if (!streaming && urls.length) node.appendChild(makeLinkCards(urls));
  scrollToBottom();
}
function scrollToBottom() {
  els.thread.scrollTop = els.thread.scrollHeight;
}

// ---------- Composer ----------
function autosize() {
  els.ta.style.height = "auto";
  els.ta.style.height = Math.min(els.ta.scrollHeight, 160) + "px";
  const hasText = els.ta.value.trim().length > 0;
  const hasAttach = state.attachments.length > 0;
  els.send.disabled = (!hasText && !hasAttach) || state.busy;
}

// ---------- Attachments ----------
function classifyFile(file) {
  const t = file.type || "";
  const n = file.name || "";
  if (ACCEPTED_TYPES.image.test(t)) return "image";
  if (ACCEPTED_TYPES.pdf.test(t) || /\.pdf$/i.test(n)) return "pdf";
  if (ACCEPTED_TYPES.docx.test(t) || /\.docx$/i.test(n)) return "docx";
  if (ACCEPTED_TYPES.text.test(t) || /\.(txt|md|csv)$/i.test(n)) return "text";
  return null;
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function renderChips() {
  els.attBox.innerHTML = "";
  if (state.attachments.length === 0) {
    els.attBox.hidden = true;
    return;
  }
  els.attBox.hidden = false;
  for (const a of state.attachments) {
    const chip = document.createElement("div");
    chip.className = "chip" + (a.uploading ? " uploading" : "");
    const thumb = document.createElement("span");
    thumb.className = "chip-thumb";
    if (a.kind === "image" && a.dataUrl) {
      const img = document.createElement("img");
      img.src = a.dataUrl;
      img.alt = "";
      thumb.appendChild(img);
    } else {
      const icon = a.kind === "pdf" ? "PDF" : a.kind === "docx" ? "DOC" : "TXT";
      thumb.style.fontWeight = "700";
      thumb.style.fontSize = "9px";
      thumb.textContent = icon;
    }
    const name = document.createElement("span");
    name.className = "chip-name";
    name.textContent = a.name;
    const x = document.createElement("button");
    x.className = "chip-x";
    x.type = "button";
    x.setAttribute("aria-label", "Verwijderen");
    x.innerHTML = `<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
    x.addEventListener("click", () => removeAttachment(a.id));
    chip.appendChild(thumb);
    chip.appendChild(name);
    chip.appendChild(x);
    els.attBox.appendChild(chip);
  }
}

async function addFiles(fileList) {
  const files = Array.from(fileList || []);
  for (const file of files) {
    if (state.attachments.length >= MAX_FILES) {
      console.warn(`[propest] max ${MAX_FILES} bestanden`);
      break;
    }
    if (file.size > MAX_FILE_BYTES) {
      console.warn(`[propest] bestand te groot: ${file.name}`);
      continue;
    }
    const kind = classifyFile(file);
    if (!kind) {
      console.warn(`[propest] type niet ondersteund: ${file.name}`);
      continue;
    }
    const id = uid();
    const placeholder = {
      id,
      name: file.name,
      type: file.type,
      size: file.size,
      kind,
      uploading: true,
      dataUrl: "",
    };
    state.attachments.push(placeholder);
    renderChips();
    try {
      const dataUrl = await readAsDataURL(file);
      const att = state.attachments.find((a) => a.id === id);
      if (att) {
        att.dataUrl = dataUrl;
        att.uploading = false;
      }
    } catch (e) {
      removeAttachment(id);
      continue;
    }
    renderChips();
  }
  autosize();
}

function removeAttachment(id) {
  state.attachments = state.attachments.filter((a) => a.id !== id);
  renderChips();
  autosize();
}

function clearAttachments() {
  state.attachments = [];
  renderChips();
}

function uploadingAny() {
  return state.attachments.some((a) => a.uploading);
}
function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ---------- Send / streaming ----------
async function sendMessage(text, opts = {}) {
  const trimmed = (text || "").trim();
  const attachmentsToSend = opts.attachments || state.attachments.slice();
  const hasAtt = attachmentsToSend.length > 0;
  if ((!trimmed && !hasAtt) || state.busy) return;
  if (uploadingAny()) return; // wait for files to finish reading

  // Strip data URLs from history-stored copy to keep localStorage small
  const lightAttachments = attachmentsToSend.map((a) => ({
    name: a.name,
    type: a.type,
    kind: a.kind,
    size: a.size,
    dataUrl: a.kind === "image" ? a.dataUrl : "", // keep image thumbs only
  }));

  const userMsg = {
    id: uid(),
    role: "user",
    content: trimmed,
    attachments: lightAttachments,
  };
  const aiMsg = { id: uid(), role: "assistant", content: "" };
  state.messages.push(userMsg, aiMsg);
  saveHistory();
  renderStartScreen();
  els.thread.appendChild(makeMsgEl(userMsg));
  els.thread.appendChild(makeMsgEl(aiMsg));
  updateAssistantMsg(aiMsg.id, "", { streaming: true });
  scrollToBottom();

  // Clear chips immediately (user has committed the send)
  if (!opts.attachments) clearAttachments();

  state.busy = true;
  autosize();

  // Pass full attachments with dataUrl to the API
  const apiAttachments = attachmentsToSend.map((a) => ({
    name: a.name,
    type: a.type,
    kind: a.kind,
    dataUrl: a.dataUrl,
  }));

  const ac = new AbortController();
  state.abort = ac;

  try {
    const res = await fetch(chatApiUrl(), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: state.messages
          .filter((m) => m.role !== "assistant" || m.content.length > 0)
          .slice(-12)
          .map((m) => ({
            role: m.role,
            content: m.content,
            // we only attach files to the latest user turn server-side
          })),
        attachments: apiAttachments,
      }),
      signal: ac.signal,
    });

    if (!res.ok || !res.body) {
      throw new Error(`API ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      aiMsg.content = acc;
      updateAssistantMsg(aiMsg.id, acc, { streaming: true });
    }
    updateAssistantMsg(aiMsg.id, aiMsg.content, { streaming: false });
    saveHistory();
  } catch (err) {
    if (err.name === "AbortError") {
      updateAssistantMsg(aiMsg.id, aiMsg.content || "_Onderbroken_", { streaming: false });
    } else {
      console.error(err);
      aiMsg.content =
        "Sorry, er ging iets mis. Probeer het zo opnieuw of mail naar **info@propest.ai**.";
      updateAssistantMsg(aiMsg.id, aiMsg.content, { streaming: false });
    }
    saveHistory();
  } finally {
    state.busy = false;
    state.abort = null;
    autosize();
    els.ta.focus();
  }
}

function newChat() {
  state.abort?.abort();
  state.messages = [];
  clearHistory();
  clearAttachments();
  els.ta.value = "";
  autosize();
  renderStartScreen();
  els.ta.focus();
}

// ---------- Voice ----------
function setupVoice() {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Ctor) { els.mic.hidden = true; return; }
  els.mic.hidden = false;

  let rec = null;
  let listening = false;

  const start = () => {
    rec = new Ctor();
    rec.lang = "nl-NL";
    rec.interimResults = true;
    rec.continuous = false;
    let finalText = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += t;
        else interim += t;
      }
      els.ta.value = (finalText + interim).trim();
      autosize();
    };
    rec.onend = () => { listening = false; els.mic.classList.remove("recording"); };
    rec.onerror = () => { listening = false; els.mic.classList.remove("recording"); };
    try {
      rec.start();
      listening = true;
      els.mic.classList.add("recording");
    } catch {}
  };
  const stop = () => { try { rec && rec.stop(); } catch {} listening = false; els.mic.classList.remove("recording"); };

  els.mic.addEventListener("click", () => {
    if (state.busy) return;
    listening ? stop() : start();
  });
}

// ---------- Wire up ----------
els.ta.addEventListener("input", autosize);
els.ta.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    const t = els.ta.value;
    const hasContent = t.trim().length > 0 || state.attachments.length > 0;
    if (hasContent) { els.ta.value = ""; autosize(); sendMessage(t); }
  }
});
els.send.addEventListener("click", () => {
  const t = els.ta.value;
  const hasContent = t.trim().length > 0 || state.attachments.length > 0;
  if (hasContent) { els.ta.value = ""; autosize(); sendMessage(t); }
});
els.attach.addEventListener("click", () => els.fileInput.click());
els.fileInput.addEventListener("change", async (e) => {
  await addFiles(e.target.files);
  e.target.value = ""; // allow re-adding the same file
});
els.newBtn.addEventListener("click", newChat);
els.closeBtn.addEventListener("click", () => {
  if (isWidget) {
    window.parent && window.parent.postMessage({ type: "propest:close" }, "*");
  } else {
    newChat();
  }
});
els.quick.addEventListener("click", (e) => {
  const btn = e.target.closest(".quick-btn");
  if (!btn) return;
  const prompt = btn.dataset.prompt;
  if (prompt) sendMessage(prompt);
});

renderStartScreen();
renderAllMessages();
autosize();
setupVoice();
els.ta.focus();
