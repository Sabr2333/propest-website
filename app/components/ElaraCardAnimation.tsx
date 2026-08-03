"use client";

import { useEffect, useState } from "react";
import { useLang } from "../context/LanguageContext";

const FRAME_MS = 520;
const PAUSE_END_MS = 2200;
const MAX_FRAME = 11;

type Bubble = {
  variant: "meta" | "user" | "elara" | "done" | "check" | "log";
  text: string;
};

export default function ElaraCardAnimation() {
  const { lang } = useLang();
  const isNl = lang === "nl";
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let frameIdx = 0;
    let tid: ReturnType<typeof setTimeout>;

    const loop = () => {
      if (cancelled) return;
      frameIdx += 1;
      if (frameIdx > MAX_FRAME) {
        frameIdx = 0;
        setFrame(0);
        tid = setTimeout(loop, PAUSE_END_MS);
        return;
      }
      setFrame(frameIdx);
      tid = setTimeout(loop, FRAME_MS);
    };

    tid = setTimeout(loop, FRAME_MS);
    return () => {
      cancelled = true;
      clearTimeout(tid);
    };
  }, []);

  const copy = {
    status: isNl ? "Elara · actief" : "Elara · active",
    liveLog: isNl ? "Live log" : "Live log",
    tasksToday: isNl ? "Taken vandaag" : "Tasks today",
    tasksSub: isNl ? "Zonder jouw tussenkomst" : "Without your input",
    activeSince: isNl ? "Actief" : "Active",
    activeSub: isNl ? "24/7" : "24/7",
    activeHint: isNl ? "Geen pauze" : "No pause",
  };

  const bubblesNl: Bubble[] = [
    { variant: "meta", text: "// WhatsApp — 02:14" },
    { variant: "user", text: "jij → Stuur offerte naar elara@propest.ai" },
    { variant: "check", text: "✓ Gmail geopend" },
    { variant: "check", text: "✓ Offerte template geladen" },
    { variant: "check", text: "✓ Klantdata ingevuld vanuit CRM" },
    { variant: "check", text: "✓ Mail verzonden" },
    {
      variant: "elara",
      text: 'Elara: "Klaar. Wil ik over 3 dagen een follow-up inplannen?"',
    },
    { variant: "user", text: "jij → Ja doe dat" },
    { variant: "check", text: "✓ Afspraak ingepland in agenda" },
    { variant: "done", text: "// Jij sliep. Zij werkte." },
    {
      variant: "log",
      text: isNl
        ? "⟳ Wacht op volgende opdracht via WhatsApp…"
        : "⟳ Waiting for next task via WhatsApp…",
    },
  ];

  const bubblesEn: Bubble[] = [
    { variant: "meta", text: "// WhatsApp — 02:14" },
    { variant: "user", text: "you → Send quote to elara@propest.ai" },
    { variant: "check", text: "✓ Gmail opened" },
    { variant: "check", text: "✓ Quote template loaded" },
    { variant: "check", text: "✓ Client data filled from CRM" },
    { variant: "check", text: "✓ Mail sent" },
    {
      variant: "elara",
      text: 'Elara: "Done. Should I schedule a follow-up in 3 days?"',
    },
    { variant: "user", text: "you → Yes do that" },
    { variant: "check", text: "✓ Meeting booked in calendar" },
    { variant: "done", text: "// You slept. She worked." },
    {
      variant: "log",
      text: "⟳ Waiting for next task via WhatsApp…",
    },
  ];

  const bubbles = isNl ? bubblesNl : bubblesEn;
  const visible = Math.min(frame, bubbles.length);

  return (
    <div className="service-img-placeholder service-img-elara">
      <div className="elara-anim-top">
        <div className="elara-anim-status">
          <span className="elara-anim-pulse" aria-hidden />
          <span>{copy.status}</span>
        </div>
        <span className="elara-anim-time">02:14</span>
      </div>

      <div className="elara-anim-body">
        <div className="elara-anim-chat" aria-hidden>
          {bubbles.slice(0, visible).map((b, i) => (
            <div
              key={`${b.variant}-${i}`}
              className={`elara-bubble elara-bubble-${b.variant}`}
            >
              {b.text}
            </div>
          ))}
        </div>

        <div className="elara-anim-side">
          <div className="elara-side-label">{copy.liveLog}</div>
          <ul className="elara-side-log">
            <li className={frame >= 3 ? "elara-log-on elara-log-in" : "elara-log-off"}>
              <span className="elara-log-t">08:02</span>
              <span>{isNl ? "✓ Mails gecategoriseerd" : "✓ Mails categorized"}</span>
            </li>
            <li className={frame >= 5 ? "elara-log-on elara-log-in" : "elara-log-off"}>
              <span className="elara-log-t">08:17</span>
              <span>{isNl ? "✓ Offerte verstuurd" : "✓ Quote sent"}</span>
            </li>
            <li className={frame >= 7 ? "elara-log-on elara-log-in" : "elara-log-off"}>
              <span className="elara-log-t">09:04</span>
              <span>{isNl ? "✓ Afspraak ingepland" : "✓ Meeting scheduled"}</span>
            </li>
            <li className={frame >= 9 ? "elara-log-on elara-log-in" : "elara-log-off"}>
              <span className="elara-log-t">{isNl ? "Nu" : "Now"}</span>
              <span className="elara-log-wait">
                {isNl ? "⟳ Live — klaar voor opdracht" : "⟳ Live — ready"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="elara-anim-stats">
        <div className="elara-stat">
          <span className="elara-stat-label">{copy.tasksToday}</span>
          <span className="elara-stat-num">47</span>
          <span className="elara-stat-sub">{copy.tasksSub}</span>
        </div>
        <div className="elara-stat elara-stat-accent">
          <span className="elara-stat-label">{copy.activeSince}</span>
          <span className="elara-stat-num">{copy.activeSub}</span>
          <span className="elara-stat-sub">{copy.activeHint}</span>
        </div>
      </div>
    </div>
  );
}
