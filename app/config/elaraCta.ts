/**
 * Elara CTA's: alles gaat naar /elara-wachtlijst (HubSpot-formulier).
 */
export const ELARA_WAITLIST_URL = "https://www.propest.ai/elara-wachtlijst";

export function getElaraCtaHref(origin = "https://www.propest.ai"): string {
  return `${origin.replace(/\/$/, "")}/elara-wachtlijst`;
}

export function getElaraWaitlistHref(origin = "https://www.propest.ai"): string {
  return `${origin.replace(/\/$/, "")}/elara-wachtlijst`;
}
