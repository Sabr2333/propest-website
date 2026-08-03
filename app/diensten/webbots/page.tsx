"use client";

import DienstNav from "../../components/DienstNav";
import DienstFooter from "../../components/DienstFooter";
import Image from "next/image";
import DienstIngredients from "../../components/DienstIngredients";
import { useLang } from "../../context/LanguageContext";

export default function Webbots() {
  const { t, lang } = useLang();
  return (
    <>
    <DienstNav />
    <main className="dienst-page">

      {/* === SECTIE 1: HERO — Koptekst + Ondertekst (links) + Foto (rechts) === */}
      <section className="dienst-page-hero">
        <a href="/" className="dienst-back-link">{t(`service.webbots.back${lang === 'en' ? '.en' : ''}`)}</a>
        <div className="dienst-page-hero-grid">
          <div className="dienst-page-hero-text">
            <h1 className="dienst-page-hero-title">{t(`service.webbots.title${lang === 'en' ? '.en' : ''}`)}</h1>
            <p className="dienst-page-hero-desc">
              {t(`service.webbots.desc${lang === 'en' ? '.en' : ''}`)}
            </p>
          </div>
          <div className="dienst-page-hero-image">
            <img src="/inter.jpg" alt="Webbots" className="dienst-page-hero-img" />
          </div>
        </div>
      </section>

      {/* === SECTIE 2: PROBLEEM — Koptekst + 2-kolom ondertekst === */}
      <section className="dienst-page-probleem">
        <h2 className="dienst-page-probleem-title">{t(`service.webbots.problem.title${lang === 'en' ? '.en' : ''}`)}</h2>
        <div className="dienst-page-probleem-cols">
          <div className="dienst-page-probleem-texts">
            <p>{t(`service.webbots.problem.p1${lang === 'en' ? '.en' : ''}`)}</p>
            <p>{t(`service.webbots.problem.p2${lang === 'en' ? '.en' : ''}`)}</p>
          </div>
          <div className="dienst-page-probleem-review">
            <div className="dienst-side-testimonial">
              <div className="dienst-side-testimonial-avatar">
                <Image src="/r4.png" alt="Klant" width={60} height={60} className="dienst-side-testimonial-img" />
              </div>
              <div className="dienst-side-testimonial-content">
                <span className="dienst-side-testimonial-stars">★★★★★</span>
                <h3 className="dienst-side-testimonial-quote">{t(`service.webbots.testimonial.quote${lang === 'en' ? '.en' : ''}`)}</h3>
                <p className="dienst-side-testimonial-text">{t(`service.webbots.testimonial.text${lang === 'en' ? '.en' : ''}`)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTIE 3: MODAL (links) + REVIEW (rechts) === */}
      <section className="dienst-page-modal-review dienst-page-modal-review-single">
        <div className="dienst-page-modal">
          <div className="service-modal-inner dienst-detail-inner">
            <div className="service-modal-card service-modal-card-dark webbots-modal-card">
              <div className="service-card-content">
                <h3>{t(`service.webbots.modal.title${lang === 'en' ? '.en' : ''}`)}</h3>
                <p>{t(`service.webbots.modal.desc${lang === 'en' ? '.en' : ''}`)}</p>
              </div>
              <div className="service-card-image">
                <div className="service-img-placeholder service-img-webbot">
                  <svg className="webbot-anim" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="80" y="30" width="240" height="180" rx="12" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="rgba(255,255,255,0.03)" />
                    <rect x="80" y="30" width="240" height="30" rx="12" fill="rgba(255,255,255,0.06)" />
                    <circle cx="100" cy="45" r="4" fill="rgba(255,100,100,0.5)" />
                    <circle cx="114" cy="45" r="4" fill="rgba(255,200,50,0.5)" />
                    <circle cx="128" cy="45" r="4" fill="rgba(100,200,100,0.5)" />
                    <rect x="145" y="38" width="155" height="14" rx="7" fill="rgba(255,255,255,0.06)" />
                    <rect x="100" y="75" width="80" height="6" rx="3" fill="rgba(255,255,255,0.08)" />
                    <rect x="100" y="90" width="120" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
                    <rect x="100" y="105" width="100" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
                    <rect x="100" y="125" width="60" height="30" rx="6" fill="rgba(255,255,255,0.04)" />
                    <rect x="170" y="125" width="60" height="30" rx="6" fill="rgba(255,255,255,0.04)" />
                    <rect x="240" y="125" width="60" height="30" rx="6" fill="rgba(255,255,255,0.04)" />
                    <g>
                      <circle r="8" fill="rgba(249,248,103,0.8)">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M100,80 L220,80 L220,100 L150,100 L150,140 L270,140 L270,170 L120,170" />
                      </circle>
                      <circle r="3" fill="rgba(26,26,26,0.9)">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M100,80 L220,80 L220,100 L150,100 L150,140 L270,140 L270,170 L120,170" />
                      </circle>
                    </g>
                    <line x1="320" y1="90" x2="370" y2="70" stroke="rgba(249,248,103,0.3)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </line>
                    <line x1="320" y1="120" x2="370" y2="120" stroke="rgba(249,248,103,0.3)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </line>
                    <line x1="320" y1="150" x2="370" y2="170" stroke="rgba(249,248,103,0.3)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.6;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </line>
                    <rect x="370" y="62" width="20" height="16" rx="3" fill="rgba(249,248,103,0.15)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </rect>
                    <rect x="370" y="112" width="20" height="16" rx="3" fill="rgba(249,248,103,0.15)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </rect>
                    <rect x="370" y="162" width="20" height="16" rx="3" fill="rgba(249,248,103,0.15)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </rect>
                  </svg>
                </div>
              </div>
            </div>
            <div className="service-modal-info">
              <h3>{t(`service.webbots.modal.info.title${lang === 'en' ? '.en' : ''}`)}</h3>
              <p>{t(`service.webbots.modal.info.desc${lang === 'en' ? '.en' : ''}`)}</p>
              <ul>
                <li>{t(`service.webbots.modal.info.list1${lang === 'en' ? '.en' : ''}`)}</li>
                <li>{t(`service.webbots.modal.info.list2${lang === 'en' ? '.en' : ''}`)}</li>
                <li>{t(`service.webbots.modal.info.list3${lang === 'en' ? '.en' : ''}`)}</li>
              </ul>
              <a href="#" className="service-modal-cta open-contact-modal">{t(`service.webbots.modal.cta${lang === 'en' ? '.en' : ''}`)}</a>
            </div>
          </div>
        </div>
      </section>

      <DienstIngredients variant="webbots" />

    </main>
    <DienstFooter />
    </>
  );
}
