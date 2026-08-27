import { formatPercent, onEnterView, prefersReducedMotion } from "./util";

export interface StatNumberProps {
  /** Valor entre 0 e 100 (percentual). */
  value: number;
  /** Texto que contextualiza o número. */
  label: string;
  /** Chave da fonte em `sources`. */
  source: string;
  /** Cor (CSS var) usada para o número. */
  color: string;
  /** Rótulo das unidades, ex.: "%". Padrão "%". */
  unit?: string;
}

/**
 * Número gigante editorial — nunca exibe o número sem contexto.
 * Anima uma contagem de 0 até o valor quando entra no viewport.
 */
export function StatNumber({
  value,
  label,
  source,
  color,
  unit = "%"
}: StatNumberProps): HTMLElement {
  const root = document.createElement("div");
  root.className = "stat reveal";

  const num = document.createElement("span");
  num.className = "stat-number";
  num.style.color = color;
  num.textContent = `0${unit}`;
  num.setAttribute("aria-label", formatPercent(value) + unit);

  const lab = document.createElement("p");
  lab.className = "stat__label";
  lab.textContent = label;

  const src = document.createElement("p");
  src.className = "stat__source";
  src.textContent = `Fonte: ${source}`;

  root.append(num, lab, src);

  const animate = () => {
    if (prefersReducedMotion()) {
      num.textContent = formatPercent(value) + unit;
      return;
    }
    const from = 0;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      num.textContent = formatPercent(from + (value - from) * eased) + unit;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  onEnterView(root, animate);

  return root;
}
