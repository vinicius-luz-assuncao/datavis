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
  /* Fica a postos para executar quando o elemento entra no viewport.  */
  /* ---------------------------------------------------------------- */
  function onEnter(el, cb, once) {
    if (prefersReducedMotion) {
      cb();
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            cb();
            if (once !== false) observer.disconnect();
          }
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

    // Animação
    onEnter(el, function () {
      var duration = 1000;
      var start = performance.now();
      var target = (value / 100) * Math.PI * 2;

      function tick(now) {
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        arcSlice.attr("d", ring(0, target * eased));
        valEl.text(fmt(value * eased) + "%");
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
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

      track.appendChild(fill);
      track.appendChild(valEl);
      row.appendChild(labelEl);
      row.appendChild(track);

      onEnter(row, function () {
        fill.style.transition = "width 1100ms cubic-bezier(0.16,1,0.3,1)";
        // pequeno "repaint" para a transição sair do 0
        requestAnimationFrame(function () {
          fill.style.width = value + "%";
        });
      });
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

    onEnter(el, function () {
      dots
        .transition()
        .delay(function (_, i) {
          return i * 140;
        })
        .duration(500)
        .style("opacity", 1);
    });
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

    // Animação — círculos crescem
    onEnter(el, function () {
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
    });
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
    d3.selectAll("[data-chart='trend']").each(function () {
      drawTrend(this);
    });
    d3.selectAll("[data-chart='map']").each(function () {
      drawMap(this);
    });
  }

  initCharts();
});