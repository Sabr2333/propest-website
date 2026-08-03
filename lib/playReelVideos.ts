function reelVisibility(video: HTMLVideoElement) {
  const rect = video.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return 0;

  const w =
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
  const h =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  if (w <= 0 || h <= 0) return 0;

  const visibleArea = w * h;
  const totalArea = rect.width * rect.height;
  return visibleArea / totalArea;
}

function primeForIos(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
}

export function playReelVideo(video: HTMLVideoElement) {
  primeForIos(video);
  return video.play().catch(() => undefined);
}

/** Start/pause reel videos based on how much of each is visible (mobile-friendly). */
export function syncReelVideoPlayback(root: ParentNode | Document = document) {
  const videos = root.querySelectorAll<HTMLVideoElement>("video[data-reel-video]");

  videos.forEach((video) => {
    const ratio = reelVisibility(video);
    if (ratio >= 0.12) {
      void playReelVideo(video);
    } else {
      video.pause();
    }
  });
}
