/**
 * Optioneel: HubSpot Private App token om contacten gegarandeerd te
 * upserten via /crm/v3/objects/contacts/batch/upsert.
 *
 * Vereiste scopes: crm.objects.contacts.write (en .read).
 * Zet in Vercel: HUBSPOT_PRIVATE_APP_TOKEN=pat-eu1-xxxxxxxx
 */
export function getHubspotPrivateAppToken(): string | null {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN?.trim();
  return token && token.length > 0 ? token : null;
}

type ContactProps = Record<string, string>;

export async function upsertHubspotContactByEmail(
  token: string,
  props: ContactProps,
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const email = props.email?.trim();
  if (!email) return { ok: false, status: 400, data: { error: "missing email" } };

  const res = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [
          {
            idProperty: "email",
            id: email,
            properties: props,
          },
        ],
      }),
    },
  );

  let data: unknown = {};
  try {
    data = await res.json();
  } catch {
    data = { error: "non-json response" };
  }
  return { ok: res.ok, status: res.status, data };
}
