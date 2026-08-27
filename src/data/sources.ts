export interface Source {
  name: string;
  year: number;
  sample?: number;
  limitation: string;
}

/**
 * Fontes utilizadas na landing page.
 * Regra: nenhum dado deve existir sem fonte associada.
 */
export const sources: Record<string, Source> = {
  oms: {
    name: "OMS",
    year: 2024,
    limitation:
      "Dados globais sobre atividade física. Não apresenta recorte específico LGBTQIA+."
  },
  pnad: {
    name: "PNAD / IBGE",
    year: 2015,
    limitation:
      "Dados nacionais sobre prática esportiva. Não apresenta orientação sexual ou identidade de gênero."
  },
  nikeNix: {
    name: "Nike/Nix",
    year: 2021,
    sample: 1037,
    limitation:
      "Amostra de 1.037 pessoas LGBTQIA+. Amostra não probabilística. Não generalizar para toda a população."
  },
  lopesDelVecchio: {
    name: "Lopes & Del Vecchio",
    year: 2026,
    limitation:
      "Estudo com foco em jovens e ambiente escolar. Não representa toda a população brasileira."
  },
  tesserKovaleski: {
    name: "Tesser & Kovaleski",
    year: 2023,
    limitation:
      "Mapeamento de equipes esportivas LGBTQIA+. Analisa equipes/perfis, não indivíduos."
  }
};

/** Retorna uma string "Nome, Ano" pronta para o label de fonte. */
export function sourceLabel(key: keyof typeof sources): string {
  const s = sources[key];
  return `${s.name}, ${s.year}`;
}
