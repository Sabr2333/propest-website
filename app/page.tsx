"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ElaraCardAnimation from "./components/ElaraCardAnimation";
import HeroConfigurator from "./components/HeroConfigurator";
import { ELARA_PROMO_LIVE } from "./config/elaraPromo";
import { useLang } from "./context/LanguageContext";

export default function Home() {
  const [showCookie, setShowCookie] = useState(false);
  const [modalFaq, setModalFaq] = useState<number | null>(null);
  const { lang, setLang, t } = useLang();

  const handleCookie = (accepted: boolean) => {
    localStorage.setItem('cookie-consent', accepted ? 'accepted' : 'declined');
    sessionStorage.setItem('cookie-banner-shown', 'true');
    setShowCookie(false);
  };

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookie-consent');
    const bannerShown = sessionStorage.getItem('cookie-banner-shown');
    if (!consentGiven && !bannerShown) {
      setTimeout(() => setShowCookie(true), 1200);
      sessionStorage.setItem('cookie-banner-shown', 'true');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // --- HERO VIDEO AUTOPLAY FIX ---
    const heroVideo = document.getElementById('hero-video') as HTMLVideoElement;
    const heroCanvas = document.getElementById('hero-video-canvas') as HTMLCanvasElement;
    let videoAnimId: number;

    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.playsInline = true;
      heroVideo.setAttribute('autoplay', '');
      heroVideo.setAttribute('muted', '');
      heroVideo.setAttribute('loop', '');
      heroVideo.setAttribute('playsinline', '');

      if (window.innerWidth <= 768) {
        heroVideo.playbackRate = 1.25;
      }

      const attemptPlay = () => {
        heroVideo.play().catch(() => {});
      };
      attemptPlay();
      heroVideo.addEventListener('loadeddata', attemptPlay);
      heroVideo.addEventListener('canplay', attemptPlay);
      document.addEventListener('touchstart', attemptPlay, { once: true });
      document.addEventListener('click', attemptPlay, { once: true });
      document.addEventListener('scroll', attemptPlay, { once: true });

      // Retry autoplay every 500ms until playing
      const retryInterval = setInterval(() => {
        if (!heroVideo.paused) {
          clearInterval(retryInterval);
          return;
        }
        attemptPlay();
      }, 500);
      setTimeout(() => clearInterval(retryInterval), 10000);

      // On mobile: render video to canvas to avoid iOS native play button
      if (heroCanvas && window.innerWidth <= 768) {
        const ctx = heroCanvas.getContext('2d');
        const resizeCanvas = () => {
          const hero = heroCanvas.parentElement;
          if (hero) {
            heroCanvas.width = hero.offsetWidth;
            heroCanvas.height = hero.offsetHeight;
          }
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const drawFrame = () => {
          if (ctx && heroVideo.readyState >= 2) {
            const vw = heroVideo.videoWidth;
            const vh = heroVideo.videoHeight;
            const cw = heroCanvas.width;
            const ch = heroCanvas.height;
            const videoRatio = vw / vh;
            const canvasRatio = cw / ch;
            let sx = 0, sy = 0, sw = vw, sh = vh;
            if (videoRatio > canvasRatio) {
              sw = vh * canvasRatio;
              sx = (vw - sw) / 2;
            } else {
              sh = vw / canvasRatio;
              sy = (vh - sh) / 2;
            }
            ctx.drawImage(heroVideo, sx, sy, sw, sh, 0, 0, cw, ch);
          }
          videoAnimId = requestAnimationFrame(drawFrame);
        };
        drawFrame();
      }
    }

    // --- GRAIN / TV NOISE EFFECT ---
    const grainCanvas = document.getElementById('grain-canvas') as HTMLCanvasElement;
    const heroEl = document.querySelector('.hero') as HTMLElement;
    const grainCanvasDark = document.getElementById('grain-canvas-dark') as HTMLCanvasElement;
    const darkEl = document.querySelector('.section-dark') as HTMLElement;
    let grainAnimId: number;
    let grainAnimIdDark: number;

    if (grainCanvasDark && darkEl) {
      const gCtxDark = grainCanvasDark.getContext('2d');
      const grainResizeDark = () => {
        grainCanvasDark.width = darkEl.offsetWidth / 2;
        grainCanvasDark.height = darkEl.offsetHeight / 2;
      };
      grainResizeDark();
      window.addEventListener('resize', grainResizeDark);

      const drawGrainDark = () => {
        if (!gCtxDark) return;
        const w = grainCanvasDark.width;
        const h = grainCanvasDark.height;
        const imageData = gCtxDark.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 170;
        }
        gCtxDark.putImageData(imageData, 0, 0);
        grainAnimIdDark = requestAnimationFrame(drawGrainDark);
      };
      drawGrainDark();
    }

    if (grainCanvas && heroEl) {
      const gCtx = grainCanvas.getContext('2d');
      const grainResize = () => {
        grainCanvas.width = heroEl.offsetWidth / 2;
        grainCanvas.height = heroEl.offsetHeight / 2;
      };
      grainResize();
      window.addEventListener('resize', grainResize);

      const drawGrain = () => {
        if (!gCtx) return;
        const w = grainCanvas.width;
        const h = grainCanvas.height;
        const imageData = gCtx.createImageData(w, h);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 170;
        }
        gCtx.putImageData(imageData, 0, 0);
        grainAnimId = requestAnimationFrame(drawGrain);
      };
      drawGrain();
    }

    return () => {
      cancelAnimationFrame(grainAnimId);
      cancelAnimationFrame(grainAnimIdDark);
    };
  }, []);

  useEffect(() => {
    // --- TEXT SPLITTING + HACKER TYPE EFFECT ON LOAD ---
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const startHackerEffect = () => {
      const words = document.querySelectorAll(".hero h1 .word");

      words.forEach((word, wordIndex) => {
        const text = word.getAttribute("data-text") || (word.textContent || "").trim();
        word.innerHTML = "";
        text.split("").forEach((char) => {
          const span = document.createElement("span");
          span.classList.add("char");
          span.textContent = char;
          span.style.opacity = "0";
          word.appendChild(span);
        });

        // Hacker type-in effect per woord
        const chars = word.querySelectorAll(".char");
        const delay = wordIndex * 800;

        setTimeout(() => {
          let iter = 0;
          const interval = setInterval(() => {
            chars.forEach((charEl, i) => {
              const el = charEl as HTMLElement;
              if (i < iter) {
                el.textContent = text[i];
                el.style.opacity = "1";
              } else if (i < iter + 5) {
                el.textContent = alpha[Math.floor(Math.random() * 26)];
                el.style.opacity = "1";
              }
            });
            if (iter >= text.length) clearInterval(interval);
            iter += 1 / 3;
          }, 30);
        }, delay);
      });
    };

    // Start na 1500ms zodat loading screen klaar is
    setTimeout(startHackerEffect, 1500);


    // --- TESTIMONIAL SLIDER ---
    const testimonialSlides = document.querySelectorAll('.result-testimonial-slide');
    const testimonialSlider = document.querySelector('.result-testimonial-slider') as HTMLElement | null;
    let currentSlide = 0;
    let testimonialInterval: ReturnType<typeof setInterval> | null = null;

    const syncTestimonialHeight = () => {
      if (!testimonialSlider || testimonialSlides.length === 0) return;

      let maxHeight = 0;
      testimonialSlides.forEach((slide) => {
        const slideEl = slide as HTMLElement;
        const isActive = slideEl.classList.contains('active');

        if (!isActive) {
          slideEl.style.position = 'relative';
          slideEl.style.visibility = 'hidden';
          slideEl.style.opacity = '1';
          slideEl.style.pointerEvents = 'none';
        }

        maxHeight = Math.max(maxHeight, slideEl.offsetHeight);

        if (!isActive) {
          slideEl.style.position = '';
          slideEl.style.visibility = '';
          slideEl.style.opacity = '';
          slideEl.style.pointerEvents = '';
        }
      });

      if (maxHeight > 0) {
        testimonialSlider.style.minHeight = `${maxHeight}px`;
      }
    };

    requestAnimationFrame(syncTestimonialHeight);
    window.addEventListener('resize', syncTestimonialHeight);

    if (testimonialSlides.length > 1) {
      testimonialInterval = setInterval(() => {
        testimonialSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        testimonialSlides[currentSlide].classList.add('active');
      }, 5000);
    }

    // --- MAGNET & CURSOR ---
    const cursor = document.getElementById("cursor");
    const magneticElements = document.querySelectorAll(".magnetic");

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    function lerp(start: number, end: number, factor: number) {
      return start + (end - start) * factor;
    }

    let cursorRaf: number;
    function animateCursor() {
      cursorX = lerp(cursorX, mouseX, 0.15);
      cursorY = lerp(cursorY, mouseY, 0.15);
      if (cursor) {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      }
      cursorRaf = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const magnetHandlers: Array<{
      el: Element;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];

    magneticElements.forEach((el) => {
      const moveHandler = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = 0.5;
        const moveX = (e.clientX - centerX) * dist;
        const moveY = (e.clientY - centerY) * dist;
        (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        cursor?.classList.add("magnet");
      };
      const leaveHandler = () => {
        (el as HTMLElement).style.transform = "translate(0, 0)";
        cursor?.classList.remove("magnet");
      };
      el.addEventListener("mousemove", moveHandler as EventListener);
      el.addEventListener("mouseleave", leaveHandler);
      magnetHandlers.push({ el, move: moveHandler, leave: leaveHandler });
    });

    // --- NAVBAR STATE & 3D TILT ---
    const nav = document.querySelector(".brutal-nav") as HTMLElement | null;
    let isScrolled = false;

    const onScroll = () => {
      if (window.scrollY > 100) {
        if (!isScrolled && nav) {
          nav.classList.add("scrolled");
          isScrolled = true;
        }
      } else {
        if (isScrolled && nav) {
          nav.classList.remove("scrolled");
          nav.style.transform = "";
          isScrolled = false;
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    const onDocMouseMove = (e: MouseEvent) => {
      if (!isScrolled || !nav) return;
      const cx = window.innerWidth / 2;
      const cy = 100;
      const rx = (e.clientY - cy) * 0.02;
      const ry = (e.clientX - cx) * 0.02;
      const clamp = (num: number, min: number, max: number) =>
        Math.min(Math.max(num, min), max);
      nav.style.transform = `translateX(-50%) perspective(1000px) rotateX(${-clamp(rx, -10, 10)}deg) rotateY(${clamp(ry, -10, 10)}deg)`;
    };
    document.addEventListener("mousemove", onDocMouseMove);

    // --- SCROLL VELOCITY SKEW ---
    const content = document.getElementById("scroll-content");
    let skew = 0;
    let lastScrollTop = 0;
    let scrollRaf: number;

    function scrollLoop() {
      const scrollTop = window.scrollY;
      const velocity = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;
      const maxSkew = 0;
      const speed = Math.min(Math.max(velocity * 0.1, -maxSkew), maxSkew);
      skew = lerp(skew, speed, 0.1);
      if (content) {
        content.style.transform = `skewY(0deg)`;
      }
      scrollRaf = requestAnimationFrame(scrollLoop);
    }
    scrollLoop();

    // --- HACKER TEXT ---
    const hackerLinks = document.querySelectorAll("[data-text]");
    const intervals = new Map<Element, ReturnType<typeof setInterval>>();

    // Hacker effect op nav-links
    hackerLinks.forEach((link) => {
      const el = link as HTMLElement;
      if (el.classList.contains("word")) return; // skip hero words
      const enterHandler = () => {
        let iter = 0;
        const original = el.dataset.text || "";
        if (intervals.has(el)) clearInterval(intervals.get(el)!);
        const interval = setInterval(() => {
          el.textContent = original
            .split("")
            .map((l, i) => {
              if (i < iter) return original[i];
              return alpha[Math.floor(Math.random() * 26)];
            })
            .join("");
          if (iter >= original.length) clearInterval(interval);
          iter += 1 / 3;
        }, 30);
        intervals.set(el, interval);
      };
      const leaveHandler = () => {
        if (intervals.has(el)) clearInterval(intervals.get(el)!);
        el.textContent = el.dataset.text || "";
      };
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

    // Pak alle hero words
    const heroWords = document.querySelectorAll(".hero h1 .word");
    
    heroWords.forEach((link) => {
      const el = link as HTMLElement;
      const enterHandler = () => {
        // Trigger hacker effect op ALLE woorden
        heroWords.forEach((word) => {
          const wordEl = word as HTMLElement;
          let iter = 0;
          const original = wordEl.dataset.text || "";
          if (intervals.has(wordEl)) clearInterval(intervals.get(wordEl)!);

          // Bereken snelheid zodat alle woorden tegelijk klaar zijn
          const maxLength = Math.max(...Array.from(heroWords).map(w => (w as HTMLElement).dataset.text?.length || 0));
          const wordLength = original.length;
          const speedFactor = wordLength / maxLength; // kortere woorden typen langzamer
          
          const interval = setInterval(() => {
            wordEl.textContent = original
              .split("")
              .map((l, i) => {
                if (i < iter) return original[i];
                return alpha[Math.floor(Math.random() * 26)];
              })
              .join("");
            
            // Behoud de groene kleur tijdens hacker text
            wordEl.style.color = 'var(--accent)';
            wordEl.style.webkitTextStroke = '0px';
            
            if (iter >= original.length) clearInterval(interval);
            iter += (1 / 3) * speedFactor; // pas snelheid aan
          }, 30);
          intervals.set(wordEl, interval);
        });
      };
      const leaveHandler = () => {
        // Reset ALLE woorden
        heroWords.forEach((word) => {
          const wordEl = word as HTMLElement;
          if (intervals.has(wordEl)) clearInterval(intervals.get(wordEl)!);
          wordEl.textContent = wordEl.dataset.text || "";
          // Houd dezelfde gevulde stijl als de hover-state
          wordEl.style.color = 'var(--accent)';
          wordEl.style.webkitTextStroke = '0px';
        });
      };
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

    // --- DASHBOARD HOVER: balkjes + counter animatie ---
    const dashCard = document.querySelector('.service-card-bedrijf-dashboard');
    const dashStats = document.querySelectorAll('.dash-stat');
    const chartBars = document.querySelectorAll('.chart-bar');
    let counterIntervals: NodeJS.Timeout[] = [];

    let dashTimeout: NodeJS.Timeout | null = null;

    const animateDashboard = () => {
      counterIntervals.forEach(i => clearInterval(i));
      counterIntervals = [];
      if (dashTimeout) clearTimeout(dashTimeout);
      // Eerst naar 0 ZONDER transitie
      chartBars.forEach((bar) => {
        const el = bar as HTMLElement;
        el.style.transition = 'none';
        el.style.height = '0%';
      });
      dashStats.forEach((stat) => {
        (stat as HTMLElement).textContent = '0';
      });
      // Dan na een delay de transitie terugzetten en omhoog animeren
      dashTimeout = setTimeout(() => {
        chartBars.forEach((bar, i) => {
          const el = bar as HTMLElement;
          el.style.transition = `height 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`;
          el.style.height = (el.dataset.height || '0') + '%';
        });
        dashStats.forEach((stat) => {
          const el = stat as HTMLElement;
          const target = parseInt(el.dataset.target || '0');
          let current = 0;
          const step = Math.ceil(target / 50);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current.toLocaleString('nl-NL');
          }, 30);
          counterIntervals.push(interval);
        });
      }, 100);
    };

    const resetDashboard = () => {
      counterIntervals.forEach(i => clearInterval(i));
      counterIntervals = [];
      if (dashTimeout) clearTimeout(dashTimeout);
      // Terug naar standaard waarden
      chartBars.forEach((bar) => {
        const el = bar as HTMLElement;
        el.style.height = (el.dataset.height || '0') + '%';
      });
      const defaults = ['4.236', '24.904'];
      dashStats.forEach((stat, i) => {
        (stat as HTMLElement).textContent = defaults[i] || '0';
      });
    };

    // --- AI-CRM CARD ---
    const crmCard = document.querySelector('.service-card-gradient');
    const crmSvgContainer = crmCard?.querySelector('.service-img-ai');

    const animateCrm = () => {
      if (!crmSvgContainer) return;
      const svg = crmSvgContainer.querySelector('.connection-lines');
      if (!svg) return;
      const clone = svg.cloneNode(true) as SVGElement;
      svg.remove();
      void (crmSvgContainer as HTMLElement).offsetWidth;
      crmSvgContainer.insertBefore(clone, crmSvgContainer.querySelector('.ai-icon-box'));
    };

    // --- AGENT CARD ---
    const agentCard = document.querySelector('.service-card-dark');
    const agentFlow = document.querySelector('.agent-flow');

    const animateAgent = () => {
      if (!agentFlow) return;
      agentFlow.classList.remove('agent-flow-visible');
      void (agentFlow as HTMLElement).offsetWidth;
      agentFlow.classList.add('agent-flow-visible');
    };

    agentFlow?.classList.add('agent-flow-visible');

    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

    if (isMobileDevice) {
      // Op mobiel: IntersectionObserver voor scroll-triggered animaties
      const mobileObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === dashCard) animateDashboard();
            if (entry.target === crmCard) animateCrm();
            if (entry.target === agentCard) animateAgent();
          }
        });
      }, { threshold: 0.4 });

      if (dashCard) mobileObserver.observe(dashCard);
      if (crmCard) mobileObserver.observe(crmCard);
      if (agentCard) mobileObserver.observe(agentCard);
    } else {
      // Op desktop: hover events
      if (dashCard) {
        dashCard.addEventListener('mouseenter', animateDashboard);
        dashCard.addEventListener('mouseleave', resetDashboard);
      }
      if (crmCard) {
        crmCard.addEventListener('mouseenter', animateCrm);
      }
      if (agentCard) {
        agentCard.addEventListener('mouseenter', animateAgent);
      }
    }

    // --- PROCESS CARDS ---
    const processSteps = document.querySelector('.process-steps');

    // --- STATS COUNT-UP ANIMATIE ---
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');

    const animateStats = () => {
      statNumbers.forEach((el) => {
        const target = parseInt((el as HTMLElement).dataset.count || '0');
        const suffix = (el as HTMLElement).dataset.suffix || '';
        let current = 0;
        const duration = 800;
        const steps = 40;
        const increment = target / steps;
        const stepTime = duration / steps;
        const divide = parseInt((el as HTMLElement).dataset.divide || '0');
        el.textContent = '0';
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          if (divide) {
            el.textContent = (current / divide).toFixed(1) + suffix;
          } else {
            el.textContent = Math.round(current).toLocaleString('nl-NL') + suffix;
          }
        }, stepTime);
      });
    };

    const statsGrid = document.querySelector('.stats-grid');

    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
          }
        });
      }, { threshold: 0.3 });
      statsObserver.observe(statsSection);
    }
    let statsAnimating = false;
    const onStatsHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.stats-section') && !statsAnimating) {
        statsAnimating = true;
        animateStats();
        setTimeout(() => { statsAnimating = false; }, 900);
      }
    };
    document.addEventListener('mouseover', onStatsHover);

    // --- DIENSTEN DROPDOWN ---
    setTimeout(() => {
      const dienstenWrapper = document.querySelector('.nav-diensten-wrapper');
      const dienstenToggle = document.querySelector('.nav-diensten-toggle');
      if (dienstenToggle && dienstenWrapper) {
        dienstenToggle.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          dienstenWrapper.classList.toggle('dropdown-open');
        });
      }
      document.addEventListener('click', function(e) {
        if (dienstenWrapper && !dienstenWrapper.contains(e.target as Node)) {
          dienstenWrapper.classList.remove('dropdown-open');
        }
      });
    }, 100);

    // --- FAQ TOGGLE ---
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        item?.classList.toggle('active');
      });
    });

    // --- CONTACT MODAL ---
    const contactModal = document.getElementById('contact-modal');
    const openModalBtns = document.querySelectorAll('.open-contact-modal, #open-contact-modal');
    const closeModal = document.getElementById('close-contact-modal');

    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal?.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeModal?.addEventListener('click', () => {
      contactModal?.classList.remove('active');
      document.body.style.overflow = '';
    });

    contactModal?.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // --- FORM SUBMIT -> WHATSAPP ---
    const allForms = document.querySelectorAll('form');
    allForms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input, select, textarea');
        let message = 'Hoi, ik wil graag contact opnemen!\n\n';
        inputs.forEach((input) => {
          const el = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
          if (el.value && el.value !== '') {
            const label = (el as HTMLInputElement).placeholder || el.tagName;
            message += `${label}: ${el.value}\n`;
          }
        });
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/31686081324?text=${encoded}`, '_blank');
      });
    });


    // --- MOBILE ANIMATION CARD ---
    const addMobileAnimationCard = () => {
      const processSteps = document.querySelector('.process-steps');
      const existingCard = document.querySelector('.process-animation-card-mobile');
      
      if (window.innerWidth <= 768 && processSteps && !existingCard) {
        const animationCard = document.createElement('div');
        animationCard.className = 'process-card process-animation-card-mobile';
        animationCard.innerHTML = `
          <div class="modern-process-container">
            <div class="progress-circle">
              <svg viewBox="0 0 100 100" class="progress-svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f0f0f0" stroke-width="2"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#F9F867" stroke-width="3" 
                        stroke-dasharray="283" stroke-dashoffset="70" 
                        class="progress-ring" transform="rotate(-90 50 50)"/>
              </svg>
              <div class="progress-center">
                <div class="progress-percentage">75%</div>
                <div class="progress-label">COMPLETE</div>
              </div>
            </div>
            <div class="process-steps-modern">
              <div class="step-modern completed">
                <div class="step-icon-modern">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
                <div class="step-text">
                  <div class="step-title">${t('process.animation.step1.title')}</div>
                  <div class="step-status">${t('process.animation.step1.status')}</div>
                </div>
              </div>
              <div class="step-modern completed">
                <div class="step-icon-modern">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
                <div class="step-text">
                  <div class="step-title">${t('process.animation.step2.title')}</div>
                  <div class="step-status">${t('process.animation.step2.status')}</div>
                </div>
              </div>
              <div class="step-modern active">
                <div class="step-icon-modern pulse">
                  <div class="spinner"></div>
                </div>
                <div class="step-text">
                  <div class="step-title">${t('process.animation.step3.title')}</div>
                  <div class="step-status">${t('process.animation.step3.status')}</div>
                </div>
              </div>
              <div class="step-modern pending">
                <div class="step-icon-modern">
                  <div class="step-number">4</div>
                </div>
                <div class="step-text">
                  <div class="step-title">${t('process.animation.step4.title')}</div>
                  <div class="step-status">${t('process.animation.step4.status')}</div>
                </div>
              </div>
            </div>
            <div class="modern-particles">
              <div class="particle-modern type-1"></div>
              <div class="particle-modern type-2"></div>
              <div class="particle-modern type-3"></div>
              <div class="particle-modern type-4"></div>
            </div>
          </div>
        `;
        processSteps.appendChild(animationCard);
      } else if (window.innerWidth > 768 && existingCard) {
        existingCard.remove();
      }
    };

    // Initial check
    setTimeout(addMobileAnimationCard, 500);
    
    // Check on resize
    window.addEventListener('resize', addMobileAnimationCard);

    // --- DIENSTEN SIDEBAR ---
    setTimeout(() => {
      const sidebarOverlay = document.getElementById('diensten-sidebar');
      const sidebarOpenBtn = document.querySelector('.all-services-link');
      const sidebarCloseBtn = sidebarOverlay?.querySelector('.diensten-sidebar-close');
      const openSidebar = (e: Event) => {
        e.preventDefault();
        sidebarOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      const closeSidebar = () => {
        sidebarOverlay?.classList.remove('active');
        document.body.style.overflow = '';
      };

      sidebarOpenBtn?.addEventListener('click', openSidebar);
      sidebarCloseBtn?.addEventListener('click', closeSidebar);
      sidebarOverlay?.addEventListener('click', (e) => {
        if (e.target === sidebarOverlay) closeSidebar();
      });
    }, 150);

    // --- SIDEBAR HOVER ANIMATIES ---
    setTimeout(() => {
      const sidebarOverlay = document.getElementById('diensten-sidebar');
      if (!sidebarOverlay) return;
      
      let sidebarCounterIntervals: NodeJS.Timeout[] = [];

      // Dashboard card hover (alleen als eerste item een dashboard-preview heeft)
      const sidebarDashItem = sidebarOverlay.querySelector('.diensten-sidebar-item:nth-child(1)');

      const animateSidebarDash = () => {
        const stats = sidebarDashItem?.querySelectorAll('.sidebar-dash-stat');
        const bars = sidebarDashItem?.querySelectorAll('.chart-bar');
        if (!stats?.length || !bars?.length) return;
        sidebarCounterIntervals.forEach(i => clearInterval(i));
        sidebarCounterIntervals = [];
        bars.forEach((bar) => {
          const el = bar as HTMLElement;
          el.style.transition = 'none';
          el.style.height = '0%';
        });
        stats.forEach((statEl, index: number) => {
          const stat = statEl as HTMLElement;
          const target = parseInt(stat.dataset.target || '0');
          let current = 0;
          const step = Math.ceil(target / 50);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            stat.textContent = current.toLocaleString('nl-NL');
          }, 30);
          sidebarCounterIntervals.push(interval);
        });
      };

      sidebarDashItem?.addEventListener('mouseenter', animateSidebarDash);

      // AI-CRM card hover - restart SVG animaties
      const sidebarCrmItem = sidebarOverlay.querySelector('.diensten-sidebar-item:nth-child(2)');
      sidebarCrmItem?.addEventListener('mouseenter', () => {
        const svg = sidebarCrmItem.querySelector('.connection-lines');
        if (svg) {
          const clone = svg.cloneNode(true) as SVGElement;
          svg.parentNode?.replaceChild(clone, svg);
        }
      });

      // AI-Agents card hover - restart SVG animaties
      const sidebarAgentItem = sidebarOverlay.querySelector('.diensten-sidebar-item:nth-child(3)');
      sidebarAgentItem?.addEventListener('mouseenter', () => {
        const svg = sidebarAgentItem.querySelector('.agent-flow-lines');
        if (svg) {
          const clone = svg.cloneNode(true) as SVGElement;
          svg.parentNode?.replaceChild(clone, svg);
        }
      });

      // Applicatie & Website ontwikkeling card hover - scale bounce
      const sidebarPhoneItem = sidebarOverlay.querySelector('.diensten-sidebar-item:nth-child(4)');
      sidebarPhoneItem?.addEventListener('mouseenter', () => {
        const phone = sidebarPhoneItem.querySelector('.phone-mock') as HTMLElement;
        if (phone) {
          phone.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
          phone.style.transform = 'scale(0.55)';
          setTimeout(() => { phone.style.transform = 'scale(0.6)'; }, 400);
        }
      });
    }, 200);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onDocMouseMove);
      cancelAnimationFrame(cursorRaf);
      cancelAnimationFrame(scrollRaf);
      magnetHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move as EventListener);
        el.removeEventListener("mouseleave", leave);
      });
      intervals.forEach((interval) => clearInterval(interval));
      if (testimonialInterval) clearInterval(testimonialInterval);
      window.removeEventListener('resize', syncTestimonialHeight);
      if (dashCard) {
        dashCard.removeEventListener('mouseenter', animateDashboard);
        dashCard.removeEventListener('mouseleave', resetDashboard);
      }
      counterIntervals.forEach(i => clearInterval(i));
      if (crmCard) {
        crmCard.removeEventListener('mouseenter', animateCrm);
      }
      if (agentCard) {
        agentCard.removeEventListener('mouseenter', animateAgent);
      }
    };
  }, []);

  return (
    <>
      <div className="loading-screen">
        <div className="loading-logo">
          <Image src="/logo_nieuw-removebg-preview.png" alt="Propest AI" width={160} height={45} style={{ objectFit: "contain" }} />
        </div>
      </div>

      <div id="cursor"></div>

<div className="contact-modal-overlay" id="contact-modal">
<div className="contact-modal">
<button className="contact-modal-close" id="close-contact-modal">&times;</button>
<div className="contact-modal-left">
<h3>{t('contact.title')}</h3>
<form>
<div className="form-field">
<input type="text" placeholder={t('contact.name')} required />
</div>
<div className="form-field">
<input type="email" placeholder={t('contact.email')} required />
</div>
<div className="form-field">
<input type="tel" placeholder={t('contact.phone')} required />
</div>
<div className="form-field">
<input type="text" placeholder={t('contact.company')} required />
</div>
<div className="form-field">
<select defaultValue="" className="form-select">
<option value="" disabled>{t('contact.service')}</option>
{ELARA_PROMO_LIVE ? <option value="elara">{t('diensten.elara')}</option> : null}
<option value="bedrijfsautomatisering">{t('diensten.bedrijfsautomatisering')}</option>
<option value="ai-crm">{t('diensten.ai-crm')}</option>
<option value="ai-agents">{t('diensten.ai-agents')}</option>
<option value="app-web-ontwikkeling">{t('diensten.app-web-ontwikkeling')}</option>
<option value="systeemverbetering">{t('diensten.systeemverbetering')}</option>
<option value="rpa-ai-automatisering">{t('diensten.rpa-ai-automatisering')}</option>
<option value="gpt-op-maat">{t('diensten.gpt-op-maat')}</option>
<option value="webbots">{t('diensten.webbots')}</option>
</select>
</div>
<button type="submit" className="form-submit">{t('contact.submit')}</button>
</form>
</div>
<div className="contact-modal-right">
<h3 className="faq-title">{t('contact.faq.title')}</h3>
<div className={`faq-item${modalFaq === 0 ? ' active' : ''}`}>
<button className="faq-question" onClick={() => setModalFaq(prev => prev === 0 ? null : 0)}>{t('contact.modal.faq.q1')}<span className="faq-icon">+</span></button>
<div className="faq-answer"><p>{t('contact.modal.faq.a1')}</p></div>
</div>
<div className={`faq-item${modalFaq === 1 ? ' active' : ''}`}>
<button className="faq-question" onClick={() => setModalFaq(prev => prev === 1 ? null : 1)}>{t('contact.modal.faq.q2')}<span className="faq-icon">+</span></button>
<div className="faq-answer"><p>{t('contact.modal.faq.a2')}</p></div>
</div>
<div className={`faq-item${modalFaq === 2 ? ' active' : ''}`}>
<button className="faq-question" onClick={() => setModalFaq(prev => prev === 2 ? null : 2)}>{t('contact.modal.faq.q3')}<span className="faq-icon">+</span></button>
<div className="faq-answer"><p>{t('contact.modal.faq.a3')}</p></div>
</div>
</div>
</div>
</div>

<nav className="brutal-nav">
<a href="#" className="nav-logo magnetic" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
<Image src="/logo_nieuw-removebg-preview.png" alt="Propest AI logo" width={160} height={45} style={{ objectFit: "contain" }} />
</a>
<ul className="nav-menu">
<li>
<a href="#" className="nav-link magnetic" data-text={t('nav.home')}>
{t('nav.home')}
</a>
</li>
<li className="nav-diensten-wrapper">
<span className="nav-link nav-diensten-toggle nav-diensten-link" role="button" tabIndex={0}>
{t('nav.diensten')} <svg className="nav-diensten-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
</span>
<div className="nav-diensten-dropdown">
<a href="/diensten/ai-shoots" className="nav-dienst-link">{t('diensten.ai-shoots')}</a>
<a href="/diensten/bedrijfsautomatisering" className="nav-dienst-link">{t('diensten.bedrijfsautomatisering')}</a>
<a href="/diensten/ai-crm" className="nav-dienst-link">{t('diensten.ai-crm')}</a>
<a href="/diensten/ai-agents" className="nav-dienst-link">{t('diensten.ai-agents')}</a>
<a href="/diensten/app-web-ontwikkeling" className="nav-dienst-link">{t('diensten.app-web-ontwikkeling')}</a>
<a href="/diensten/systeemverbetering" className="nav-dienst-link">{t('diensten.systeemverbetering')}</a>
<a href="/diensten/rpa-ai-automatisering" className="nav-dienst-link">{t('diensten.rpa-ai-automatisering')}</a>
<a href="/diensten/gpt-op-maat" className="nav-dienst-link">{t('diensten.gpt-op-maat')}</a>
<a href="/diensten/webbots" className="nav-dienst-link">{t('diensten.webbots')}</a>
</div>
</li>
<li>
<a href="#about" className="nav-link magnetic" data-text={t('nav.about')}>
{t('nav.about')}
</a>
</li>
{ELARA_PROMO_LIVE ? (
<li>
<a href="/elara.html" className="nav-link magnetic nav-link-elara" data-text={t('nav.elara')}>
{t('nav.elara')}
</a>
</li>
) : null}
<li>
<a href="/contact" className="nav-link magnetic" data-text={t('nav.contact')}>
{t('nav.contact')}
</a>
</li>
</ul>
<a href="https://configurator.propest.ai/" className="cta-btn magnetic" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
<span>{t('nav.cta')}</span>
</a>
</nav>

      <div className="noise"></div>
      <div id="scroll-content">
        <section className="hero hero--bold">
          <div className="hero-bg-layer" aria-hidden>
            <video className="hero-bg-video" autoPlay muted loop playsInline preload="auto" id="hero-video">
              <source src="/type.mp4" type="video/mp4" />
            </video>
            <canvas id="hero-video-canvas" className="hero-bg-canvas"></canvas>
            <canvas id="grain-canvas" className="hero-grain"></canvas>
            <div className="hero-bg-shade" />
          </div>
          <div className="hero-bold-accent" aria-hidden />

          <div className="hero-bold-stack">
            <div className="hero-title-container">
              <h1>
                <div className="word" data-text={t("hero.title1")}>{t("hero.title1")}</div>
                <br />
                <div className="word" data-text={t("hero.title2")}>{t("hero.title2")}</div>
              </h1>
              <div className="hero-hacker-line" data-text={lang === "en" ? "CUSTOM AI" : "MAATWERK AI"}>
                {lang === "en" ? "CUSTOM AI" : "MAATWERK AI"}
              </div>
            </div>
            <p className="hero-bold-lead">{t("hero.lead")}</p>
            <div className="hero-bold-action">
              <HeroConfigurator />
            </div>
          </div>

          <div className="location-badge">
            <div className="location-text">
              <span>Located</span>
              <span>in the</span>
              <span>Netherlands</span>
            </div>
            <div className="globe-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
              </svg>
            </div>
          </div>

          <div className="hero-tagline">
            <div className="scroll-indicator">
              <span>{t("hero.tagline")}</span>
              <span>↓</span>
            </div>
            <a href={ELARA_PROMO_LIVE ? "/elara.html" : "/diensten/bedrijfsautomatisering"} className="service-link">{ELARA_PROMO_LIVE ? t("hero.service1") : t("diensten.bedrijfsautomatisering")}</a>
            <a href="#diensten" className="service-link">{t("hero.service2")}</a>
            <a href="#diensten" className="service-link">{t("hero.service3")}</a>
            <a href="#diensten" className="service-link">{t("hero.service4")}</a>
            <a href="#diensten" className="service-link">{t("hero.service5")}</a>
            <a href="#diensten" className="service-link">{t("hero.service6")}</a>
            <a href="#diensten" className="service-link">{t("hero.service7")}</a>
            <a href="#diensten" className="service-link">{t("hero.service8")}</a>
          </div>
        </section>

        <section className="section-dark">
          <canvas id="grain-canvas-dark" className="hero-grain"></canvas>
          <p className="big-text">
            <span>{t('big.line1')}</span> {t('big.in')} <span>{t('big.line2')}</span>.
            <br />
            {t('big.een')}{" "}
            <span>{t('big.jong')}</span> {t('big.van')}{" "}
            <span className="big-text-muted big-text-keep">{t('big.developers')}</span>
            <br />
            {t('big.line4')} <span>{t('big.slimme')}</span>.
            {t('big.line5')}
          </p>
          <div className="section-dark-marquee" aria-label="Partner logos">
            <div className="section-dark-marquee-track">
              <div className="section-dark-marquee-group" aria-hidden="false">
                <Image src="/logo_1-removebg-preview.png" alt="Partner logo 1" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-square" />
                <Image src="/logo_2-removebg-preview.png" alt="Partner logo 2" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/logo_3-removebg-preview.png" alt="Partner logo 3" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/Hogeschool_Rotterdam-removebg-preview.png" alt="Hogeschool Rotterdam" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-hr section-dark-marquee-img-square" />
                <Image src="/logo_4-removebg-preview.png" alt="Partner logo 4" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/WhatsApp_Image_2026-03-17_at_19.26.50-removebg-preview.png" alt="Poké Vibe" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-square" />
              </div>
              <div className="section-dark-marquee-group" aria-hidden="true">
                <Image src="/logo_1-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-square" />
                <Image src="/logo_2-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/logo_3-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/Hogeschool_Rotterdam-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-hr section-dark-marquee-img-square" />
                <Image src="/logo_4-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/WhatsApp_Image_2026-03-17_at_19.26.50-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-square" />
              </div>
              <div className="section-dark-marquee-group" aria-hidden="true">
                <Image src="/logo_1-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-square" />
                <Image src="/logo_2-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/logo_3-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/Hogeschool_Rotterdam-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-hr section-dark-marquee-img-square" />
                <Image src="/logo_4-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/WhatsApp_Image_2026-03-17_at_19.26.50-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-square" />
              </div>
              <div className="section-dark-marquee-group" aria-hidden="true">
                <Image src="/logo_1-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-square" />
                <Image src="/logo_2-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/logo_3-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/Hogeschool_Rotterdam-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-hr section-dark-marquee-img-square" />
                <Image src="/logo_4-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img" />
                <Image src="/WhatsApp_Image_2026-03-17_at_19.26.50-removebg-preview.png" alt="" width={180} height={60} className="section-dark-marquee-img section-dark-marquee-img-square" />
              </div>
            </div>
          </div>
        </section>

        <section className="services-section" id="diensten">
          <div className="services-header">
            <span className="services-title">{t('diensten.title')}</span>
            <a href="#" className="all-services-link" data-text={t('diensten.all')}>{t('diensten.all')}</a>
          </div>
          <div className="services-grid">
            {ELARA_PROMO_LIVE ? (
            <div className="service-card service-card-elara">
              <div className="service-card-content">
                <h3 className="service-card-title-elara">
                  <span className="service-card-title-elara-name">{t('diensten.elara')}</span>
                  <span className="elara-new-badge">{t('diensten.elara.new')}</span>
                </h3>
                <p>{t('diensten.elara.desc')}</p>
                <a href="/elara.html" className="service-btn">{t('service.meer-info')}</a>
              </div>
              <div className="service-card-image">
                <ElaraCardAnimation />
              </div>
            </div>
            ) : (
            <div className="service-card service-card-bedrijf-dashboard">
              <div className="service-card-content">
                <h3>{t('diensten.bedrijfsautomatisering')}</h3>
                <p>{t('diensten.bedrijfsautomatisering.desc')}</p>
                <a href="/diensten/bedrijfsautomatisering" className="service-btn">{t('service.meer-info')}</a>
              </div>
              <div className="service-card-image">
                <div className="service-img-placeholder service-img-dashboard">
                  <div className="dashboard-mock">
                    <div className="dashboard-sidebar">
                      <div className="dash-dot"></div>
                      <div className="dash-line"></div>
                      <div className="dash-line"></div>
                      <div className="dash-line"></div>
                      <div className="dash-line"></div>
                      <div className="dash-line"></div>
                    </div>
                    <div className="dashboard-main">
                      <div className="dash-header">Dashboard</div>
                      <div className="dash-stats">
                        <div className="dash-stat" data-target="4236">4.236</div>
                        <div className="dash-stat" data-target="24904">24.904</div>
                      </div>
                      <div className="dash-chart">
                        <div className="chart-bar" data-height="60" style={{ height: "60%" }}></div>
                        <div className="chart-bar" data-height="80" style={{ height: "80%" }}></div>
                        <div className="chart-bar" data-height="45" style={{ height: "45%" }}></div>
                        <div className="chart-bar" data-height="90" style={{ height: "90%" }}></div>
                        <div className="chart-bar" data-height="70" style={{ height: "70%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            <div className="service-card service-card-gradient">
              <div className="service-card-content">
                <h3>{t('diensten.ai-crm')}</h3>
                <p>{t('diensten.ai-crm.desc')}</p>
                <a href="/diensten/ai-crm" className="service-btn">{t('service.meer-info')}</a>
              </div>
              <div className="service-card-image">
                <div className="service-img-placeholder service-img-ai">
                  <svg className="connection-lines" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Lijn links boven naar midden */}
                    <path d="M0 40 H80 V140 H130" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-1" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M0,40 L80,40 L80,140 L130,140" />
                    </circle>
                    {/* Lijn links onder naar midden */}
                    <path d="M0 240 H60 V140 H130" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-2" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M0,240 L60,240 L60,140 L130,140" />
                    </circle>
                    {/* Lijn rechts boven naar midden */}
                    <path d="M400 60 H320 V140 H270" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-3" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="3.5s" repeatCount="indefinite" path="M400,60 L320,60 L320,140 L270,140" />
                    </circle>
                    {/* Lijn rechts onder naar midden */}
                    <path d="M400 220 H340 V140 H270" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-4" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="4.5s" repeatCount="indefinite" path="M400,220 L340,220 L340,140 L270,140" />
                    </circle>
                    {/* Lijn boven midden naar beneden */}
                    <path d="M200 0 V90" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-5" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="2.5s" repeatCount="indefinite" path="M200,0 L200,90" />
                    </circle>
                    {/* Lijn onder midden naar boven */}
                    <path d="M200 280 V190" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-6" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M200,280 L200,190" />
                    </circle>
                  </svg>
                  <div className="ai-icon-box">AI</div>
                </div>
              </div>
            </div>
          </div>

          <div className="services-grid services-grid-row2">
            <div className="service-card service-card-dark">
              <div className="service-card-content">
                <h3>{t('diensten.ai-agents')}</h3>
                <p>{t('diensten.ai-agents.desc')}</p>
                <a href="/diensten/ai-agents" className="service-btn">{t('service.meer-info')}</a>
              </div>
              <div className="service-card-image">
                <div className="service-img-placeholder service-img-agent">
                  <div className="agent-flow agent-flow-visible">
                    <div className="agent-flow-text">
                      <span className="agent-flow-sub">{t('ai-agents.animation.sub')}</span>
                      <span className="agent-flow-title">{t('ai-agents.animation.title')}</span>
                    </div>
                    <div className="agent-flow-visual">
                      {/* Linker iconen */}
                      <div className="agent-flow-icons">
                        <div className="agent-flow-icon agent-icon-purple">
                          <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="1.5"/><line x1="8" y1="9" x2="16" y2="9" stroke="white" strokeWidth="1.2"/><line x1="8" y1="12" x2="14" y2="12" stroke="white" strokeWidth="1.2"/><line x1="8" y1="15" x2="12" y2="15" stroke="white" strokeWidth="1.2"/></svg>
                        </div>
                        <div className="agent-flow-icon agent-icon-blue">
                          <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="13" width="3" height="6" rx="1" fill="white"/><rect x="10.5" y="9" width="3" height="10" rx="1" fill="white"/><rect x="16" y="5" width="3" height="14" rx="1" fill="white"/></svg>
                        </div>
                        <div className="agent-flow-icon agent-icon-red">
                          <svg viewBox="0 0 24 24" fill="none"><path d="M4 8C4 6.9 4.9 6 6 6H18C19.1 6 20 6.9 20 8V10H4V8Z" fill="white" opacity="0.7"/><rect x="4" y="10" width="16" height="8" rx="0" fill="white"/><rect x="9" y="12" width="6" height="4" rx="1" fill="rgba(0,0,0,0.2)"/></svg>
                        </div>
                      </div>
                      {/* SVG curved lijnen */}
                      <svg className="agent-flow-lines" viewBox="0 0 200 180" fill="none">
                        {/* Lijn van icon 1 (paars) */}
                        <path d="M0 30 C60 30, 80 90, 140 90" stroke="#c77dff" strokeWidth="1.5" fill="none" />
                        <circle r="3" fill="#c77dff">
                          <animateMotion dur="2.5s" repeatCount="indefinite" path="M0,30 C60,30 80,90 140,90" />
                          <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        {/* Lijn van icon 2 (blauw) */}
                        <path d="M0 90 C50 90, 90 90, 140 90" stroke="#4a90e2" strokeWidth="1.5" fill="none" />
                        <circle r="3" fill="#4a90e2">
                          <animateMotion dur="2s" repeatCount="indefinite" path="M0,90 C50,90 90,90 140,90" />
                          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        {/* Lijn van icon 3 (rood) */}
                        <path d="M0 150 C60 150, 80 90, 140 90" stroke="#ff6b6b" strokeWidth="1.5" fill="none" />
                        <circle r="3" fill="#ff6b6b">
                          <animateMotion dur="3s" repeatCount="indefinite" path="M0,150 C60,150 80,90 140,90" />
                          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                        </circle>
                        {/* Dots op de lijnen */}
                        <circle cx="70" cy="60" r="3" fill="rgba(199,125,255,0.4)" />
                        <circle cx="90" cy="90" r="3" fill="rgba(74,144,226,0.4)" />
                        <circle cx="70" cy="120" r="3" fill="rgba(255,107,107,0.4)" />
                      </svg>
                      {/* Rechter app window */}
                      <div className="agent-flow-window">
                        <div className="agent-window-bar">
                          <span className="agent-dot-red"></span>
                          <span className="agent-dot-yellow"></span>
                          <span className="agent-dot-green"></span>
                        </div>
                        <div className="agent-window-body">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect x="6" y="10" width="12" height="20" rx="2" fill="#4a90e2"/>
                            <rect x="22" y="10" width="12" height="20" rx="2" fill="#6ea8fe" opacity="0.6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-card service-card-blue">
              <div className="service-card-content">
                <h3>{t('diensten.app-web-ontwikkeling')}</h3>
                <p>{t('diensten.app-web-ontwikkeling.desc')}</p>
                <div className="service-card-btns">
                  <a href="/diensten/app-web-ontwikkeling" className="service-btn">{t('service.meer-info')}</a>
                  <a href="https://app.propest.ai/" target="_blank" rel="noopener noreferrer" className="service-btn service-btn-configurator">
                    <span>{lang === 'en' ? 'App configurator' : 'App configurator'}</span>
                    <span className="service-btn-new-pill">{lang === 'en' ? 'New' : 'Nieuw'}</span>
                  </a>
                </div>
              </div>
              <div className="service-card-image">
                <div className="service-img-placeholder service-img-phone">
                  <div className="phone-mock">
                    <div className="phone-screen">
                      <div className="phone-header"></div>
                      <div className="phone-content"></div>
                      <div className="phone-btn-mock"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="services-grid services-grid-row3">
            <div className="service-card service-card-gradient">
              <div className="service-card-content">
                <h3>{t('diensten.rpa-ai-automatisering')}</h3>
                <p>{t('diensten.rpa-ai-automatisering.desc')}</p>
                <a href="/diensten/rpa-ai-automatisering" className="service-btn">{t('service.meer-info')}</a>
              </div>
              <div className="service-card-image">
                <div className="service-img-placeholder service-img-upgrade">
                  <svg className="upgrade-anim" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Oud systeem blok links */}
                    <rect x="30" y="100" width="100" height="80" rx="10" stroke="rgba(180,180,180,0.5)" strokeWidth="2" fill="rgba(180,180,180,0.08)" />
                    <text x="80" y="145" textAnchor="middle" fill="rgba(120,120,120,0.6)" fontSize="11" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Legacy</text>
                    {/* Pijl van oud naar nieuw */}
                    <path d="M140 140 H200" stroke="rgba(180,180,180,0.5)" strokeWidth="2" strokeDasharray="6 4">
                      <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <polygon points="200,134 212,140 200,146" fill="rgba(120,120,120,0.5)">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                    </polygon>
                    {/* Tandwiel animatie midden */}
                    <g transform="translate(230, 140)">
                      <circle r="18" stroke="rgba(120,120,120,0.3)" strokeWidth="2" fill="none">
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                      </circle>
                      <circle r="6" fill="rgba(120,120,120,0.2)" />
                      {/* Tandwiel tanden */}
                      <rect x="-3" y="-22" width="6" height="8" rx="1" fill="rgba(120,120,120,0.3)">
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                      </rect>
                      <rect x="-3" y="14" width="6" height="8" rx="1" fill="rgba(120,120,120,0.3)">
                        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                      </rect>
                    </g>
                    {/* Nieuw systeem blok rechts */}
                    <rect x="270" y="100" width="100" height="80" rx="10" stroke="rgba(100,200,150,0.5)" strokeWidth="2" fill="rgba(100,200,150,0.08)">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <text x="320" y="145" textAnchor="middle" fill="rgba(80,180,130,0.7)" fontSize="11" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Upgraded</text>
                    {/* Stijgende grafiek in nieuw blok */}
                    <polyline points="285,165 300,155 315,160 330,148 345,135 355,125" stroke="rgba(80,180,130,0.6)" strokeWidth="2" fill="none">
                      <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                    </polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="service-card service-card-dark">
              <div className="service-card-content">
                <h3>{t('diensten.webbots')}</h3>
                <p>{t('diensten.webbots.desc')}</p>
                <a href="/diensten/webbots" className="service-btn service-btn-light">{t('service.meer-info')}</a>
              </div>
              <div className="service-card-image">
                <div className="service-img-placeholder service-img-webbot">
                  <svg className="webbot-anim" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="60" y="40" width="280" height="180" rx="12" stroke="rgba(180,180,180,0.4)" strokeWidth="2" fill="rgba(180,180,180,0.05)" />
                    <rect x="60" y="40" width="280" height="30" rx="12" fill="rgba(180,180,180,0.1)" />
                    <circle cx="82" cy="55" r="5" fill="rgba(255,100,100,0.5)" />
                    <circle cx="98" cy="55" r="5" fill="rgba(255,200,50,0.5)" />
                    <circle cx="114" cy="55" r="5" fill="rgba(100,200,100,0.5)" />
                    <rect x="130" y="48" width="180" height="14" rx="7" fill="rgba(180,180,180,0.15)" />
                    <rect x="90" y="90" width="220" height="10" rx="3" fill="rgba(120,120,120,0.15)">
                      <animate attributeName="width" values="0;220" dur="1.5s" repeatCount="indefinite" />
                    </rect>
                    <rect x="90" y="115" width="180" height="10" rx="3" fill="rgba(120,120,120,0.1)">
                      <animate attributeName="width" values="0;180" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <rect x="90" y="140" width="200" height="10" rx="3" fill="rgba(120,120,120,0.12)">
                      <animate attributeName="width" values="0;200" dur="1.8s" repeatCount="indefinite" />
                    </rect>
                    <rect x="90" y="170" width="60" height="30" rx="6" fill="rgba(120,120,120,0.08)" />
                    <rect x="160" y="170" width="60" height="30" rx="6" fill="rgba(120,120,120,0.08)" />
                    <rect x="230" y="170" width="60" height="30" rx="6" fill="rgba(120,120,120,0.08)" />
                    <g>
                      <circle r="8" fill="rgba(249,248,103,0.8)">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M100,95 L280,95 L280,120 L200,120 L200,145 L260,145 L260,185 L120,185" />
                      </circle>
                      <circle r="3" fill="rgba(26,26,26,0.9)">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M100,95 L280,95 L280,120 L200,120 L200,145 L260,145 L260,185 L120,185" />
                      </circle>
                    </g>
                    <line x1="340" y1="100" x2="380" y2="80" stroke="rgba(249,248,103,0.4)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </line>
                    <line x1="340" y1="130" x2="380" y2="130" stroke="rgba(249,248,103,0.4)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </line>
                    <line x1="340" y1="160" x2="380" y2="180" stroke="rgba(249,248,103,0.4)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </line>
                    <rect x="380" y="72" width="15" height="16" rx="3" fill="rgba(249,248,103,0.2)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </rect>
                    <rect x="380" y="122" width="15" height="16" rx="3" fill="rgba(249,248,103,0.2)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </rect>
                    <rect x="380" y="172" width="15" height="16" rx="3" fill="rgba(249,248,103,0.2)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </rect>
                    <circle cx="200" cy="250" r="14" fill="rgba(120,120,120,0.1)" stroke="rgba(120,120,120,0.3)" strokeWidth="1.5">
                      <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="200" y="254" textAnchor="middle" fill="rgba(120,120,120,0.5)" fontSize="10" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>BOT</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section">
          <div className="process-header">
            <div className="process-header-text">
              <div className="process-badge">
                <span className="process-badge-icon"><svg viewBox="0 0 24 24" fill="#fff" width="14" height="14"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
                <span>{t('process.badge')}</span>
              </div>
              <h2 className="process-title">{t('process.title')}</h2>
              <p className="process-subtitle">{t('process.subtitle')}</p>
              <a href="https://www.propest.ai/vragenlijst?utm_source=facebook&utm_medium=cpc&utm_campaign=lead_ads&utm_content=ad1" className="process-cta">{t('process.cta')} <span className="process-cta-dot"></span></a>
            </div>
            <div className="process-header-img">
              <Image src="/freepit.jpg" alt="AI Process" width={500} height={400} style={{ borderRadius: '20px', objectFit: 'cover', width: '100%', height: 'auto' }} />
            </div>
          </div>
          <div className="process-steps">
            <div className="process-card">
              <div className="process-card-top">
                <div className="process-dots">
                  <span className="pdot filled"></span>
                  <span className="pdot"></span>
                  <span className="pdot"></span>
                  <span className="pdot"></span>
                </div>
                <span className="process-num">01</span>
              </div>
              <h3>{t('process.step1.title')}</h3>
              <p>{t('process.step1.desc')}</p>
              <div className="process-time">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span>{t('process.step1.time')}</span>
              </div>
            </div>
            <div className="process-card">
              <div className="process-card-top">
                <div className="process-dots">
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                  <span className="pdot"></span>
                  <span className="pdot"></span>
                </div>
                <span className="process-num">02</span>
              </div>
              <h3>{t('process.step2.title')}</h3>
              <p>{t('process.step2.desc')}</p>
              <div className="process-time">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span>{t('process.step2.time')}</span>
              </div>
            </div>
            <div className="process-card">
              <div className="process-card-top">
                <div className="process-dots">
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                  <span className="pdot"></span>
                </div>
                <span className="process-num">03</span>
              </div>
              <h3>{t('process.step3.title')}</h3>
              <p>{t('process.step3.desc')}</p>
              <div className="process-time">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span>{t('process.step3.time')}</span>
              </div>
            </div>
            <div className="process-card">
              <div className="process-card-top">
                <div className="process-dots">
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                  <span className="pdot"></span>
                </div>
                <span className="process-num">04</span>
              </div>
              <h3>{t('process.step4.title')}</h3>
              <p>{t('process.step4.desc')}</p>
              <div className="process-time">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span>{t('process.step4.time')}</span>
              </div>
            </div>
            <div className="process-card">
              <div className="process-card-top">
                <div className="process-dots">
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                  <span className="pdot filled"></span>
                </div>
                <span className="process-num">05</span>
              </div>
              <h3>{t('process.step5.title')}</h3>
              <p>{t('process.step5.desc')}</p>
              <div className="process-time">
                <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <span>{t('process.step5.time')}</span>
              </div>
            </div>
                                  </div>
        </section>

        <section className="about-section" id="about">
          <h2 className="about-title">{t('about.title')}</h2>
          <div className="about-content">
            <div className="about-left">
              <div className="about-badge">
                <span className="about-badge-icon"><svg viewBox="0 0 24 24" fill="#fff" width="14" height="14"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
                <span>{t('about.badge')}</span>
              </div>
            </div>
            <div className="about-center">
              <p>{t('about.text')}</p>
            </div>
            <div className="about-right">
              <div className="about-partner-header">
                <span className="about-partner-a">A</span>
                <h3 className="about-partner-title">{t('about.partner.title')}</h3>
              </div>
              <p className="about-partner-text">{t('about.partner.text')}</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number" data-count="170" data-suffix="+">0</span>
              <span className="stat-label">{t('stats.time.label')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-count="30" data-suffix="+">0</span>
              <span className="stat-label">{t('stats.specialists.label')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-count="600" data-suffix="%">0</span>
              <span className="stat-label">{t('stats.growth.label')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-count="48" data-suffix="/5" data-divide="10">0</span>
              <span className="stat-label">{t('stats.satisfaction.label')}</span>
            </div>
          </div>
        </section>

        <section className="result-section">
          <div className="result-layout">
            <div className="result-photo">
              <Image src="/lol.jpg" alt="Team Propest" width={500} height={700} className="result-photo-img" />
            </div>
            <div className="result-right">
              <p className="result-intro">{t('result.intro')}</p>
              <p className="result-quote-author">{t('result.author')}</p>
              <a href="https://www.propest.ai/vragenlijst?utm_source=facebook&utm_medium=cpc&utm_campaign=lead_ads&utm_content=ad1" className="result-cta">{t('result.cta')} <span className="result-cta-dot"></span></a>
              <div className="result-stats-grid">
                <div className="result-stat-card">
                  <span className="result-stat-number">25+</span>
                  <span className="result-stat-label-num">01</span>
                </div>
                <div className="result-stat-card">
                  <span className="result-stat-number">100%</span>
                  <span className="result-stat-label-num">02</span>
                </div>
                <div className="result-stat-card">
                  <p className="result-stat-desc">{t('result.stat1')}</p>
                </div>
                <div className="result-stat-card">
                  <p className="result-stat-desc">{t('result.stat2')}</p>
                </div>
                <div className="result-stat-card result-stat-bottom">
                  <p className="result-stat-desc">{t('result.stat3')}</p>
                </div>
                <div className="result-stat-card result-stat-bottom result-logos">
                  <div className="result-orbit-visual" aria-hidden="true">
                    <div className="orbit-ring orbit-ring-1"></div>
                    <div className="orbit-ring orbit-ring-2"></div>
                    <div className="orbit-glow"></div>
                    <div className="orbit-center">
                      <span className="orbit-center-text">AI</span>
                      <div className="orbit-center-pulse"></div>
                    </div>
                    <div className="orbit-track orbit-track-1">
                      <div className="orbit-satellite orbit-sat-1">
                        <span>Data</span>
                      </div>
                    </div>
                    <div className="orbit-track orbit-track-2">
                      <div className="orbit-satellite orbit-sat-2">
                        <span>CRM</span>
                      </div>
                    </div>
                    <div className="orbit-track orbit-track-3">
                      <div className="orbit-satellite orbit-sat-3">
                        <span>Ops</span>
                      </div>
                    </div>
                    <div className="orbit-track orbit-track-4">
                      <div className="orbit-satellite orbit-sat-4">
                        <span>API</span>
                      </div>
                    </div>
                    <div className="orbit-particle orbit-particle-1"></div>
                    <div className="orbit-particle orbit-particle-2"></div>
                    <div className="orbit-particle orbit-particle-3"></div>
                    <div className="orbit-particle orbit-particle-4"></div>
                    <div className="orbit-particle orbit-particle-5"></div>
                    <div className="orbit-particle orbit-particle-6"></div>
                  </div>
                </div>
              </div>
              <div className="result-testimonial-slider">
                <div className="result-testimonial result-testimonial-slide active">
                  <div className="result-testimonial-avatar">
                    <Image src="/r1.jpg" alt="Klant" width={60} height={60} className="result-testimonial-img" />
                  </div>
                  <div className="result-testimonial-content">
                    <span className="result-testimonial-stars">★★★★★</span>
                    <h3 className="result-testimonial-quote">{t('testimonial1.quote')}</h3>
                    <p className="result-testimonial-text">{t('testimonial1.text')}</p>
                  </div>
                </div>
                <div className="result-testimonial result-testimonial-slide">
                  <div className="result-testimonial-avatar">
                    <Image src="/r2.jpg" alt="Klant" width={60} height={60} className="result-testimonial-img" />
                  </div>
                  <div className="result-testimonial-content">
                    <span className="result-testimonial-stars">★★★★★</span>
                    <h3 className="result-testimonial-quote">{t('testimonial2.quote')}</h3>
                    <p className="result-testimonial-text">{t('testimonial2.text')}</p>
                  </div>
                </div>
                <div className="result-testimonial result-testimonial-slide">
                  <div className="result-testimonial-avatar">
                    <Image src="/r3.webp" alt="Klant" width={60} height={60} className="result-testimonial-img" />
                  </div>
                  <div className="result-testimonial-content">
                    <span className="result-testimonial-stars">★★★★★</span>
                    <h3 className="result-testimonial-quote">{t('testimonial3.quote')}</h3>
                    <p className="result-testimonial-text">{t('testimonial3.text')}</p>
                  </div>
                </div>
                <div className="result-testimonial result-testimonial-slide">
                  <div className="result-testimonial-avatar">
                    <Image src="/r4.png" alt="Klant" width={60} height={60} className="result-testimonial-img" />
                  </div>
                  <div className="result-testimonial-content">
                    <span className="result-testimonial-stars">★★★★★</span>
                    <h3 className="result-testimonial-quote">{t('testimonial4.quote')}</h3>
                    <p className="result-testimonial-text">{t('testimonial4.text')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-layout">
            <div className="contact-float">
              <div className="contact-overlay"></div>
              <div className="contact-content">
                <div className="contact-form-card">
                  <h3>{t('contact.title')}</h3>
                  <form>
                    <div className="form-field">
                      <input type="text" placeholder={t('contact.name')} required />
                    </div>
                    <div className="form-field">
                      <input type="email" placeholder={t('contact.email')} required />
                    </div>
                    <div className="form-field">
                      <input type="tel" placeholder={t('contact.phone')} required />
                    </div>
                    <div className="form-field">
                      <input type="text" placeholder={t('contact.company')} required />
                    </div>
                    <div className="form-field">
                      <select defaultValue="" className="form-select">
                        <option value="" disabled>{t('contact.service')}</option>
                        {ELARA_PROMO_LIVE ? <option value="elara">{t('diensten.elara')}</option> : null}
                        <option value="bedrijfsautomatisering">{t('diensten.bedrijfsautomatisering')}</option>
                        <option value="ai-crm">{t('diensten.ai-crm')}</option>
                        <option value="ai-agents">{t('diensten.ai-agents')}</option>
                        <option value="app-web-ontwikkeling">{t('diensten.app-web-ontwikkeling')}</option>
                        <option value="systeemverbetering">{t('diensten.systeemverbetering')}</option>
                        <option value="rpa-ai-automatisering">{t('diensten.rpa-ai-automatisering')}</option>
                        <option value="gpt-op-maat">{t('diensten.gpt-op-maat')}</option>
                        <option value="webbots">{t('diensten.webbots')}</option>
                      </select>
                    </div>
                    <button type="submit" className="form-submit">{t('contact.submit')}</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="contact-faq">
              <h3 className="faq-title">{t('contact.faq.title')}</h3>
              <div className="faq-item">
                <button className="faq-question">{t('contact.faq.q1')}<span className="faq-icon">+</span></button>
                <div className="faq-answer"><p dangerouslySetInnerHTML={{ __html: t('contact.faq.a1') }}></p></div>
              </div>
              <div className="faq-item">
                <button className="faq-question">{t('contact.faq.q2')}<span className="faq-icon">+</span></button>
                <div className="faq-answer"><p dangerouslySetInnerHTML={{ __html: t('contact.faq.a2') }}></p></div>
              </div>
              <div className="faq-item">
                <button className="faq-question">{t('contact.faq.q3')}<span className="faq-icon">+</span></button>
                <div className="faq-answer"><p dangerouslySetInnerHTML={{ __html: t('contact.faq.a3') }}></p></div>
              </div>
              <div className="faq-item">
                <button className="faq-question">{t('contact.faq.q4')}<span className="faq-icon">+</span></button>
                <div className="faq-answer"><p dangerouslySetInnerHTML={{ __html: t('contact.faq.a4') }}></p></div>
              </div>
              <div className="faq-item">
                <button className="faq-question">{t('contact.faq.q5')}<span className="faq-icon">+</span></button>
                <div className="faq-answer"><p dangerouslySetInnerHTML={{ __html: t('contact.faq.a5') }}></p></div>
              </div>
              <div className="faq-item">
                <button className="faq-question">{t('contact.faq.q6')}<span className="faq-icon">+</span></button>
                <div className="faq-answer"><p dangerouslySetInnerHTML={{ __html: t('contact.faq.a6') }}></p></div>
              </div>
              <div className="faq-item">
                <button className="faq-question">{t('contact.faq.q7')}<span className="faq-icon">+</span></button>
                <div className="faq-answer"><p dangerouslySetInnerHTML={{ __html: t('contact.faq.a7') }}></p></div>
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer home-footer">
          <div className="footer-float">
            <div className="footer-top">
              <div className="footer-col">
                <h4>Propest AI</h4>
                <p>Deltazijde 2 B2</p>
                <p>1261 ZM Blaricum</p>
                <p>{lang === 'en' ? 'The Netherlands' : 'Nederland'}</p>
              </div>
              <div className="footer-col">
                <h4>{lang === 'en' ? 'Contact' : 'Contact'}</h4>
                <p>info@propest.ai</p>
                <p><a href="tel:+31686081324">+31 6 86081324</a></p>
                <p>{lang === 'en' ? 'Available daily from 08:00 to 18:00' : 'Iedere dag bereikbaar van 08:00 t/m 18:00'}</p>
              </div>
              <div className="footer-col">
                <h4>{lang === 'en' ? 'Services' : 'Diensten'}</h4>
                {ELARA_PROMO_LIVE ? (
                <a href="/elara.html">{t('footer.elara')}</a>
                ) : (
                <a href="/diensten/bedrijfsautomatisering">{t('footer.bedrijfsautomatisering')}</a>
                )}
                <a href="/diensten/ai-crm">{t('diensten.ai-crm')}</a>
                <a href="/diensten/ai-agents">{t('diensten.ai-agents')}</a>
                <a href="/diensten/app-web-ontwikkeling">{t('diensten.app-web-ontwikkeling')}</a>
                <a href="/diensten/systeemverbetering">{t('diensten.systeemverbetering')}</a>
                <a href="/diensten/rpa-ai-automatisering">{t('diensten.rpa-ai-automatisering')}</a>
                <a href="/diensten/gpt-op-maat">{t('diensten.gpt-op-maat')}</a>
                <a href="/diensten/webbots">{t('diensten.webbots')}</a>
              </div>
              <div className="footer-col">
                <h4>{lang === 'en' ? 'Expertise' : 'Expertise'}</h4>
                <a href="https://wa.me/31686081324?text=Hoi%2C%20ik%20heb%20interesse%20in%20B2B%20SaaS" target="_blank" rel="noopener noreferrer">B2B SaaS</a>
                <a href="https://wa.me/31686081324?text=Hoi%2C%20ik%20heb%20interesse%20in%20B2B%20Service" target="_blank" rel="noopener noreferrer">B2B Service</a>
                <a href="https://wa.me/31686081324?text=Hoi%2C%20ik%20heb%20interesse%20in%20B2B%20Hardware" target="_blank" rel="noopener noreferrer">B2B Hardware</a>
              </div>
              <div className="footer-col">
                <h4>{lang === 'en' ? 'Company' : 'Bedrijf'}</h4>
                <a href="#about">{lang === 'en' ? 'About Us' : 'Over ons'}</a>
                <a href="https://wa.me/31686081324?text=Hoi%2C%20ik%20heb%20interesse%20in%20Careers" target="_blank" rel="noopener noreferrer">Careers</a>
                <a href="https://wa.me/31686081324?text=Hoi%2C%20ik%20wil%20graag%20contact%20opnemen" target="_blank" rel="noopener noreferrer">Contact</a>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-bottom-left">
                <span>© 2026 Propest AI</span>
                <a href="#">{lang === 'en' ? 'Privacy Policy' : 'Privacybeleid'}</a>
                <a href="#">{lang === 'en' ? 'Terms and Conditions' : 'Algemene voorwaarden'}</a>
              </div>
              <div className="footer-bottom-right">
                <a href="https://www.instagram.com/propest.ai/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/propest-ai/?originalSubdomain=nl" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/><path d="M8 11v5M8 8v.01M12 16v-5c0-1 .6-2 2-2s2 1 2 2v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>

        
      </div>

      {/* Diensten Sidebar */}
      <div className="diensten-sidebar-overlay" id="diensten-sidebar">
        <div className="diensten-sidebar">
          <div className="diensten-sidebar-header">
            <h3>{lang === 'en' ? 'All services' : 'Alle diensten'}</h3>
            <button className="diensten-sidebar-close">✕</button>
          </div>
          <div className="diensten-sidebar-list">
            {ELARA_PROMO_LIVE ? (
            <a href="/elara.html" className="diensten-sidebar-item diensten-sidebar-item-elara">
              <span className="diensten-sidebar-name diensten-sidebar-name-row">
                <span className="diensten-sidebar-name-title">{t('diensten.elara')}</span>
                <span className="diensten-sidebar-new-pill">{t('diensten.elara.new')}</span>
              </span>
              <div className="diensten-sidebar-card-wrapper diensten-sidebar-card-wrapper-elara">
              <div className="diensten-sidebar-card diensten-sidebar-card-elara">
                <div className="sidebar-elara-preview" aria-hidden>
                  <div className="sidebar-elara-preview-top">
                    <span className="sidebar-elara-preview-pulse" />
                    <span className="sidebar-elara-preview-status">{lang === 'en' ? 'Elara · active' : 'Elara · actief'}</span>
                    <span className="sidebar-elara-preview-time">02:14</span>
                  </div>
                  <div className="sidebar-elara-preview-mid">
                    <div className="sidebar-elara-preview-col sidebar-elara-preview-chat">
                      <div className="sidebar-elara-line sidebar-elara-line-meta">// WhatsApp</div>
                      <div className="sidebar-elara-line sidebar-elara-line-user">
                        {lang === 'en' ? 'you → Send quote…' : 'jij → Stuur offerte…'}
                      </div>
                      <div className="sidebar-elara-line sidebar-elara-line-ok">✓ Gmail</div>
                      <div className="sidebar-elara-line sidebar-elara-line-ok">
                        {lang === 'en' ? '✓ Mail sent' : '✓ Mail verzonden'}
                      </div>
                    </div>
                    <div className="sidebar-elara-preview-col sidebar-elara-preview-log">
                      <div className="sidebar-elara-live-label">{lang === 'en' ? 'Live log' : 'Live log'}</div>
                      <div className="sidebar-elara-log-row">08:02 <span className="sidebar-elara-ok">✓</span> {lang === 'en' ? 'Mails' : 'Mails'}</div>
                      <div className="sidebar-elara-log-row">09:04 <span className="sidebar-elara-ok">✓</span> {lang === 'en' ? 'Calendar' : 'Agenda'}</div>
                      <div className="sidebar-elara-log-row sidebar-elara-log-wait">⟳ WhatsApp…</div>
                    </div>
                  </div>
                  <div className="sidebar-elara-preview-foot">
                    <div className="sidebar-elara-stat">
                      <span className="sidebar-elara-stat-k">{lang === 'en' ? 'Today' : 'Vandaag'}</span>
                      <span className="sidebar-elara-stat-v">47</span>
                    </div>
                    <div className="sidebar-elara-stat sidebar-elara-stat-glow">
                      <span className="sidebar-elara-stat-k">24/7</span>
                      <span className="sidebar-elara-stat-v">{lang === 'en' ? 'On' : 'Actief'}</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </a>
            ) : (
            <a href="/diensten/bedrijfsautomatisering" className="diensten-sidebar-item">
              <span className="diensten-sidebar-name">{t('diensten.bedrijfsautomatisering')}</span>
              <div className="diensten-sidebar-card-wrapper">
              <div className="diensten-sidebar-card diensten-sidebar-card-system">
                <div className="service-img-placeholder service-img-dashboard">
                  <div className="dashboard-mock">
                    <div className="dashboard-sidebar">
                      <div className="dash-dot"></div>
                      <div className="dash-line"></div>
                      <div className="dash-line"></div>
                      <div className="dash-line"></div>
                      <div className="dash-line"></div>
                      <div className="dash-line"></div>
                    </div>
                    <div className="dashboard-main">
                      <div className="dash-header">Dashboard</div>
                      <div className="dash-stats">
                        <div className="sidebar-dash-stat" data-target="4236">4.236</div>
                        <div className="sidebar-dash-stat" data-target="24904">24.904</div>
                      </div>
                      <div className="dash-chart">
                        <div className="chart-bar" data-height="60" style={{ height: "60%" }}></div>
                        <div className="chart-bar" data-height="80" style={{ height: "80%" }}></div>
                        <div className="chart-bar" data-height="45" style={{ height: "45%" }}></div>
                        <div className="chart-bar" data-height="90" style={{ height: "90%" }}></div>
                        <div className="chart-bar" data-height="70" style={{ height: "70%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </a>
            )}
            <a href="/diensten/ai-crm" className="diensten-sidebar-item">
              <span className="diensten-sidebar-name">{t('diensten.ai-crm')}</span>
              <div className="diensten-sidebar-card-wrapper">
              <div className="diensten-sidebar-card diensten-sidebar-card-gradient">
                <div className="service-img-placeholder service-img-ai">
                  <svg className="connection-lines" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 40 H80 V140 H130" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-1" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M0,40 L80,40 L80,140 L130,140" />
                    </circle>
                    <path d="M0 240 H80 V140 H130" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-2" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="3.5s" repeatCount="indefinite" path="M0,240 L80,240 L80,140 L130,140" />
                    </circle>
                    <path d="M270 140 H320 V40 H400" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-3" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="3s" repeatCount="indefinite" path="M270,140 L320,140 L320,40 L400,40" />
                    </circle>
                    <path d="M270 140 H320 V240 H400" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-4" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="3.5s" repeatCount="indefinite" path="M270,140 L320,140 L320,240 L400,240" />
                    </circle>
                    <path d="M200 0 V60" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-5" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="2s" repeatCount="indefinite" path="M200,0 L200,60" />
                    </circle>
                    <path d="M200 280 V190" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                    <circle className="dot-move dot-6" r="3" fill="rgba(120,120,120,0.6)">
                      <animateMotion dur="2s" repeatCount="indefinite" path="M200,280 L200,190" />
                    </circle>
                  </svg>
                  <div className="ai-icon-box">AI</div>
                </div>
              </div>
              </div>
            </a>
            <a href="/diensten/ai-agents" className="diensten-sidebar-item">
              <span className="diensten-sidebar-name">{t('diensten.ai-agents')}</span>
              <div className="diensten-sidebar-card-wrapper">
              <div className="diensten-sidebar-card diensten-sidebar-card-dark">
                <div className="service-img-placeholder service-img-agent">
                  <div className="agent-flow agent-flow-visible">
                    <div className="agent-flow-text">
                      <span className="agent-flow-sub">AI gebouwd rond</span>
                      <span className="agent-flow-title">uw eigen data en strategie.</span>
                    </div>
                    <div className="agent-flow-visual">
                      <div className="agent-flow-icons">
                        <div className="agent-flow-icon agent-icon-purple">
                          <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="1.5"/><line x1="8" y1="9" x2="16" y2="9" stroke="white" strokeWidth="1.2"/><line x1="8" y1="12" x2="14" y2="12" stroke="white" strokeWidth="1.2"/></svg>
                        </div>
                        <div className="agent-flow-icon agent-icon-blue">
                          <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="13" width="3" height="6" rx="1" fill="white"/><rect x="10.5" y="9" width="3" height="10" rx="1" fill="white"/><rect x="16" y="5" width="3" height="14" rx="1" fill="white"/></svg>
                        </div>
                        <div className="agent-flow-icon agent-icon-red">
                          <svg viewBox="0 0 24 24" fill="none"><path d="M4 8C4 6.9 4.9 6 6 6H18C19.1 6 20 6.9 20 8V10H4V8Z" fill="white" opacity="0.7"/><rect x="4" y="10" width="16" height="8" rx="0" fill="white"/></svg>
                        </div>
                      </div>
                      <svg className="agent-flow-lines" viewBox="0 0 200 180" fill="none">
                        <path d="M0 30 C60 30, 80 90, 140 90" stroke="#c77dff" strokeWidth="1.5" fill="none" />
                        <circle r="3" fill="#c77dff">
                          <animateMotion dur="2.5s" repeatCount="indefinite" path="M0,30 C60,30 80,90 140,90" />
                          <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <path d="M0 90 C50 90, 90 90, 140 90" stroke="#4a90e2" strokeWidth="1.5" fill="none" />
                        <circle r="3" fill="#4a90e2">
                          <animateMotion dur="2s" repeatCount="indefinite" path="M0,90 C50,90 90,90 140,90" />
                          <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <path d="M0 150 C60 150, 80 90, 140 90" stroke="#ff6b6b" strokeWidth="1.5" fill="none" />
                        <circle r="3" fill="#ff6b6b">
                          <animateMotion dur="3s" repeatCount="indefinite" path="M0,150 C60,150 80,90 140,90" />
                          <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                        </circle>
                      </svg>
                      <div className="agent-flow-window">
                        <div className="agent-window-bar">
                          <span className="agent-dot-red"></span>
                          <span className="agent-dot-yellow"></span>
                          <span className="agent-dot-green"></span>
                        </div>
                        <div className="agent-window-body">
                          <svg viewBox="0 0 40 40" fill="none">
                            <rect x="6" y="10" width="12" height="20" rx="2" fill="#4a90e2"/>
                            <rect x="22" y="10" width="12" height="20" rx="2" fill="#6ea8fe" opacity="0.6"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </a>
            <a href="/diensten/app-web-ontwikkeling" className="diensten-sidebar-item">
              <span className="diensten-sidebar-name">{t('diensten.app-web-ontwikkeling')}</span>
              <div className="diensten-sidebar-card-wrapper">
              <div className="diensten-sidebar-card diensten-sidebar-card-blue diensten-sidebar-card-app-gloss">
                <div className="service-img-placeholder service-img-phone">
                  <div className="phone-mock">
                    <div className="phone-screen">
                      <div className="phone-header"></div>
                      <div className="phone-content"></div>
                      <div className="phone-btn-mock"></div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </a>
            <a href="/diensten/systeemverbetering" className="diensten-sidebar-item">
              <span className="diensten-sidebar-name">{t('diensten.systeemverbetering')}</span>
              <div className="diensten-sidebar-card-wrapper">
              <div className="diensten-sidebar-card diensten-sidebar-card-system">
                <div className="service-img-placeholder service-img-system-flow">
                  <div className="system-flow-panel system-flow-legacy">Legacy</div>
                  <div className="system-flow-path">
                    <span className="system-flow-dot"></span>
                  </div>
                  <div className="system-flow-panel system-flow-upgraded">Optimized</div>
                </div>
              </div>
              </div>
            </a>
            <a href="/diensten/gpt-op-maat" className="diensten-sidebar-item">
              <span className="diensten-sidebar-name">{t('diensten.gpt-op-maat')}</span>
              <div className="diensten-sidebar-card-wrapper">
              <div className="diensten-sidebar-card diensten-sidebar-card-gpt">
                <div className="service-img-placeholder service-img-gpt-chat">
                  <div className="gpt-chat-bubble gpt-chat-prompt">Maak een offerte op maat...</div>
                  <div className="gpt-chat-bubble gpt-chat-answer">
                    Gereed. Inclusief planning en KPI's.
                    <span className="gpt-typing">
                      <i></i><i></i><i></i>
                    </span>
                  </div>
                </div>
              </div>
              </div>
            </a>
            <a href="/diensten/rpa-ai-automatisering" className="diensten-sidebar-item">
              <span className="diensten-sidebar-name">{t('diensten.rpa-ai-automatisering')}</span>
              <div className="diensten-sidebar-card-wrapper">
              <div className="diensten-sidebar-card diensten-sidebar-card-gradient diensten-sidebar-card-rpa-gloss">
                <div className="service-img-placeholder service-img-upgrade">
                  <svg className="upgrade-anim" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="30" y="100" width="100" height="80" rx="10" stroke="rgba(180,180,180,0.5)" strokeWidth="2" fill="rgba(180,180,180,0.08)" />
                    <text x="80" y="145" textAnchor="middle" fill="rgba(120,120,120,0.6)" fontSize="11" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Legacy</text>
                    <path d="M140 140 H200" stroke="rgba(180,180,180,0.5)" strokeWidth="2" strokeDasharray="6 4">
                      <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
                    </path>
                    <polygon points="200,134 212,140 200,146" fill="rgba(120,120,120,0.5)">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                    </polygon>
                    <rect x="220" y="80" width="140" height="120" rx="14" stroke="rgba(120,120,120,0.5)" strokeWidth="2" fill="rgba(120,120,120,0.06)">
                      <animate attributeName="stroke" values="rgba(120,120,120,0.3);rgba(80,200,120,0.7);rgba(120,120,120,0.3)" dur="3s" repeatCount="indefinite" />
                    </rect>
                    <text x="290" y="145" textAnchor="middle" fill="rgba(80,200,120,0.8)" fontSize="12" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Upgraded</text>
                  </svg>
                </div>
              </div>
              </div>
            </a>
            <a href="/diensten/webbots" className="diensten-sidebar-item">
              <span className="diensten-sidebar-name">{t('diensten.webbots')}</span>
              <div className="diensten-sidebar-card-wrapper">
              <div className="diensten-sidebar-card diensten-sidebar-card-dark diensten-sidebar-card-webbots-gloss">
                <div className="service-img-placeholder service-img-webbot">
                  <svg className="webbot-anim" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="60" y="40" width="280" height="180" rx="12" stroke="rgba(180,180,180,0.4)" strokeWidth="2" fill="rgba(180,180,180,0.05)" />
                    <rect x="60" y="40" width="280" height="30" rx="12" fill="rgba(180,180,180,0.1)" />
                    <circle cx="82" cy="55" r="5" fill="rgba(255,100,100,0.5)" />
                    <circle cx="98" cy="55" r="5" fill="rgba(255,200,50,0.5)" />
                    <circle cx="114" cy="55" r="5" fill="rgba(100,200,100,0.5)" />
                    <rect x="130" y="48" width="180" height="14" rx="7" fill="rgba(180,180,180,0.15)" />
                    <rect x="90" y="90" width="220" height="10" rx="3" fill="rgba(120,120,120,0.15)">
                      <animate attributeName="width" values="0;220" dur="1.5s" repeatCount="indefinite" />
                    </rect>
                    <rect x="90" y="115" width="180" height="10" rx="3" fill="rgba(120,120,120,0.1)">
                      <animate attributeName="width" values="0;180" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <rect x="90" y="140" width="200" height="10" rx="3" fill="rgba(120,120,120,0.12)">
                      <animate attributeName="width" values="0;200" dur="1.8s" repeatCount="indefinite" />
                    </rect>
                    <rect x="90" y="170" width="60" height="30" rx="6" fill="rgba(120,120,120,0.08)" />
                    <rect x="160" y="170" width="60" height="30" rx="6" fill="rgba(120,120,120,0.08)" />
                    <rect x="230" y="170" width="60" height="30" rx="6" fill="rgba(120,120,120,0.08)" />
                    <g>
                      <circle r="8" fill="rgba(249,248,103,0.8)">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M100,95 L280,95 L280,120 L200,120 L200,145 L260,145 L260,185 L120,185" />
                      </circle>
                      <circle r="3" fill="rgba(26,26,26,0.9)">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M100,95 L280,95 L280,120 L200,120 L200,145 L260,145 L260,185 L120,185" />
                      </circle>
                    </g>
                    <line x1="340" y1="100" x2="380" y2="80" stroke="rgba(249,248,103,0.4)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </line>
                    <line x1="340" y1="130" x2="380" y2="130" stroke="rgba(249,248,103,0.4)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </line>
                    <line x1="340" y1="160" x2="380" y2="180" stroke="rgba(249,248,103,0.4)" strokeWidth="1.5">
                      <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </line>
                    <rect x="380" y="72" width="15" height="16" rx="3" fill="rgba(249,248,103,0.2)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="0.5s" />
                    </rect>
                    <rect x="380" y="122" width="15" height="16" rx="3" fill="rgba(249,248,103,0.2)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
                    </rect>
                    <rect x="380" y="172" width="15" height="16" rx="3" fill="rgba(249,248,103,0.2)">
                      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1.5s" />
                    </rect>
                    <circle cx="200" cy="250" r="14" fill="rgba(120,120,120,0.1)" stroke="rgba(120,120,120,0.3)" strokeWidth="1.5">
                      <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="200" y="254" textAnchor="middle" fill="rgba(120,120,120,0.5)" fontSize="10" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>BOT</text>
                  </svg>
                </div>
              </div>
              </div>
            </a>
          </div>

          <div className="sidebar-steps-section">
            <h3 className="sidebar-steps-title">Onze werkwijze</h3>
            <div className="sidebar-steps-grid">
              <div className="sidebar-step-card">
                <div className="sidebar-step-header">
                  <div className="sidebar-step-dots"><span></span></div>
                  <span className="sidebar-step-num">01</span>
                </div>
                <h4>Analyse & Blueprint</h4>
                <p>We starten met een bedrijfsanalyse waarin we jouw bedrijf, processen en knelpunten in kaart brengen.</p>
                <div className="sidebar-step-time"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Op maat</div>
              </div>
              <div className="sidebar-step-card">
                <div className="sidebar-step-header">
                  <div className="sidebar-step-dots"><span></span><span></span></div>
                  <span className="sidebar-step-num">02</span>
                </div>
                <h4>AI-oplossing op maat</h4>
                <p>Op basis van dit gesprek bepalen we de juiste maatwerk AI-oplossing. Inclusief werking, integraties en doelen.</p>
                <div className="sidebar-step-time"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Op maat</div>
              </div>
              <div className="sidebar-step-card">
                <div className="sidebar-step-header">
                  <div className="sidebar-step-dots"><span></span><span></span><span></span></div>
                  <span className="sidebar-step-num">03</span>
                </div>
                <h4>Bouwen en koppelen</h4>
                <p>We ontwikkelen het systeem en integreren het naadloos in je bestaande software. De oplossing is klaar voor gebruik.</p>
                <div className="sidebar-step-time"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Op maat</div>
              </div>
              <div className="sidebar-step-card">
                <div className="sidebar-step-header">
                  <div className="sidebar-step-dots"><span></span><span></span><span></span><span></span></div>
                  <span className="sidebar-step-num">04</span>
                </div>
                <h4>Begeleiding van je team</h4>
                <p>We begeleiden de implementatie en zorgen dat je team er direct mee kan werken. De focus ligt op een soepele overgang.</p>
                <div className="sidebar-step-time"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Op maat</div>
              </div>
              <div className="sidebar-step-card">
                <div className="sidebar-step-header">
                  <div className="sidebar-step-dots"><span></span><span></span><span></span><span></span><span></span></div>
                  <span className="sidebar-step-num">05</span>
                </div>
                <h4>Zichtbaar resultaat</h4>
                <p>Je merkt het verschil in tijdswinst, minder fouten en stabielere processen. AI wordt een vast onderdeel in je bedrijf.</p>
                <div className="sidebar-step-time"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Op maat</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Bedrijfsautomatisering */}
      <div className="service-modal-overlay" id="modal-automatisering">
        <div className="service-modal-inner">
          <div className="service-modal-card">
            <div className="service-card-content">
              <h3>Bedrijfsautomatisering</h3>
              <p>Automatiseer tijdrovende taken om de efficiëntie te verhogen en menselijke fouten te verminderen.</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-dashboard">
                <div className="dashboard-mock">
                  <div className="dashboard-sidebar">
                    <div className="dash-dot"></div>
                    <div className="dash-line"></div>
                    <div className="dash-line"></div>
                    <div className="dash-line"></div>
                    <div className="dash-line"></div>
                    <div className="dash-line"></div>
                  </div>
                  <div className="dashboard-main">
                    <div className="dash-header">Dashboard</div>
                    <div className="dash-stats">
                      <div className="dash-stat" data-target="4236">4.236</div>
                      <div className="dash-stat" data-target="24904">24.904</div>
                    </div>
                    <div className="dash-chart">
                      <div className="chart-bar" style={{height: "60%"}}></div>
                      <div className="chart-bar" style={{height: "80%"}}></div>
                      <div className="chart-bar" style={{height: "45%"}}></div>
                      <div className="chart-bar" style={{height: "90%"}}></div>
                      <div className="chart-bar" style={{height: "70%"}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <button className="service-modal-close">✕</button>
            <h3>Bedrijfsautomatisering</h3>
            <p>Wij automatiseren complexe bedrijfsprocessen met AI-gedreven oplossingen. Van documentverwerking tot klantcommunicatie — wij bouwen systemen die 24/7 voor u werken.</p>
            <ul>
              <li>Automatische documentverwerking en data-extractie</li>
              <li>Intelligente workflow automatisering</li>
              <li>AI-gestuurde klantenservice bots</li>
              <li>Realtime rapportages en dashboards</li>
            </ul>
            <a href="/contact" className="service-modal-cta">Contact Opnemen</a>
            <a href="/diensten/bedrijfsautomatisering" className="service-modal-cta service-modal-cta-outline">Verder lezen</a>
          </div>
        </div>
      </div>

      {/* Modal: AI-CRM Systemen */}
      <div className="service-modal-overlay" id="modal-crm">
        <div className="service-modal-inner">
          <div className="service-modal-card service-modal-card-gradient">
            <div className="service-card-content">
              <h3>AI-CRM Systemen</h3>
              <p>Een intelligent CRM-systeem op maat dat klantbehoeften voorspelt, Relatie verbetert en zoveel mogelijk taken automatiseert.</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-ai">
                <svg className="connection-lines" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 40 H80 V140 H130" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-1" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M0,40 L80,40 L80,140 L130,140" />
                  </circle>
                  <path d="M0 240 H60 V140 H130" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-2" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M0,240 L60,240 L60,140 L130,140" />
                  </circle>
                  <path d="M400 60 H320 V140 H270" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-3" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M400,60 L320,60 L320,140 L270,140" />
                  </circle>
                  <path d="M400 220 H340 V140 H270" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-4" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="4.5s" repeatCount="indefinite" path="M400,220 L340,220 L340,140 L270,140" />
                  </circle>
                  <path d="M200 0 V90" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-5" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M200,0 L200,90" />
                  </circle>
                  <path d="M200 280 V190" stroke="rgba(180,180,180,0.4)" strokeWidth="2" />
                  <circle className="dot-move dot-6" r="3" fill="rgba(120,120,120,0.6)">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M200,280 L200,190" />
                  </circle>
                </svg>
                <div className="ai-icon-box">AI</div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <button className="service-modal-close">✕</button>
            <h3>AI-CRM Systemen</h3>
            <p>Een volledig op maat gebouwd CRM-systeem, verrijkt met AI. Uw klantrelaties worden slimmer beheerd, voorspellingen nauwkeuriger en opvolging volledig geautomatiseerd.</p>
            <ul>
              <li>AI-gestuurde lead scoring en prioritering</li>
              <li>Automatische follow-up en klantcommunicatie</li>
              <li>Voorspellende analyses voor klantgedrag</li>
              <li>Integratie met bestaande tools en systemen</li>
            </ul>
            <a href="/contact" className="service-modal-cta">Contact Opnemen</a>
            <a href="/diensten/ai-crm" className="service-modal-cta service-modal-cta-outline">Verder lezen</a>
          </div>
        </div>
      </div>

      {/* Modal: AI-Agents */}
      <div className="service-modal-overlay" id="modal-agents">
        <div className="service-modal-inner">
          <div className="service-modal-card service-modal-card-dark">
            <div className="service-card-content">
              <h3>AI-Agents</h3>
              <p>Zelfstandig werkende digitale medewerkers die handmatige taken op een continue en schaalbare manier overnemen.</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-agent">
                <div className="agent-flow agent-flow-visible">
                  <div className="agent-flow-text">
                    <span className="agent-flow-sub">AI gebouwd rond</span>
                    <span className="agent-flow-title">uw eigen data en strategie.</span>
                  </div>
                  <div className="agent-flow-visual">
                    <div className="agent-flow-icons">
                      <div className="agent-flow-icon agent-icon-purple">
                        <svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="1.5"/><line x1="8" y1="9" x2="16" y2="9" stroke="white" strokeWidth="1.2"/><line x1="8" y1="12" x2="14" y2="12" stroke="white" strokeWidth="1.2"/><line x1="8" y1="15" x2="12" y2="15" stroke="white" strokeWidth="1.2"/></svg>
                      </div>
                      <div className="agent-flow-icon agent-icon-blue">
                        <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="13" width="3" height="6" rx="1" fill="white"/><rect x="10.5" y="9" width="3" height="10" rx="1" fill="white"/><rect x="16" y="5" width="3" height="14" rx="1" fill="white"/></svg>
                      </div>
                      <div className="agent-flow-icon agent-icon-red">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M4 8C4 6.9 4.9 6 6 6H18C19.1 6 20 6.9 20 8V10H4V8Z" fill="white" opacity="0.7"/><rect x="4" y="10" width="16" height="8" rx="0" fill="white"/><rect x="9" y="12" width="6" height="4" rx="1" fill="rgba(0,0,0,0.2)"/></svg>
                      </div>
                    </div>
                    <svg className="agent-flow-lines" viewBox="0 0 200 180" fill="none">
                      <path d="M0 30 C60 30, 80 90, 140 90" stroke="#c77dff" strokeWidth="1.5" fill="none" />
                      <circle r="3" fill="#c77dff">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M0,30 C60,30 80,90 140,90" />
                        <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <path d="M0 90 C50 90, 90 90, 140 90" stroke="#4a90e2" strokeWidth="1.5" fill="none" />
                      <circle r="3" fill="#4a90e2">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M0,90 C50,90 90,90 140,90" />
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <path d="M0 150 C60 150, 80 90, 140 90" stroke="#ff6b6b" strokeWidth="1.5" fill="none" />
                      <circle r="3" fill="#ff6b6b">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M0,150 C60,150 80,90 140,90" />
                        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                    <div className="agent-flow-window">
                      <div className="agent-window-bar">
                        <span className="agent-dot-red"></span>
                        <span className="agent-dot-yellow"></span>
                        <span className="agent-dot-green"></span>
                      </div>
                      <div className="agent-window-body">
                        <svg viewBox="0 0 40 40" fill="none">
                          <rect x="6" y="10" width="12" height="20" rx="2" fill="#4a90e2"/>
                          <rect x="22" y="10" width="12" height="20" rx="2" fill="#6ea8fe" opacity="0.6"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <button className="service-modal-close">✕</button>
            <h3>AI-Agents</h3>
            <p>Autonome AI-agents die complexe taken uitvoeren, data verzamelen en beslissingen nemen op basis van uw bedrijfsstrategie en data.</p>
            <ul>
              <li>Intelligente data-extractie en verwerking</li>
              <li>Autonome taakuitvoering en besluitvorming</li>
              <li>24/7 monitoring en rapportage</li>
              <li>Schaalbare agents voor groeiende workloads</li>
            </ul>
            <a href="/contact" className="service-modal-cta">Contact Opnemen</a>
            <a href="/diensten/ai-agents" className="service-modal-cta service-modal-cta-outline">Verder lezen</a>
          </div>
        </div>
      </div>

      {/* Modal: Applicatie & Website ontwikkeling */}
      <div className="service-modal-overlay" id="modal-integraties">
        <div className="service-modal-inner">
          <div className="service-modal-card service-modal-card-blue">
            <div className="service-card-content">
              <h3>Applicatie &amp; Website ontwikkeling</h3>
              <p>Op maat gemaakte applicaties en websites die perfect aansluiten bij de bedrijfsprocessen.</p>
            </div>
            <div className="service-card-image">
              <div className="service-img-placeholder service-img-phone">
                <div className="phone-mock">
                  <div className="phone-screen">
                    <div className="phone-header"></div>
                    <div className="phone-content"></div>
                    <div className="phone-btn-mock"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="service-modal-info">
            <button className="service-modal-close">✕</button>
            <h3>Applicatie &amp; Website ontwikkeling</h3>
            <p>Wij bouwen op maat gemaakte applicaties en websites die naadloos aansluiten bij de bedrijfsprocessen en doelgroep.</p>
            <ul>
              <li>Custom web- en mobiele applicaties</li>
              <li>Responsive en moderne websites</li>
              <li>UX/UI design op maat</li>
              <li>Schaalbare en toekomstbestendige architectuur</li>
            </ul>
            <a href="/contact" className="service-modal-cta">Contact Opnemen</a>
            <a href="/diensten/app-web-ontwikkeling" className="service-modal-cta service-modal-cta-outline">Verder lezen</a>
          </div>
        </div>
      </div>

      {!showCookie && (
        <button
          className="cookie-reopen-btn"
          onClick={() => setShowCookie(true)}
          aria-label="Cookie & taalinstellingen"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
            <circle cx="15" cy="11" r="1" fill="currentColor"/>
            <circle cx="10" cy="15" r="1.2" fill="currentColor"/>
            <circle cx="14" cy="16" r="0.8" fill="currentColor"/>
            <circle cx="16" cy="7" r="1" fill="currentColor"/>
          </svg>
        </button>
      )}

      {showCookie && (
        <div className="cookie-banner">
          <div className="cookie-header">
            <h3>{t('cookie.title')}</h3>
            <div className="cookie-lang-flags">
              <button
                className={`cookie-flag-btn${lang === 'nl' ? ' active' : ''}`}
                onClick={() => setLang('nl')}
                aria-label="Nederlands"
              >
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                  <rect width="22" height="5.33" fill="#AE1C28"/>
                  <rect y="5.33" width="22" height="5.34" fill="white"/>
                  <rect y="10.67" width="22" height="5.33" fill="#21468B"/>
                </svg>
              </button>
              <button
                className={`cookie-flag-btn${lang === 'en' ? ' active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="English"
              >
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                  <rect width="22" height="16" fill="#012169"/>
                  <path d="M0 0L22 16M22 0L0 16" stroke="white" strokeWidth="3"/>
                  <path d="M0 0L22 16M22 0L0 16" stroke="#C8102E" strokeWidth="1.8"/>
                  <path d="M11 0V16M0 8H22" stroke="white" strokeWidth="4"/>
                  <path d="M11 0V16M0 8H22" stroke="#C8102E" strokeWidth="2.4"/>
                </svg>
              </button>
            </div>
          </div>
          <p>
            {t('cookie.body')}{' '}
            <a href="/cookie-beleid" rel="noopener noreferrer">{t('cookie.more')}</a>
          </p>
          <div className="cookie-actions">
            <button className="cookie-decline" onClick={() => handleCookie(false)}>{t('cookie.decline')}</button>
            <button className="cookie-accept" onClick={() => handleCookie(true)}>{t('cookie.accept')}</button>
          </div>
        </div>
      )}
    </>
  );
}
