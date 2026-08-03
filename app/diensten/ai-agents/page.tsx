"use client";

import DienstNav from "../../components/DienstNav";
import DienstFooter from "../../components/DienstFooter";
import Image from "next/image";
import DienstIngredients from "../../components/DienstIngredients";
import { useLang } from "../../context/LanguageContext";

export default function AiAgents() {
  const { t, lang } = useLang();
  return (
    <>
    <DienstNav />
    <main className="dienst-page">
      <section className="dienst-page-hero">
        <a href="/" className="dienst-back-link">{t(`service.ai-agents.back${lang === 'en' ? '.en' : ''}`)}</a>
        <div className="dienst-page-hero-grid">
          <div className="dienst-page-hero-text">
            <h1 className="dienst-page-hero-title">{t(`service.ai-agents.title${lang === 'en' ? '.en' : ''}`)}</h1>
            <p className="dienst-page-hero-desc">
              {t(`service.ai-agents.desc${lang === 'en' ? '.en' : ''}`)}
            </p>
          </div>
          <div className="dienst-page-hero-image">
            <img src="/foto102.webp" alt="AI-Agents" className="dienst-page-hero-img" />
          </div>
        </div>
      </section>

      <section className="dienst-page-probleem">
        <h2 className="dienst-page-probleem-title">{t(`service.ai-agents.problem.title${lang === 'en' ? '.en' : ''}`)}</h2>
        <div className="dienst-page-probleem-cols">
          <div className="dienst-page-probleem-texts">
            <p>{t(`service.ai-agents.problem.p1${lang === 'en' ? '.en' : ''}`)}</p>
            <p>{t(`service.ai-agents.problem.p2${lang === 'en' ? '.en' : ''}`)}</p>
          </div>
          <div className="dienst-page-probleem-review">
            <div className="dienst-side-testimonial">
              <div className="dienst-side-testimonial-avatar">
                <Image src="/r2.jpg" alt="Klant" width={40} height={40} className="dienst-side-testimonial-img" />
              </div>
              <div className="dienst-side-testimonial-content">
                <span className="dienst-side-testimonial-stars">★★★★★</span>
                <h3 className="dienst-side-testimonial-quote">{t(`service.ai-agents.testimonial.quote${lang === 'en' ? '.en' : ''}`)}</h3>
                <p className="dienst-side-testimonial-text">{t(`service.ai-agents.testimonial.text${lang === 'en' ? '.en' : ''}`)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dienst-page-modal-review dienst-page-modal-review-single">
        <div className="dienst-page-modal">
          <div className="service-modal-inner dienst-detail-inner">
          <div className="service-modal-card service-modal-card-dark">
            <div className="service-card-content">
              <h3>{t(`service.ai-agents.modal.title${lang === 'en' ? '.en' : ''}`)}</h3>
              <p>{t(`service.ai-agents.modal.desc${lang === 'en' ? '.en' : ''}`)}</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-agent">
                <div className="agent-flow agent-flow-visible">
                  <div className="agent-flow-text">
                    <span className="agent-flow-sub">{t('ai-agents.animation.sub')}</span>
                    <span className="agent-flow-title">{t('ai-agents.animation.title')}</span>
                  </div>
                  <div className="agent-flow-visual">
                    <div className="agent-flow-icons">
                      <div className="agent-flow-icon agent-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="1.5"/><line x1="8" y1="9" x2="16" y2="9" stroke="white" strokeWidth="1.2"/><line x1="8" y1="12" x2="14" y2="12" stroke="white" strokeWidth="1.2"/><line x1="8" y1="15" x2="12" y2="15" stroke="white" strokeWidth="1.2"/></svg>
                      </div>
                      <div className="agent-flow-icon agent-icon-blue">
                        <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="13" width="3" height="6" rx="1" fill="white"/><rect x="10.5" y="9" width="3" height="10" rx="1" fill="white"/><rect x="16" y="5" width="3" height="14" rx="1" fill="white"/></svg>
                      </div>
                      <div className="agent-flow-icon agent-icon-red">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M4 8C4 6.9 4.9 6 6 6H18C19.1 6 20 6.9 20 8V10H4V8Z" fill="white" opacity="0.7"/><rect x="4" y="10" width="16" height="8" rx="0" fill="white"/><rect x="9" y="12" width="6" height="4" rx="1" fill="rgba(0,0,0,0.2)"/></svg>
                      </div>
                    </div>
                    <svg className="agent-flow-lines" viewBox="0 0 200 180" fill="none">
                      <path d="M0 30 C60 30, 80 90, 140 90" stroke="#c77dff" strokeWidth="1.5" fill="none" />
                      <circle r="3" fill="#c77dff">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M0,30 C60,30 80,90 140,90" />
                        <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <path d="M0 90 C50 90, 90 90, 140 90" stroke="#4a90e2" strokeWidth="1.5" fill="none" />
                      <circle r="3" fill="#4a90e2">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M0,90 C50,90 90,90 140,90" />
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <path d="M0 150 C60 150, 80 90, 140 90" stroke="#ff6b6b" strokeWidth="1.5" fill="none" />
                      <circle r="3" fill="#ff6b6b">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M0,150 C60,150 80,90 140,90" />
                        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                    <div className="agent-flow-window">
                      <div className="agent-window-bar">
                        <span className="agent-dot-red"></span>
                        <span className="agent-dot-yellow"></span>
                        <span className="agent-dot-green"></span>
                      </div>
                      <div className="agent-window-body">
                        <svg viewBox="0 0 40 40" fill="none">
                          <rect x="6" y="10" width="12" height="20" rx="2" fill="#4a90e2"/>
                          <rect x="22" y="10" width="12" height="20" rx="2" fill="#6ea8fe" opacity="0.6"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <h3>{t(`service.ai-agents.modal.info.title${lang === 'en' ? '.en' : ''}`)}</h3>
            <p>{t(`service.ai-agents.modal.info.desc${lang === 'en' ? '.en' : ''}`)}</p>
            <ul>
              <li>{t(`service.ai-agents.modal.info.list1${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.ai-agents.modal.info.list2${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.ai-agents.modal.info.list3${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.ai-agents.modal.info.list4${lang === 'en' ? '.en' : ''}`)}</li>
            </ul>
            <a href="#" className="service-modal-cta open-contact-modal">{t(`service.ai-agents.modal.cta${lang === 'en' ? '.en' : ''}`)}</a>
          </div>
        </div>
        </div>
      </section>

      <DienstIngredients variant="ai-agents" />
    </main>
    <DienstFooter />
    </>
  );
}
