import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-elara-wl-inter",
});

const WAITLIST_URL = "https://www.propest.ai/elara-wachtlijst";

export const metadata: Metadata = {
  title: "Elara wachtlijst | Propest AI",
  description:
    "Schrijf je in voor de Elara-wachtlijst en krijg voorrang zodra er nieuwe plekken openen.",
  alternates: {
    canonical: WAITLIST_URL,
  },
  openGraph: {
    title: "Elara wachtlijst | Propest AI",
    description:
      "Schrijf je in voor de Elara-wachtlijst en krijg voorrang zodra er nieuwe plekken openen.",
    url: WAITLIST_URL,
    type: "website",
  },
};

export default function ElaraWachtlijstLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={inter.variable}>{children}</div>;
}
