/**
 * Elara in hoofdnav, homepage-spotlight, footer, contactformulieren.
 * Standaard aan. Tijdelijk verbergen: NEXT_PUBLIC_ELARA_PROMO=false + deploy.
 *
 * /elara.html en /elara-wachtlijst blijven ook via directe URL bereikbaar.
 */
export const ELARA_PROMO_LIVE =
  process.env.NEXT_PUBLIC_ELARA_PROMO !== "false";
