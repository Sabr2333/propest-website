"use client";

import DienstNav from "../components/DienstNav";
import DienstFooter from "../components/DienstFooter";
import { useLang } from "../context/LanguageContext";

export default function ContactPage() {
  const { t, lang } = useLang();
  return (
    <>
      <DienstNav />
      <main style={{ paddingTop: "110px", background: "#F5F5F5", minHeight: "100vh" }}>
        <section className="dienst-contact-section">
          <div className="dienst-contact-layout">
            <div className="dienst-contact-info">
              <h2 className="dienst-contact-title">Contact</h2>
              <p className="dienst-contact-address">
                Deltazijde 2 B2<br />
                1261 ZM Blaricum<br />
                {lang === 'en' ? 'The Netherlands' : 'Nederland'}
              </p>
              <p className="dienst-contact-hours">
                {lang === 'en' ? 'Available daily from 08:00 to 18:00' : 'Iedere dag bereikbaar van 08:00 t/m 18:00'}<br />
                {lang === 'en' ? 'For questions you can always WhatsApp' : 'Bij vragen kun je altijd whatsappen naar'}<br />
                <strong>06 86081324</strong>
              </p>
              <h3 className="dienst-contact-cta-title">{lang === 'en' ? 'Mail or WhatsApp' : 'Mail of WhatsApp'}<br />{lang === 'en' ? 'us daily' : 'ons dagelijks'}</h3>
              <div className="dienst-contact-buttons">
                <a href="mailto:Info@propest.ai" className="dienst-contact-btn dienst-contact-btn-filled">{lang === 'en' ? 'Mail us directly' : 'Mail ons direct'}</a>
                <a href="https://wa.me/31686081324" target="_blank" rel="noopener noreferrer" className="dienst-contact-btn dienst-contact-btn-outline">{lang === 'en' ? 'WhatsApp us directly' : 'Whatsapp ons direct'}</a>
              </div>
            </div>
            <div className="dienst-contact-map">
              <iframe
                src="https://maps.google.com/maps?q=Deltazijde+2+B2,+1261+ZM+Blaricum,+Nederland&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "16px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Propest AI locatie"
              />
            </div>
          </div>
        </section>
      </main>
      <DienstFooter />
    </>
  );
}
