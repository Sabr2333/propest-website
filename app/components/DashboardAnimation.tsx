"use client";

import { useEffect } from "react";

export default function DashboardAnimation() {
  useEffect(() => {
    // --- DASHBOARD HOVER: balkjes + counter animatie ---
    const dashCard = document.querySelector('.service-modal-card');
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

    // Event listeners voor hover
    dashCard?.addEventListener('mouseenter', animateDashboard);
    dashCard?.addEventListener('mouseleave', resetDashboard);

    // Cleanup
    return () => {
      dashCard?.removeEventListener('mouseenter', animateDashboard);
      dashCard?.removeEventListener('mouseleave', resetDashboard);
      counterIntervals.forEach(i => clearInterval(i));
      if (dashTimeout) clearTimeout(dashTimeout);
    };
  }, []);

  return null;
}
