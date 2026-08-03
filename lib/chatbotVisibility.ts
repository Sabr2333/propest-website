/** Paden waar de Torrie-chatbot (launcher + panel) niet getoond wordt. */
export function isChatbotHiddenPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.toLowerCase();
  if (p === "/elara-wachtlijst" || p.startsWith("/elara-wachtlijst/")) return true;
  if (p === "/elara.html" || p.endsWith("/elara.html")) return true;
  return false;
}
