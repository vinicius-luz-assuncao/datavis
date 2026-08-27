/**
 * Conteúdo editorial das seções, separado da apresentação.
 * Títulos, textos e metadados textuais vivem aqui.
 */
export const content = {
  hero: {
    eyebrow: "Saúde e Direitos",
    title: "Esporte como direito: quem fica de fora e por quê?",
    question:
      "Por que, mesmo sabendo que o esporte salva vidas, tantas pessoas ainda estão fora dele?"
  },

  intro: {
    headline:
      "A prática esportiva é essencial para a saúde, mas não é acessível a todos.",
    body:
      "Mulheres, pessoas de baixa renda e, especialmente, a população LGBTQIA+ enfrentam barreiras que vão além da infraestrutura — são barreiras culturais, sociais e discriminatórias."
  },

  gender: {
    title: "Quem pratica mais?",
    data: [
      { label: "Homens", value: 42.7, key: "menPractice" as const },
      { label: "Mulheres", value: 33.4, key: "womenPractice" as const }
    ],
    insight:
      "Homens apresentam uma taxa de prática esportiva maior que mulheres."
  },

  socioeconomic: {
    title: "O acesso também depende das condições sociais.",
    message:
      "A prática esportiva aumenta conforme aumentam escolaridade e renda.",
    qualitativeNote:
      "Tendência qualitativa: a fonte não fornece percentuais por faixa. O gráfico representa apenas a existência da tendência, sem inventar valores."
  },

  lgbtqia: {
    title: "Quando o problema não é falta de interesse.",
    body:
      "Para parte da população LGBTQIA+, a exclusão não acontece apenas porque faltam espaços ou oportunidades. Ela também acontece quando o espaço esportivo deixa de ser percebido como seguro.",
    access: {
      label: "da amostra não tem acesso ao esporte",
      sourceKey: "nikeNix" as const
    },
    discrimination: {
      label: "sofreu ou presenciou discriminação",
      sourceKey: "nikeNix" as const
    },
    methodologicalNote:
      "42,8% não significa que 42,8% abandonaram o esporte. O estudo mede acesso, hábitos e experiências da amostra pesquisada."
  },

  interest: {
    title: "O interesse existe. O que falta é acolhimento.",
    data: [
      {
        value: 76.8,
        label: "considera o esporte “muito importante” para a comunidade",
        sourceKey: "nikeNix" as const
      },
      {
        value: 95.8,
        label: "admira atletas assumidos",
        sourceKey: "nikeNix" as const
      }
    ]
  },

  barriers: {
    title: "Às vezes, o espaço também afasta.",
    sourceKey: "lopesDelVecchio" as const,
    items: [
      "Bullying",
      "Vestiários inadequados",
      "Falta de segurança",
      "Isolamento",
      "Falta de apoio"
    ],
    flow: [
      {
        icon: "barrier",
        keyword: "Barreira",
        description: "O espaço não acolhe a pessoa."
      },
      {
        icon: "fear",
        keyword: "Medo",
        description: "A pessoa evita participar."
      },
      {
        icon: "isolation",
        keyword: "Isolamento",
        description: "A distância do esporte cresce."
      },
      {
        icon: "participation",
        keyword: "Menor participação",
        description: "O direito fica de fora."
      }
    ]
  },

  regional: {
    title: "Onde estão as equipes LGBTQIA+?",
    totalLabel: "perfis analisados",
    legendTitle: "Região",
    highlight: "das equipes estão concentradas no Sul/Sudeste."
  },

  conclusion: {
    title: "Então, por que isso importa?",
    steps: [
      {
        icon: "heart",
        title: "Atividade física",
        message: "Reduz riscos de doenças e promove saúde."
      },
      {
        icon: "group",
        title: "Esporte inclusivo",
        message: "Fortalece vínculos sociais e combate formas de violência."
      },
      {
        icon: "institution",
        title: "Políticas públicas",
        message: "Garantem acesso e promovem equidade."
      },
      {
        icon: "participation",
        title: "Participação",
        message: "Quando todos participam, toda a sociedade ganha."
      }
    ]
  },

  sources: {
    title: "Fontes e limitações",
    items: [
      { key: "oms" as const },
      { key: "pnad" as const },
      { key: "nikeNix" as const },
      { key: "lopesDelVecchio" as const },
      { key: "tesserKovaleski" as const }
    ]
  },

  final: {
    lines: ["Esporte é direito.", "Inclusão é saúde.", "Ninguém fica para trás."]
  }
};
