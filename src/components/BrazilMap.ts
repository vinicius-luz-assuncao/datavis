import * as d3 from "d3";
import { formatPercent, onEnterView, prefersReducedMotion } from "./util";
import { sources } from "../data/sources";

export interface RegionDatum {
  region: string;
  value: number;
}

export interface BrazilMapProps {
  data: RegionDatum[];
  total: number;
  totalLabel: string;
  highlight: string;
  sourceKey: string;
  legendTitle: string;
}

const WIDTH = 520;
const HEIGHT = 560;

/** Silhueta estilizada do Brasil (viewBox 0 0 520 560). */
const BRAZIL_PATH =
  "M148 98 L212 72 L276 60 L318 82 L336 112 L418 148 L458 178 L462 196 L442 216 L416 236 L382 280 L352 330 L330 388 L312 438 L276 486 L250 512 L236 536 L222 540 L204 520 L196 486 L186 446 L166 400 L150 344 L146 288 L152 240 L164 190 L158 150 Z";

/** Centróides aproximados por região, dentro do viewBox. */
const REGION_POINT: Record<string, [number, number]> = {
  Norte: [205, 120],
  Nordeste: [420, 190],
  "Centro-Oeste": [230, 255],
  Sudeste: [332, 335],
  Sul: [248, 474]
};

/**
 * Mapa editorial do Brasil em SVG com círculos proporcionais por região.
 * Sem mapa coroplético: a área representa quantidade de equipes/perfis.
 */
export function BrazilMap({
  data,
  total,
  totalLabel,
  highlight,
  sourceKey,
  legendTitle
}: BrazilMapProps): HTMLElement {
  const root = document.createElement("div");
  root.className = "chart brazil-map reveal";

  const max = d3.max(data, (d) => d.value) ?? 1;
  const radius = d3.scaleSqrt().domain([0, max]).range([6, 30]);

  const svgWrap = document.createElement("div");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    `Mapa do Brasil com ${total} ${totalLabel}. Distribuição de equipes por região: ${data
      .map((d) => `${d.region} ${formatPercent(d.value)}%`)
      .join("; ")}. ${highlight}`
  );
  svg.classList.add("chart__svg");

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const mk = (tag: string, attrs: Record<string, string | number>): SVGElement => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) el.setAttribute(k, String(attrs[k]));
    return el;
  };

  // Silhueta do país
  g.appendChild(
    mk("path", {
      d: BRAZIL_PATH,
      fill: "var(--color-paper)",
      stroke: "var(--color-ink)",
      "stroke-width": 2.5,
      "stroke-linejoin": "round"
    })
  );

  // Círculos proporcionais por região
  const circles: Array<SVGCircleElement & { dataset: { target: string } }> = [];
  data.forEach((d) => {
    const [cx, cy] = REGION_POINT[d.region] ?? [WIDTH / 2, HEIGHT / 2];
    const r = radius(d.value);

    const text = mk("text", {
      x: cx,
      y: cy + r + 16,
      "text-anchor": "middle",
      class: "region-label"
    });
    text.textContent = `${d.region} · ${formatPercent(d.value)}%`;

    const dot = mk("circle", {
      cx,
      cy,
      r: 0,
      fill: "var(--color-teal)",
      stroke: "var(--color-paper)",
      "stroke-width": 2
    }) as SVGCircleElement & { dataset: { target: string } };
    dot.dataset.target = String(r);

    // Tap/hover acessível: realça a região
    dot.setAttribute("role", "presentation");

    circles.push(dot);
    g.appendChild(dot);
    g.appendChild(text);
  });

  svg.appendChild(g);
  svgWrap.appendChild(svg);
  root.appendChild(svgWrap);

  // Legenda de intensidade + destaque
  const legend = document.createElement("div");
  legend.className = "map-legend";
  legend.innerHTML = `<span class="dot"></span><span><strong>${legendTitle}:</strong> ${data
    .map((d) => `${d.region} (${formatPercent(d.value)}%)`)
    .join(", ")}.</span>`;
  root.appendChild(legend);

  const southSum = data
    .filter((d) => d.region === "Sudeste" || d.region === "Sul")
    .reduce((a, d) => a + d.value, 0);

  const highlightEl = document.createElement("div");
  highlightEl.className = "editorial-callout";
  highlightEl.innerHTML = `<span class="stat-number" style="color: var(--color-magenta); font-size: clamp(3rem, 7vw, 6rem);">${formatPercent(
    southSum
  )}%</span><p class="stat__label">${highlight}</p>`;
  root.appendChild(highlightEl);

  const src = document.createElement("p");
  src.className = "stat__source";
  src.textContent = `Fonte: ${sources[sourceKey].name}, ${sources[sourceKey].year}.`;
  root.appendChild(src);

  const animate = () => {
    if (prefersReducedMotion()) {
      circles.forEach((c) => c.setAttribute("r", c.dataset.target));
      return;
    }
    circles.forEach((c, i) => {
      setTimeout(() => {
        c.style.transition = "r 800ms cubic-bezier(0.16,1,0.3,1)";
        c.setAttribute("r", c.dataset.target);
      }, 200 + i * 160);
    });
  };

  onEnterView(root, animate);

  return root;
}
