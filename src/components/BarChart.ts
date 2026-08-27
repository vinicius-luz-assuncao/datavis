import { formatPercent, onEnterView, prefersReducedMotion } from "./util";

export interface BarChartItem {
  label: string;
  value: number;
  color: string;
}

export interface BarChartProps {
  data: BarChartItem[];
  source: string;
  /** Descrição textual acessível do gráfico. */
  description: string;
}

/**
 * Gráfico de barras horizontal comparativo (HTML + CSS, responsivo).
 * As barras crescem de 0% até o valor quando entram no viewport.
 */
export function BarChart({ data, source, description }: BarChartProps): HTMLElement {
  const root = document.createElement("div");
  root.className = "chart bar-chart reveal";

  const chart = document.createElement("div");
  chart.className = "bar-chart";
  chart.setAttribute("role", "img");
  chart.setAttribute(
    "aria-label",
    `Gráfico de barras. ${description} Valores: ${data
      .map((d) => `${d.label}: ${formatPercent(d.value)}%`)
      .join("; ")}.`
  );

  const rows = data.map((d) => {
    const row = document.createElement("div");
    row.className = "bar-chart__row";

    const label = document.createElement("span");
    label.className = "bar-chart__label";
    label.textContent = d.label;

    const track = document.createElement("div");
    track.className = "bar-chart__track";

    const fill = document.createElement("div");
    fill.className = "bar-chart__fill";
    fill.style.background = d.color;
    fill.style.width = "0%";

    const value = document.createElement("span");
    value.className = "bar-chart__value";
    value.textContent = `${formatPercent(d.value)}%`;

    track.append(fill, value);
    row.append(label, track);
    return { row, fill, value: d };
  });

  rows.forEach(({ row }) => chart.appendChild(row));

  const caption = document.createElement("p");
  caption.className = "stat__source small-note";
  caption.textContent = `Fonte: ${source}. ${description}`;

  root.append(chart, caption);

  const animate = () => {
    if (prefersReducedMotion()) {
      rows.forEach(({ fill, value }) => {
        fill.style.transition = "none";
        fill.style.width = `${value.value}%`;
      });
      return;
    }
    rows.forEach(({ fill }) => {
      fill.style.transition = "width 1100ms cubic-bezier(0.16,1,0.3,1)";
      requestAnimationFrame(() => {
        fill.style.width = `${fill.dataset.target}%`;
      });
    });
  };

  // Guardamos o alvo no dataset para ler no animate.
  rows.forEach(({ fill, value }) => {
    fill.dataset.target = String(value.value);
  });

  onEnterView(root, animate);

  return root;
}
