"use client";

import DienstNav from "../../components/DienstNav";
import DienstFooter from "../../components/DienstFooter";
import Image from "next/image";
import DienstIngredients from "../../components/DienstIngredients";
import { useLang } from "../../context/LanguageContext";

export default function Systeemverbetering() {
  const { t, lang } = useLang();
  return (
    <>
    <DienstNav />
    <main className="dienst-page dienst-page-systeemverbetering">
      <section className="dienst-page-hero">
        <a href="/" className="dienst-back-link">{t(`service.systeemverbetering.back${lang === 'en' ? '.en' : ''}`)}</a>
        <div className="dienst-page-hero-grid">
          <div className="dienst-page-hero-text">
            <h1 className="dienst-page-hero-title">{t(`service.systeemverbetering.title${lang === 'en' ? '.en' : ''}`)}</h1>
            <p className="dienst-page-hero-desc">
              {t(`service.systeemverbetering.desc${lang === 'en' ? '.en' : ''}`)}
            </p>
          </div>
          <div className="dienst-page-hero-image">
            <img src="/stockie.jpg" alt="Verbetering van bestaande systemen" className="dienst-page-hero-img" />
          </div>
        </div>
      </section>

      <section className="dienst-page-probleem">
        <h2 className="dienst-page-probleem-title">{t(`service.systeemverbetering.problem.title${lang === 'en' ? '.en' : ''}`)}</h2>
        <div className="dienst-page-probleem-cols">
          <div className="dienst-page-probleem-texts">
            <p>{t(`service.systeemverbetering.problem.p1${lang === 'en' ? '.en' : ''}`)}</p>
            <p>{t(`service.systeemverbetering.problem.p2${lang === 'en' ? '.en' : ''}`)}</p>
          </div>
          <div className="dienst-page-probleem-review">
            <div className="dienst-side-testimonial">
              <div className="dienst-side-testimonial-avatar">
                <Image src="/r3.webp" alt="Klant" width={60} height={60} className="dienst-side-testimonial-img" />
              </div>
              <div className="dienst-side-testimonial-content">
                <span className="dienst-side-testimonial-stars">★★★★★</span>
                <h3 className="dienst-side-testimonial-quote">{t(`service.systeemverbetering.testimonial.quote${lang === 'en' ? '.en' : ''}`)}</h3>
                <p className="dienst-side-testimonial-text">{t(`service.systeemverbetering.testimonial.text${lang === 'en' ? '.en' : ''}`)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dienst-page-modal-review dienst-page-modal-review-single">
        <div className="dienst-page-modal">
          <div className="service-modal-inner dienst-detail-inner">
          <div className="service-modal-card service-modal-card-dark" style={{ background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 35%, #005f73 70%, #0a9396 100%)' }}>
            <div className="service-card-content">
              <h3>{t(`service.systeemverbetering.modal.title${lang === 'en' ? '.en' : ''}`)}</h3>
              <p>{t(`service.systeemverbetering.modal.desc${lang === 'en' ? '.en' : ''}`)}</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-system-flow">
                <div className="system-flow-panel system-flow-legacy">Legacy</div>
                <div className="system-flow-path">
                  <span className="system-flow-dot"></span>
                </div>
                <div className="system-flow-panel system-flow-upgraded">Optimized</div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <h3>{t(`service.systeemverbetering.modal.info.title${lang === 'en' ? '.en' : ''}`)}</h3>
            <p>{t(`service.systeemverbetering.modal.info.desc${lang === 'en' ? '.en' : ''}`)}</p>
            <ul>
              <li>{t(`service.systeemverbetering.modal.info.list1${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.systeemverbetering.modal.info.list2${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.systeemverbetering.modal.info.list3${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.systeemverbetering.modal.info.list4${lang === 'en' ? '.en' : ''}`)}</li>
            </ul>
            <a href="#" className="service-modal-cta open-contact-modal">{t(`service.systeemverbetering.modal.cta${lang === 'en' ? '.en' : ''}`)}</a>
          </div>
        </div>
        </div>
      </section>

      <DienstIngredients variant="systeemverbetering" />
    </main>
    <DienstFooter />
    </>
  );
}
