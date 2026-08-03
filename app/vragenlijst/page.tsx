"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { HUBSPOT_FORMS_SUBMIT_URL } from "@/lib/hubspotSubmit";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const translations = {
  nl: {
    page_title: 'Vragenlijst',
    page_sub:
      'Vul hieronder je gegevens in. We nemen contact met je op voor een vrijblijvend gesprek.',
    naam: 'Naam*',
    emailLabel: 'E-mail*',
    telefoon: 'Telefoonnummer*',
    website: 'Website*',
    ai_title: 'Waarvoor wil je AI inzetten?',
    ai_sub: 'Beschrijf kort waar je AI voor wilt gebruiken.',
    ai_placeholder: 'Vul hier jouw antwoord in',
    versturen: 'Versturen',
    bedankt: 'Bedankt!',
    bedankt_text:
      'Je aanvraag is succesvol verstuurd. We nemen binnen 24 uur contact met je op voor een vrijblijvend gesprek.',
    terug: 'Terug naar home',
    sidebar_title: 'Waarom deze vragenlijst?',
    info1_title: 'Persoonlijk advies',
    info1_text:
      'Op basis van jouw antwoorden maken wij een op maat gemaakte AI-scan voor jouw bedrijf.',
    info2_title: 'Binnen 24 uur reactie',
    info2_text:
      'Na het invullen nemen wij binnen 24 uur contact met je op voor een vrijblijvend gesprek.',
    info3_title: '100% vrijblijvend',
    info3_text: 'Geen verplichtingen. We kijken samen of er een match is.',
    verzend_fout:
      'Versturen mislukt. Controleer je verbinding en probeer opnieuw, of neem contact op.',
    form_incompleet: 'Vul alle velden correct in voordat je verstuurt.',
    form_hint_email: 'E-mail moet @ en een domein bevatten (bijv. naam@bedrijf.nl).',
    form_hint_phone: 'Minimaal 10 cijfers; spaties of streepjes zijn oké.',
    blocked_title: 'Nog niet klaar om te versturen:',
    blocked_naam: 'Naam — vul je naam in (minimaal 2 letters bij de voornaam).',
    blocked_email: 'E-mail — vul een geldig adres in zoals naam@bedrijf.nl.',
    blocked_phone: 'Telefoonnummer — minimaal 10 cijfers (bijv. 0677123456).',
    blocked_website: 'Website — bijvoorbeeld jouwbedrijf.nl inclusief domein (.nl, .com …).',
    blocked_ai: 'Toelichting AI — beschrijf in minimaal 2 letters waarvoor je AI wilt.',
    disclaimer:
      '*Wij werken uitsluitend samen met bedrijven met een jaaromzet van €250.000 of meer.',
  },
  en: {
    page_title: 'Questionnaire',
    page_sub:
      'Fill in your details below. We will contact you for an introductory call.',
    naam: 'Name*',
    emailLabel: 'Email*',
    telefoon: 'Phone number*',
    website: 'Website*',
    ai_title: 'What would you like to use AI for?',
    ai_sub: 'Briefly describe how you want to use AI.',
    ai_placeholder: 'Enter your answer here',
    versturen: 'Submit',
    bedankt: 'Thank you!',
    bedankt_text:
      'Your request has been sent successfully. We will contact you within 24 hours for a no-obligation conversation.',
    terug: 'Back to home',
    sidebar_title: 'Why this questionnaire?',
    info1_title: 'Personal advice',
    info1_text:
      'Based on your answers, we create a tailor-made AI scan for your company.',
    info2_title: 'Response within 24 hours',
    info2_text:
      'After completing the form, we will contact you within 24 hours for a no-obligation conversation.',
    info3_title: '100% no obligation',
    info3_text: 'No commitments. We will look together to see if there is a match.',
    verzend_fout: 'Submit failed. Check your connection and try again, or contact us.',
    form_incompleet: 'Please fill in every field correctly before submitting.',
    form_hint_email: 'Use a valid email with @ and a domain (e.g. name@company.com).',
    form_hint_phone: 'At least 10 digits; spaces or dashes are fine.',
    blocked_title: 'Still need to fix:',
    blocked_naam: 'Name — fill in your name (at least 2 letters for first name).',
    blocked_email: 'Email — enter a valid address such as name@company.com.',
    blocked_phone: 'Phone — at least 10 digits.',
    blocked_website: 'Website — include a domain like .com or .co.uk.',
    blocked_ai: 'AI notes — describe your goal with at least 2 letters.',
    disclaimer:
      '*We work exclusively with companies with an annual turnover of €250,000 or more.',
  },
};

/**
 * Exact de interne naam in HubSpot onder “Veld bewerken”.
 */
const HS = {
  aiDoel: 'waar_zou_je_ai_voor_willen_in_zetten_',
  websiteFields: ['wat_is_je_website_url_', 'wat_is_je_website_url', 'website'] as const,
  omzet: 'wat_is_de_huidige_jaarlijkse_omzet_van_jouw_bedrijf',
  tijdRepetitief: 'hoeveel_tijd_per_week_besteed_je_aan_repetitieve_taken',
  tijdRepetitiefAlt: 'hoeveel_tijd_per_week_besteed_je_aan_repetitieve_taken_',
} as const;

/** Verplichte HubSpot-velden zonder UI: altijd `x` (API valideert dit voor dit formulier). */
const HS_HIDDEN_FILL = 'x';

const HS_HIDDEN_FIELDS: ReadonlyArray<{ name: string; value: string }> = [
  { name: 'bedrijfsnaam', value: HS_HIDDEN_FILL },
  { name: 'company', value: HS_HIDDEN_FILL },
  { name: HS.omzet, value: HS_HIDDEN_FILL },
  { name: HS.tijdRepetitief, value: HS_HIDDEN_FILL },
  { name: HS.tijdRepetitiefAlt, value: HS_HIDDEN_FILL },
];

const MIN_LETTERS = 2;
const MIN_PHONE_DIGITS = 10;

function countLetters(s: string): number {
  return (s.match(/\p{L}/gu) || []).length;
}

function countDigits(s: string): number {
  return (s.match(/\d/g) || []).length;
}

function isValidEmailLoose(email: string): boolean {
  const t = email.trim();
  if (!/^[^\s@]+@[^\s@]+$/.test(t)) return false;
  const parts = t.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local.length || !domain.includes('.')) return false;
  const segs = domain.split('.');
  if (segs.some((p) => !p.length)) return false;
  return true;
}

function isWebsiteLoose(raw: string): boolean {
  const t = raw.trim();
  if (t.length < 4) return false;
  if (/^https?:\/\//i.test(t)) return true;
  return t.includes('.');
}

function splitNaam(naam: string): { firstName: string; lastName: string } {
  const parts = naam.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || '';
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '.';
  return { firstName, lastName };
}

export default function VragenlijstPage() {
  const [lang, setLang] = useState<'nl' | 'en'>('nl');
  const t = translations[lang];
  const [form, setForm] = useState({
    naam: '',
    email: '',
    phone: '',
    website: '',
    ai_doel: '',
  });
  const formRef = useRef(form);
  formRef.current = form;

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const utmRef = useRef({ source: '', medium: '', campaign: '', term: '', content: '' });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      utmRef.current = {
        source: params.get('utm_source') || '',
        medium: params.get('utm_medium') || '',
        campaign: params.get('utm_campaign') || '',
        term: params.get('utm_term') || '',
        content: params.get('utm_content') || '',
      };
    } catch (e) {
      /* ignore */
    }
  }, []);

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canSubmit = () => {
    const { firstName } = splitNaam(form.naam);
    return (
      countLetters(firstName) >= MIN_LETTERS &&
      isValidEmailLoose(form.email) &&
      countDigits(form.phone) >= MIN_PHONE_DIGITS &&
      isWebsiteLoose(form.website) &&
      countLetters(form.ai_doel) >= MIN_LETTERS
    );
  };

  const formStarted = Boolean(
    form.naam.trim() ||
      form.email.trim() ||
      form.phone.trim() ||
      form.website.trim() ||
      form.ai_doel.trim()
  );

  const blockingHintList = (): string[] => {
    const hints: string[] = [];
    const { firstName } = splitNaam(form.naam);
    if (countLetters(firstName) < MIN_LETTERS) hints.push(t.blocked_naam);
    if (!isValidEmailLoose(form.email)) hints.push(t.blocked_email);
    if (countDigits(form.phone) < MIN_PHONE_DIGITS) hints.push(t.blocked_phone);
    if (!isWebsiteLoose(form.website)) hints.push(t.blocked_website);
    if (countLetters(form.ai_doel) < MIN_LETTERS) hints.push(t.blocked_ai);
    return hints;
  };

  const buildPayload = (f: typeof form) => {
    const { firstName, lastName } = splitNaam(f.naam);
    const websiteRaw = f.website.trim();
    const websiteValue =
      websiteRaw.length > 0 && !/^https?:\/\//i.test(websiteRaw)
        ? `https://${websiteRaw}`
        : websiteRaw;

    return {
      fields: [
        { name: HS.aiDoel, value: f.ai_doel },
        ...(websiteValue
          ? HS.websiteFields.map((name) => ({ name, value: websiteValue }))
          : []),
        ...HS_HIDDEN_FIELDS,
        { name: 'firstname', value: firstName },
        { name: 'lastname', value: lastName },
        { name: 'email', value: f.email.trim() },
        { name: 'phone', value: f.phone },
        ...(utmRef.current.source ? [{ name: 'utm_source', value: utmRef.current.source }] : []),
        ...(utmRef.current.medium ? [{ name: 'utm_medium', value: utmRef.current.medium }] : []),
        ...(utmRef.current.campaign ? [{ name: 'utm_campaign', value: utmRef.current.campaign }] : []),
        ...(utmRef.current.term ? [{ name: 'utm_term', value: utmRef.current.term }] : []),
        ...(utmRef.current.content ? [{ name: 'utm_content', value: utmRef.current.content }] : []),
      ],
      context: {
        pageUri: typeof window !== 'undefined' ? window.location.href : '',
        pageName: 'Propest AI - Vragenlijst',
      },
    };
  };

  const handleSubmit = async () => {
    if (submitting || submitted) return;
    setSubmitError(null);
    setSubmitting(true);

    const f = formRef.current;
    const { firstName } = splitNaam(f.naam);
    if (
      countLetters(firstName) < MIN_LETTERS ||
      !isValidEmailLoose(f.email) ||
      countDigits(f.phone) < MIN_PHONE_DIGITS ||
      !isWebsiteLoose(f.website) ||
      countLetters(f.ai_doel) < MIN_LETTERS
    ) {
      setSubmitting(false);
      setSubmitError(t.form_incompleet);
      return;
    }

    const payload = buildPayload(f);
    const jsonBody = JSON.stringify(payload);

    try {
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead', {
          content_name: 'Vragenlijst Submit',
          currency: 'EUR',
          value: 0,
        });
      }
    } catch (e) {
      /* ignore */
    }

    let success = false;
    try {
      const res = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonBody,
        keepalive: true,
      });
      success = res.ok;
    } catch (e) {
      success = false;
    }

    if (!success) {
      try {
        const res2 = await fetch(HUBSPOT_FORMS_SUBMIT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonBody,
          keepalive: true,
        });
        success = res2.ok;
      } catch (e) {
        success = false;
      }
    }

    setSubmitting(false);
    if (success) {
      setSubmitted(true);
    } else {
      setSubmitError(t.verzend_fout);
    }
  };

  return (
    <>
      <header className="vl-header">
        <a href="/" className="vl-header-brand" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <Image
            src="/logo_nieuw-removebg-preview.png"
            alt="Propest AI logo"
            width={160}
            height={45}
            priority
            fetchPriority="high"
            className="vl-header-logo"
            style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxHeight: 40 }}
          />
        </a>
        <button
          onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
          className="vl-lang-switch"
          title={lang === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}
        >
          <span className={`vl-flag ${lang === 'nl' ? 'active' : ''}`}>🇳🇱</span>
          <span className={`vl-flag ${lang === 'en' ? 'active' : ''}`}>🇬🇧</span>
        </button>
      </header>
      <main className="vl-main">
        <div className="vl-main-inner">
          <div className="vl-container">
            <div className="vl-left">
              {!submitted ? (
                <>
                  <h1 className="vl-page-heading">{t.page_title}</h1>
                  <p className="vl-page-lead">{t.page_sub}</p>

                  <div className="vl-form-stack">
                    <div className="vl-field-group">
                      <label className="vl-label" htmlFor="vl-naam">
                        {t.naam}
                      </label>
                      <input
                        id="vl-naam"
                        type="text"
                        autoComplete="name"
                        className="vl-input"
                        placeholder={lang === 'nl' ? 'Jan Jansen' : 'Jane Doe'}
                        value={form.naam}
                        onChange={(e) => update('naam', e.target.value)}
                      />
                    </div>

                    <div className="vl-field-group">
                      <label className="vl-label" htmlFor="vl-email">
                        {t.emailLabel}
                      </label>
                      <input
                        id="vl-email"
                        type="email"
                        autoComplete="email"
                        className={`vl-input ${form.email.trim().length > 0 && !isValidEmailLoose(form.email) ? 'vl-input-invalid' : ''}`}
                        title={t.form_hint_email}
                        placeholder={lang === 'nl' ? 'naam@bedrijf.nl' : 'name@company.com'}
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        aria-invalid={form.email.trim().length > 0 && !isValidEmailLoose(form.email) ? true : undefined}
                      />
                    </div>

                    <div className="vl-field-group">
                      <label className="vl-label" htmlFor="vl-phone">
                        {t.telefoon}
                      </label>
                      <input
                        id="vl-phone"
                        type="tel"
                        autoComplete="tel"
                        className="vl-input"
                        inputMode="tel"
                        title={t.form_hint_phone}
                        placeholder={lang === 'nl' ? '+31 6 12345678' : '+44 7700 900000'}
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                      />
                    </div>

                    <div className="vl-field-group">
                      <label className="vl-label" htmlFor="vl-website">
                        {t.website}
                      </label>
                      <input
                        id="vl-website"
                        type="text"
                        inputMode="url"
                        autoComplete="url"
                        className="vl-input"
                        placeholder="https://www.jouwbedrijf.nl"
                        value={form.website}
                        onChange={(e) => update('website', e.target.value)}
                        required
                        aria-required="true"
                      />
                    </div>

                    <div className="vl-field-group vl-field-group-textarea">
                      <label className="vl-label" htmlFor="vl-ai">
                        {t.ai_title}
                      </label>
                      <p className="vl-field-hint">{t.ai_sub}</p>
                      <textarea
                        id="vl-ai"
                        className="vl-input vl-textarea"
                        placeholder={t.ai_placeholder}
                        value={form.ai_doel}
                        onChange={(e) => update('ai_doel', e.target.value)}
                        rows={4}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="vl-submit-error" role="alert">
                      {submitError}
                    </p>
                  )}
                  <div className="vl-buttons vl-buttons-single">
                    <button
                      type="button"
                      className="vl-btn vl-btn-next"
                      disabled={!canSubmit() || submitting}
                      onClick={handleSubmit}
                    >
                      {submitting ? '…' : t.versturen}
                    </button>
                  </div>
                  {formStarted && !canSubmit() && (
                    <div className="vl-blocking-wrap" aria-live="polite">
                      <p className="vl-blocking-title">{t.blocked_title}</p>
                      <ul className="vl-blocking-hints">
                        {blockingHintList().map((hint, i) => (
                          <li key={`${hint}-${i}`}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="vl-step-content vl-success">
                  <div className="vl-success-check">
                    <svg
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#111"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h2 className="vl-success-title">{t.bedankt}</h2>
                  <p className="vl-success-text">{t.bedankt_text}</p>
                  <a
                    href="/"
                    className="vl-btn vl-btn-next"
                    style={{ textDecoration: 'none', textAlign: 'center', marginTop: '8px' }}
                  >
                    {t.terug}
                  </a>
                </div>
              )}
            </div>

            <div className="vl-right">
              <h3>{t.sidebar_title}</h3>
              <div className="vl-info-items">
                <div className="vl-info-item">
                  <div className="vl-info-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFE61"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <strong>{t.info1_title}</strong>
                    <p>{t.info1_text}</p>
                  </div>
                </div>
                <div className="vl-info-item">
                  <div className="vl-info-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFE61"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M12 8v4l3 3" />
                    </svg>
                  </div>
                  <div>
                    <strong>{t.info2_title}</strong>
                    <p>{t.info2_text}</p>
                  </div>
                </div>
                <div className="vl-info-item">
                  <div className="vl-info-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFE61"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <strong>{t.info3_title}</strong>
                    <p>{t.info3_text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="vl-disclaimer">{t.disclaimer}</p>
        </div>
      </main>

      <style jsx>{`
        .vl-header {
          position: relative;
          padding: 20px 40px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .vl-header-brand {
          flex-shrink: 1;
        }
        .vl-header-logo {
          max-width: min(160px, 52vw);
          width: auto;
          height: auto;
        }
        .vl-lang-switch {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 50px;
          padding: 8px 14px;
          min-height: 44px;
          min-width: 44px;
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.2s;
        }
        .vl-lang-switch:hover {
          border-color: #111;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .vl-flag {
          font-size: 1.2rem;
          opacity: 0.4;
          transition: opacity 0.2s;
        }
        .vl-flag.active {
          opacity: 1;
        }
        .vl-main {
          background: #f5f5f5;
          min-height: calc(100vh - 85px);
          min-height: calc(100dvh - 85px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 24px 20px 32px;
          padding-bottom: max(32px, env(safe-area-inset-bottom));
        }
        .vl-main-inner {
          width: 100%;
          max-width: 980px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          min-width: 0;
        }
        .vl-container {
          display: flex;
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
          min-width: 0;
        }
        .vl-left {
          flex: 1;
          padding: 40px 40px 44px;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .vl-page-heading {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: clamp(1.25rem, 4.8vw + 0.35rem, 1.65rem);
          font-weight: 700;
          color: #111;
          margin: 0 0 10px;
          line-height: 1.2;
          word-break: break-word;
        }
        .vl-page-lead {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.5;
          margin: 0 0 28px;
        }
        .vl-form-stack {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .vl-field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .vl-field-group-textarea .vl-field-hint {
          margin-top: -2px;
        }
        .vl-label {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #222;
          letter-spacing: 0.02em;
        }
        .vl-field-hint {
          font-size: 0.8rem;
          color: #888;
          line-height: 1.45;
          margin: 0;
        }
        .vl-input {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
          color: #111;
          background: #fafafa;
          outline: none;
          transition:
            border-color 0.2s,
            background 0.2s;
          -webkit-text-size-adjust: 100%;
          touch-action: manipulation;
          overflow-wrap: anywhere;
        }
        .vl-input:focus {
          border-color: #385ad1;
          background: #fff;
        }
        .vl-input.vl-input-invalid {
          border-color: #e53e3e;
          background: #fffafa;
        }
        .vl-input.vl-input-invalid:focus {
          border-color: #e53e3e;
        }
        .vl-input::placeholder {
          color: #aaa;
        }
        .vl-textarea {
          resize: vertical;
          min-height: 7rem;
          line-height: 1.45;
        }
        .vl-right {
          width: 320px;
          flex-shrink: 0;
          background: linear-gradient(180deg, #1a1a1a 0%, #111 100%);
          color: #fff;
          padding: 40px 28px;
          display: flex;
          flex-direction: column;
        }
        .vl-right h3 {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 28px;
        }
        .vl-info-items {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .vl-info-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .vl-info-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 254, 97, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vl-info-item strong {
          display: block;
          font-size: 0.88rem;
          margin-bottom: 4px;
        }
        .vl-info-item p {
          font-size: 0.78rem;
          color: #999;
          line-height: 1.5;
          margin: 0;
        }
        .vl-submit-error {
          margin-top: 20px;
          padding: 12px 14px;
          border-radius: 8px;
          background: #fff5f5;
          color: #c53030;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          line-height: 1.45;
        }
        .vl-buttons {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
        .vl-buttons-single .vl-btn-next {
          width: 100%;
        }
        .vl-btn {
          padding: 14px 32px;
          min-height: 48px;
          border-radius: 50px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }
        .vl-btn-next {
          background: #111;
          color: #fff;
        }
        .vl-btn-next:hover:not(:disabled) {
          background: #385ad1;
        }
        .vl-btn-next:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .vl-blocking-wrap {
          margin-top: 16px;
          padding-top: 4px;
        }
        .vl-blocking-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          color: #444;
          margin: 0 0 8px;
        }
        .vl-blocking-hints {
          margin: 0;
          padding-left: 1.15rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          color: #666;
          line-height: 1.5;
        }
        .vl-blocking-hints li {
          margin-bottom: 6px;
        }
        .vl-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 16px;
        }
        .vl-success-check {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #fffe61;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .vl-success-title {
          font-family: var(--font-space-grotesk), sans-serif;
          font-size: clamp(1.5rem, 4vw, 2rem);
          font-weight: 700;
          color: #111;
          margin-bottom: 12px;
        }
        .vl-success-text {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.6;
          max-width: 380px;
          margin-bottom: 24px;
        }
        .vl-disclaimer {
          margin: 20px auto 0;
          max-width: 640px;
          padding: 0 max(8px, env(safe-area-inset-left)) 0 max(8px, env(safe-area-inset-right));
          font-size: 0.6875rem;
          line-height: 1.5;
          color: #777;
          text-align: center;
          font-family: 'Inter', sans-serif;
          overflow-wrap: break-word;
        }
        @media (max-width: 768px) {
          .vl-header {
            padding: 14px max(16px, env(safe-area-inset-left)) 14px max(16px, env(safe-area-inset-right));
          }
          .vl-header-logo {
            max-width: min(150px, 48vw);
            max-height: 36px;
          }
          .vl-main {
            padding: 12px max(12px, env(safe-area-inset-left)) max(24px, env(safe-area-inset-bottom))
              max(12px, env(safe-area-inset-right));
          }
          .vl-container {
            flex-direction: column;
            border-radius: 16px;
          }
          .vl-right {
            width: 100%;
            padding: 28px 24px 32px;
            order: 2;
          }
          .vl-left {
            padding: 28px 22px 32px;
            order: 1;
          }
          .vl-disclaimer {
            font-size: 0.625rem;
            margin-top: 16px;
            padding: 0 max(4px, env(safe-area-inset-left)) 0 max(4px, env(safe-area-inset-right));
          }
          .vl-page-lead {
            font-size: 0.875rem;
            margin-bottom: 22px;
          }
          .vl-form-stack {
            gap: 18px;
          }
          .vl-blocking-hints {
            padding-left: 1rem;
            font-size: 0.75rem;
          }
        }
        @media (max-width: 380px) {
          .vl-left {
            padding: 22px 16px 26px;
          }
          .vl-right {
            padding: 22px 18px 26px;
          }
          .vl-page-heading {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}
