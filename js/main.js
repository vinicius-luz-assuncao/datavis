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

  /* ------------------------------------------------------ PARALLAX HERO */
  // A imagem do hero desliza suavemente para a direita conforme você rola a
  // página (e volta quando rola de volta). O deslocamento é definido na
  // variável CSS --hero-scroll-shift sobre o elemento #hero.
  function initHeroParallax() {
    var hero = document.getElementById("hero");
    if (!hero) return;
    if (prefersReducedMotion) return;

    var amplitude = 220; // px máximos de deslocamento (a imagem tem folga
                         // de 20% por lado; aumentar acima de ~220 mostra borda)
    var ticking = false;

    function update() {
      var rect = hero.getBoundingClientRect();
      // progress: 0 quando o hero está no topo, 1 depois de uma tela de rolagem
      var progress = -rect.top / window.innerHeight;
      progress = Math.max(0, Math.min(1, progress));
      var shift = progress * amplitude;
      hero.style.setProperty("--hero-scroll-shift", shift.toFixed(1) + "px");
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ------------------------------------------- PARALLAX HERO (MOUSE) */
  // A mesma <img> também desliza para os lados / cima / baixo conforme o
  // mouse se move sobre a página, revelando mais partes da fotografia.
  function initHeroMouseParallax() {
    var hero = document.getElementById("hero");
    if (!hero) return;
    if (prefersReducedMotion) return;
    // Tela de toque não tem "hover" — parallax de mouse é só para ponteiro.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var strength = 36; // px máximos por eixo
    var ticking = false;

    function onMove(e) {
      if (!ticking) {
        requestAnimationFrame(function () {
          var rect = hero.getBoundingClientRect();
          // nx/ny: -1..1 (mouse no centro da página = 0)
          var nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          var ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          hero.style.setProperty("--hero-mouse-x", (nx * strength).toFixed(1) + "px");
          hero.style.setProperty("--hero-mouse-y", (ny * strength).toFixed(1) + "px");
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onMove);
  }

  /* ---------------------------------------------------------- INIT */
  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initCount();
    initHeroParallax();
    initHeroMouseParallax();
  });
})();