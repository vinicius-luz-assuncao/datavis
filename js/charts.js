/* ==========================================================================
   charts.js — gráficos com D3
   ==========================================================================
   Cada gráfico é disparado pelo atributo `data-chart` presente no HTML:

     <div data-chart="donut" data-value="42.8" data-color="var(--color-teal)"
          data-label="da amostra não tem acesso"></div>

     <div class="bar-chart" data-chart="bar">
       <div class="bar-row" data-label="Homens" data-value="42.7" data-color="var(--color-teal)"></div>
       ...
     </div>

     <div class="trend" data-chart="trend" data-start-label="..." data-end-label="..."></div>

     <div class="brazil-map" data-chart="map"></div>

   O D3 lê esses atributos, desenha o SVG e injeta na página.
   Você edita NÚMEROS, RÓTULOS e CORES direto no HTML.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------------- */
  /* Formata número pt-BR (ex.: 42,8)                                  */
  /* ---------------------------------------------------------------- */
  function fmt(value, decimals) {
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals !== undefined ? decimals : 1,
      maximumFractionDigits: decimals !== undefined ? decimals : 1
    });
  }

  /* ---------------------------------------------------------------- */
  /* Alterna play/reset conforme o elemento entra/sai do viewport,      */
  /* para a animação repetir a cada passagem pela seção.                */
  /* ---------------------------------------------------------------- */
  function onEnter(el, play, reset) {
    if (prefersReducedMotion) {
      play();
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) play();
          else if (typeof reset === "function") reset();
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
  }

  /* ================================================================
     DONUT — rosca com percentual no centro
     ================================================================ */
  function drawDonut(el) {
    var value = parseFloat(el.dataset.value) || 0;
    var color = el.dataset.color || "var(--color-teal)";
    var label = el.dataset.label || "";

    var SIZE = 280;
    var cx = SIZE / 2;
    var cy = SIZE / 2;
    var inner = SIZE * 0.34; // raio interno (espaço para o número)
    var outer = SIZE * 0.48; // raio externo

    var wrapper = document.createElement("div");
    wrapper.className = "donut__chart";
    el.appendChild(wrapper);

    var svg = d3
      .select(wrapper)
      .append("svg")
      .attr("viewBox", "0 0 " + SIZE + " " + SIZE)
      .attr("role", "img")
      .attr("aria-label", fmt(value) + "% — " + label);

    var chart = svg
      .append("g")
      .attr("transform", "translate(" + cx + "," + cy + ")");

    // Fundo neutro (o restante do círculo)
    chart
      .append("path")
      .attr("d", ring(0, Math.PI * 2))
      .style("fill", "var(--color-neutral)");

    // Fatia do dado
    var arcSlice = chart
      .append("path")
      .style("fill", color)
      .attr("d", ring(0, 0)); // começa vazia (0°)

    // Percentual central (sobreposto ao SVG)
    var valEl = d3
      .select(wrapper)
      .append("span")
      .attr("class", "donut__value")
      .style("color", color)
      .text("0%");

    // Label abaixo do círculo
    if (label) {
      d3.select(el)
        .append("span")
        .attr("class", "donut__label")
        .text(label);
    }

    // Gera o caminho de um anel entre dois ângulos
    function ring(startAngle, endAngle) {
      return d3
        .arc()
        .innerRadius(inner)
        .outerRadius(outer)
        .startAngle(startAngle)
        .endAngle(endAngle)();
    }

    // Animação (repete a cada entrada; reseta ao sair da tela)
    var rafId = 0;
    onEnter(
      el,
      function () {
        if (rafId) cancelAnimationFrame(rafId);
        var duration = 1000;
        var start = performance.now();
        var target = (value / 100) * Math.PI * 2;

        function tick(now) {
          var t = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - t, 3);
          arcSlice.attr("d", ring(0, target * eased));
          valEl.text(fmt(value * eased) + "%");
          rafId = t < 1 ? requestAnimationFrame(tick) : 0;
        }
        rafId = requestAnimationFrame(tick);
      },
      function () {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = 0;
        arcSlice.attr("d", ring(0, 0));
        valEl.text("0%");
      }
    );
  }

  /* ================================================================
     BAR — barras horizontais comparativas
     ================================================================ */
  function drawBar(el) {
    var rows = Array.prototype.slice.call(el.querySelectorAll(".bar-row"));

    rows.forEach(function (row) {
      var label = row.dataset.label || "";
      var value = parseFloat(row.dataset.value) || 0;
      var color = row.dataset.color || "var(--color-ink)";
      var muted = row.dataset.muted === "true";

      var labelEl = document.createElement("span");
      labelEl.className = "bar-row__label";
      labelEl.textContent = label;

      var track = document.createElement("div");
      track.className = "bar-row__track";

      var fill = document.createElement("div");
      fill.className = "bar-row__fill";
      fill.style.background = color;
      fill.style.width = "0%";

      var valEl = document.createElement("span");
      valEl.className = "bar-row__value";
      valEl.textContent = fmt(value) + "%";

      if (muted) {
        row.classList.add("bar-row--muted");
        fill.style.opacity = "0.45";
        valEl.style.opacity = "0.6";
      }

      track.appendChild(fill);
      track.appendChild(valEl);
      row.appendChild(labelEl);
      row.appendChild(track);

      onEnter(
        row,
        function () {
          fill.style.transition = "width 1100ms cubic-bezier(0.16,1,0.3,1)";
          // pequeno "repaint" para a transição sair do 0
          requestAnimationFrame(function () {
            fill.style.width = value + "%";
          });
        },
        function () {
          fill.style.width = "0%";
        }
      );
    });
  }

  /* ================================================================
     TREND — tendência qualitativa ascendente (sem valores)
     ================================================================ */
  function drawTrend(el) {
    var W = 520;
    var H = 260;
    var PAD = 40;

    var startLabel = el.dataset.startLabel || "Menor";
    var endLabel = el.dataset.endLabel || "Maior";

    var svg = d3
      .select(el)
      .append("svg")
      .attr("viewBox", "0 0 " + W + " " + H)
      .attr("role", "img")
      .attr(
        "aria-label",
        "Gráfico de tendência: a prática esportiva aumenta conforme aumentam escolaridade e renda. Dados qualitativos, sem valores numéricos."
      );

    var g = svg.append("g");

    // Eixo de base
    g.append("line")
      .attr("x1", PAD)
      .attr("y1", H - PAD)
      .attr("x2", W - PAD)
      .attr("y2", H - PAD)
      .attr("stroke", "var(--color-ink)")
      .attr("stroke-width", 2);

    // Pontos ascendentes (curva qualitativa)
    var points = [
      [0.06, 0.86],
      [0.28, 0.68],
      [0.5, 0.52],
      [0.72, 0.34],
      [0.94, 0.14]
    ];

    function px(t) {
      return PAD + t * (W - PAD * 2);
    }
    function py(t) {
      return PAD + t * (H - PAD * 2);
    }

    var dots = g
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return px(d[0]);
      })
      .attr("cy", function (d) {
        return py(d[1]);
      })
      .attr("r", 8)
      .style("fill", "var(--color-orange)")
      .style("stroke", "var(--color-paper)")
      .style("stroke-width", 2)
      .style("opacity", 0);

    // Legendas do eixo
    var axis = document.createElement("div");
    axis.className = "trend__axis";
    axis.innerHTML = "<span>" + startLabel + "</span><span>" + endLabel + "</span>";
    el.appendChild(axis);

    onEnter(
      el,
      function () {
        dots
          .transition()
          .delay(function (_, i) {
            return i * 140;
          })
          .duration(500)
          .style("opacity", 1);
      },
      function () {
        dots.interrupt().style("opacity", 0);
      }
    );
  }

  /* ================================================================
     MAP — Brasil estilizado + círculos proporcionais
     ================================================================ */
  function drawMap(el) {
    var W = 520;
    var H = 560;

    // Silhueta estilizada do Brasil (viewBox 0 0 520 560)
    var BRAZIL_PATH =
      "M148 98 L212 72 L276 60 L318 82 L336 112 L418 148 L458 178 L462 196 L442 216 L416 236 L382 280 L352 330 L330 388 L312 438 L276 486 L250 512 L236 536 L222 540 L204 520 L196 486 L186 446 L166 400 L150 344 L146 288 L152 240 L164 190 L158 150 Z";

    // Centróides aproximados por região
    var centroids = {
      Norte: [205, 120],
      Nordeste: [420, 190],
      "Centro-Oeste": [230, 255],
      Sudeste: [332, 335],
      Sul: [248, 474]
    };

    // Dados das equipes (REGRA: editar aqui quando tiver dados novos)
    var data = [
      { region: "Sudeste", value: 51.1 },
      { region: "Sul", value: 28.9 },
      { region: "Nordeste", value: 11.1 },
      { region: "Centro-Oeste", value: 5.6 },
      { region: "Norte", value: 3.3 }
    ];

    var svg = d3
      .select(el)
      .append("svg")
      .attr("viewBox", "0 0 " + W + " " + H)
      .attr("role", "img")
      .attr(
        "aria-label",
        "Mapa do Brasil com 103 perfis analisados. Distribuição por região: " +
          data
            .map(function (d) {
              return d.region + " " + fmt(d.value) + "%";
            })
            .join("; ") +
          ". 80% das equipes estão concentradas no Sul/Sudeste."
      );

    // Silhueta
    svg
      .append("path")
      .attr("d", BRAZIL_PATH)
      .style("fill", "var(--color-paper)")
      .style("stroke", "var(--color-ink)")
      .style("stroke-width", 2.5)
      .style("stroke-linejoin", "round");

    // Escala de raio proporcional (sqrt = área proporcional)
    var maxVal = d3.max(data, function (d) {
      return d.value;
    });
    var rScale = d3.scaleSqrt().domain([0, maxVal]).range([6, 30]);

    // Círculos por região
    svg
      .selectAll("circle.bra-map-dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "bra-map-dot")
      .attr("cx", function (d) {
        return centroids[d.region][0];
      })
      .attr("cy", function (d) {
        return centroids[d.region][1];
      })
      .attr("r", 0)
      .style("fill", "var(--color-teal)")
      .style("stroke", "var(--color-paper)")
      .style("stroke-width", 2);

    // Rótulos de texto sob cada círculo
    svg
      .selectAll("text.region-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "region-label")
      .attr("text-anchor", "middle")
      .attr("x", function (d) {
        return centroids[d.region][0];
      })
      .attr("y", function (d) {
        return centroids[d.region][1] + rScale(d.value) + 16;
      })
      .text(function (d) {
        return d.region + " · " + fmt(d.value) + "%";
      });

    // Legenda + fonte (fica fora do SVG, gerada pelo JS)
    var legend = document.createElement("div");
    legend.className = "map-legend";
    legend.innerHTML =
      '<span class="dot"></span><span><strong>Região:</strong> ' +
      data
        .map(function (d) {
          return d.region + " (" + fmt(d.value) + "%)";
        })
        .join(", ") +
      ".</span>";
    el.appendChild(legend);

    // Animação — círculos crescem (resetam ao sair da tela)
    onEnter(
      el,
      function () {
        svg
          .selectAll(".bra-map-dot")
          .transition()
          .delay(function (_, i) {
            return 200 + i * 160;
          })
          .duration(800)
          .ease(d3.easeCubicOut)
          .attr("r", function (d) {
            return rScale(d.value);
          });
      },
      function () {
        svg.selectAll(".bra-map-dot").interrupt().attr("r", 0);
      }
    );
  }

  /* ================================================================
     GROUPED BAR — barras agrupadas (ex.: Homens x Mulheres)
     ================================================================ */
  function drawGroupedBar(el) {
    var max = parseFloat(el.dataset.max) || 100;
    var unit = el.dataset.unit !== undefined ? el.dataset.unit : "%";
    var bars = Array.prototype.slice.call(el.querySelectorAll(".gbar__bar"));

    bars.forEach(function (bar) {
      var name = bar.dataset.name || "";
      var value = parseFloat(bar.dataset.value) || 0;
      var color = bar.dataset.color || "var(--color-ink)";

      var nameEl = document.createElement("span");
      nameEl.className = "gbar__name";
      nameEl.textContent = name;

      var track = document.createElement("div");
      track.className = "gbar__track";

      var fill = document.createElement("div");
      fill.className = "gbar__fill";
      fill.style.background = color;
      fill.style.width = "0%";
      track.appendChild(fill);

      var valEl = document.createElement("span");
      valEl.className = "gbar__value";
      valEl.textContent = fmt(value) + unit;

      bar.appendChild(nameEl);
      bar.appendChild(track);
      bar.appendChild(valEl);

      onEnter(
        bar,
        function () {
          fill.style.transition = "width 1100ms cubic-bezier(0.16,1,0.3,1)";
          requestAnimationFrame(function () {
            fill.style.width = (value / max) * 100 + "%";
          });
        },
        function () {
          fill.style.width = "0%";
        }
      );
    });
  }

  /* ================================================================
     RANGE — intervalo (mín–máx) numa escala
     ================================================================ */
  function drawRange(el) {
    var scale = (el.dataset.scale || "0,100").split(",");
    var min = parseFloat(scale[0]) || 0;
    var max = parseFloat(scale[1]) || 100;
    var unit = el.dataset.unit !== undefined ? el.dataset.unit : "%";

    function pos(v) {
      return ((v - min) / (max - min)) * 100;
    }

    var rows = Array.prototype.slice.call(el.querySelectorAll(".range__row"));

    rows.forEach(function (row) {
      var label = row.dataset.label || "";
      var lo = parseFloat(row.dataset.min) || 0;
      var hi = parseFloat(row.dataset.max) || 0;
      var color = row.dataset.color || "var(--color-purple)";

      var labelEl = document.createElement("p");
      labelEl.className = "range__row-label";
      labelEl.textContent = label;

      var track = document.createElement("div");
      track.className = "range__track";

      var segment = document.createElement("span");
      segment.className = "range__segment";
      segment.style.background = color;

      var valEl = document.createElement("span");
      valEl.className = "range__value";
      valEl.textContent = fmt(lo) + "–" + fmt(hi) + unit;

      track.appendChild(segment);
      track.appendChild(valEl);
      row.appendChild(labelEl);
      row.appendChild(track);

      onEnter(
        row,
        function () {
          var p1 = pos(lo);
          var p2 = pos(hi);
          segment.style.transition = "left 0.9s ease, width 0.9s ease";
          segment.style.left = Math.min(p1, p2) + "%";
          segment.style.width = Math.abs(p2 - p1) + "%";
          valEl.style.left = (p1 + p2) / 2 + "%";
          valEl.style.opacity = "1";
        },
        function () {
          segment.style.left = "0%";
          segment.style.width = "0%";
          valEl.style.left = "";
          valEl.style.opacity = "0";
        }
      );
    });
  }

  /* ================================================================
     PROJECTION — linha do tempo (dados + projeção)
     ================================================================ */
  var projClipSeq = 0;

  function drawProjection(el) {
    var points = Array.prototype.slice.call(
      el.querySelectorAll(".projection__point")
    );
    if (points.length === 0) return;

    var unit = el.dataset.unit !== undefined ? el.dataset.unit : "%";
    var min = parseFloat(el.dataset.scaleMin) || 0;
    var max = parseFloat(el.dataset.scaleMax) || 100;

    var W = 640;
    var H = 240;
    var PADX = 60;
    var PADY = 44;

    var data = points.map(function (p) {
      return {
        year: p.dataset.year || "",
        value: parseFloat(p.dataset.value) || 0,
        tag: p.dataset.tag || ""
      };
    });

    function x(i) {
      return PADX + (i / (data.length - 1)) * (W - PADX * 2);
    }
    function y(v) {
      return H - PADY - ((v - min) / (max - min)) * (H - PADY * 2);
    }

    var svg = d3
      .select(el)
      .append("svg")
      .attr("viewBox", "0 0 " + W + " " + H)
      .attr("role", "img")
      .attr(
        "aria-label",
        "Inatividade física em adultos: " +
          data
            .map(function (d) {
              return fmt(d.value, 0) + unit + " em " + d.year;
            })
            .join(", ") +
          "."
      );

    svg
      .append("line")
      .attr("x1", PADX)
      .attr("y1", H - PADY)
      .attr("x2", W - PADX)
      .attr("y2", H - PADY)
      .attr("stroke", "var(--color-neutral)")
      .attr("stroke-width", 2);

    // Trecho com dados (sólido) — começa "apagado", cresce na animação
    var solid = svg
      .append("path")
      .attr(
        "d",
        "M" + x(0) + " " + y(data[0].value) + " L" + x(1) + " " + y(data[1].value)
      )
      .attr("fill", "none")
      .attr("stroke", "var(--color-vermilion)")
      .attr("stroke-width", 3);

    var solidLen = solid.node().getTotalLength();
    solid.attr("stroke-dasharray", solidLen).attr("stroke-dashoffset", solidLen);

    // Trecho projetado (tracejado) — revelado por máscara na animação,
    // para o tracejado "7 7" não se perder durante o crescimento
    var clipId = "proj-clip-" + ++projClipSeq;
    var clipRect = svg
      .append("clipPath")
      .attr("id", clipId)
      .append("rect")
      .attr("x", x(1))
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", H);

    svg
      .append("path")
      .attr(
        "d",
        "M" + x(1) + " " + y(data[1].value) + " L" + x(2) + " " + y(data[2].value)
      )
      .attr("fill", "none")
      .attr("stroke", "var(--color-vermilion)")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", "7 7")
      .attr("clip-path", "url(#" + clipId + ")");

    var g = svg.selectAll("g.proj-pt").data(data).enter().append("g").attr("class", "proj-pt");

    var circles = g
      .append("circle")
      .attr("cx", function (d, i) {
        return x(i);
      })
      .attr("cy", function (d) {
        return y(d.value);
      })
      .attr("r", 0)
      .style("fill", "var(--color-paper)")
      .style("stroke", "var(--color-vermilion)")
      .style("stroke-width", 3);

    var valueText = g
      .append("text")
      .attr("x", function (d, i) {
        return x(i);
      })
      .attr("y", function (d) {
        return y(d.value) - 16;
      })
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-display)")
      .style("font-weight", 700)
      .style("font-size", "18px")
      .style("fill", "var(--color-ink)")
      .style("opacity", 0)
      .text(function (d) {
        return fmt(d.value, 0) + unit;
      });

    var yearText = g
      .append("text")
      .attr("x", function (d, i) {
        return x(i);
      })
      .attr("y", H - PADY + 28)
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-geo)")
      .style("font-size", "15px")
      .style("fill", "var(--color-gray)")
      .style("opacity", 0)
      .text(function (d) {
        return d.year + (d.tag ? " · " + d.tag : "");
      });

    // Sequência: círculo → linha cresce → círculo → tracejado cresce → círculo.
    // Cada ponto acende junto com seus dois rótulos (valor + ano).
    function showPoint(i, delay) {
      circles
        .filter(function (d, j) {
          return j === i;
        })
        .transition()
        .delay(delay)
        .duration(350)
        .ease(d3.easeCubicOut)
        .attr("r", 7);
      valueText
        .filter(function (d, j) {
          return j === i;
        })
        .transition()
        .delay(delay)
        .duration(350)
        .style("opacity", 1);
      yearText
        .filter(function (d, j) {
          return j === i;
        })
        .transition()
        .delay(delay)
        .duration(350)
        .style("opacity", 1);
    }

    onEnter(
      el,
      function () {
        if (prefersReducedMotion) {
          solid.attr("stroke-dashoffset", 0);
          clipRect.attr("width", x(2) - x(1));
          circles.attr("r", 7);
          valueText.style("opacity", 1);
          yearText.style("opacity", 1);
          return;
        }
        showPoint(0, 100);
        solid
          .transition()
          .delay(500)
          .duration(750)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);
        showPoint(1, 1300);
        clipRect
          .transition()
          .delay(1700)
          .duration(750)
          .ease(d3.easeLinear)
          .attr("width", x(2) - x(1));
        showPoint(2, 2500);
      },
      function () {
        if (prefersReducedMotion) return;
        solid.interrupt().attr("stroke-dashoffset", solidLen);
        clipRect.interrupt().attr("width", 0);
        circles.interrupt().attr("r", 0);
        valueText.interrupt().style("opacity", 0);
        yearText.interrupt().style("opacity", 0);
      }
    );
  }

  /* ================================================================
     DISPATCH — iniicia cada gráfico encontrado na página
     ================================================================ */
  function initCharts() {
    d3.selectAll("[data-chart='donut']").each(function () {
      drawDonut(this);
    });
    d3.selectAll("[data-chart='bar']").each(function () {
      drawBar(this);
    });
    d3.selectAll("[data-chart='grouped-bar']").each(function () {
      drawGroupedBar(this);
    });
    d3.selectAll("[data-chart='range']").each(function () {
      drawRange(this);
    });
    d3.selectAll("[data-chart='projection']").each(function () {
      drawProjection(this);
    });
    d3.selectAll("[data-chart='trend']").each(function () {
      drawTrend(this);
    });
    d3.selectAll("[data-chart='map']").each(function () {
      drawMap(this);
    });
    d3.selectAll("[data-chart='popslider']").each(function () {
      drawPopslider(this);
    });
  }

  /* ================================================================
     POPSLIDER — população mundial × adultos inativos, com linha do tempo
     (2010–2026 observado em rosa; 2026–2030 projeção em sálvia)
     ================================================================ */
  function drawPopslider(el) {
    var canvas = el.querySelector("[data-pop-canvas]");
    var slider = el.querySelector("input[type='range']");
    var yearEl = el.querySelector("[data-pop-year]");
    var tip = el.querySelector("[data-pop-tip]");
    if (!canvas || !slider) return;

    var dur = prefersReducedMotion ? 0 : 200;

    // Marcos (população adulta 15+): 2010 e 2022 observados;
    // 2026 e 2030 projeções. Rótulos: total "5,0 bi", inativos "1,3 bi (26%)".
    var anchors = [
      { year: 2010, total: 5.05, inactive: 1.31, pct: 26 },
      { year: 2022, total: 5.80, inactive: 1.80, pct: 31 },
      { year: 2026, total: 6.00, inactive: 1.98, pct: 33 },
      { year: 2030, total: 6.15, inactive: 2.15, pct: 35 }
    ];

    function interpolate(year) {
      for (var i = 0; i < anchors.length - 1; i++) {
        var a = anchors[i];
        var b = anchors[i + 1];
        if (year >= a.year && year <= b.year) {
          var t = (year - a.year) / (b.year - a.year);
          return {
            year: year,
            total: a.total + t * (b.total - a.total),
            inactive: a.inactive + t * (b.inactive - a.inactive),
            pct: a.pct + t * (b.pct - a.pct)
          };
        }
      }
      var edge = year < anchors[0].year ? anchors[0] : anchors[anchors.length - 1];
      return { year: year, total: edge.total, inactive: edge.inactive, pct: edge.pct };
    }

    var data = [];
    for (var yy = 2010; yy <= 2030; yy++) {
      data.push(interpolate(yy));
    }

    var W = 640;
    var H = 215;
    var ML = 30; // margem à esquerda: o "0 bi" não é mais mordido
    var MR = 16;
    var BAR_Y = 44;
    var BAR_H = 58;
    var TY = 142; // linha do tempo (anos com círculos pontilhados)
    var AXIS_Y = H - 28;
    var PINK = "var(--color-pink)"; // E8557E — até 2026
    var SAGE = "var(--color-sage)"; // 8FC9B4 — projeção até 2030

    var x = d3.scaleLinear().domain([0, 6.5]).range([ML, W - MR]);
    var xYear = d3.scaleLinear().domain([2010, 2030]).range([ML, W - MR]);

    var svg = d3
      .select(canvas)
      .append("svg")
      .attr("viewBox", "0 0 " + W + " " + H)
      .attr("role", "img")
      .attr(
        "aria-label",
        "População adulta total e adultos inativos, 2010 a 2030. Linha do tempo: 2010 a 2026 observado, 2026 a 2030 projeção. Use o controle de ano para ver cada valor."
      );

    // Linha do tempo em dois trechos, junto ao slider (sem trilha atrás).
    svg
      .append("line")
      .attr("x1", xYear(2010))
      .attr("y1", TY)
      .attr("x2", xYear(2026))
      .attr("y2", TY)
      .attr("stroke", PINK)
      .attr("stroke-width", 5)
      .attr("stroke-linecap", "round");
    svg
      .append("line")
      .attr("x1", xYear(2026))
      .attr("y1", TY)
      .attr("x2", xYear(2030))
      .attr("y2", TY)
      .attr("stroke", SAGE)
      .attr("stroke-width", 5)
      .attr("stroke-linecap", "round");

    // Marcos em destaque: círculos pontilhados, clicáveis (pulam o slider).
    var dots = svg
      .selectAll("circle.pop-year")
      .data(anchors)
      .enter()
      .append("circle")
      .attr("class", "pop-year")
      .attr("cx", function (d) {
        return xYear(d.year);
      })
      .attr("cy", TY)
      .attr("r", 7.5)
      .style("fill", function (d) {
        return d.year >= 2026 ? SAGE : PINK;
      })
      .style("stroke", "var(--color-paper)")
      .style("stroke-width", 2.5)
      .style("stroke-dasharray", "1.5 2.5")
      .style("cursor", "pointer")
      .on("click", function (event, d) {
        slider.value = d.year;
        slider.dispatchEvent(new Event("input"));
      });

    svg
      .selectAll("text.pop-year-label")
      .data(anchors)
      .enter()
      .append("text")
      .attr("class", "pop-year-label")
      .attr("x", function (d) {
        return xYear(d.year);
      })
      .attr("y", TY - 16)
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-geo)")
      .style("font-size", "13px")
      .style("fill", "var(--color-ink)")
      .text(function (d) {
        return d.year;
      });

    var axisG = svg
      .append("g")
      .attr("transform", "translate(0," + AXIS_Y + ")")
      .call(
        d3.axisBottom(x).ticks(9).tickFormat(function (d) {
          return d + " bi";
        })
      );
    axisG
      .selectAll("text")
      .style("font-family", "var(--font-geo)")
      .style("font-size", "12px")
      .style("fill", "var(--color-gray)");
    axisG.selectAll("line").style("stroke", "var(--color-neutral)");
    axisG.select(".domain").style("stroke", "var(--color-neutral)");

    // Barra: fundo = total adulto (slate), frente = inativos (vermilion).
    var barBg = svg
      .append("rect")
      .attr("x", x(0))
      .attr("y", BAR_Y)
      .attr("width", 0)
      .attr("height", BAR_H)
      .attr("rx", 8)
      .style("fill", "var(--color-slate)")
      .attr("opacity", 0.9);

    var barFg = svg
      .append("rect")
      .attr("x", x(0))
      .attr("y", BAR_Y)
      .attr("width", 0)
      .attr("height", BAR_H)
      .attr("rx", 8)
      .style("fill", "var(--color-vermilion)");

    // Rótulos fora/acima, no padrão original.
    var labelTotal = svg
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-family", "var(--font-geo)")
      .style("font-weight", 600)
      .style("font-size", "13px")
      .style("fill", "var(--color-ink)");

    var labelInact = svg
      .append("text")
      .style("font-size", "13px")
      .style("font-weight", "bold");

    function render(d) {
      var bgW = Math.max(0, x(d.total) - x(0));
      var fgW = Math.max(0, x(d.inactive) - x(0));
      barBg.transition().duration(dur).attr("width", bgW);
      barFg.transition().duration(dur).attr("width", fgW);
      labelTotal
        .transition()
        .duration(dur)
        .attr("x", x(d.total))
        .attr("y", BAR_Y - 10)
        .text(fmt(d.total, 1) + " bi");
      // Inativos "1,3 bi (26%)": dentro da barra se couber, senão acima.
      var iLabel = fmt(d.inactive, 1) + " bi (" + Math.round(d.pct) + "%)";
      var cssW = (fgW / W) * (canvas.clientWidth || W);
      labelInact.text(iLabel);
      if (cssW > iLabel.length * 7.2 + 20) {
        labelInact
          .transition()
          .duration(dur)
          .attr("x", x(0) + fgW / 2)
          .attr("y", BAR_Y + BAR_H / 2 + 4.5)
          .style("text-anchor", "middle")
          .style("fill", "var(--color-paper)");
      } else {
        labelInact
          .transition()
          .duration(dur)
          .attr("x", x(0) + fgW)
          .attr("y", BAR_Y - 10)
          .style("text-anchor", "middle")
          .style("fill", "var(--color-ink)");
      }
      if (yearEl) yearEl.textContent = d.year + (d.year >= 2026 ? " · projeção" : "");
      dots
        .attr("stroke", function (dd) {
          return dd.year === d.year ? "var(--color-ink)" : "var(--color-paper)";
        })
        .attr("stroke-width", function (dd) {
          return dd.year === d.year ? 3 : 2;
        });
    }

    function datumFor(year) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].year === year) return data[i];
      }
      return data[0];
    }

    slider.addEventListener("input", function () {
      var year = parseInt(slider.value, 10);
      if (yearEl) yearEl.textContent = year;
      render(datumFor(year));
    });

    function showTip(evt) {
      if (!tip) return;
      var d = datumFor(parseInt(slider.value, 10));
      var rect = svg.node().getBoundingClientRect();
      var pt = d3.pointer(evt, svg.node());
      tip.innerHTML =
        "<strong>" +
        d.year +
        (d.year >= 2026 ? " · projeção" : "") +
        "</strong><br>População adulta: " +
        fmt(d.total, 1) +
        " bi<br>Inativos: " +
        fmt(d.inactive, 1) +
        " bi (" +
        Math.round(d.pct) +
        "%)";
      tip.style.opacity = "1";
      tip.style.left = (pt[0] / W) * rect.width + 14 + "px";
      tip.style.top = Math.max(0, (pt[1] / H) * rect.height - 10) + "px";
    }

    function hideTip() {
      if (tip) tip.style.opacity = "0";
    }

    barBg.on("mousemove", showTip).on("mouseleave", hideTip);
    barFg.on("mousemove", showTip).on("mouseleave", hideTip);

    render(datumFor(parseInt(slider.value, 10)));
  }

  initCharts();
});