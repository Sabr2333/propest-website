import { NextRequest, NextResponse } from 'next/server';
import { HUBSPOT_FORMS_SUBMIT_URL } from '@/lib/hubspotSubmit';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('HubSpot proxy - incoming payload:', JSON.stringify(body, null, 2));

    const res = await fetch(HUBSPOT_FORMS_SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(`HubSpot proxy - response (status ${res.status}):`, JSON.stringify(data, null, 2));

    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('HubSpot proxy error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
