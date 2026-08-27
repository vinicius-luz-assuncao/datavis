import { onEnterView, prefersReducedMotion } from "./util";

export interface TrendChartProps {
  /** Rótulo para o início do eixo (menor escolaridade/renda). */
  startLabel: string;
  /** Rótulo para o fim do eixo (maior escolaridade/renda). */
  endLabel: string;
  /** Aviso de que é uma tendência qualitativa. */
  note: string;
}

const WIDTH = 520;
const HEIGHT = 260;
const PAD = 40;

/**
 * Gráfico de tendência qualitativa (sem valores inventados).
 * Representa apenas o crescimento da prática conforme escolaridade/renda.
 */
export function TrendChart({
  startLabel,
  endLabel,
  note
}: TrendChartProps): HTMLElement {
  const root = document.createElement("div");
  root.className = "chart trend reveal";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    "Gráfico de tendência: a prática esportiva aumenta conforme aumentam escolaridade e renda. Dados qualitativos, sem valores numéricos."
  );
  svg.classList.add("chart__svg");

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svg.appendChild(g);

  const points = [
    [0.05, 0.86],
    [0.28, 0.68],
    [0.5, 0.52],
    [0.72, 0.34],
    [0.95, 0.14]
  ];

  const x = (t: number) => PAD + t * (WIDTH - PAD * 2);
  const y = (t: number) => PAD + t * (HEIGHT - PAD * 2);

  const mk = (
    tag: string,
    attrs: Record<string, string | number>
  ): SVGElement => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const k in attrs) el.setAttribute(k, String(attrs[k]));
    return el;
  };

  // Linha de base / eixo
  g.appendChild(
    mk("line", {
      x1: PAD,
      y1: HEIGHT - PAD,
      x2: WIDTH - PAD,
      y2: HEIGHT - PAD,
      stroke: "var(--color-ink)",
      "stroke-width": "2"
    })
  );

  // Dots ascendentes (acessível via aria-label do svg)
  const dots = points.map(([px, py]) => {
    const dot = mk("circle", {
      cx: x(px),
      cy: y(py),
      r: "8",
      fill: "var(--color-orange)",
      stroke: "var(--color-paper)",
      "stroke-width": "2"
    });
    dot.style.opacity = "0";
    g.appendChild(dot);
    return dot;
  });

  root.appendChild(svg);

  const axis = document.createElement("div");
  axis.className = "trend__axis";
  axis.innerHTML = `<span>${startLabel}</span><span>${endLabel}</span>`;
  root.appendChild(axis);

  const noteEl = document.createElement("p");
  noteEl.className = "small-note";
  noteEl.style.marginTop = "var(--space-sm)";
  noteEl.textContent = note;
  root.appendChild(noteEl);

  const animate = () => {
    if (prefersReducedMotion()) {
      dots.forEach((d) => (d.style.opacity = "1"));
      return;
    }
    dots.forEach((dot, i) => {
      setTimeout(() => {
        dot.style.transition = "opacity 500ms ease";
        dot.style.opacity = "1";
      }, i * 140);
    });
  };

  onEnterView(root, animate);

  return root;
}
