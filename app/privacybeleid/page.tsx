"use client";

import DienstNav from "../components/DienstNav";
import { useLang } from "../context/LanguageContext";

export default function PrivacybeleidPage() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <>
      <DienstNav />

      <main className="cookie-policy-page">
        <div className="cookie-policy-container">
          <div className="cookie-policy-badge">{en ? "Legal" : "Juridisch"}</div>
          <h1 className="cookie-policy-title">
            {en ? "Privacy Policy" : "Privacybeleid"}
          </h1>
          <p className="cookie-policy-updated">
            {en ? "Last updated: August 4, 2026" : "Laatst bijgewerkt: 4 augustus 2026"}
          </p>

          <section className="cookie-policy-section cookie-policy-contact">
            <p><strong>Propest AI</strong></p>
            <p>Deltazijde 2 B2</p>
            <p>1261 ZM Blaricum</p>
            <p>{en ? "The Netherlands" : "Nederland"}</p>
            <p style={{ marginTop: "1rem" }}>
              E-mail: <a href="mailto:info@propest.ai">info@propest.ai</a>
            </p>
            <p>
              {en ? "Phone" : "Telefoon"}:{" "}
              <a href="tel:+31686081324">+31 6 86081324</a>
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Introduction" : "Introductie"}
            </h2>
            <p>
              {en
                ? "Propest AI respects your privacy and processes personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable privacy laws."
                : "Propest AI respecteert uw privacy en verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG) en overige toepasselijke privacywetgeving."}
            </p>
            <p>
              {en
                ? "This privacy policy explains what personal data we collect, why we use it, how long we retain it, and what rights you have."
                : "In dit privacybeleid leest u welke persoonsgegevens wij verzamelen, waarom wij deze gebruiken, hoe lang wij deze bewaren en welke rechten u heeft."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "What Data We Collect" : "Welke gegevens wij verzamelen"}
            </h2>
            <p>
              {en
                ? "Depending on how you use our website and services, we may process the following categories of personal data:"
                : "Afhankelijk van hoe u onze website en diensten gebruikt, kunnen wij de volgende categorieën persoonsgegevens verwerken:"}
            </p>
            <p>
              {en
                ? "Contact details (such as name, email address, phone number, company name); communication data (messages via contact forms, WhatsApp, email or chatbot); technical data (IP address, browser type, device information); usage data (pages visited, click behaviour, session data); and marketing/analytics data (cookie identifiers, campaign data)."
                : "Contactgegevens (zoals naam, e-mailadres, telefoonnummer, bedrijfsnaam); communicatiegegevens (berichten via contactformulieren, WhatsApp, e-mail of chatbot); technische gegevens (IP-adres, browsertype, apparaatinformatie); gebruiksgegevens (bezochte pagina's, klikgedrag, sessiegegevens); en marketing-/analysegegevens (cookie-identifiers, campagnedata)."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Purposes and Legal Bases" : "Doeleinden en grondslagen"}
            </h2>
            <p>
              {en
                ? "We process personal data for the following purposes: responding to inquiries and providing our services; managing waitlists and lead registration (e.g. HubSpot); improving and securing our website; analysing website usage; displaying relevant advertising; and complying with legal obligations."
                : "Wij verwerken persoonsgegevens voor de volgende doeleinden: het beantwoorden van vragen en het leveren van onze diensten; het beheren van wachtlijsten en leadregistratie (bijv. HubSpot); het verbeteren en beveiligen van onze website; het analyseren van websitegebruik; het tonen van relevante advertenties; en het naleven van wettelijke verplichtingen."}
            </p>
            <p>
              {en
                ? "Legal bases include: consent (Art. 6(1)(a) GDPR), performance of a contract (Art. 6(1)(b) GDPR), legitimate interests (Art. 6(1)(f) GDPR), and legal obligation (Art. 6(1)(c) GDPR)."
                : "Grondslagen zijn onder meer: toestemming (art. 6 lid 1 sub a AVG), uitvoering van een overeenkomst (art. 6 lid 1 sub b AVG), gerechtvaardigd belang (art. 6 lid 1 sub f AVG) en wettelijke verplichting (art. 6 lid 1 sub c AVG)."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Cookies and Tracking" : "Cookies en tracking"}
            </h2>
            <p>
              {en
                ? "We use cookies and similar technologies for functional, analytical and marketing purposes. For detailed information about the cookies we use, please see our cookie policy."
                : "Wij gebruiken cookies en vergelijkbare technologieën voor functionele, analytische en marketingdoeleinden. Voor gedetailleerde informatie over de cookies die wij gebruiken, verwijzen wij naar ons cookiebeleid."}{" "}
              <a href="/cookie-beleid">{en ? "View cookie policy" : "Bekijk cookiebeleid"}</a>
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Third Parties" : "Derden"}
            </h2>
            <p>
              {en
                ? "We may share personal data with trusted third parties when necessary, including hosting providers (e.g. Vercel), CRM and marketing tools (e.g. HubSpot), analytics and advertising platforms (e.g. Google Analytics, Meta/Facebook, TikTok), and AI service providers used for our chatbot (e.g. OpenAI)."
                : "Wij kunnen persoonsgegevens delen met betrouwbare derden wanneer dat noodzakelijk is, waaronder hostingproviders (bijv. Vercel), CRM- en marketingtools (bijv. HubSpot), analyse- en advertentieplatformen (bijv. Google Analytics, Meta/Facebook, TikTok) en AI-dienstverleners die wij gebruiken voor onze chatbot (bijv. OpenAI)."}
            </p>
            <p>
              {en
                ? "These parties process data only on our instructions or as independent controllers, in accordance with their own privacy policies and applicable law."
                : "Deze partijen verwerken gegevens uitsluitend in opdracht van ons of als zelfstandige verwerkingsverantwoordelijke, conform hun eigen privacybeleid en toepasselijke wetgeving."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Retention Periods" : "Bewaartermijnen"}
            </h2>
            <p>
              {en
                ? "We do not retain personal data longer than necessary for the purposes for which it was collected, unless a longer retention period is required by law."
                : "Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor zij zijn verzameld, tenzij een langere bewaartermijn wettelijk verplicht is."}
            </p>
            <p>
              {en
                ? "Contact and lead data is generally retained for up to 24 months after the last contact, unless a business relationship continues or legal obligations require longer retention."
                : "Contact- en leaddata worden in de regel bewaard tot maximaal 24 maanden na het laatste contact, tenzij een zakelijke relatie voortduurt of wettelijke verplichtingen langere bewaring vereisen."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Your Rights" : "Uw rechten"}
            </h2>
            <p>
              {en
                ? "Under the GDPR, you have the right to access, rectify, erase, restrict, or object to the processing of your personal data, as well as the right to data portability where applicable."
                : "Op grond van de AVG heeft u het recht op inzage, rectificatie, verwijdering, beperking of bezwaar tegen verwerking van uw persoonsgegevens, alsmede het recht op dataportabiliteit voor zover van toepassing."}
            </p>
            <p>
              {en
                ? "If processing is based on consent, you may withdraw your consent at any time. You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens)."
                : "Indien verwerking is gebaseerd op toestemming, kunt u uw toestemming te allen tijde intrekken. U heeft tevens het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens."}
            </p>
            <p>
              {en
                ? "To exercise your rights, please contact us at info@propest.ai."
                : "Om uw rechten uit te oefenen, kunt u contact met ons opnemen via info@propest.ai."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Security" : "Beveiliging"}
            </h2>
            <p>
              {en
                ? "Propest AI takes appropriate technical and organizational measures to protect personal data against loss, misuse, unauthorized access, disclosure, or alteration."
                : "Propest AI treft passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik, ongeautoriseerde toegang, openbaarmaking of wijziging."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Changes" : "Wijzigingen"}
            </h2>
            <p>
              {en
                ? "We may update this privacy policy from time to time. The most recent version will always be published on this page."
                : "Wij kunnen dit privacybeleid van tijd tot tijd bijwerken. De meest recente versie wordt altijd op deze pagina gepubliceerd."}
            </p>
          </section>

          <section className="cookie-policy-section cookie-policy-contact">
            <h2 className="cookie-policy-section-title">
              {en ? "Questions?" : "Vragen?"}
            </h2>
            <p>
              {en
                ? "For questions about this privacy policy or the processing of your personal data, please contact us:"
                : "Voor vragen over dit privacybeleid of de verwerking van uw persoonsgegevens kunt u contact met ons opnemen:"}
            </p>
            <div className="cookie-policy-contact-info">
              <p><strong>Propest AI</strong></p>
              <p>Deltazijde 2 B2, 1261 ZM Blaricum</p>
              <p>
                <a href="mailto:info@propest.ai">info@propest.ai</a>
              </p>
              <p>
                <a href="tel:+31686081324">+31 6 86081324</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
