import { sourceLabel } from "../data/sources";

/** Builds an element from an HTML string. */
export function fromHTML<T extends HTMLElement = HTMLElement>(html: string): T {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild as T;
}

/** Renderiza a eyebrow e o título dentro do header de seção. */
export function sectionHead(
  title: string,
  eyebrow?: string,
  level: 2 | 3 = 2
): HTMLElement {
  const head = document.createElement("div");
  head.className = "section-head reveal";
  if (eyebrow) {
    const e = document.createElement("span");
    e.className = "eyebrow";
    e.textContent = eyebrow;
    head.appendChild(e);
  }
  const h = document.createElement(`h${level}`);
  h.className = "section-title";
  h.textContent = title;
  head.appendChild(h);
  return head;
}

/** Linha "Fonte: ..." reutilizável. */
export function SourceLabel(sourceKey: string): HTMLElement {
  const el = document.createElement("p");
  el.className = "stat__source";
  el.textContent = `Fonte: ${sourceLabel(sourceKey)}`;
  return el;
}

/** Linha divisória editorial. */
export function Divider(): HTMLElement {
  return fromHTML<HTMLElement>(`<hr class="divider" />`);
}

export interface IllustrationBlockOptions {
  size: "large" | "medium" | "small";
  /** Descrição da ilustração (direção de arte). */
  art: string;
  /** Texto alternativo acessível. */
  alt: string;
}

/**
 * Espaço reservado para ilustração editorial.
 * Na fase de direção de arte o conteúdo vira SVG vetorial,
 * mas a estrutura e o `alt` já ficam prontos.
 */
export function IllustrationBlock({
  size,
  art,
  alt
}: IllustrationBlockOptions): HTMLElement {
  const fig = document.createElement("figure");
  fig.className = `illustration illustration--${size} reveal`;
  fig.setAttribute("role", "img");
  fig.setAttribute("aria-label", alt);

  const cap = document.createElement("figcaption");
  cap.className = "illustration__art";
  cap.style.fontFamily = "var(--font-display)";
  cap.style.textTransform = "uppercase";
  cap.style.fontSize = "0.9rem";
  cap.style.letterSpacing = "0.08em";
  cap.textContent = art;

  fig.appendChild(cap);
  return fig;
}
