"use client";

import { ELARA_PROMO_LIVE } from "../config/elaraPromo";
import { useLang } from "../context/LanguageContext";

export default function DienstFooter() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-float">
        <div className="footer-top">
          <div className="footer-col">
            <h4>{t('footer.address')}</h4>
            <p>Deltazijde 2 B2</p>
            <p>1261 ZM Blaricum</p>
            <p>{t('footer.country')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.contact')}</h4>
            <p>{t('footer.email')}</p>
            <p>{t('footer.phone')}</p>
            <p>{t('footer.hours')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.services')}</h4>
            <a href="/diensten/ai-shoots">{t('diensten.ai-shoots')}</a>
            {ELARA_PROMO_LIVE ? (
              <a href="/elara.html">{t('footer.elara')}</a>
            ) : (
              <a href="/diensten/bedrijfsautomatisering">{t('footer.bedrijfsautomatisering')}</a>
            )}
            <a href="/diensten/ai-crm">{t('footer.ai-crm')}</a>
            <a href="/diensten/ai-agents">{t('footer.ai-agents')}</a>
            <a href="/diensten/app-web-ontwikkeling">{t('footer.app-web-ontwikkeling')}</a>
            <a href="/diensten/systeemverbetering">{t('footer.systeemverbetering')}</a>
            <a href="/diensten/rpa-ai-automatisering">{t('footer.rpa-ai-automatisering')}</a>
            <a href="/diensten/gpt-op-maat">{t('footer.gpt-op-maat')}</a>
            <a href="/diensten/webbots">{t('footer.webbots')}</a>
          </div>
          <div className="footer-col">
            <h4>{t('footer.expertise')}</h4>
            <a href="#">{t('footer.b2b-saas')}</a>
            <a href="#">{t('footer.b2b-service')}</a>
            <a href="#">{t('footer.b2b-hardware')}</a>
            <a href="#">{t('expertise.ai-consultancy')}</a>
            <a href="#">{t('expertise.data-strategy')}</a>
            <a href="#">{t('expertise.process-automation')}</a>
            <a href="#">{t('expertise.custom-development')}</a>
          </div>
          <div className="footer-col">
            <h4>{t('footer.company')}</h4>
            <a href="/#about">{t('footer.about')}</a>
            <a href="#">{t('footer.careers')}</a>
            <a href="/contact">{t('footer.contact-link')}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <span>{t('footer.copyright')}</span>
            <a href="/privacybeleid">{t('footer.privacy')}</a>
            <a href="/cookie-beleid">{t('footer.cookies')}</a>
            <a href="/algemene-voorwaarden">{t('footer.terms')}</a>
          </div>
          <div className="footer-bottom-right">
            <a href="https://www.instagram.com/propest.ai/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/propest-ai/?originalSubdomain=nl" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/><path d="M8 11v5M8 8v.01M12 16v-5c0-1 .6-2 2-2s2 1 2 2v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
