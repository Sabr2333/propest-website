/**
 * Elara-wachtlijst → HubSpot Forms API (EU1).
 * Overschrijven: zet HUBSPOT_ELARA_WAITLIST_SUBMIT_URL in Vercel / `.env.local`.
 */
export const HUBSPOT_ELARA_WAITLIST_DEFAULT_URL =
  "https://api-eu1.hsforms.com/submissions/v3/integration/submit/148137791/10ad4a63-b11e-402e-bbb9-06ab9f62f60b";

export function getHubspotElaraWaitlistSubmitUrl(): string {
  const fromEnv = process.env.HUBSPOT_ELARA_WAITLIST_SUBMIT_URL?.trim();
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  return HUBSPOT_ELARA_WAITLIST_DEFAULT_URL;
}
