"use client";

import DienstNav from "../../components/DienstNav";
import DienstFooter from "../../components/DienstFooter";
import Image from "next/image";
import DienstIngredients from "../../components/DienstIngredients";
import { useLang } from "../../context/LanguageContext";

export default function Bedrijfsautomatisering() {
  const { t } = useLang();
  return (
    <>
    <DienstNav />
    <main className="dienst-page">
      <section className="dienst-page-hero">
        <a href="/" className="dienst-back-link">{t('service.business-automation.back')}</a>
        <div className="dienst-page-hero-grid">
          <div className="dienst-page-hero-text">
            <h1 className="dienst-page-hero-title">{t('service.business-automation.title')}</h1>
            <p className="dienst-page-hero-desc">
              {t('service.business-automation.desc')}
            </p>
          </div>
          <div className="dienst-page-hero-image">
            <img src="/bedrijfs.jpg" alt="Bedrijfsautomatisering" className="dienst-page-hero-img" />
          </div>
        </div>
      </section>

      <section className="dienst-page-probleem">
        <h2 className="dienst-page-probleem-title">{t('service.business-automation.problem.title')}</h2>
        <div className="dienst-page-probleem-cols">
          <div className="dienst-page-probleem-texts">
            <p>{t('service.business-automation.problem.p1')}</p>
            <p>{t('service.business-automation.problem.p2')}</p>
          </div>
          <div className="dienst-page-probleem-review">
            <div className="dienst-side-testimonial">
              <div className="dienst-side-testimonial-avatar">
                <Image src="/r1.jpg" alt="Klant" width={40} height={40} className="dienst-side-testimonial-img" />
              </div>
              <div className="dienst-side-testimonial-content">
                <span className="dienst-side-testimonial-stars">★★★★★</span>
                <h3 className="dienst-side-testimonial-quote">{t('service.business-automation.testimonial.quote')}</h3>
                <p className="dienst-side-testimonial-text">{t('service.business-automation.testimonial.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dienst-page-modal-review dienst-page-modal-review-single">
        <div className="dienst-page-modal">
          <div className="service-modal-inner dienst-detail-inner">
          <div className="service-modal-card">
            <div className="service-card-content">
              <h3>{t('service.business-automation.modal.title')}</h3>
              <p>{t('service.business-automation.modal.desc')}</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-dashboard">
                <div className="dashboard-mock">
                  <div className="dashboard-sidebar">
                    <div className="dash-dot"></div>
                    <div className="dash-line"></div>
                    <div className="dash-line"></div>
                    <div className="dash-line"></div>
                    <div className="dash-line"></div>
                    <div className="dash-line"></div>
                  </div>
                  <div className="dashboard-main">
                    <div className="dash-header">Dashboard</div>
                    <div className="dash-stats">
                      <div className="dash-stat" data-target="4236">4.236</div>
                      <div className="dash-stat" data-target="24904">24.904</div>
                    </div>
                    <div className="dash-chart">
                      <div className="chart-bar" data-height="60" style={{height: "60%"}}></div>
                      <div className="chart-bar" data-height="80" style={{height: "80%"}}></div>
                      <div className="chart-bar" data-height="45" style={{height: "45%"}}></div>
                      <div className="chart-bar" data-height="90" style={{height: "90%"}}></div>
                      <div className="chart-bar" data-height="70" style={{height: "70%"}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <h3>{t('service.business-automation.modal.info.title')}</h3>
            <p>{t('service.business-automation.modal.info.desc')}</p>
            <ul>
              <li>{t('service.business-automation.modal.info.list1')}</li>
              <li>{t('service.business-automation.modal.info.list2')}</li>
              <li>{t('service.business-automation.modal.info.list3')}</li>
              <li>{t('service.business-automation.modal.info.list4')}</li>
            </ul>
            <a href="#" className="service-modal-cta open-contact-modal">{t('service.business-automation.modal.cta')}</a>
          </div>
        </div>
        </div>
      </section>

      <DienstIngredients variant="bedrijfsautomatisering" />
    </main>
    <DienstFooter />
    </>
  );
}
