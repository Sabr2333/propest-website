"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { useLang } from "../context/LanguageContext";

const CONFIGURATOR_URL = "https://configurator.propest.ai/";

export default function HeroConfigurator() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError(t("hero.cardError"));
      return;
    }

    setError("");
    const params = new URLSearchParams({
      email: trimmedEmail,
      utm_source: "homepage",
      utm_medium: "hero",
      utm_campaign: "ai_configurator_check",
    });
    const trimmedPhone = phone.trim();
    if (trimmedPhone) params.set("phone", trimmedPhone);

    window.location.href = `${CONFIGURATOR_URL}?${params.toString()}`;
  };

  return (
    <div className="hero-config-card">
      <p className="hero-config-card-title">{t("hero.cardTitle")}</p>
      <form className="hero-config-form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("hero.emailPlaceholder")}
          className="hero-config-input"
          autoComplete="email"
          inputMode="email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("hero.phonePlaceholder")}
          className="hero-config-input"
          autoComplete="tel"
          inputMode="tel"
        />
        {error ? <p className="hero-config-error">{error}</p> : null}
        <button type="submit" className="hero-config-submit">
          {t("hero.cardCta")} <span aria-hidden>→</span>
        </button>
      </form>
      <div className="hero-config-proof">
        <div className="hero-config-avatars" aria-hidden>
          <span className="hero-config-avatar">
            <Image src="/r2.jpg" alt="" width={32} height={32} />
          </span>
          <span className="hero-config-avatar">
            <Image src="/r1.jpg" alt="" width={32} height={32} />
          </span>
          <span className="hero-config-avatar hero-config-avatar--dark-logo">
            <Image src="/WhatsApp_Image_2026-03-17_at_19.26.50-removebg-preview.png" alt="" width={32} height={32} />
          </span>
        </div>
        <p>{t("hero.socialProof")}</p>
      </div>
    </div>
  );
}
