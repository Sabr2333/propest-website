"use client";

import DienstNav from "../../components/DienstNav";
import DienstFooter from "../../components/DienstFooter";
import Image from "next/image";
import DienstIngredients from "../../components/DienstIngredients";
import { useLang } from "../../context/LanguageContext";

export default function AiCrm() {
  const { t, lang } = useLang();
  return (
    <>
    <DienstNav />
    <main className="dienst-page">
      <section className="dienst-page-hero">
        <a href="/" className="dienst-back-link">{t(`service.ai-crm.back${lang === 'en' ? '.en' : ''}`)}</a>
        <div className="dienst-page-hero-grid">
          <div className="dienst-page-hero-text">
            <h1 className="dienst-page-hero-title">{t(`service.ai-crm.title${lang === 'en' ? '.en' : ''}`)}</h1>
            <p className="dienst-page-hero-desc">
              {t(`service.ai-crm.desc${lang === 'en' ? '.en' : ''}`)}
            </p>
          </div>
          <div className="dienst-page-hero-image">
            <img src="/fotoje.jpg" alt="AI-CRM Systemen" className="dienst-page-hero-img" />
          </div>
        </div>
      </section>

      <section className="dienst-page-probleem">
        <h2 className="dienst-page-probleem-title">{t(`service.ai-crm.problem.title${lang === 'en' ? '.en' : ''}`)}</h2>
        <div className="dienst-page-probleem-cols">
          <div className="dienst-page-probleem-texts">
            <p>{t(`service.ai-crm.problem.p1${lang === 'en' ? '.en' : ''}`)}</p>
            <p>{t(`service.ai-crm.problem.p2${lang === 'en' ? '.en' : ''}`)}</p>
          </div>
          <div className="dienst-page-probleem-review">
            <div className="dienst-side-testimonial">
              <div className="dienst-side-testimonial-avatar">
                <Image src="/r2.jpg" alt="Klant" width={60} height={60} className="dienst-side-testimonial-img" />
              </div>
              <div className="dienst-side-testimonial-content">
                <span className="dienst-side-testimonial-stars">★★★★★</span>
                <h3 className="dienst-side-testimonial-quote">{t(`service.ai-crm.testimonial.quote${lang === 'en' ? '.en' : ''}`)}</h3>
                <p className="dienst-side-testimonial-text">{t(`service.ai-crm.testimonial.text${lang === 'en' ? '.en' : ''}`)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dienst-page-modal-review dienst-page-modal-review-single">
        <div className="dienst-page-modal">
          <div className="service-modal-inner dienst-detail-inner">
          <div className="service-modal-card service-modal-card-gradient">
            <div className="service-card-content">
              <h3>{t(`service.ai-crm.modal.title${lang === 'en' ? '.en' : ''}`)}</h3>
              <p>{t(`service.ai-crm.modal.desc${lang === 'en' ? '.en' : ''}`)}</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-ai">
                <svg className="connection-lines" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 40 H80 V140 H130" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-1" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M0,40 L80,40 L80,140 L130,140" />
                  </circle>
                  <path d="M0 240 H60 V140 H130" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-2" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M0,240 L60,240 L60,140 L130,140" />
                  </circle>
                  <path d="M400 60 H320 V140 H270" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-3" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M400,60 L320,60 L320,140 L270,140" />
                  </circle>
                  <path d="M400 220 H340 V140 H270" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-4" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M400,220 L340,220 L340,140 L270,140" />
                  </circle>
                  <path d="M200 0 V90" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-5" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M200,0 L200,90" />
                  </circle>
                  <path d="M200 280 V190" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-6" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M200,280 L200,190" />
                  </circle>
                </svg>
                <div className="ai-icon-box">AI</div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <h3>{t(`service.ai-crm.modal.info.title${lang === 'en' ? '.en' : ''}`)}</h3>
            <p>{t(`service.ai-crm.modal.info.desc${lang === 'en' ? '.en' : ''}`)}</p>
            <ul>
              <li>{t(`service.ai-crm.modal.info.list1${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.ai-crm.modal.info.list2${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.ai-crm.modal.info.list3${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.ai-crm.modal.info.list4${lang === 'en' ? '.en' : ''}`)}</li>
            </ul>
            <a href="#" className="service-modal-cta open-contact-modal">{t(`service.ai-crm.modal.cta${lang === 'en' ? '.en' : ''}`)}</a>
          </div>
        </div>
        </div>
      </section>

      <DienstIngredients variant="ai-crm" />
    </main>
    <DienstFooter />
    </>
  );
}
