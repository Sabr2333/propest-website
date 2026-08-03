"use client";

import { useCallback, useEffect, useRef } from "react";
import { playReelVideo } from "../../lib/playReelVideos";
import styles from "../diensten/ai-shoots/ai-shoots.module.css";

type Props = {
  src: string;
  /** Eerste reel: agressievere autoplay op mobiel */
  priority?: boolean;
};

export default function AiShootsReelVideo({ src, priority = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const armVideo = useCallback((video: HTMLVideoElement) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
  }, []);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    armVideo(video);

    const rect = wrap.getBoundingClientRect();
    const inView =
      rect.bottom > 0 &&
      rect.top < window.innerHeight &&
      rect.width > 0;

    if (inView) void playReelVideo(video);
  }, [armVideo]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    armVideo(video);
    if (priority) video.load();

    const onVisible = (visible: boolean) => {
      if (visible) tryPlay();
      else video.pause();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        onVisible(entry.isIntersecting && entry.intersectionRatio >= 0.05);
      },
      { root: null, threshold: [0, 0.05, 0.15, 0.35, 0.55] }
    );

    observer.observe(wrap);

    const onReady = () => tryPlay();
    video.addEventListener("canplay", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("loadedmetadata", onReady);

    const delays = priority
      ? [0, 120, 400, 900, 1800, 3200]
      : [0, 400, 1200];
    const timers = delays.map((ms) => window.setTimeout(tryPlay, ms));

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("loadedmetadata", onReady);
    };
  }, [src, priority, tryPlay, armVideo]);

  return (
    <div ref={wrapRef} className={styles.reelVideoWrap}>
      <video
        ref={(el) => {
          videoRef.current = el;
          if (el) armVideo(el);
        }}
        className={styles.reelVideo}
        src={src}
        data-reel-video
        data-reel-priority={priority ? "1" : undefined}
        playsInline
        muted
        loop
        autoPlay
        preload={priority ? "auto" : "metadata"}
        disablePictureInPicture
      />
    </div>
  );
}
