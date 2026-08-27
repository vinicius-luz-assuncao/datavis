/**
 * Números citados na landing page.
 * Cada número está amparado pela fonte correspondente em `sources.ts`.
 * Regra: não inventar valores. Tendências qualitativas não viram números.
 */
export const statistics = {
  /** % da amostra LGBTQIA+ sem acesso ao esporte */
  lgbtqiaNoAccess: 42.8,
  /** % que sofreu ou presenciou discriminação em ambientes esportivos */
  discrimination: 63.5,
  /** % da população geral que não pratica esporte */
  generalInactive: 76,
  /** % de homens que praticam esporte */
  menPractice: 42.7,
  /** % de mulheres que praticam esporte */
  womenPractice: 33.4,
  /** % que considera esporte muito importante para a comunidade */
  sportImportance: 76.8,
  /** % que admira atletas assumidos */
  admireAthletes: 95.8
} as const;

/** Total de perfis/equipes LGBTQIA+ analisados no mapeamento regional. */
export const teamProfilesTotal = 103;

/** Distribuição regional de equipes esportivas LGBTQIA+ (% por região). */
export const regionalDistribution: Array<{ region: string; value: number }> = [
  { region: "Sudeste", value: 51.1 },
  { region: "Sul", value: 28.9 },
  { region: "Nordeste", value: 11.1 },
  { region: "Centro-Oeste", value: 5.6 },
  { region: "Norte", value: 3.3 }
];

/** Concentração Sul + Sudeste (leitura visual derivada dos dados acima). */
export const southernConcentration = regionalDistribution
  .filter((r) => r.region === "Sudeste" || r.region === "Sul")
  .reduce((a, r) => a + r.value, 0);
