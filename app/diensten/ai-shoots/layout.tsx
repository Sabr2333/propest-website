import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Shoots — AI-video door je hele funnel | Propest AI",
  description:
    "Eén shootdag, acht video's: TOFU-hooks, MOFU brand content en BOFU ad creatives. Volledig verzorgd door Propest AI.",
  openGraph: {
    title: "AI Shoots | Propest AI",
    description:
      "AI-video productie door je hele marketingfunnel — aandacht, vertrouwen en conversie uit één shoot.",
    url: "https://www.propest.ai/diensten/ai-shoots",
  },
};

export default function AiShootsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
