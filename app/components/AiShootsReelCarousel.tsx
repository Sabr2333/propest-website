"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AI_SHOOTS_REELS, type AiShootsLang } from "../../lib/aiShootsCopy";
import { syncReelVideoPlayback } from "../../lib/playReelVideos";
import AiShootsReelVideo from "./AiShootsReelVideo";
import styles from "../diensten/ai-shoots/ai-shoots.module.css";

const PAGE_COUNT = 3;

function clampPage(page: number) {
  return Math.max(0, Math.min(PAGE_COUNT - 1, page));
}

function maxScrollLeft(track: HTMLElement) {
  return Math.max(0, track.scrollWidth - track.clientWidth);
}

/** Scrollpositie per pagina (0%, 50%, 100%) */
function scrollLeftForPage(track: HTMLElement, page: number) {
  const max = maxScrollLeft(track);
  if (PAGE_COUNT <= 1 || max === 0) return 0;
  return (clampPage(page) / (PAGE_COUNT - 1)) * max;
}

/** Huidige pagina afgeleid van scrollpositie */
function pageFromScrollLeft(track: HTMLElement) {
  const max = maxScrollLeft(track);
  if (max === 0) return 0;
  const ratio = track.scrollLeft / max;
  if (ratio < 0.33) return 0;
  if (ratio < 0.66) return 1;
  return 2;
}

function focusedReelFromScroll(track: HTMLElement) {
  const cards = track.querySelectorAll<HTMLElement>("[data-reel-index]");
  const center = track.scrollLeft + track.clientWidth / 2;
  let closest = 0;
  let minDist = Infinity;
  cards.forEach((el, i) => {
    const elCenter = el.offsetLeft + el.offsetWidth / 2;
    const dist = Math.abs(elCenter - center);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  });
  return closest;
}

type Props = {
  lang: AiShootsLang;
};

export default function AiShootsReelCarousel({ lang }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef(0);
  const programmaticScrollRef = useRef(false);
  const scrollSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activePage, setActivePage] = useState(0);
  const [focusedReel, setFocusedReel] = useState(0);

  const setPage = useCallback((page: number) => {
    const p = clampPage(page);
    activePageRef.current = p;
    setActivePage(p);
  }, []);

  const scrollToPage = useCallback(
    (page: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;
      const target = clampPage(page);
      setPage(target);

      programmaticScrollRef.current = true;
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

      track.scrollTo({
        left: scrollLeftForPage(track, target),
        behavior,
      });

      unlockTimerRef.current = setTimeout(() => {
        programmaticScrollRef.current = false;
        const synced = pageFromScrollLeft(track);
        setPage(synced);
        syncReelVideoPlayback(track);
      }, behavior === "smooth" ? 520 : 50);
    },
    [setPage]
  );

  const scrollByPage = useCallback(
    (direction: -1 | 1) => {
      scrollToPage(activePageRef.current + direction);
    },
    [scrollToPage]
  );

  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setFocusedReel(focusedReelFromScroll(track));
    syncReelVideoPlayback(track);

    if (programmaticScrollRef.current) return;

    if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current);
    scrollSyncTimerRef.current = setTimeout(() => {
      setPage(pageFromScrollLeft(track));
      syncReelVideoPlayback(track);
    }, 60);
  }, [setPage]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScrollEnd = () => {
      programmaticScrollRef.current = false;
      setFocusedReel(focusedReelFromScroll(track));
      setPage(pageFromScrollLeft(track));
      syncReelVideoPlayback(track);
    };

    track.addEventListener("scroll", syncFromScroll, { passive: true });
    track.addEventListener("scrollend", onScrollEnd);

    const bootPlayback = () => syncReelVideoPlayback(track);

    requestAnimationFrame(() => {
      setFocusedReel(focusedReelFromScroll(track));
      setPage(pageFromScrollLeft(track));
      bootPlayback();
    });

    const bootTimers = [150, 600, 1500, 3000].map((ms) =>
      window.setTimeout(bootPlayback, ms)
    );

    const onVis = () => {
      if (document.visibilityState === "visible") bootPlayback();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      bootTimers.forEach((id) => window.clearTimeout(id));
      track.removeEventListener("scroll", syncFromScroll);
      track.removeEventListener("scrollend", onScrollEnd);
      document.removeEventListener("visibilitychange", onVis);
      if (scrollSyncTimerRef.current) clearTimeout(scrollSyncTimerRef.current);
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, [syncFromScroll, setPage]);

  const reels = AI_SHOOTS_REELS.map((r) => ({
    ...r,
    title: lang === "nl" ? r.titleNl : r.titleEn,
    subtitle: lang === "nl" ? r.subtitleNl : r.subtitleEn,
    comingSoon: lang === "nl" ? r.comingSoonNl : r.comingSoonEn,
  }));

  return (
    <div className={styles.carouselWrap}>
      <div className={styles.carouselRow}>
        <button
          type="button"
          className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
          onClick={() => scrollByPage(-1)}
          disabled={activePage === 0}
          aria-label={lang === "nl" ? "Vorige pagina" : "Previous page"}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </button>

        <div ref={viewportRef} className={styles.carouselViewport}>
          <div
            ref={trackRef}
            className={styles.carouselTrack}
            role="region"
            aria-roledescription="carousel"
            aria-label={lang === "nl" ? "Concept video's" : "Concept videos"}
          >
            {reels.map((reel, index) => (
              <article
                key={reel.id}
                data-reel-index={index}
                className={`${styles.reelItem}${focusedReel === index ? ` ${styles.reelItemActive}` : ""}`}
              >
                <div className={styles.reelFrame}>
                  {reel.videoSrc ? (
                    <AiShootsReelVideo src={reel.videoSrc} priority={index === 0} />
                  ) : (
                    <div className={styles.reelPlaceholder} aria-hidden>
                      <span className={styles.reelPlaceholderIcon}>
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" />
                        </svg>
                      </span>
                    </div>
                  )}
                  {!reel.videoSrc ? (
                    <span className={styles.reelSoonBadge}>{reel.comingSoon}</span>
                  ) : null}
                  <span className={styles.reelFunnelBadge}>{reel.funnelLabel}</span>
                </div>
                <div className={styles.reelCaption}>
                  <p className={styles.reelCaptionTitle}>{reel.title}</p>
                  <p className={styles.reelCaptionSub}>{reel.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
          onClick={() => scrollByPage(1)}
          disabled={activePage === PAGE_COUNT - 1}
          aria-label={lang === "nl" ? "Volgende pagina" : "Next page"}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={styles.carouselDots} role="tablist" aria-label={lang === "nl" ? "Carousel pagina's" : "Carousel pages"}>
        {Array.from({ length: PAGE_COUNT }, (_, page) => (
          <button
            key={page}
            type="button"
            className={`${styles.carouselDotBtn}${activePage === page ? ` ${styles.carouselDotBtnActive}` : ""}`}
            onClick={() => {
              if (page === activePageRef.current) return;
              scrollToPage(page);
            }}
            aria-label={lang === "nl" ? `Pagina ${page + 1}` : `Page ${page + 1}`}
            aria-selected={activePage === page}
          />
        ))}
      </div>
    </div>
  );
}
