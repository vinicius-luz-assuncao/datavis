/* ==========================================================================
   main.js — animações de scroll + contagem de números
   ========================================================================== */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------- REVEAL */
  // Alterna .is-visible conforme o elemento entra/sai do viewport, para a
  // animação de entrada (e a cascata do .flow) repetir a cada passagem.
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
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
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
          const el = entry.target;
          if (!entry.isIntersecting) {
            if (el._countRaf) cancelAnimationFrame(el._countRaf);
            el._countRaf = 0;
            el.textContent = formatNumber(0, parseInt(el.dataset.decimals || "0", 10)) + "%";
            return;
          }
          if (el._countRaf) cancelAnimationFrame(el._countRaf);
          const target = parseFloat(el.dataset.value);
          const decimals = parseInt(el.dataset.decimals || "0", 10);
          const duration = 1100;
          const start = performance.now();

          function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = formatNumber(target * eased, decimals) + "%";
            el._countRaf = t < 1 ? requestAnimationFrame(tick) : 0;
          }
          el._countRaf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------ PARALLAX HERO */
  // Camadas do hero deslizam conforme a rolagem. Cada <img.hero-media__img>
  // tem um data-depth (0..1): quanto maior, mais rápido o deslocamento.
  // 01 = primeiro plano (profundidade 1), 04 = fundo (profundidade menor).
  function heroLayers() {
    return Array.from(document.querySelectorAll("#hero .hero-media__img"));
  }

  // fator com curva: separa mais os níveis próximos dos distantes
  // exponente 1.6 → camadas à frente se destacam proporcionalmente mais
  function depthFactor(depth) {
    return Math.pow(depth, 1.6);
  }

  function initHeroParallax() {
    var layers = heroLayers();
    if (layers.length === 0) return;
    if (prefersReducedMotion) return;

    var hero = document.getElementById("hero");
    var spread = 120;       // recuo horizontal de repouso (maior → mais profundidade)
    var baseAmplitude = 280; // deslocamento desejado para depth=1 (px)
    var ticking = false;

    function update() {
      var rect = hero.getBoundingClientRect();
      var heroW = hero.offsetWidth;

      // Clamp dinâmico: a camada frontal não pode se deslocar mais que
      // 18% da largura do hero (evita expor bordas das imagens)
      var maxPx = heroW * 0.18;
      var amplitude = Math.min(baseAmplitude, maxPx);

      // progress: 0 quando o hero está no topo, 1 depois de uma tela de rolagem
      var progress = -rect.top / window.innerHeight;
      progress = Math.max(0, Math.min(1, progress));

      layers.forEach(function (img) {
        var depth = parseFloat(img.dataset.depth || "0");
        var factor = depthFactor(depth);
        var baseX = (depth - 1) * spread;
        var scrollShift = progress * amplitude * factor;
        img.style.setProperty("--hero-base-x", baseX.toFixed(1) + "px");
        img.style.setProperty("--hero-scroll-shift", scrollShift.toFixed(1) + "px");
      });
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
  // As mesmas camadas deslizam para os lados / cima / baixo conforme o
  // mouse se move sobre a página; profundidades maiores reagem mais.
  function initHeroMouseParallax() {
    var layers = heroLayers();
    if (layers.length === 0) return;
    if (prefersReducedMotion) return;
    // Tela de toque não tem "hover" — parallax de mouse é só para ponteiro.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    var hero = document.getElementById("hero");
    var baseStrength = 45; // px máximos por eixo na camada de maior profundidade
    var ticking = false;

    function onMove(e) {
      if (!ticking) {
        requestAnimationFrame(function () {
          var rect = hero.getBoundingClientRect();
          var heroW = hero.offsetWidth;

          // Clamp dinâmico: mouse não pode deslocar mais que 3% da largura
          var maxMousePx = heroW * 0.03;
          var strength = Math.min(baseStrength, maxMousePx);

          // nx/ny: -1..1 (mouse no centro da página = 0)
          var nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          var ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          layers.forEach(function (img) {
            var depth = parseFloat(img.dataset.depth || "0");
            var factor = depthFactor(depth);
            img.style.setProperty(
              "--hero-mouse-x",
              (nx * strength * factor).toFixed(1) + "px"
            );
            img.style.setProperty(
              "--hero-mouse-y",
              (ny * strength * factor * 0.7).toFixed(1) + "px"
            );
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onMove);
  }

  /* ------------------------------------------------------ PERCURSO NAV */
  // Marca a seção ativa no "percurso" e preenche a linha de progresso
  // conforme a rolagem — a distância percorrida na narrativa.
  function initTrail() {
    var trail = document.getElementById("trail");
    if (!trail) return;

    var links = Array.prototype.slice.call(
      trail.querySelectorAll(".trail__link")
    );
    if (links.length === 0) return;

    var progress = trail.querySelector("[data-trail-progress]");
    var sections = links
      .map(function (link) {
        return document.getElementById(link.dataset.trailTarget);
      })
      .filter(Boolean);

    var ticking = false;

    function update() {
      var scrollY = window.pageYOffset;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = docHeight > 0 ? scrollY / docHeight : 0;
      ratio = Math.max(0, Math.min(1, ratio));
      if (progress) progress.style.height = (ratio * 100).toFixed(2) + "%";

      // Seção ativa = a última cujo topo já passou de 1/3 da viewport.
      var marker = scrollY + window.innerHeight * 0.34;
      var activeIndex = 0;
      sections.forEach(function (section, i) {
        if (section.getBoundingClientRect().top + scrollY <= marker) {
          activeIndex = i;
        }
      });

      links.forEach(function (link, i) {
        link.classList.toggle("is-active", i === activeIndex);
      });

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

  /* --------------------------------------------- NÚMEROS-COLUNA */
  // Numerais que contam de 0 até o valor enquanto crescem até a altura
  // proporcional na escala (como um contador digital).
  function initBigNums() {
    var nums = Array.prototype.slice.call(
      document.querySelectorAll("[data-bignum]")
    );
    if (nums.length === 0) return;

    function reset(el) {
      if (el._bigRaf) cancelAnimationFrame(el._bigRaf);
      el._bigRaf = 0;
      el.style.fontSize = "";
      el.textContent = "0%";
    }

    function play(el) {
      var target = parseFloat(el.dataset.value) || 0;
      var wrap = el.closest("[data-bignums]");
      var axis = wrap ? wrap.querySelector(".bignums__axis") : null;
      var maxPx = axis ? axis.clientHeight : 160;
      // Razão ótica do dígito (altura visual / font-size, ~Abril Fatface):
      // dividir por ela faz o topo VISÍVEL do número encostar no tick do
      // valor (só font-size deixaria ~3/4 abaixo). Ajuste fino aqui.
      var GLYPH_RATIO = 0.78;
      var finalPx = Math.max(20, (maxPx * target) / 100 / GLYPH_RATIO);
      if (prefersReducedMotion) {
        el.style.fontSize = finalPx + "px";
        el.textContent = formatNumber(target, 0) + "%";
        return;
      }
      if (el._bigRaf) cancelAnimationFrame(el._bigRaf);
      var dur = 1400;
      var start = null;
      function tick(now) {
        if (!start) start = now;
        var t = Math.min(1, (now - start) / dur);
        var e = 1 - Math.pow(1 - t, 3);
        el.style.fontSize = 20 + (finalPx - 20) * e + "px";
        el.textContent = formatNumber(target * e, 0) + "%";
        el._bigRaf = t < 1 ? requestAnimationFrame(tick) : 0;
      }
      el._bigRaf = requestAnimationFrame(tick);
    }

    if (prefersReducedMotion) {
      nums.forEach(play);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) play(entry.target);
          else reset(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    nums.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --------------------------------------------- ROLAGEM HORIZONTAL */
  // Teste: prende a seção (sticky) e converte rolagem vertical em saltos
  // entre camadas (snap quantizado com animação); nunca para no meio.
  // Ao fim, o vertical continua sozinho. Suporta vários [data-hscroll]
  // na página (ex.: capítulos 02 e 03). Sem .is-hscroll = vertical.
  function initHScroll() {
    const wraps = Array.from(document.querySelectorAll("[data-hscroll]"));
    if (wraps.length === 0) return;
    if (prefersReducedMotion) return;
    if (window.matchMedia("(max-width: 720px)").matches) return;
    wraps.forEach(initOne);

    function initOne(wrap) {
      const stage = wrap.querySelector("[data-hstage]");
      const track = wrap.querySelector("[data-htrack]");
      if (!stage || !track) return;
      wrap.classList.add("is-hscroll");

      const panels = Array.from(track.children);
      const last = Math.max(0, panels.length - 1);
      const DUR = 550; // ms do pulo entre camadas
      let maxX = 0;
      let stop = 0; // parada atual (0..last)
      let curX = 0; // posição exibida
      let animId = 0;
      let animFrom = 0;
      let animStart = 0;

      function measure() {
        maxX = Math.max(0, track.scrollWidth - stage.clientWidth);
      }

      function xFor(s) {
        return last > 0 ? -(s / last) * maxX : 0;
      }

      function paint(x) {
        curX = x;
        track.style.transform = "translate3d(" + x.toFixed(1) + "px,0,0)";
      }

      function tweenTo(target) {
        if (animId) cancelAnimationFrame(animId);
        animFrom = curX;
        animStart = performance.now();
        const dest = xFor(target);
        function frame(now) {
          const t = Math.min(1, (now - animStart) / DUR);
          const e = 1 - Math.pow(1 - t, 3);
          paint(animFrom + (dest - animFrom) * e);
          if (t < 1) animId = requestAnimationFrame(frame);
          else animId = 0;
        }
        animId = requestAnimationFrame(frame);
      }

      let ticking = false;
      function update() {
        const total = wrap.offsetHeight - window.innerHeight;
        const top = wrap.getBoundingClientRect().top;
        let p = total > 0 ? -top / total : 0;
        p = Math.max(0, Math.min(1, p));
        const target = Math.round(p * last);
        if (target !== stop) {
          stop = target;
          tweenTo(stop);
        }
        ticking = false;
      }

      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", () => {
        measure();
        if (animId) cancelAnimationFrame(animId);
        animId = 0;
        paint(xFor(stop));
        onScroll();
      });
      measure();
      paint(xFor(0));
      update();
    }
  }

  /* ------------------------------------------- PARALLAX FLOW MEDIA */
  // A imagem desliza dentro do cartão conforme a rolagem (o texto parado
  // cria o parallax relativo). Sem reduced-motion nem JS: imagem estática.
  function initFlowParallax() {
    const medias = Array.from(document.querySelectorAll("[data-flow-media]"));
    if (medias.length === 0) return;
    if (prefersReducedMotion) return;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const mice = new WeakMap();
    let ticking = false;
    function update() {
      const vh = window.innerHeight;
      medias.forEach((media) => {
        const img = media.querySelector("img");
        const overlay = media.querySelector("[data-flow-overlay]");
        if (!img && !overlay) return;
        const rect = media.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const m = mice.get(media) || { x: 0, y: 0 };
        if (img) {
          img.style.transform =
            "translate3d(" +
            (m.x * 10).toFixed(1) +
            "px," +
            (-progress * 26 + m.y * 8).toFixed(1) +
            "px,0)";
        }
        if (overlay) {
          overlay.style.transform =
            "translate3d(" +
            (m.x * -5).toFixed(1) +
            "px," +
            (progress * 12 + m.y * -4).toFixed(1) +
            "px,0)";
        }
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    if (finePointer) {
      medias.forEach((media) => {
        media.addEventListener("pointermove", (e) => {
          if (e.pointerType !== "mouse") return;
          const rect = media.getBoundingClientRect();
          mice.set(media, {
            x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
            y: ((e.clientY - rect.top) / rect.height) * 2 - 1
          });
          onScroll();
        });
        media.addEventListener("pointerleave", () => {
          mice.delete(media);
          onScroll();
        });
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* ---------------------------------------------------------- INIT */
  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initCount();
    initHeroParallax();
    initHeroMouseParallax();
    initTrail();
    initBigNums();
    initHScroll();
    initFlowParallax();
  });
})();