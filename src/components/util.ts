/**
 * Observadores de animação — revelam elementos quando entram no viewport.
 * Respeita `prefers-reduced-motion`.
 */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Aplica a classe `.is-visible` a cada elemento `.reveal` quando ele
 * cruza o viewport. Com reduced motion, mostra tudo imediatamente.
 */
export function initReveal(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  if (items.length === 0) return;

  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/**
 * Fica a postos para animar um elemento assim que ele entrar no viewport.
 * Retorna uma função para cancelar.
 */
export function onEnterView(
  el: Element,
  callback: () => void,
  once = true
): () => void {
  if (prefersReducedMotion()) {
    callback();
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          if (once) observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(el);
  return () => observer.disconnect();
}

/** Formata número decimal pt-BR com um dígito após a vírgula. */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
}
