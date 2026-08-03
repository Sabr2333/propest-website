"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { isChatbotHiddenPath } from "@/lib/chatbotVisibility";

function buildChatUrl() {
  if (typeof window === "undefined") return "/chat-assistant/widget.html";
  const apiBase = encodeURIComponent(window.location.origin);
  return `/chat-assistant/widget.html?apiBase=${apiBase}`;
}

export default function PropestChatbotWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [chatUrl, setChatUrl] = useState("/chat-assistant/widget.html");
  const [homepageLoaderActive, setHomepageLoaderActive] = useState(false);

  const hiddenByPath = isChatbotHiddenPath(pathname);
  const hidden = hiddenByPath || homepageLoaderActive;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setChatUrl(buildChatUrl());
  }, []);

  useEffect(() => {
    if (hiddenByPath) setOpen(false);
  }, [hiddenByPath]);

  useEffect(() => {
    const loader = document.querySelector(".loading-screen");
    if (!loader || loader.classList.contains("loading-screen--done")) {
      setHomepageLoaderActive(false);
      return;
    }

    setHomepageLoaderActive(true);

    const finish = () => {
      loader.classList.add("loading-screen--done");
      setHomepageLoaderActive(false);
    };

    const onAnimEnd = (e: Event) => {
      const ae = e as AnimationEvent;
      if (ae.animationName === "fadeOutLoader") finish();
    };

    loader.addEventListener("animationend", onAnimEnd);
    const fallback = window.setTimeout(finish, 2400);

    return () => {
      loader.removeEventListener("animationend", onAnimEnd);
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return;
      if (typeof window !== "undefined" && e.origin !== window.location.origin) return;
      if (e.data.type === "propest:close") close();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (hidden) return null;

  return (
    <>
      <div
        className={`propest-chatbot-fullpage${open ? " propest-chatbot-fullpage--open" : ""}`}
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        aria-label="Propest AI chat"
      >
        {open ? (
          <iframe
            src={chatUrl}
            title="Propest AI chat"
            allow="microphone; clipboard-write"
            className="propest-chatbot-frame"
          />
        ) : null}
      </div>

      <button
        type="button"
        className={`propest-chatbot-launcher${open ? " propest-chatbot-launcher--hidden" : ""}`}
        aria-label="Open Propest AI chat"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </>
  );
}
