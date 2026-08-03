"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DienstNav from "../../components/DienstNav";
import DienstFooter from "../../components/DienstFooter";
import AiShootsReelCarousel from "../../components/AiShootsReelCarousel";
import AiShootsHeroVisual from "./AiShootsHeroVisual";
import { AI_SHOOTS_COPY } from "../../../lib/aiShootsCopy";
import { useLang } from "../../context/LanguageContext";
import styles from "./ai-shoots.module.css";

const SECTION_IDS = ["shift", "funnel", "deliver", "process", "why"] as const;

export default function AiShootsPage() {
  const { lang } = useLang();
  const c = AI_SHOOTS_COPY[lang];
  const [activeSection, setActiveSection] = useState<string>("shift");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-aishoots-reveal]");
    if (!nodes.length) return;

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            reveal.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((el) => reveal.observe(el));
    return () => reveal.disconnect();
  }, []);

  const funnelSummaries = [
    { tag: c.tofuTag, title: c.tofuTitle, points: c.tofuPoints },
    { tag: c.mofuTag, title: c.mofuTitle, points: c.mofuPoints },
    { tag: c.bofuTag, title: c.bofuTitle, points: c.bofuPoints },
  ];

  return (
    <>
      <DienstNav />
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroBlob} aria-hidden />
          <div className={styles.heroBlob2} aria-hidden />
          <div className={styles.heroInner}>
            <div className={styles.topBar}>
              <Link href="/" className={styles.back}>
                <span className={styles.backArrow} aria-hidden>
                  ←
                </span>
                {c.back}
              </Link>
              <span className={styles.topBarDot} aria-hidden />
              <span className={styles.topBarTitle}>{c.heroEyebrow}</span>
            </div>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1 className={styles.heroTitle}>
                  {c.heroTitle}
                  <span className={styles.heroAccent}>{c.heroTitleAccent}</span>
                </h1>
                <p className={styles.heroLead}>{c.heroLead}</p>
              </div>
              <AiShootsHeroVisual lang={lang} />
            </div>
            <div className={styles.stats}>
              <div className={`${styles.stat} ${styles.statAnim}`} style={{ animationDelay: "0.05s" }}>
                <span className={styles.statNum}>5M+</span>
                <span className={styles.statLbl}>{c.statViews}</span>
              </div>
              <div className={`${styles.stat} ${styles.statAnim}`} style={{ animationDelay: "0.15s" }}>
                <span className={styles.statNum}>8</span>
                <span className={styles.statLbl}>{c.statVideos}</span>
              </div>
              <div className={`${styles.stat} ${styles.statAnim}`} style={{ animationDelay: "0.25s" }}>
                <span className={styles.statNum}>±2 wk</span>
                <span className={styles.statLbl}>{c.statDelivery}</span>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label={lang === "nl" ? "Secties" : "Sections"}>
            {SECTION_IDS.map((id, i) => (
              <a
                key={id}
                href={`#${id}`}
                className={`${styles.sideLink}${activeSection === id ? ` ${styles.sideActive}` : ""}`}
              >
                {c.sidebar[i]}
              </a>
            ))}
          </aside>

          <div className={styles.main}>
            <section id="shift" className={styles.revealBlock} data-aishoots-reveal>
              <p className={styles.sectionLabel}>{c.shiftLabel}</p>
              <h2 className={styles.sectionTitle}>{c.shiftTitle}</h2>
              <p className={styles.shiftText}>{c.shiftP1}</p>
              <p className={styles.shiftText}>
                <strong>{c.shiftP2}</strong>
              </p>
            </section>

            <section id="funnel" className={`${styles.funnelSection} ${styles.revealBlock}`} data-aishoots-reveal>
              <p className={styles.sectionLabel}>{c.funnelLabel}</p>
              <h2 className={styles.sectionTitle}>{c.funnelTitle}</h2>
              <p className={styles.sectionLead}>{c.funnelLead}</p>

              <div className={`${styles.showcase} ${styles.revealBlock}`} data-aishoots-reveal>
                <p className={styles.showcaseItalic}>{c.showcaseItalic}</p>
                <h3 className={styles.showcaseTitle}>
                  {c.showcaseTitle}{" "}
                  <span className={styles.showcaseOutline}>{c.showcaseOutline}</span>
                </h3>
                <p className={styles.showcaseSub}>{c.showcaseSub}</p>
                <AiShootsReelCarousel lang={lang} />
                <div className={styles.showcaseCta}>
                  <p className={styles.showcaseCtaLead}>{c.showcaseCtaLead}</p>
                  <a href="#" className={`${styles.ctaBtn} open-contact-modal`}>
                    {c.showcaseCtaBtn}
                  </a>
                </div>
              </div>

              <div className={styles.funnelSummaryGrid}>
                {funnelSummaries.map((item, i) => (
                  <article
                    key={item.tag}
                    className={`${styles.funnelSummaryCard} ${styles.revealBlock}`}
                    data-aishoots-reveal
                    style={{ ["--reveal-delay" as string]: `${0.08 * i}s` }}
                  >
                    <p className={styles.funnelSummaryTag}>{item.tag}</p>
                    <h4>{item.title}</h4>
                    <ul>
                      {item.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section id="deliver" className={styles.revealBlock} data-aishoots-reveal>
              <p className={styles.sectionLabel}>{c.deliverLabel}</p>
              <h2 className={styles.sectionTitle}>{c.deliverTitle}</h2>
              <p className={styles.sectionLead}>{c.deliverLead}</p>
              <div className={styles.deliverGrid}>
                {c.deliverItems.map((item, i) => (
                  <div
                    key={item.n}
                    className={`${styles.deliverCard} ${styles.revealBlock}`}
                    data-aishoots-reveal
                    style={{ ["--reveal-delay" as string]: `${0.06 * i}s` }}
                  >
                    <span className={styles.deliverN}>{item.n}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="process" className={styles.revealBlock} data-aishoots-reveal>
              <p className={styles.sectionLabel}>{c.processLabel}</p>
              <h2 className={styles.sectionTitle}>{c.processTitle}</h2>
              <p className={styles.sectionLead}>{c.processLead}</p>
              <div className={styles.processRow}>
                {c.processSteps.map((step, i) => (
                  <div
                    key={step.n}
                    className={`${styles.processCard} ${styles.revealBlock}`}
                    data-aishoots-reveal
                    style={{ ["--reveal-delay" as string]: `${0.1 * i}s` }}
                  >
                    <div className={styles.processN}>{step.n}</div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="why" className={styles.revealBlock} data-aishoots-reveal>
              <p className={styles.sectionLabel}>{c.whyLabel}</p>
              <h2 className={styles.sectionTitle}>{c.whyTitle}</h2>
              <div className={styles.whyGrid}>
                {c.whyItems.map((item, i) => (
                  <div
                    key={item.title}
                    className={`${styles.whyCard} ${styles.revealBlock}`}
                    data-aishoots-reveal
                    style={{ ["--reveal-delay" as string]: `${0.07 * i}s` }}
                  >
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className={`${styles.cta} ${styles.revealBlock}`} data-aishoots-reveal>
              <h2>{c.ctaTitle}</h2>
              <p>{c.ctaLead}</p>
              <a href="#" className={`${styles.ctaBtn} open-contact-modal`}>
                {c.ctaBtn}
              </a>
            </section>
          </div>
        </div>
      </div>
      <DienstFooter />
    </>
  );
}
