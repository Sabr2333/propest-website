"use client";

import DienstNav from "../components/DienstNav";
import { useLang } from "../context/LanguageContext";

export default function CookieBeleid() {
  const { t, lang } = useLang();

  return (
    <>
      <DienstNav />

      <main className="cookie-policy-page">
        <div className="cookie-policy-container">
          <div className="cookie-policy-badge">
            {lang === 'en' ? 'Legal' : 'Juridisch'}
          </div>
          <h1 className="cookie-policy-title">
            {lang === 'en'
              ? 'Tracking & Data Storage Statement'
              : 'Tracking- & Gegevensopslagverklaring'}
          </h1>
          <p className="cookie-policy-updated">
            {lang === 'en'
              ? 'Last updated: March 16, 2026'
              : 'Laatst bijgewerkt: 16 maart 2026'}
          </p>

          <section className="cookie-policy-section">
            <p>
              {lang === 'en'
                ? 'We use cookies, tracking technologies and data storage to improve your experience, personalize content and ads, provide social media buttons and analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners, who may combine it with other data you have provided to them or that they have collected through your use of their services.'
                : 'We gebruiken cookies, trackingtechnologieën en gegevensopslag om je ervaring te verbeteren, content en advertenties te personaliseren, socialmediaknoppen te bieden en ons verkeer te analyseren. We delen ook informatie over je gebruik van onze site met onze socialmedia-, reclame- en analysepartners, die deze kunnen combineren met andere gegevens die je aan hen hebt verstrekt of die ze hebben verzameld via jouw gebruik van hun diensten.'}
            </p>
            <p>
              {lang === 'en'
                ? 'According to the law, we may store cookies and other technologies on your device if they are essential for the operation of the website. For all other types of cookies and technologies, we need your consent. Necessary cookies are processed on the basis of GDPR Art. 6 (1) (f), while preference and marketing cookies are processed on the basis of GDPR Art. 6 (1) (a).'
                : 'Volgens de wet mogen we cookies en andere technologieën op je apparaat opslaan als ze essentieel zijn voor de werking van de website. Voor alle andere soorten cookies en technologieën hebben we je toestemming nodig. Noodzakelijke cookies worden verwerkt op basis van GDPR Art. 6 (1) (f), terwijl voorkeur- en marketingcookies worden verwerkt op basis van GDPR Art. 6 (1) (a).'}
            </p>
            <p>
              {lang === 'en'
                ? 'This website uses various types of cookies and technologies, some placed by external services displayed on our pages. You can change or withdraw your consent at any time by using the cookie icon (if available) at the bottom of the page, or via the specific link in our footer.'
                : 'Deze website gebruikt verschillende soorten cookies en technologieën, waaronder sommige geplaatst door externe diensten die op onze pagina\'s worden weergegeven. Je kunt je toestemming op elk moment wijzigen of intrekken via het cookie-icoon (indien beschikbaar) onderaan de pagina, of via de specifieke link in onze footer.'}
            </p>
          </section>

          {/* FUNCTIONEEL */}
          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              <span className="cookie-policy-section-icon">🔧</span>
              {lang === 'en' ? 'Functional (4)' : 'Functioneel (4)'}
            </h2>
            <p className="cookie-policy-section-desc">
              {lang === 'en'
                ? 'These cookies are necessary for the website to function and cannot be switched off.'
                : 'Deze cookies zijn noodzakelijk voor het functioneren van de website en kunnen niet worden uitgeschakeld.'}
            </p>
            <div className="cookie-policy-table-wrap">
              <table className="cookie-policy-table">
                <thead>
                  <tr>
                    <th>{lang === 'en' ? 'Type' : 'Type'}</th>
                    <th>{lang === 'en' ? 'Name' : 'Naam'}</th>
                    <th>{lang === 'en' ? 'Description' : 'Omschrijving'}</th>
                    <th>{lang === 'en' ? 'Duration' : 'Duur'}</th>
                    <th>{lang === 'en' ? 'Source' : 'Bron'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cookie</td>
                    <td><code>propest_cookie_consent</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Stores whether the user has accepted or declined cookies.'
                        : 'Slaat op of de gebruiker cookies heeft geaccepteerd of geweigerd.'}
                    </td>
                    <td>{lang === 'en' ? '1 year' : '1 jaar'}</td>
                    <td>Propest AI</td>
                  </tr>
                  <tr>
                    <td>Cookie</td>
                    <td><code>propest_lang</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Stores the preferred language of the user (NL/EN).'
                        : 'Slaat de taalvoorkeur van de gebruiker op (NL/EN).'}
                    </td>
                    <td>{lang === 'en' ? '1 year' : '1 jaar'}</td>
                    <td>Propest AI</td>
                  </tr>
                  <tr>
                    <td>Cookie</td>
                    <td><code>__cf_bm</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Cloudflare bot management cookie. Identifies and mitigates automated traffic to protect the site against bad bots.'
                        : 'Cloudflare botbeheer cookie. Identificeert en beperkt geautomatiseerd verkeer om de site tegen slechte bots te beschermen.'}
                    </td>
                    <td>{lang === 'en' ? 'Session' : 'Sessie'}</td>
                    <td>Cloudflare</td>
                  </tr>
                  <tr>
                    <td>Cookie</td>
                    <td><code>__Secure-ENID</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Set by Google to secure user authentication, prevent fraud and provide protection against abuse.'
                        : 'Ingesteld door Google om de gebruikersauthenticatie te beveiligen, fraude te voorkomen en bescherming te bieden tegen misbruik.'}
                    </td>
                    <td>{lang === 'en' ? '11 months' : '11 maanden'}</td>
                    <td>Google</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ANALYTICS */}
          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              <span className="cookie-policy-section-icon">📊</span>
              Analytics (4)
            </h2>
            <p className="cookie-policy-section-desc">
              {lang === 'en'
                ? 'These cookies help us understand how visitors interact with our website by collecting anonymous information.'
                : 'Deze cookies helpen ons te begrijpen hoe bezoekers met onze website omgaan door anonieme informatie te verzamelen.'}
            </p>
            <div className="cookie-policy-table-wrap">
              <table className="cookie-policy-table">
                <thead>
                  <tr>
                    <th>{lang === 'en' ? 'Type' : 'Type'}</th>
                    <th>{lang === 'en' ? 'Name' : 'Naam'}</th>
                    <th>{lang === 'en' ? 'Description' : 'Omschrijving'}</th>
                    <th>{lang === 'en' ? 'Duration' : 'Duur'}</th>
                    <th>{lang === 'en' ? 'Source' : 'Bron'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cookie</td>
                    <td><code>_ga</code></td>
                    <td>
                      {lang === 'en'
                        ? 'ID used to identify users for Google Analytics. Registers a unique ID to generate statistical data about how the visitor uses the website.'
                        : 'ID gebruikt om gebruikers te identificeren voor Google Analytics. Registreert een uniek ID om statistische gegevens te genereren over hoe de bezoeker de website gebruikt.'}
                    </td>
                    <td>{lang === 'en' ? '2 years' : '2 jaar'}</td>
                    <td>Google Analytics</td>
                  </tr>
                  <tr>
                    <td>Cookie</td>
                    <td><code>_ga_*</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Used by Google Analytics to persist session state. Contains a unique ID to track visitors across sessions.'
                        : 'Gebruikt door Google Analytics om de sessiestatus te bewaren. Bevat een uniek ID om bezoekers over sessies heen te volgen.'}
                    </td>
                    <td>{lang === 'en' ? '2 years' : '2 jaar'}</td>
                    <td>Google Analytics</td>
                  </tr>
                  <tr>
                    <td>Cookie</td>
                    <td><code>_clck</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Installed by Microsoft Clarity to store information about how visitors use the website and to help create an analysis report. Collected data includes number of visitors, source and pages visited in anonymous form.'
                        : 'Geïnstalleerd door Microsoft Clarity om informatie op te slaan over hoe bezoekers de website gebruiken en om een analyserapport te maken. Verzamelde gegevens omvatten het aantal bezoekers, de bron en bezochte pagina\'s in anonieme vorm.'}
                    </td>
                    <td>{lang === 'en' ? '1 year' : '1 jaar'}</td>
                    <td>Microsoft Clarity</td>
                  </tr>
                  <tr>
                    <td>Cookie</td>
                    <td><code>_clsk</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Installed by Microsoft Clarity to connect multiple page views by a user into a single Clarity session recording.'
                        : 'Geïnstalleerd door Microsoft Clarity om meerdere paginaweergaven van een gebruiker te koppelen aan één Clarity-sessieopname.'}
                    </td>
                    <td>{lang === 'en' ? 'Session' : 'Sessie'}</td>
                    <td>Microsoft Clarity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* MARKETING */}
          <section className="cookie-policy-section">
            <h2 className="cookie-policy-section-title">
              <span className="cookie-policy-section-icon">📢</span>
              {lang === 'en' ? 'Marketing & Social Media (2)' : 'Marketing & Sociale Media (2)'}
            </h2>
            <p className="cookie-policy-section-desc">
              {lang === 'en'
                ? 'These cookies are used to track visitors across websites to display relevant advertisements.'
                : 'Deze cookies worden gebruikt om bezoekers over websites heen te volgen om relevante advertenties weer te geven.'}
            </p>
            <div className="cookie-policy-table-wrap">
              <table className="cookie-policy-table">
                <thead>
                  <tr>
                    <th>{lang === 'en' ? 'Type' : 'Type'}</th>
                    <th>{lang === 'en' ? 'Name' : 'Naam'}</th>
                    <th>{lang === 'en' ? 'Description' : 'Omschrijving'}</th>
                    <th>{lang === 'en' ? 'Duration' : 'Duur'}</th>
                    <th>{lang === 'en' ? 'Source' : 'Bron'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cookie</td>
                    <td><code>_gcl_au</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Used by Google AdSense to experiment with ad efficiency across websites using their services.'
                        : 'Gebruikt door Google AdSense om te experimenteren met advertentie-efficiëntie op websites die hun diensten gebruiken.'}
                    </td>
                    <td>{lang === 'en' ? '3 months' : '3 maanden'}</td>
                    <td>Google</td>
                  </tr>
                  <tr>
                    <td>Cookie</td>
                    <td><code>_fbp</code></td>
                    <td>
                      {lang === 'en'
                        ? 'Used by Facebook to deliver a series of advertising products, such as real-time bidding from external advertisers.'
                        : 'Gebruikt door Facebook om een reeks advertentieproducten te leveren, zoals realtime biedingen van externe adverteerders.'}
                    </td>
                    <td>{lang === 'en' ? '4 months' : '4 maanden'}</td>
                    <td>Meta / Facebook</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CONTACT */}
          <section className="cookie-policy-section cookie-policy-contact">
            <h2 className="cookie-policy-section-title">
              {lang === 'en' ? 'Questions?' : 'Vragen?'}
            </h2>
            <p>
              {lang === 'en'
                ? 'If you have questions about our use of cookies, please contact us at:'
                : 'Heb je vragen over ons gebruik van cookies? Neem dan contact met ons op via:'}
            </p>
            <div className="cookie-policy-contact-info">
              <p><strong>Propest AI</strong></p>
              <p>Deltazijde 2 B2, 1261 ZM Blaricum</p>
              <p>
                <a href="mailto:puur.io@outlook.com">puur.io@outlook.com</a>
              </p>
              <p>
                <a href="https://wa.me/31686081324">06 86081324</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
