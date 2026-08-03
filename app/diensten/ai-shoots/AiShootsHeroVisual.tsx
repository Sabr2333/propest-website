"use client";

import { useEffect, useState } from "react";
import { AI_SHOOTS_COPY, type AiShootsLang } from "../../../lib/aiShootsCopy";
import styles from "./ai-shoots.module.css";

const STAGES = ["tofu", "mofu", "bofu"] as const;

type Props = { lang: AiShootsLang };

export default function AiShootsHeroVisual({ lang }: Props) {
  const c = AI_SHOOTS_COPY[lang];
  const [active, setActive] = useState(0);

  const stageMeta = [
    { key: "tofu" as const, tag: "TOFU", label: c.tofuTag.split("·")[0]?.trim() || "TOFU" },
    { key: "mofu" as const, tag: "MOFU", label: c.mofuTag.split("·")[0]?.trim() || "MOFU" },
    { key: "bofu" as const, tag: "BOFU", label: c.bofuTag.split("·")[0]?.trim() || "BOFU" },
  ];

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % STAGES.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={styles.heroVisual} aria-hidden>
      <div className={styles.heroVisualGlow} />
      <p className={styles.heroVisualLabel}>{c.animFunnel}</p>
      <div className={styles.heroVisualPipeline}>
        <span className={styles.heroVisualLine} />
        <span
          className={styles.heroVisualPulse}
          style={{ left: `${12 + active * 38}%` }}
        />
      </div>
      <div className={styles.heroVisualStages}>
        {stageMeta.map((s, i) => (
          <div
            key={s.key}
            className={`${styles.heroVisualStage}${active === i ? ` ${styles.heroVisualStageActive}` : ""}`}
          >
            <div
              className={`${styles.heroVisualPhone} ${
                s.key === "tofu"
                  ? styles.heroVisualPhoneTofu
                  : s.key === "mofu"
                    ? styles.heroVisualPhoneMofu
                    : styles.heroVisualPhoneBofu
              }`}
            >
              <span className={styles.heroVisualRec}>
                <span className={styles.heroVisualRecDot} />
                REC
              </span>
              <div className={styles.heroVisualScan} />
              <span className={styles.heroVisualPlay} aria-hidden>
                ▶
              </span>
            </div>
            <span className={styles.heroVisualTag}>{s.tag}</span>
            <span className={styles.heroVisualStageLbl}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className={styles.heroVisualTicker}>
        <span className={styles.heroVisualTickerTrack}>
          {stageMeta.map((s) => (
            <span key={s.key} className={styles.heroVisualTickerItem}>
              {s.tag} · 9:16 · AI Shoot
            </span>
          ))}
          {stageMeta.map((s) => (
            <span key={`${s.key}-dup`} className={styles.heroVisualTickerItem}>
              {s.tag} · 9:16 · AI Shoot
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
