"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./elara-wachtlijst.module.css";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const COPY = {
  nl: {
    waitlist: "Wachtlijst",
    h1a: "Elara is",
    vol: "vol",
    lead:
      "Schrijf je in voor de wachtlijst en krijg voorrang zodra we nieuwe plekken openen.",
    b1: "Als eerste een melding zodra er plek is",
    b2: "Exclusieve updates over nieuwe functies",
    b3: "Voorrang in de volgende batch van gebruikers",
    name: "Naam",
    company: "Bedrijfsnaam",
    email: "E-mail",
    phone: "Telefoonnummer",
    namePh: "Voornaam en achternaam",
    companyPh: "Jouw bedrijf",
    emailPh: "naam@bedrijf.nl",
    phonePh: "06 …",
    submit: "Inschrijven",
    submitShort: "Versturen",
    thanksTitle: "Je staat op de lijst",
    thanksText:
      "We mailen je zodra er plek is. Check ondertussen je inbox (en spam) voor een bevestiging.",
    backHome: "Terug naar home",
    errorFill:
      "Vul je volledige naam, bedrijfsnaam, geldig e-mailadres en telefoonnummer in (min. 10 cijfers).",
    errorSend: "Inschrijven lukt even niet. Probeer opnieuw of mail info@propest.ai.",
    testimonial:
      "Binnen 2 dagen had Elara mijn meest tijdrovende taken geautomatiseerd. Eindelijk rust in mijn business.",
    testimonialName: "Davinio Enriqueo Beerthuizen",
    testimonialRole: "Serieondernemer / influencer",
    termUser: "jij",
    termCmd: "→ Zet mij op de wachtlijst",
    termOut:
      'Elara: "Staat genoteerd. Je krijgt voorrang zodra er plek is."',
  },
  en: {
    waitlist: "Waitlist",
    h1a: "Elara is",
    vol: "full",
    lead:
      "Join the waitlist and get priority access as soon as new spots open.",
    b1: "Be first to know when a spot opens",
    b2: "Exclusive updates on new capabilities",
    b3: "Priority in the next user batch",
    name: "Name",
    company: "Company name",
    email: "Email",
    phone: "Phone",
    namePh: "First and last name",
    companyPh: "Your company",
    emailPh: "you@company.com",
    phonePh: "+31 …",
    submit: "Join waitlist",
    submitShort: "Submit",
    thanksTitle: "You’re on the list",
    thanksText:
      "We’ll email you when a spot opens. Check your inbox (and spam) for confirmation.",
    backHome: "Back to home",
    errorFill:
      "Please enter your full name, company name, a valid email, and phone (at least 10 digits).",
    errorSend: "Something went wrong. Try again or email info@propest.ai.",
    testimonial:
      "Within two days Elara had automated my most time-consuming tasks. Finally peace of mind in my business.",
    testimonialName: "Davinio Enriqueo Beerthuizen",
    testimonialRole: "Serial entrepreneur / influencer",
    termUser: "you",
    termCmd: "→ Add me to the waitlist",
    termOut:
      'Elara: "Noted. You’ll get priority when spots open."',
  },
} as const;

const MIN_LETTERS = 2;
const MIN_PHONE_DIGITS = 10;
const MIN_COMPANY_LEN = 2;

function countLetters(s: string): number {
  return (s.match(/\p{L}/gu) || []).length;
}

function countDigits(s: string): number {
  return (s.match(/\d/g) || []).length;
}

function isValidEmailLoose(email: string): boolean {
  const t = email.trim();
  if (!/^[^\s@]+@[^\s@]+$/.test(t)) return false;
  const parts = t.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local.length || !domain.includes(".")) return false;
  const segs = domain.split(".");
  if (segs.some((p) => !p.length)) return false;
  return true;
}

function splitNaam(naam: string): { firstName: string; lastName: string } {
  const parts = naam.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "";
  const lastName = parts.length > 1 ? parts.slice(1).join(" ") : ".";
  return { firstName, lastName };
}

export default function ElaraWachtlijstPage() {
  const [lang, setLang] = useState<"nl" | "en">("nl");
  const t = COPY[lang];
  const [naam, setNaam] = useState("");
  const [bedrijfsnaam, setBedrijfsnaam] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const utmRef = useRef({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      utmRef.current = {
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || "",
        term: params.get("utm_term") || "",
        content: params.get("utm_content") || "",
      };
    } catch {
      /* ignore */
    }
  }, []);

  const canSubmit = (): boolean => {
    const { firstName } = splitNaam(naam);
    return (
      countLetters(firstName) >= MIN_LETTERS &&
      bedrijfsnaam.trim().length >= MIN_COMPANY_LEN &&
      isValidEmailLoose(email) &&
      countDigits(phone) >= MIN_PHONE_DIGITS
    );
  };

  const readHubspotCookie = (): string | undefined => {
    if (typeof document === "undefined") return undefined;
    const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : undefined;
  };

  const buildPayload = () => {
    const { firstName, lastName } = splitNaam(naam);
    const u = utmRef.current;
    const hutk = readHubspotCookie();
    return {
      fields: [
        { name: "email", value: email.trim() },
        { name: "firstname", value: firstName },
        { name: "lastname", value: lastName },
        { name: "phone", value: phone.trim() },
        { name: "bedrijfsnaam", value: bedrijfsnaam.trim() },
        ...(u.source ? [{ name: "utm_source", value: u.source }] : []),
        ...(u.medium ? [{ name: "utm_medium", value: u.medium }] : []),
        ...(u.campaign ? [{ name: "utm_campaign", value: u.campaign }] : []),
        ...(u.term ? [{ name: "utm_term", value: u.term }] : []),
        ...(u.content ? [{ name: "utm_content", value: u.content }] : []),
      ],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName:
          lang === "en"
            ? "Propest AI — Elara waitlist"
            : "Propest AI — Elara wachtlijst",
        ...(hutk ? { hutk } : {}),
      },
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;
    setError(null);

    if (!canSubmit()) {
      setError(t.errorFill);
      return;
    }

    setSubmitting(true);
    const body = JSON.stringify(buildPayload());

    try {
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", {
          content_name: "Elara waitlist",
          currency: "EUR",
          value: 0,
        });
      }
    } catch {
      /* ignore */
    }

    try {
      const res = await fetch("/api/hubspot/elara-wachtlijst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        message?: string;
      };

      if (res.ok) {
        setSubmitted(true);
        setSubmitting(false);
        return;
      }

      setError(data.message || data.error || t.errorSend);
    } catch {
      setError(t.errorSend);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/logo_nieuw-removebg-preview.png"
              alt="Propest AI"
              width={140}
              height={40}
              style={{ objectFit: "contain", height: "auto" }}
            />
          </Link>
          <div className={styles.navLang}>
            <button
              type="button"
              className={lang === "nl" ? styles.langActive : styles.langOpt}
              onClick={() => setLang("nl")}
              aria-pressed={lang === "nl"}
            >
              NL
            </button>
            <button
              type="button"
              className={lang === "en" ? styles.langActive : styles.langOpt}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <div className={`${styles.badge} ${styles.fadeUp} ${styles.fadeUp1}`}>
              <span className={styles.pulseDot} aria-hidden />
              {t.waitlist}
            </div>

            <h1 className={`${styles.h1} ${styles.fadeUp} ${styles.fadeUp2}`}>
              {t.h1a}{" "}
              <span className={styles.volWrap}>
                <span className={styles.volBox}>{t.vol}</span>
              </span>
            </h1>

            <p className={`${styles.lead} ${styles.fadeUp} ${styles.fadeUp3}`}>
              {t.lead}
            </p>

            <ul className={`${styles.bullets} ${styles.fadeUp} ${styles.fadeUp3}`}>
              <li>
                <span className={styles.check} aria-hidden>
                  ✓
                </span>
                {t.b1}
              </li>
              <li>
                <span className={styles.check} aria-hidden>
                  ✓
                </span>
                {t.b2}
              </li>
              <li>
                <span className={styles.check} aria-hidden>
                  ✓
                </span>
                {t.b3}
              </li>
            </ul>

            {submitted ? (
              <div className={styles.success}>
                <h2>{t.thanksTitle}</h2>
                <p>{t.thanksText}</p>
                <p style={{ marginTop: "1rem" }}>
                  <Link href="/" className={styles.inlineLink}>
                    {t.backHome} →
                  </Link>
                </p>
              </div>
            ) : (
              <form
                className={`${styles.form} ${styles.fadeUp} ${styles.fadeUp4}`}
                onSubmit={handleSubmit}
                noValidate
              >
                <div>
                  <div className={styles.fieldLabel}>{t.name}</div>
                  <input
                    className={styles.input}
                    name="naam"
                    autoComplete="name"
                    placeholder={t.namePh}
                    value={naam}
                    onChange={(e) => setNaam(e.target.value)}
                  />
                </div>
                <div>
                  <div className={styles.fieldLabel}>{t.company}</div>
                  <input
                    className={styles.input}
                    name="bedrijfsnaam"
                    autoComplete="organization"
                    placeholder={t.companyPh}
                    value={bedrijfsnaam}
                    onChange={(e) => setBedrijfsnaam(e.target.value)}
                  />
                </div>
                <div>
                  <div className={styles.fieldLabel}>{t.email}</div>
                  <input
                    className={styles.input}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.emailPh}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <div className={styles.fieldLabel}>{t.phone}</div>
                  <input
                    className={styles.input}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t.phonePh}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {error ? <div className={styles.error}>{error}</div> : null}

                <button
                  type="submit"
                  className={styles.cta}
                  disabled={submitting}
                >
                  {submitting ? "…" : t.submit}
                </button>

              </form>
            )}
          </div>

          <div className={styles.right}>
            <div className={styles.visualStack}>
              <div className={styles.orbitRing} aria-hidden />
              <div className={styles.orbitRing2} aria-hidden />
              <div className={styles.terminal}>
                <div className={styles.termBar}>
                  <span className={styles.termDot} />
                  <span className={styles.termDot} />
                  <span className={styles.termDot} />
                  <span className={styles.termTitle}>Elara · waitlist</span>
                </div>
                <div className={styles.termBody}>
                  <div>
                    <span className={styles.tPrompt}>{t.termUser}</span>{" "}
                    <span className={styles.tOut}>{t.termCmd}</span>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <span className={styles.tOut}>{t.termOut}</span>
                    <span className={styles.cursor} aria-hidden />
                  </div>
                </div>
              </div>
            </div>

            <aside className={styles.testimonial}>
              <p>&ldquo;{t.testimonial}&rdquo;</p>
              <div className={styles.testimonialAuthor}>
                <Image
                  src="/images%20(1).jpeg"
                  alt={t.testimonialName}
                  width={64}
                  height={64}
                  className={styles.testimonialAvatar}
                />
                <cite className={styles.testimonialCite}>
                  {t.testimonialName}
                  <span className={styles.testimonialRole}>{t.testimonialRole}</span>
                </cite>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
