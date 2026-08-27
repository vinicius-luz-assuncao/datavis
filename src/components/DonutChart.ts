import * as d3 from "d3";
import { formatPercent, onEnterView, prefersReducedMotion } from "./util";

export interface DonutChartProps {
  /** Percentual do dado (0–100). */
  value: number;
  /** Texto curto da fatia (ex.: da amostra não tem acesso). */
  label: string;
  /** Chave da fonte em `sources`. */
  source: string;
  /** Cor (CSS var) da fatia. */
  color: string;
  /** Descrição textual acessível. */
  description?: string;
}

const SIZE = 280;
const INNER_RADIUS = 0.66;
const OUTER_RADIUS = 0.96;

/**
 * Gráfico de rosca (donut) em SVG — percentual no centro, resto neutro.
 * Animação do ângulo de 0° até o valor quando entra no viewport.
 */
export function DonutChart({
  value,
  label,
  source,
  color,
  description
}: DonutChartProps): HTMLElement {
  const root = document.createElement("div");
  root.className = "chart donut reveal";

  const svgWrap = document.createElement("div");
  const svg = svgWrap.appendChild(
    document.createElementNS("http://www.w3.org/2000/svg", "svg")
  );
  svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    description ||
      `Gráfico de rosca: ${formatPercent(value)}% — ${label}. Fonte: ${source}.`
  );
  svg.classList.add("chart__svg");

  const radius = (SIZE / 2) * OUTER_RADIUS;
  const innerRadius = (SIZE / 2) * INNER_RADIUS;

  const g = d3.select(svg).append("g").attr("transform", `translate(${SIZE / 2},${SIZE / 2})`);

  const arcBg = g
    .append("path")
    .attr("d", d3.arc()({ innerRadius, outerRadius: radius, startAngle: 0, endAngle: Math.PI * 2 } as any))
    .attr("fill", "var(--color-neutral)")
    .attr("stroke", "var(--color-paper)")
    .attr("stroke-width", "2");

  const arc = g
    .append("path")
    .attr("fill", color)
    .attr("stroke", "var(--color-paper)")
    .attr("stroke-width", "2")
    .attr("d", arcBg.attr("d")); // começa vazio/invisível

  const center = document.createElement("div");
  center.className = "donut__center";

  const valEl = document.createElement("span");
  valEl.className = "donut__value";
  valEl.textContent = "0%";
  valEl.style.color = color;

  const labelEl = document.createElement("span");
  labelEl.className = "donut__label";
  labelEl.textContent = label;

  const srcEl = document.createElement("span");
  srcEl.className = "donut__source";
  srcEl.textContent = `Fonte: ${source}`;

  center.append(valEl, labelEl, srcEl);
  root.append(svgWrap, center);

  const animate = () => {
    if (prefersReducedMotion()) {
      valEl.textContent = formatPercent(value) + "%";
      return;
    }
    const duration = 1000;
    const start = performance.now();
    const target = (value / 100) * Math.PI * 2;
    const arcGen = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(radius);
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const end = target * eased;
      arc.attr("d", arcGen({ startAngle: 0, endAngle: end } as any));
      valEl.textContent = formatPercent(value * eased) + "%";
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  onEnterView(root, animate);

  return root;
}
