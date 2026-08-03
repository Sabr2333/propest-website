import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Syncopate, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import PropestChatbotWidget from "./components/PropestChatbotWidget";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  variable: "--font-syncopate",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Propest AI",
  description: "Schaalbare groei met AI-oplossingen op maat",
  icons: {
    icon: '/favinew.png',
    shortcut: '/favinew.png',
    apple: '/favinew.png',
  },
  openGraph: {
    title: "Propest AI",
    siteName: "Propest AI",
    description: "Schaalbare groei met AI-oplossingen op maat",
    type: "website",
    url: "https://propest.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Propest AI",
    description: "Schaalbare groei met AI-oplossingen op maat",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syncopate.variable} ${playfair.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/faci_20260317.jpeg" />
        <link rel="apple-touch-icon" href="/faci_20260317.jpeg" />
        <meta name="theme-color" content="#F5F5F5" />
        <style dangerouslySetInnerHTML={{
          __html: `body{background-color:#F5F5F5!important}`
        }} />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://analytics.tiktok.com" />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>

        {/* Facebook Pixel - loaded after page is interactive (no longer blocks render) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1471882464513771');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://www.facebook.com/tr?id=1471882464513771&ev=PageView&noscript=1"
          />
        </noscript>

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('D8G6SMBC77U91RGD672G');
  ttq.page();
}(window, document, 'ttq');`}
        </Script>

        <PropestChatbotWidget />
      </body>
    </html>
  );
}
