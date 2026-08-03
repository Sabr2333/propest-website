"use client";

import DienstNav from "../../components/DienstNav";
import DienstFooter from "../../components/DienstFooter";
import Image from "next/image";
import DienstIngredients from "../../components/DienstIngredients";
import { useLang } from "../../context/LanguageContext";

export default function Systeemintegraties() {
  const { t, lang } = useLang();
  return (
    <>
    <DienstNav />
    <main className="dienst-page">
      <section className="dienst-page-hero">
        <a href="/" className="dienst-back-link">{t(`service.systeemintegraties.back${lang === 'en' ? '.en' : ''}`)}</a>
        <div className="dienst-page-hero-grid">
          <div className="dienst-page-hero-text">
            <h1 className="dienst-page-hero-title">{t(`service.systeemintegraties.title${lang === 'en' ? '.en' : ''}`)}</h1>
            <p className="dienst-page-hero-desc">
              {t(`service.systeemintegraties.desc${lang === 'en' ? '.en' : ''}`)}
            </p>
          </div>
          <div className="dienst-page-hero-image">
            <img src="/foto103.jpg" alt="Systeemintegraties" className="dienst-page-hero-img" />
          </div>
        </div>
      </section>

      <section className="dienst-page-probleem">
        <h2 className="dienst-page-probleem-title">{t(`service.systeemintegraties.problem.title${lang === 'en' ? '.en' : ''}`)}</h2>
        <div className="dienst-page-probleem-cols">
          <div className="dienst-page-probleem-texts">
            <p>{t(`service.systeemintegraties.problem.p1${lang === 'en' ? '.en' : ''}`)}</p>
            <p>{t(`service.systeemintegraties.problem.p2${lang === 'en' ? '.en' : ''}`)}</p>
          </div>
          <div className="dienst-page-probleem-review">
            <div className="dienst-side-testimonial">
              <div className="dienst-side-testimonial-avatar">
                <Image src="/r1.jpg" alt="Klant" width={60} height={60} className="dienst-side-testimonial-img" />
              </div>
              <div className="dienst-side-testimonial-content">
                <span className="dienst-side-testimonial-stars">★★★★★</span>
                <h3 className="dienst-side-testimonial-quote">{t(`service.systeemintegraties.testimonial.quote${lang === 'en' ? '.en' : ''}`)}</h3>
                <p className="dienst-side-testimonial-text">{t(`service.systeemintegraties.testimonial.text${lang === 'en' ? '.en' : ''}`)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dienst-page-modal-review dienst-page-modal-review-single">
        <div className="dienst-page-modal">
          <div className="service-modal-inner dienst-detail-inner">
          <div className="service-modal-card service-modal-card-blue">
            <div className="service-card-content">
              <h3>{t(`service.systeemintegraties.modal.title${lang === 'en' ? '.en' : ''}`)}</h3>
              <p>{t(`service.systeemintegraties.modal.desc${lang === 'en' ? '.en' : ''}`)}</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-phone">
                <div className="phone-mock">
                  <div className="phone-screen">
                    <div className="phone-header"></div>
                    <div className="phone-content"></div>
                    <div className="phone-btn-mock"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <h3>{t(`service.systeemintegraties.modal.info.title${lang === 'en' ? '.en' : ''}`)}</h3>
            <p>{t(`service.systeemintegraties.modal.info.desc${lang === 'en' ? '.en' : ''}`)}</p>
            <ul>
              <li>{t(`service.systeemintegraties.modal.info.list1${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.systeemintegraties.modal.info.list2${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.systeemintegraties.modal.info.list3${lang === 'en' ? '.en' : ''}`)}</li>
              <li>{t(`service.systeemintegraties.modal.info.list4${lang === 'en' ? '.en' : ''}`)}</li>
            </ul>
            <a href="#" className="service-modal-cta open-contact-modal">{t(`service.systeemintegraties.modal.cta${lang === 'en' ? '.en' : ''}`)}</a>
          </div>
        </div>
        </div>
      </section>

      <DienstIngredients variant="systeemintegraties" />
    </main>
    <DienstFooter />
    </>
  );
}
