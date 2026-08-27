/**
 * Ícones editoriais em SVG inline (traço simples, paleta herdada).
 * Usados no fluxo de barreiras e no bloco final.
 */
export type IconName =
  | "heart"
  | "group"
  | "institution"
  | "participation"
  | "barrier"
  | "fear"
  | "isolation";

const STROKE = "stroke=\"currentColor\" stroke-width=\"1.4\" fill=\"none\"";

const PATHS: Record<IconName, string> = {
  heart: `<path ${STROKE} stroke-linecap="round" stroke-linejoin="round" d="M12 20.5C7.2 16.6 3 12.9 3 8.9 3 6.2 5.2 4 8 4c1.6 0 3 .7 4 2 1-1.3 2.4-2 4-2 2.8 0 5 2.2 5 4.9 0 4-4.2 7.7-9 11.6Z"/>`,
  group: `<circle ${STROKE} cx="8" cy="8.5" r="2.6"/><circle ${STROKE} cx="16" cy="8.5" r="2.6"/><path ${STROKE} stroke-linecap="round" d="M3.5 18c.6-2.7 2.3-4.4 4.5-4.4S12 15.3 12.5 18"/><path ${STROKE} stroke-linecap="round" d="M11.5 18c.6-2.7 2.3-4.4 4.5-4.4S19.9 15.3 20.5 18"/>`,
  institution: `<path ${STROKE} stroke-linejoin="round" d="M4 8.5 12 4l8 4.5"/><path ${STROKE} d="M5.5 10v6M9.3 10v6M14.7 10v6M18.5 10v6"/><path ${STROKE} stroke-linecap="round" d="M4 19h16"/>`,
  participation: `<circle ${STROKE} cx="12" cy="5.2" r="2.2"/><path ${STROKE} stroke-linecap="round" stroke-linejoin="round" d="M6.5 20l3.2-6.5 1.8 2 1.8-5M14.6 12.6l2.9 3.4 2-2.6"/>`,
  barrier: `<path ${STROKE} stroke-linecap="round" d="M6 4 18 20M6 4l-2 2M20 6l-2 2M5 19l2-2M18 19l2-2"/>`,
  fear: `<path ${STROKE} stroke-linecap="round" stroke-linejoin="round" d="M7 6c2.8-2.2 7.2-2.2 10 0M7 8.5c2.8-1.8 7.2-1.8 10 0M8.5 11.5c2-1.2 5-1.2 7 0M10 14.5h4"/><path ${STROKE} d="M12 17.5v.01"/>`,
  isolation: `<circle ${STROKE} cx="6" cy="7.5" r="1.6"/><path ${STROKE} stroke-linecap="round" d="M4 17c.4-2.6 1.4-4.2 2.6-4.2M20 6.5c-3.5 0-6 2.2-6.6 5.5l-.5 2.5"/><circle ${STROKE} cx="18" cy="12.5" r="1.4"/><path ${STROKE} stroke-linecap="round" d="M14 20l4.5-3.5M20 20l-2.5-4"/>`
};

export function icon(name: IconName): string {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${PATHS[name]}</svg>`;
}
