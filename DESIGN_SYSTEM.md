# DESIGN SYSTEM — ESPORTE COMO DIREITO

> **Projeto:** Esporte como direito: quem fica de fora e por quê?
> **Tipo:** Landing page editorial / Infográfico interativo
> **Objetivo:** Transformar o conteúdo do infográfico em uma experiência digital narrativa, responsiva e orientada por dados.

---

# 01. VISÃO DO PROJETO

## Conceito

A landing page deve funcionar como um **infográfico editorial interativo**, e não como um dashboard.

A narrativa deve conduzir o usuário através da seguinte sequência:

```text
PROBLEMA
   ↓
DADOS
   ↓
DESIGUALDADES
   ↓
BARREIRAS
   ↓
INTERESSE
   ↓
EXCLUSÃO
   ↓
POLÍTICAS PÚBLICAS
   ↓
SAÚDE
```

A página deve transmitir a sensação de uma **reportagem visual de revista**, combinando:

* grandes números;
* tipografia editorial;
* gráficos simples;
* ilustrações;
* textura de papel;
* linhas;
* ícones;
* pequenas intervenções gráficas;
* animações discretas.

---

# 02. DIREÇÃO VISUAL

## Referência estética

A linguagem visual deve lembrar a estética de **infográficos editoriais de revistas de ciência, comportamento e sociedade**, com uma atmosfera próxima à Superinteressante.

### Importante

A referência deve ser utilizada apenas como inspiração de linguagem.

Não copiar:

* logotipo;
* identidade visual;
* tipografia proprietária;
* ilustrações;
* layouts específicos;
* elementos gráficos exclusivos.

O resultado deve possuir identidade própria.

---

# 03. PALETA DE CORES

## Cores principais

```css
:root {
  --color-paper: #F3EFE4;
  --color-ink: #1C1C1A;

  --color-teal: #087F89;
  --color-magenta: #E52E63;

  --color-yellow: #F0B323;
  --color-orange: #E87916;

  --color-gray: #77736B;
}
```

## Uso semântico

| Cor               | Função                                |
| ----------------- | ------------------------------------- |
| `--color-paper`   | Fundo principal                       |
| `--color-ink`     | Texto, títulos, linhas                |
| `--color-teal`    | Saúde, acesso, prática esportiva      |
| `--color-magenta` | Exclusão, discriminação, desigualdade |
| `--color-yellow`  | Destaques e chamadas                  |
| `--color-orange`  | Dados socioeconômicos                 |
| `--color-gray`    | Informações secundárias               |

---

# 04. REGRA DE USO DAS CORES

A paleta deve ser limitada. Não utilizar todas as cores simultaneamente em todos os componentes.

Priorizar:

```text
FUNDO
→ papel

TEXTO
→ preto

DADO POSITIVO / ACESSO
→ teal

DADO DE EXCLUSÃO
→ magenta

DESTAQUE
→ amarelo

DADO SOCIOECONÔMICO
→ laranja
```

A cor deve possuir significado. Não utilizar cor apenas como decoração.

---

# 05. TIPOGRAFIA

## Display

Utilizar uma fonte condensada e pesada.

Preferência: `Roboto Condensed`

Alternativas: `Archivo Narrow`, `Oswald`, `Anton`, `Bebas Neue`

Uso: títulos, números, chamadas, labels.

## Texto

Preferência: `Inter`

Alternativas: `Source Sans 3`, `IBM Plex Sans`, `Roboto`

Uso: parágrafos, legendas, fontes, descrições.

---

# 06. HIERARQUIA TIPOGRÁFICA

## Hero

```css
font-size: clamp(3.5rem, 8vw, 8rem);
font-weight: 900;
line-height: 0.85;
text-transform: uppercase;
```

## Títulos de seção

```css
font-size: clamp(2rem, 4vw, 4rem);
font-weight: 900;
text-transform: uppercase;
```

## Números

```css
font-size: clamp(4rem, 10vw, 10rem);
font-weight: 900;
line-height: 0.8;
```

## Texto

```css
font-size: clamp(1rem, 1.2vw, 1.25rem);
line-height: 1.5;
```

---

# 07. FUNDO

O fundo principal deve utilizar:

```css
background-color: var(--color-paper);
```

Adicionar textura extremamente sutil de papel. A textura pode ser criada através de CSS noise, SVG filter, imagem de textura ou pseudo-elemento com baixa opacidade. Nunca deve prejudicar a leitura.

---

# 08. GRID

## Desktop

```css
.container {
  width: min(1280px, calc(100% - 64px));
  margin-inline: auto;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
```

## Tablet: 8 colunas

## Mobile: 4 colunas

---

# 09. ESPAÇAMENTO

```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;
  --space-xxl: 7rem;
}
```

As seções devem possuir bastante espaço vertical. A página não deve parecer comprimida.

---

# 10. ESTRUTURA DA LANDING PAGE

A ordem obrigatória é:

```text
01 — HERO
02 — INTRODUÇÃO
03 — EVIDÊNCIAS PRINCIPAIS
04 — DESIGUALDADE DE GÊNERO
05 — DESIGUALDADE SOCIOECONÔMICA
06 — POPULAÇÃO LGBTQIA+
07 — O INTERESSE EXISTE
08 — BARREIRAS AMBIENTAIS
09 — DISTRIBUIÇÃO DAS EQUIPES
10 — CONCLUSÃO
11 — FONTES E LIMITAÇÕES
12 — MENSAGEM FINAL
```

---

# 11. HERO

## Conteúdo

### Eyebrow

```text
SAÚDE E DIREITOS
```

### Título

```text
ESPORTE COMO DIREITO:
QUEM FICA DE FORA
E POR QUÊ?
```

### Pergunta

```text
Por que, mesmo sabendo que o esporte salva vidas,
tantas pessoas ainda estão fora dele?
```

## Composição

```text
┌──────────────────────────────────────────────┐
│ SAÚDE E DIREITOS                             │
│                                              │
│ ESPORTE COMO                 ILUSTRAÇÃO      │
│ DIREITO:                     PRINCIPAL       │
│ QUEM FICA DE FORA                            │
│ E POR QUÊ?                                   │
│                                              │
│ pergunta de abertura                        │
└──────────────────────────────────────────────┘
```

## Ilustração

Criar uma ilustração editorial de uma pessoa praticando corrida. Ao redor: quadra, cidade, arquitetura, obstáculos, grades, caminhos interrompidos. Conceito: a pessoa consegue praticar esporte, mas encontra obstáculos durante o percurso.

---

# 12. INTRODUÇÃO

## Texto principal

```text
A prática esportiva é essencial para a saúde,
mas não é acessível a todos.
```

## Complemento

```text
Mulheres, pessoas de baixa renda e, especialmente,
a população LGBTQIA+ enfrentam barreiras que vão
além da infraestrutura — são barreiras culturais,
sociais e discriminatórias.
```

## Visual

Adicionar uma ilustração mostrando pessoas tentando acessar um espaço esportivo. A quadra pode funcionar como metáfora de acesso.

---

# 13. EVIDÊNCIAS PRINCIPAIS

Esta seção deve apresentar três números gigantes.

## STAT 01

```text
42,8%
```

Texto: da amostra LGBTQIA+ não tem acesso ao esporte.

Fonte: Nike/Nix, 2021. Cor: `--color-teal`

## STAT 02

```text
63,5%
```

Texto: já sofreu ou presenciou discriminação em ambientes esportivos.

Fonte: Nike/Nix, 2021. Cor: `--color-magenta`

## STAT 03

```text
76%
```

Texto: da população geral não pratica esporte.

Fonte: PNAD, 2015. Cor: `--color-orange`

---

# 14. COMPONENTE STAT NUMBER

```ts
interface StatNumberProps {
  value: string;
  label: string;
  source: string;
  color: string;
}
```

Estrutura: NUMBER → LABEL → SOURCE. Nunca apresentar o número sem contexto.

---

# 15. DESIGUALDADE DE GÊNERO

## Título

```text
QUEM PRATICA MAIS?
```

## Dados

```text
Homens: 42,7%
Mulheres: 33,4%
```

---

# 16. GRÁFICO — GÊNERO

## Tipo

Barra horizontal comparativa.

```text
HOMENS
█████████████████████ 42,7%

MULHERES
█████████████████     33,4%
```

## Regras

Homens: TEAL. Mulheres: MAGENTA. O eixo deve ser simples. Não utilizar 3D, sombras, gradientes ou efeitos de brilho.

## Texto interpretativo

```text
Homens apresentam uma taxa de prática esportiva
maior que mulheres.
```

---

# 17. ILUSTRAÇÃO — GÊNERO

Posicionar uma ilustração ao lado ou abaixo do gráfico. Mostrar duas ou mais pessoas em situações esportivas diferentes. A ilustração deve sugerir ACESSO, OPORTUNIDADE, CONTEXTO. Não representar literalmente homem = pratica, mulher = não pratica. Evitar reforço de estereótipos.

---

# 18. DESIGUALDADE SOCIOECONÔMICA

## Título

```text
O ACESSO TAMBÉM DEPENDE
DAS CONDIÇÕES SOCIAIS.
```

Mensagem: A prática esportiva aumenta conforme aumentam escolaridade e renda.

---

# 19. GRÁFICO — ESCOLARIDADE E RENDA

## Tipo

Gráfico de tendência qualitativa.

```text
                    ●
                ●
            ●
        ●
    ●
────────────────────────
MENOR             MAIOR
ESCOLARIDADE/RENDA
```

## Regra crítica

Se a fonte não fornecer percentuais específicos por faixa: **NÃO INVENTAR VALORES.** O gráfico deve representar apenas a existência da tendência.

---

# 20. POPULAÇÃO LGBTQIA+

## Título

```text
QUANDO O PROBLEMA
NÃO É FALTA DE INTERESSE.
```

Texto: Para parte da população LGBTQIA+, a exclusão não acontece apenas porque faltam espaços ou oportunidades. Ela também acontece quando o espaço esportivo deixa de ser percebido como seguro.

---

# 21. GRÁFICO — ACESSO

## Tipo

Donut chart. Valor: `42,8%`. Texto: DA AMOSTRA NÃO TEM ACESSO AO ESPORTE.

---

# 22. GRÁFICO — DISCRIMINAÇÃO

## Tipo

Donut chart. Valor: `63,5%`. Texto: SOFREU OU PRESENCIOU DISCRIMINAÇÃO.

---

# 23. COMPONENTE DONUT CHART

```ts
interface DonutChartProps {
  value: number;
  label: string;
  source: string;
  color: string;
}
```

O percentual deve aparecer no centro. A parte restante deve utilizar uma tonalidade neutra.

---

# 24. ALERTA METODOLÓGICO

Adicionar uma pequena nota próxima aos dados:

```text
42,8% não significa que 42,8% abandonaram
o esporte.

O estudo mede acesso, hábitos e experiências
da amostra pesquisada.
```

Não interpretar o dado além do que a fonte permite.

---

# 25. O INTERESSE EXISTE

## Título

```text
O INTERESSE EXISTE.
O QUE FALTA É ACOLHIMENTO.
```

## DADO 01

```text
76,8%
```

Texto: considera o esporte "muito importante" para a comunidade.

Fonte: Nike/Nix, 2021.

## DADO 02

```text
95,8%
```

Texto: admira atletas assumidos.

Fonte: Nike/Nix, 2021.

---

# 26. ILUSTRAÇÃO — PERTENCIMENTO

Essa deve ser uma das principais ilustrações da página. Mostrar: pessoas diversas, diferentes corpos, diferentes expressões, roupas esportivas, interação, esporte coletivo, sensação de pertencimento. A diversidade deve aparecer principalmente através das pessoas. Não depender exclusivamente de símbolos LGBTQIA+.

---

# 27. BARREIRAS AMBIENTAIS

## Título

```text
ÀS VEZES,
O ESPAÇO TAMBÉM AFASTA.
```

Fonte: Lopes & Del Vecchio, 2026.

## Barreiras

```text
BULLYING
VESTIÁRIOS INADEQUADOS
FALTA DE SEGURANÇA
ISOLAMENTO
FALTA DE APOIO
```

---

# 28. FLUXO DE EXCLUSÃO

```text
BARREIRA
   ↓
MEDO
   ↓
ISOLAMENTO
   ↓
MENOR PARTICIPAÇÃO
```

Cada etapa deve possuir: ícone, palavra-chave, pequena descrição.

---

# 29. ILUSTRAÇÃO — ISOLAMENTO

Uma pessoa afastada enquanto outras pessoas praticam esporte. A cena deve ser editorial, discreta, humana, não melodramática.

---

# 30. DISTRIBUIÇÃO DAS EQUIPES LGBTQIA+

## Dados

```text
103 perfis analisados

Sudeste: 51,1%
Sul: 28,9%
Nordeste: 11,1%
Centro-Oeste: 5,6%
Norte: 3,3%
```

---

# 31. GRÁFICO — MAPA DO BRASIL

## Tipo

Mapa editorial do Brasil. Utilizar círculos proporcionais ou marcadores regionais. Não utilizar mapa coroplético caso o objetivo seja representar quantidade de equipes.

## Destaque

```text
80% DAS EQUIPES ESTÃO
CONCENTRADAS NO SUL/SUDESTE.
```

---

# 32. COMPONENTE BRAZIL MAP

```ts
BrazilMap
```

Responsabilidades: exibir mapa simplificado; posicionar dados regionais; permitir responsividade; apresentar legenda; disponibilizar descrição acessível. O mapa deve ser SVG. Não utilizar imagem rasterizada.

---

# 33. CONCLUSÃO

## Título

```text
ENTÃO,
POR QUE ISSO IMPORTA?
```

Sequência visual:

```text
ATIVIDADE FÍSICA
        ↓
ESPORTE INCLUSIVO
        ↓
POLÍTICAS PÚBLICAS
        ↓
SAÚDE E EQUIDADE
```

---

# 34. BLOCO FINAL

## 01 — ATIVIDADE FÍSICA
Ícone: coração. Mensagem: reduz riscos de doenças e promove saúde.

## 02 — ESPORTE INCLUSIVO
Ícone: grupo de pessoas. Mensagem: fortalece vínculos sociais e combate formas de violência.

## 03 — POLÍTICAS PÚBLICAS
Ícone: instituição. Mensagem: garantem acesso e promovem equidade.

## 04 — PARTICIPAÇÃO
Ícone: pessoa praticando esporte. Mensagem: quando todos participam, toda a sociedade ganha.

---

# 35. FONTES E LIMITAÇÕES

## OMS — 2024
Dados globais sobre atividade física. Limitação: não apresenta recorte específico LGBTQIA+.

## PNAD / IBGE — 2015
Dados nacionais sobre prática esportiva. Limitação: não apresenta orientação sexual ou identidade de gênero.

## Nike/Nix — 2021
Amostra de 1.037 pessoas LGBTQIA+. Limitação: amostra não probabilística. Não generalizar para toda a população.

## Lopes & Del Vecchio — 2026
Estudo com foco em jovens e ambiente escolar. Limitação: não representa toda a população brasileira.

## Tesser & Kovaleski — 2023
Mapeamento de equipes esportivas LGBTQIA+. Limitação: analisa equipes/perfis, não indivíduos.

---

# 36. MENSAGEM FINAL

Faixa visual forte.

```text
ESPORTE É DIREITO.
INCLUSÃO É SAÚDE.
NINGUÉM FICA PARA TRÁS.
```

Visual: FUNDO → INK, TEXTO → PAPER, DESTAQUE → YELLOW.

---

# 37. COMPONENTES

```text
LandingPage
│
├── Hero
├── IntroSection
├── EvidenceStats
│   └── StatNumber
├── GenderSection
│   └── BarChart
├── SocioeconomicSection
│   └── TrendChart
├── LGBTQSection
│   ├── DonutChart
│   └── DonutChart
├── InterestSection
│   ├── DonutChart
│   └── DonutChart
├── BarrierSection
│   └── BarrierFlow
├── RegionalSection
│   └── BrazilMap
├── ConclusionSection
├── SourcesSection
└── FinalStatement
```

---

# 38. COMPONENTES DE APOIO

Criar também: `SectionHeader`, `SourceLabel`, `EditorialCallout`, `IllustrationBlock`, `Icon`, `Divider`.

---

# 39. DADOS

Separar dados da interface.

```ts
export const statistics = {
  lgbtqiaNoAccess: 42.8,
  discrimination: 63.5,
  generalInactive: 76,
  menPractice: 42.7,
  womenPractice: 33.4,
  sportImportance: 76.8,
  admireAthletes: 95.8
};
```

---

# 40. FONTES

Criar arquivo `src/data/sources.ts`.

```ts
export const sources = {
  oms: { name: "OMS", year: 2024 },
  pnad: { name: "PNAD / IBGE", year: 2015 },
  nikeNix: { name: "Nike/Nix", year: 2021, sample: 1037 },
  lopesDelVecchio: { name: "Lopes & Del Vecchio", year: 2026 },
  tesserKovaleski: { name: "Tesser & Kovaleski", year: 2023 }
};
```

---

# 41. REGRA DOS DADOS

## OBRIGATÓRIO
Não inventar dados.

Se a fonte possui percentual, mostrar percentual. Se possui quantidade, mostrar quantidade. Se possui tendência, mostrar tendência. Nunca criar números intermediários para tornar um gráfico "mais bonito".

---

# 42. REGRAS PARA GRÁFICOS

Todos os gráficos devem: ser responsivos; possuir fonte; possuir legenda quando necessário; possuir descrição textual; utilizar SVG quando possível; funcionar sem JavaScript para interpretação básica; possuir animação apenas como complemento.

---

# 43. ANIMAÇÕES

Utilizar animações apenas quando o elemento entrar no viewport.

* Barras: 0% → valor final.
* Donuts: 0° → percentual.
* Ilustrações: entrada com opacity + translateY, duração 600–1000ms.

---

# 44. REDUCED MOTION

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

# 45. RESPONSIVIDADE

## Desktop
Priorizar: composição assimétrica; números grandes; gráficos lado a lado; ilustrações grandes; mapa em destaque.

## Tablet
Reduzir: tamanho das ilustrações; títulos; espaçamentos. Manter a estrutura editorial.

## Mobile
Transformar a composição em narrativa vertical:

```text
HERO → INTRO → 42,8% → 63,5% → 76% → GÊNERO → GRÁFICO →
SOCIOECONÔMICO → LGBTQIA+ → 42,8% + 63,5% → INTERESSE →
76,8% + 95,8% → BARREIRAS → MAPA → CONCLUSÃO → FONTES
```

---

# 46. MOBILE — REGRA IMPORTANTE

Não simplesmente reduzir o layout desktop. O mobile deve possuir: nova ordem de elementos quando necessário; gráficos ocupando largura disponível; títulos menores; ilustrações reposicionadas; textos curtos; números ainda grandes.

---

# 47. ACESSIBILIDADE

Implementar: HTML semântico; `h1` único; hierarquia correta de headings; `alt` nas imagens; descrição textual dos gráficos; navegação por teclado; foco visível; contraste adequado; `prefers-reduced-motion`. Nunca depender apenas da cor para comunicar uma informação.

---

# 48. DIREÇÃO DE ARTE DAS ILUSTRAÇÕES

Todas as ilustrações devem seguir: EDITORIAL, VETORIAL, ORGÂNICO, CONTORNOS LEVEMENTE IRREGULARES, TEXTURA DE IMPRESSÃO, FORMAS SIMPLIFICADAS, DIVERSIDADE HUMANA, PALETA LIMITADA.

Evitar: FOTORREALISMO, 3D, GRADIENTES EXCESSIVOS, ESTILO CORPORATIVO GENÉRICO, STOCK PHOTOS, EXCESSO DE DETALHES.

---

# 49. MAPA DE IMAGENS

* HERO: ILUSTRAÇÃO GRANDE. Pessoa praticando esporte + obstáculos.
* INTRO: ILUSTRAÇÃO MÉDIA. Pessoas tentando acessar espaço esportivo.
* GÊNERO: ILUSTRAÇÃO PEQUENA/MÉDIA. Pessoas em contexto esportivo.
* LGBTQIA+: ILUSTRAÇÃO GRANDE. Grupo diverso praticando esporte.
* BARREIRAS: ILUSTRAÇÃO MÉDIA. Pessoa isolada.
* MAPA: MAPA SVG. O mapa é o próprio elemento visual principal.
* CONCLUSÃO: ILUSTRAÇÃO PEQUENA. Grupo praticando esporte de maneira inclusiva.

---

# 50. O QUE NÃO FAZER

Não transformar a landing page em Dashboard. Não utilizar cards excessivos. Não utilizar gráficos 3D. Não utilizar gradientes chamativos. Não utilizar sombras pesadas. Não utilizar fotografias aleatórias. Não utilizar números sem fonte. Não inventar dados. Não transformar tendência → percentual sem que a fonte forneça o percentual.

---

# 51. PRINCÍPIO EDITORIAL

A página deve parecer uma história. Não uma coleção de informações.

```text
"Existe um problema." → "Os números mostram isso." →
"Mas o problema não é igual para todos." →
"Algumas pessoas enfrentam barreiras adicionais." →
"Mesmo assim, existe interesse." →
"Portanto, o problema também está no ambiente." →
"Espaços seguros e políticas públicas podem mudar isso."
```

---

# 52. ORDEM DE IMPLEMENTAÇÃO

## FASE 01 — BASE
* [ ] Configurar projeto.
* [ ] Configurar fonte.
* [ ] Criar variáveis CSS.
* [ ] Criar grid.
* [ ] Criar container.
* [ ] Criar textura.
* [ ] Criar estilos globais.

## FASE 02 — ESTRUTURA
* [ ] Criar Hero.
* [ ] Criar Intro.
* [ ] Criar Evidências.
* [ ] Criar Gênero.
* [ ] Criar Socioeconômico.
* [ ] Criar LGBTQIA+.
* [ ] Criar Interesse.
* [ ] Criar Barreiras.
* [ ] Criar Mapa.
* [ ] Criar Conclusão.
* [ ] Criar Fontes.
* [ ] Criar encerramento.

## FASE 03 — COMPONENTES
* [ ] StatNumber.
* [ ] BarChart.
* [ ] DonutChart.
* [ ] TrendChart.
* [ ] BrazilMap.
* [ ] BarrierFlow.
* [ ] SourceLabel.
* [ ] IllustrationBlock.

## FASE 04 — DADOS
* [ ] Criar `statistics.ts`.
* [ ] Criar `sources.ts`.
* [ ] Separar conteúdo dos componentes.
* [ ] Validar números.
* [ ] Associar cada número à sua fonte.

## FASE 05 — GRÁFICOS
* [ ] Homens x Mulheres.
* [ ] 42,8%.
* [ ] 63,5%.
* [ ] 76,8%.
* [ ] 95,8%.
* [ ] Tendência socioeconômica.
* [ ] Mapa regional.

## FASE 06 — DIREÇÃO DE ARTE
* [ ] Inserir ilustrações.
* [ ] Ajustar composição.
* [ ] Aplicar textura.
* [ ] Aplicar linhas editoriais.
* [ ] Ajustar cores.
* [ ] Ajustar tipografia.

## FASE 07 — ANIMAÇÃO
* [ ] Contagem dos números.
* [ ] Animação das barras.
* [ ] Animação dos donuts.
* [ ] Entrada das ilustrações.
* [ ] Intersection Observer.

## FASE 08 — RESPONSIVIDADE
* [ ] Desktop.
* [ ] Tablet.
* [ ] Mobile.
* [ ] Testar gráficos.
* [ ] Testar ilustrações.
* [ ] Testar textos longos.

## FASE 09 — ACESSIBILIDADE
* [ ] Contraste.
* [ ] Alt text.
* [ ] Descrição dos gráficos.
* [ ] Teclado.
* [ ] Focus states.
* [ ] Reduced motion.
* [ ] HTML semântico.

---

# 54. CRITÉRIO FINAL

A página estará conceitualmente correta quando o usuário conseguir entender apenas percorrendo os títulos e números:

```text
ESPORTE É IMPORTANTE → MUITA GENTE NÃO PRATICA → O ACESSO NÃO É IGUAL →
MULHERES PRATICAM MENOS → RENDA E ESCOLARIDADE IMPORTAM →
LGBTQIA+ ENFRENTA BARREIRAS → EXISTE INTERESSE → O AMBIENTE PODE AFASTAR →
INCLUSÃO EXIGE POLÍTICAS → ESPORTE TAMBÉM É SAÚDE
```

## Resultado visual esperado

```text
EDITORIAL + DADOS + ILUSTRAÇÃO + NARRATIVA + INTERAÇÃO + ACESSIBILIDADE
```

O resultado não deve ser apenas "uma página bonita". Deve ser uma **visualização editorial dos dados**, na qual cada gráfico, ilustração e número possui uma função dentro da narrativa.
