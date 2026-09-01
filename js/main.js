/* ==========================================================================
   main.js — animações de scroll + contagem de números
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------- REVEAL */
  // Revela elementos com a classe .reveal quando entram no viewport.
  function initReveal() {
    const items = Array.from(document.querySelectorAll(".reveal"));
    if (items.length === 0) return;

    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------- CONTAGEM */
  // Anima os elementos .stat-count de 0 até o valor em data-value.
  function formatNumber(value, decimals) {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function initCount() {
    const counters = Array.from(
      document.querySelectorAll(".stat-count[data-value]")
    );
    if (counters.length === 0) return;

    if (prefersReducedMotion) {
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.value);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        el.textContent = formatNumber(target, decimals) + "%";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.dataset.value);
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const duration = 1100;
          const start = performance.now();

          function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = formatNumber(target * eased, decimals) + "%";
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);

          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ---------------------------------------------------------- INIT */
  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initCount();
  });
})();