"use client";

import DienstNav from "../components/DienstNav";
import { useLang } from "../context/LanguageContext";

export default function AlgemeneVoorwaardenPage() {
  const { lang } = useLang();
  const en = lang === "en";

  return (
    <>
      <DienstNav />

      <main className="cookie-policy-page">
        <div className="cookie-policy-container">
          <div className="cookie-policy-badge">{en ? "Legal" : "Juridisch"}</div>
          <h1 className="cookie-policy-title">
            {en ? "Terms and Conditions" : "Algemene Voorwaarden"}
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
              <strong>{en ? "Contact" : "Contact"}</strong>
            </p>
            <p>
              {en ? "Phone" : "Telefoon"}:{" "}
              <a href="tel:+31686081324">+31 6 86081324</a>
            </p>
            <p>
              E-mail: <a href="mailto:info@propest.ai">info@propest.ai</a>
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "General" : "Algemeen"}
            </h2>
            <p>
              {en
                ? "These terms and conditions apply to the use of the Propest AI website and all services offered by Propest AI."
                : "Deze algemene voorwaarden zijn van toepassing op het gebruik van de Propest AI-website en de diensten die door Propest AI worden aangeboden."}
            </p>
            <p>
              {en
                ? "By using our website and services, you accept these terms in full. If you do not agree, you must refrain from using our website and services."
                : "Door gebruik te maken van onze website en diensten, accepteert de gebruiker deze voorwaarden. Indien u niet akkoord gaat, dient u af te zien van gebruik van onze website en diensten."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Use of the Website and Services" : "Gebruik van de Website en Diensten"}
            </h2>
            <p>
              {en
                ? "The website and related services are intended exclusively for legitimate business use."
                : "De website en bijbehorende diensten zijn uitsluitend bedoeld voor legitiem zakelijk gebruik."}
            </p>
            <p>
              {en
                ? "Users must comply with all applicable laws and regulations. Propest AI may suspend or terminate access in case of misuse, unlawful use, or violation of these terms."
                : "Gebruikers dienen zich te houden aan alle geldende wettelijke en regelgevende bepalingen. Propest AI kan toegang opschorten of beëindigen bij misbruik, onrechtmatig gebruik of schending van deze voorwaarden."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Liability" : "Aansprakelijkheid"}
            </h2>
            <p>
              {en
                ? "Propest AI strives for accuracy in the information presented on the website but is not liable for errors, omissions, or outdated information."
                : "Propest AI streeft naar zorgvuldigheid bij het weergeven van informatie, maar is niet aansprakelijk voor eventuele fouten, omissies of verouderde informatie op de website."}
            </p>
            <p>
              {en
                ? "Propest AI is not liable for any direct or indirect damage arising from the use of the website or services, except in cases of intent or gross negligence on the part of Propest AI."
                : "Propest AI is niet aansprakelijk voor enige directe of indirecte schade voortvloeiend uit het gebruik van de website of de diensten, tenzij sprake is van opzet of grove nalatigheid aan de zijde van Propest AI."}
            </p>
            <p>
              {en
                ? "Any liability of Propest AI is in all cases limited to the amount paid by the client for the relevant service in the three (3) months preceding the event giving rise to the claim, unless mandatory law provides otherwise."
                : "Iedere aansprakelijkheid van Propest AI is in alle gevallen beperkt tot het bedrag dat de opdrachtgever in de drie (3) maanden voorafgaand aan de gebeurtenis waarop de aanspraak betrekking heeft, heeft betaald voor de betreffende dienst, tenzij dwingend recht anders bepaalt."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Data Breaches and Security Incidents" : "Datalekken en Beveiligingsincidenten"}
            </h2>
            <p>
              {en
                ? "Propest AI implements appropriate technical and organizational measures to protect data. In the event of a suspected or actual data breach, Propest AI will, where applicable and within reasonable limits, assist the client in identifying, reporting, and remedying the incident."
                : "Propest AI treft passende technische en organisatorische maatregelen ter bescherming van gegevens. Bij een vermoedelijk of daadwerkelijk datalek zal Propest AI, voor zover van toepassing en binnen redelijke grenzen, de opdrachtgever ondersteunen bij het signaleren, melden en mitigeren van het incident."}
            </p>
            <p>
              {en
                ? "Propest AI is not liable for data breaches or security incidents caused by third parties (including hosting providers, API providers, app stores, or integrations chosen by the client), force majeure, client-side misconfiguration, weak credentials, or failure by the client to follow Propest AI's security recommendations."
                : "Propest AI is niet aansprakelijk voor datalekken of beveiligingsincidenten veroorzaakt door derden (waaronder hostingproviders, API-leveranciers, app stores of door de opdrachtgever gekozen integraties), overmacht, client-side misconfiguratie, zwakke inloggegevens, of het niet opvolgen van beveiligingsadviezen van Propest AI door de opdrachtgever."}
            </p>
            <p>
              {en
                ? "The client remains ultimately responsible for lawful processing of personal data within their own organization and for compliance with the GDPR and other applicable privacy legislation."
                : "De opdrachtgever blijft eindverantwoordelijk voor rechtmatige verwerking van persoonsgegevens binnen de eigen organisatie en voor naleving van de AVG en overige toepasselijke privacywetgeving."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Apps, App Stores and Go-Live" : "Apps, App Stores en Livegang"}
            </h2>
            <p>
              {en
                ? "For mobile applications developed or delivered by Propest AI, publication and go-live in the Apple App Store and/or Google Play Store depend entirely on the review processes, policies, and timelines of Apple and Google."
                : "Voor mobiele applicaties die door Propest AI worden ontwikkeld of opgeleverd, is publicatie en livegang in de Apple App Store en/of Google Play Store volledig afhankelijk van de beoordelingsprocessen, beleidsregels en doorlooptijden van Apple en Google."}
            </p>
            <p>
              {en
                ? "Propest AI is not responsible or liable for rejection, delay, removal, suspension, or policy changes by Apple, Google, or other distribution platforms. Any additional costs arising from resubmission, policy compliance, or platform-specific requirements are borne by the client unless explicitly agreed otherwise in writing."
                : "Propest AI is niet verantwoordelijk of aansprakelijk voor afwijzing, vertraging, verwijdering, opschorting of beleidswijzigingen door Apple, Google of andere distributieplatformen. Eventuele extra kosten voortvloeiend uit herindiening, naleving van platformbeleid of platformspecifieke eisen komen voor rekening van de opdrachtgever, tenzij schriftelijk anders overeengekomen."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "AI Services and SaaS Solutions" : "AI-diensten en SaaS-oplossingen"}
            </h2>
            <p>
              {en
                ? "AI-generated outputs (including text, code, images, recommendations, or automations) may contain errors, inaccuracies, or outdated information. Propest AI does not guarantee the correctness, completeness, or suitability of AI outputs for any specific purpose."
                : "Door AI gegenereerde output (waaronder tekst, code, afbeeldingen, aanbevelingen of automatiseringen) kan fouten, onnauwkeurigheden of verouderde informatie bevatten. Propest AI garandeert niet de juistheid, volledigheid of geschiktheid van AI-output voor enig specifiek doel."}
            </p>
            <p>
              {en
                ? "The client is responsible for reviewing, validating, and approving all AI outputs before use in business-critical, legal, financial, medical, or safety-related contexts."
                : "De opdrachtgever is verantwoordelijk voor het controleren, valideren en goedkeuren van alle AI-output alvorens deze te gebruiken in bedrijfskritische, juridische, financiële, medische of veiligheidsgerelateerde contexten."}
            </p>
            <p>
              {en
                ? "SaaS and cloud services may depend on third-party providers (such as OpenAI, HubSpot, Vercel, or other APIs). Propest AI is not liable for outages, rate limits, policy changes, price changes, or service discontinuation by these third parties."
                : "SaaS- en clouddiensten kunnen afhankelijk zijn van derde partijen (zoals OpenAI, HubSpot, Vercel of andere API's). Propest AI is niet aansprakelijk voor storingen, rate limits, beleidswijzigingen, prijswijzigingen of beëindiging van diensten door deze derden."}
            </p>
            <p>
              {en
                ? "Unless explicitly agreed in a separate service level agreement (SLA), Propest AI does not guarantee uninterrupted availability of online services."
                : "Tenzij uitdrukkelijk schriftelijk anders overeengekomen in een aparte service level agreement (SLA), garandeert Propest AI geen ononderbroken beschikbaarheid van online diensten."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Privacy and Data Protection" : "Privacy en Gegevensbescherming"}
            </h2>
            <p>
              {en
                ? "Propest AI processes personal data in accordance with its privacy policy and the General Data Protection Regulation (GDPR)."
                : "Propest AI verwerkt persoonsgegevens conform haar privacybeleid en de Algemene Verordening Gegevensbescherming (AVG)."}
            </p>
            <p>
              {en
                ? "For more information on how we handle personal data, please refer to our privacy policy."
                : "Voor meer informatie over hoe wij omgaan met persoonsgegevens, verwijzen wij naar ons privacybeleid."}{" "}
              <a href="/privacybeleid">{en ? "View privacy policy" : "Bekijk privacybeleid"}</a>
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Intellectual Property" : "Intellectueel Eigendom"}
            </h2>
            <p>
              {en
                ? "All content published on the website is owned by Propest AI or licensed to Propest AI."
                : "Alle op de website gepubliceerde content is eigendom van Propest AI of is in licentie verkregen."}
            </p>
            <p>
              {en
                ? "It is prohibited to copy, reproduce, or reuse any content without explicit written permission from Propest AI."
                : "Het is verboden enige content te kopiëren, te reproduceren of hergebruiken zonder uitdrukkelijke schriftelijke toestemming van Propest AI."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en
                ? "Restriction on Copying or Reuse of Content"
                : "Beperking op het kopiëren of hergebruiken van content"}
            </h2>
            <p>
              {en
                ? "All published content on this website or in related applications is protected by copyright."
                : "Alle gepubliceerde content op deze website of in gerelateerde applicaties is auteursrechtelijk beschermd."}
            </p>
            <p>
              {en
                ? "Violation of this policy may result in legal action. Propest AI reserves the right to claim compensation for infringement of its intellectual property rights."
                : "Het overtreden van dit beleid kan leiden tot juridische stappen. Propest AI behoudt zich het recht voor om schadevergoeding te eisen voor inbreuk op onze intellectuele eigendomsrechten."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Changes to These Terms" : "Wijzigingen in de Voorwaarden"}
            </h2>
            <p>
              {en
                ? "Propest AI reserves the right to amend these terms. It is the user's responsibility to stay informed of the current version."
                : "Propest AI behoudt zich het recht voor deze voorwaarden te wijzigen. Het is de verantwoordelijkheid van de gebruiker om regelmatig op de hoogte te blijven van de actuele voorwaarden."}
            </p>
            <p>
              {en
                ? "Changes take effect immediately upon publication on the website."
                : "Wijzigingen worden per direct van kracht na publicatie op de website."}
            </p>
          </section>

          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              {en ? "Applicable Law" : "Toepasselijk Recht"}
            </h2>
            <p>
              {en
                ? "These terms are governed by Dutch law. Any disputes shall be submitted exclusively to the competent court in the Netherlands."
                : "Op deze voorwaarden is Nederlands recht van toepassing. Eventuele geschillen zullen uitsluitend worden voorgelegd aan de bevoegde rechter in Nederland."}
            </p>
          </section>

          <section className="cookie-policy-section cookie-policy-contact">
            <h2 className="cookie-policy-section-title">
              {en ? "Questions?" : "Vragen?"}
            </h2>
            <p>
              {en
                ? "For questions about these terms and conditions, please contact us:"
                : "Voor vragen over deze algemene voorwaarden kunt u contact met ons opnemen:"}
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
