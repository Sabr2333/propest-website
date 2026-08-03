"use client";

import { useEffect, useState } from "react";
import { AI_SHOOTS_COPY } from "../../lib/aiShootsCopy";
import { useLang } from "../context/LanguageContext";

const PHASE_MS = 3400;
const REELS = ["tofu", "mofu", "bofu"] as const;

export default function AiShootsCardAnimation() {
  const { lang } = useLang();
  const c = AI_SHOOTS_COPY[lang];
  const [phase, setPhase] = useState(0);
  const active = REELS[phase % REELS.length];

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => p + 1), PHASE_MS);
    return () => clearInterval(id);
  }, []);

  const labels = {
    tofu: { tag: "TOFU", sub: c.tofuTag.split("·")[0]?.trim() || "TOFU", dur: "0:15" },
    mofu: { tag: "MOFU", sub: c.mofuTag.split("·")[0]?.trim() || "MOFU", dur: "0:30" },
    bofu: { tag: "BOFU", sub: c.bofuTag.split("·")[0]?.trim() || "BOFU", dur: "0:20" },
  };

  const reelCopy = {
    tofu: c.reelTofu,
    mofu: c.reelMofu,
    bofu: c.reelBofu,
  };

  return (
    <div className="service-img-placeholder service-img-ai-shoots">
      <div className="aishoots-anim-top">
        <span className="aishoots-anim-rec" aria-hidden>
          <span className="aishoots-rec-dot" />
          REC
        </span>
        <span className="aishoots-anim-label">{c.animLive}</span>
      </div>

      <div className="aishoots-anim-body">
        <div className="aishoots-anim-reels">
          {REELS.map((key) => (
            <div
              key={key}
              className={`aishoots-reel aishoots-reel-${key}${active === key ? " aishoots-reel-active" : ""}`}
            >
              <div className="aishoots-reel-frame">
                <div className={`aishoots-reel-visual aishoots-reel-visual-${key}`}>
                  <div className="aishoots-reel-scan" aria-hidden />
                  <div className="aishoots-reel-hook" aria-hidden>
                    {key === "tofu" && <span className="aishoots-fx-burst" />}
                    {key === "mofu" && <span className="aishoots-fx-brand" />}
                    {key === "bofu" && <span className="aishoots-fx-cta" />}
                  </div>
                  <div className="aishoots-reel-play" aria-hidden>
                    <svg viewBox="0 0 24 24" width="28" height="28">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="aishoots-reel-progress" aria-hidden>
                    <span className="aishoots-reel-progress-bar" />
                  </div>
                </div>
                <div className="aishoots-reel-meta">
                  <span className="aishoots-reel-tag">{labels[key].tag}</span>
                  <span className="aishoots-reel-caption">{reelCopy[key]}</span>
                  <span className="aishoots-reel-time">
                    0:00 / {labels[key].dur} · 9:16
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="aishoots-anim-side">
          <div className="aishoots-side-label">{c.animFunnel}</div>
          <ul className="aishoots-side-steps">
            {REELS.map((key, i) => (
              <li
                key={key}
                className={
                  active === key
                    ? "aishoots-side-on aishoots-side-in"
                    : phase > i
                      ? "aishoots-side-done"
                      : "aishoots-side-off"
                }
              >
                <span className="aishoots-side-n">{String(i + 1).padStart(2, "0")}</span>
                <span>{labels[key].sub}</span>
              </li>
            ))}
          </ul>
          <div className="aishoots-side-stat">
            <span className="aishoots-side-stat-num">8</span>
            <span className="aishoots-side-stat-lbl">{lang === "nl" ? "video's" : "videos"}</span>
          </div>
        </div>
      </div>

      <div className="aishoots-anim-stats">
        <div className="aishoots-stat">
          <span className="aishoots-stat-num">5M+</span>
          <span className="aishoots-stat-lbl">{c.statViews}</span>
        </div>
        <div className="aishoots-stat">
          <span className="aishoots-stat-num">±2 wk</span>
          <span className="aishoots-stat-lbl">{c.statDelivery}</span>
        </div>
      </div>
    </div>
  );
}
