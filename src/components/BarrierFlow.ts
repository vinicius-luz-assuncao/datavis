import { icon, IconName } from "./Icon";

export interface FlowStep {
  icon: IconName;
  keyword: string;
  description: string;
}

export interface BarrierFlowProps {
  items: string[];
  flow: FlowStep[];
}

/**
 * Bloco de barreiras: linha de obstáculos + fluxo de exclusão
 * (BARREIRA → MEDO → ISOLAMENTO → MENOR PARTICIPAÇÃO).
 */
export function BarrierFlow({ items, flow }: BarrierFlowProps): HTMLElement {
  const root = document.createElement("div");
  root.className = "reveal";

  // Lista de barreiras ambientais
  const list = document.createElement("ul");
  list.className = "barrier-list";
  list.style.cssText =
    "display:flex;flex-wrap:wrap;gap:var(--space-sm);margin-bottom:var(--space-xl);";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.style.cssText =
      "border:2px solid var(--color-ink);padding:0.5rem 1rem;font-family:var(--font-display);font-weight:800;text-transform:uppercase;font-size:0.95rem;background:var(--color-paper);";
    li.textContent = item;
    list.appendChild(li);
  });
  root.appendChild(list);

  // Fluxo de exclusão
  const flowEl = document.createElement("div");
  flowEl.className = "barrier-flow";
  flow.forEach((step) => {
    const el = document.createElement("div");
    el.className = "barrier-step";
    el.innerHTML = `
      <span class="barrier-step__icon">${icon(step.icon)}</span>
      <span class="barrier-step__keyword">${step.keyword}</span>
      <span class="barrier-step__desc">${step.description}</span>
    `;
    flowEl.appendChild(el);
  });
  root.appendChild(flowEl);

  return root;
}
