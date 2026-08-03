"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ELARA_PROMO_LIVE } from "../config/elaraPromo";
import { useLang } from "../context/LanguageContext";

export default function DienstNav() {
  const { t, lang } = useLang();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(prev => prev === index ? null : index);
  };
  useEffect(() => {
    const nav = document.querySelector(".brutal-nav") as HTMLElement;
    const onScroll = () => {
      if (window.scrollY > 50) {
        nav?.classList.add("scrolled");
      } else {
        nav?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);

    const dienstenWrapper = document.querySelector(".nav-diensten-wrapper");
    const dienstenToggle = document.querySelector(".nav-diensten-toggle");
    const onDienstenToggle = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      dienstenWrapper?.classList.toggle("dropdown-open");
    };
    const onDocClick = (e: Event) => {
      if (dienstenWrapper && !dienstenWrapper.contains(e.target as Node)) {
        dienstenWrapper.classList.remove("dropdown-open");
      }
    };
    dienstenToggle?.addEventListener("click", onDienstenToggle);
    document.addEventListener("click", onDocClick);

    // Contact modal open/close
    const openBtns = document.querySelectorAll('.open-contact-modal');
    const modal = document.getElementById('contact-modal');
    const closeBtns = modal?.querySelectorAll('.service-modal-close');

    const openModal = (e: Event) => {
      e.preventDefault();
      modal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      modal?.classList.remove('active');
      document.body.style.overflow = '';
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeBtns?.forEach(btn => btn.addEventListener('click', closeModal));
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // --- FORM SUBMIT -> WHATSAPP ---
    const allForms = document.querySelectorAll('form');
    allForms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input, select, textarea');
        let message = 'Hoi, ik wil graag contact opnemen!\n\n';
        inputs.forEach((input) => {
          const el = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          if (el.value && el.value !== '') {
            const label = (el as HTMLInputElement).placeholder || el.tagName;
            message += `${label}: ${el.value}\n`;
          }
        });
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/31686081324?text=${encoded}`, '_blank');
      });
    });


    return () => {
      window.removeEventListener("scroll", onScroll);
      dienstenToggle?.removeEventListener("click", onDienstenToggle);
      document.removeEventListener("click", onDocClick);
      openBtns.forEach(btn => btn.removeEventListener('click', openModal));
    };
  }, []);

  return (
    <>
    <nav className="brutal-nav">
      <a href="/" className="nav-logo magnetic" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <Image src="/logo_nieuw-removebg-preview.png" alt="Propest AI logo" width={160} height={45} style={{ objectFit: "contain" }} />
      </a>
      <ul className="nav-menu">
        <li>
          <a href="/" className="nav-link magnetic" data-text={t('nav.home')}>
            {t('nav.home')}
          </a>
        </li>
        <li className="nav-diensten-wrapper">
          <span className="nav-link nav-diensten-toggle nav-diensten-link" role="button" tabIndex={0}>
            {t('nav.diensten')}{" "}
            <svg className="nav-diensten-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
          <div className="nav-diensten-dropdown">
            <a href="/diensten/ai-shoots" className="nav-dienst-link">
              {t('diensten.ai-shoots')}
            </a>
            <a href="/diensten/bedrijfsautomatisering" className="nav-dienst-link">
              {t('diensten.bedrijfsautomatisering')}
            </a>
            <a href="/diensten/ai-crm" className="nav-dienst-link">{t('diensten.ai-crm')}</a>
            <a href="/diensten/ai-agents" className="nav-dienst-link">{t('diensten.ai-agents')}</a>
            <a href="/diensten/app-web-ontwikkeling" className="nav-dienst-link">
              {t('diensten.app-web-ontwikkeling')}
            </a>
            <a href="/diensten/systeemverbetering" className="nav-dienst-link">
              {t('diensten.systeemverbetering')}
            </a>
            <a href="/diensten/rpa-ai-automatisering" className="nav-dienst-link">
              {t('diensten.rpa-ai-automatisering')}
            </a>
            <a href="/diensten/gpt-op-maat" className="nav-dienst-link">{t('diensten.gpt-op-maat')}</a>
            <a href="/diensten/webbots" className="nav-dienst-link">{t('diensten.webbots')}</a>
          </div>
        </li>
        <li>
          <a href="/#about" className="nav-link magnetic" data-text={t('nav.about')}>
            {t('nav.about')}
          </a>
        </li>
        {ELARA_PROMO_LIVE ? (
        <li>
          <a href="/elara.html" className="nav-link magnetic nav-link-elara" data-text={t('nav.elara')}>
            {t('nav.elara')}
          </a>
        </li>
        ) : null}
        <li>
          <a href="/contact" className="nav-link magnetic" data-text={t('nav.contact')}>
            {t('nav.contact')}
          </a>
        </li>
      </ul>
      <a href="https://configurator.propest.ai/" className="cta-btn magnetic" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
        <span>{t('nav.cta')}</span>
      </a>
    </nav>

    <div className="service-modal-overlay" id="contact-modal">
      <div className="service-modal-inner contact-modal-inner">
        <button className="service-modal-close contact-modal-close-top">✕</button>
        <div className="contact-modal-left">
          <h3>Let&apos;s Talk</h3>
          <form>
            <div className="form-field">
              <input type="text" placeholder={lang === 'en' ? 'Full name*' : 'Volledige naam*'} required />
            </div>
            <div className="form-field">
              <input type="email" placeholder={lang === 'en' ? 'Email*' : 'Email*'} required />
            </div>
            <div className="form-field">
              <input type="tel" placeholder={lang === 'en' ? 'Phone number*' : 'Telefoonnummer*'} required />
            </div>
            <div className="form-field">
              <input type="text" placeholder={lang === 'en' ? 'Company name*' : 'Bedrijfsnaam*'} required />
            </div>
            <div className="form-field">
              <select defaultValue="" required>
                <option value="" disabled>{lang === 'en' ? 'What are you interested in?*' : 'Waar ben je in geïnteresseerd?*'}</option>
                <option value="ai-shoots">{t('diensten.ai-shoots')}</option>
                {ELARA_PROMO_LIVE ? <option value="elara">{t('diensten.elara')}</option> : null}
                <option value="bedrijfsautomatisering">{t('diensten.bedrijfsautomatisering')}</option>
                <option value="ai-crm">{t('diensten.ai-crm')}</option>
                <option value="ai-agents">{t('diensten.ai-agents')}</option>
                <option value="app-web-ontwikkeling">{t('diensten.app-web-ontwikkeling')}</option>
                <option value="systeemverbetering">{t('diensten.systeemverbetering')}</option>
                <option value="rpa-ai-automatisering">{t('diensten.rpa-ai-automatisering')}</option>
                <option value="gpt-op-maat">{t('diensten.gpt-op-maat')}</option>
                <option value="webbots">{t('diensten.webbots')}</option>
              </select>
            </div>
            <button type="submit" className="form-submit">{lang === 'en' ? 'Send Message' : 'Bericht Versturen'}</button>
          </form>
        </div>
        <div className="contact-modal-right">
          <h3>{lang === 'en' ? 'Frequently asked questions' : 'Veelgestelde vragen'}</h3>
          <div className={`faq-item${activeFaq === 0 ? ' active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(0)}>{lang === 'en' ? 'What services do you offer exactly?' : 'Welke diensten bieden jullie precies aan?'}<span className="faq-icon">+</span></button>
            <div className="faq-answer"><p>{lang === 'en' ? 'We offer AI strategy, business automation, AI-CRM systems, AI agents, custom GPT, webbots and system integrations.' : 'Wij bieden AI-strategie, bedrijfsautomatisering, AI-CRM systemen, AI-agents, GPT op maat, webbots en systeemintegraties aan.'}</p></div>
          </div>
          <div className={`faq-item${activeFaq === 1 ? ' active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(1)}>{lang === 'en' ? 'What makes Propest different from other AI companies?' : 'Wat maakt Propest anders dan andere AI bedrijven?'}<span className="faq-icon">+</span></button>
            <div className="faq-answer"><p>{lang === 'en' ? 'We deliver no empty promises but measurable results. Every project is custom-built around your data and strategy.' : 'Wij leveren geen loze beloften maar meetbare resultaten. Elk project wordt op maat gebouwd rond uw data en strategie.'}</p></div>
          </div>
          <div className={`faq-item${activeFaq === 2 ? ' active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(2)}>{lang === 'en' ? 'How long does an implementation project take on average?' : 'Hoe lang duurt gemiddeld een implementatietraject?'}<span className="faq-icon">+</span></button>
            <div className="faq-answer"><p>{lang === 'en' ? 'Depending on complexity, a project takes on average 2 to 8 weeks from strategy to delivery.' : 'Afhankelijk van de complexiteit duurt een traject gemiddeld 2 tot 8 weken van strategie tot oplevering.'}</p></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
