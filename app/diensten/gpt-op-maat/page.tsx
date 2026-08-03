"use client";

import DienstNav from "../../components/DienstNav";
import DienstFooter from "../../components/DienstFooter";
import Image from "next/image";
import DienstIngredients from "../../components/DienstIngredients";
import { useLang } from "../../context/LanguageContext";

export default function GptOpMaat() {
  const { t, lang } = useLang();
  return (
    <>
    <DienstNav />
    <main className="dienst-page">
      <section className="dienst-page-hero">
        <a href="/" className="dienst-back-link">{t(`service.gpt-op-maat.back${lang === 'en' ? '.en' : ''}`)}</a>
        <div className="dienst-page-hero-grid">
          <div className="dienst-page-hero-text">
            <h1 className="dienst-page-hero-title">{t(`service.gpt-op-maat.title${lang === 'en' ? '.en' : ''}`)}</h1>
            <p className="dienst-page-hero-desc">
              {t(`service.gpt-op-maat.desc${lang === 'en' ? '.en' : ''}`)}
            </p>
          </div>
          <div className="dienst-page-hero-image">
            <img src="/inter.jpg" alt="GPT op Maat" className="dienst-page-hero-img" />
          </div>
        </div>
      </section>

      <section className="dienst-page-probleem">
        <h2 className="dienst-page-probleem-title">{t(`service.gpt-op-maat.problem.title${lang === 'en' ? '.en' : ''}`)}</h2>
        <div className="dienst-page-probleem-cols">
          <div className="dienst-page-probleem-texts">
            <p>{t(`service.gpt-op-maat.problem.p1${lang === 'en' ? '.en' : ''}`)}</p>
            <p>{t(`service.gpt-op-maat.problem.p2${lang === 'en' ? '.en' : ''}`)}</p>
          </div>
          <div className="dienst-page-probleem-review">
            <div className="dienst-side-testimonial">
              <div className="dienst-side-testimonial-avatar">
                <Image src="/r2.jpg" alt="Klant" width={60} height={60} className="dienst-side-testimonial-img" />
              </div>
              <div className="dienst-side-testimonial-content">
                <span className="dienst-side-testimonial-stars">★★★★★</span>
                <h3 className="dienst-side-testimonial-quote">{t(`service.gpt-op-maat.testimonial.quote${lang === 'en' ? '.en' : ''}`)}</h3>
                <p className="dienst-side-testimonial-text">{t(`service.gpt-op-maat.testimonial.text${lang === 'en' ? '.en' : ''}`)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dienst-page-modal-review dienst-page-modal-review-single">
        <div className="dienst-page-modal">
          <div className="service-modal-inner dienst-detail-inner">
          <div className="service-modal-card service-modal-card-dark" style={{ background: 'linear-gradient(135deg, #3a0f2f 0%, #7a1f5c 38%, #ff7f50 70%, #ffd166 100%)' }}>
            <div className="service-card-content">
              <h3>{t(`service.gpt-op-maat.modal.title${lang === 'en' ? '.en' : ''}`)}</h3>
              <p>{t(`service.gpt-op-maat.modal.desc${lang === 'en' ? '.en' : ''}`)}</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-gpt-chat">
                <div className="gpt-chat-bubble gpt-chat-prompt">{lang === 'en' ? 'Create a custom proposal...' : 'Maak een offerte op maat...'}</div>
                <div className="gpt-chat-bubble gpt-chat-answer">
                  {lang === 'en' ? 'Done. Including planning and KPIs.' : 'Gereed. Inclusief planning en KPI\'s.'}
                  <span className="gpt-typing">
                    <i></i><i></i><i></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <h3>{t(`service.gpt-op-maat.modal.info.title${lang === 'en' ? '.en' : ''}`)}</h3>
            <p>{t(`service.gpt-op-maat.modal.info.desc${lang === 'en' ? '.en' : ''}`)}</p>
            <ul>
              <li>{t(`service.gpt-op-maat.modal.info.list1${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.gpt-op-maat.modal.info.list2${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.gpt-op-maat.modal.info.list3${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.gpt-op-maat.modal.info.list4${lang === 'en' ? '.en' : ''}`)}</li>
            </ul>
            <a href="#" className="service-modal-cta open-contact-modal">{t(`service.gpt-op-maat.modal.cta${lang === 'en' ? '.en' : ''}`)}</a>
          </div>
        </div>
        </div>
      </section>

      <DienstIngredients variant="gpt-op-maat" />
    </main>
    <DienstFooter />
    </>
  );
}
