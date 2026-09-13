# DESIGN SYSTEM — ESPORTE COMO DIREITO

> **Projeto:** Esporte como direito: quem fica de fora e por quê?
> **Tipo:** Landing page editorial / Infográfico interativo
> **Objetivo:** Transformar o conteúdo do infográfico em uma experiência digital narrativa, responsiva e orientada por dados.

---

# 01. VISÃO DO PROJETO

## Conceito

A landing page deve funcionar como um **infográfico editorial interativo**, e não como um dashboard.

A narrativa em 4 tempos conduz o usuário através da seguinte sequência:

```text
INÍCIO — o mundo se move menos do que deveria
   ↓
CONFLITO — quem fica de fora primeiro
   ↓
DIAGNÓSTICO — os motivos mudam quando se olha mais de perto
   ↓
FECHAMENTO — o que fica quando tiramos o que não podemos resolver
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
  /* Base */
  --color-paper: #F1E9DB;      /* papel quente (fundo) */
  --color-ink: #1C2B44;        /* navy (texto, títulos, linhas) */

  /* Paleta principal nomeada */
  --color-navy: #1C2B44;
  --color-cream: #F1E9DB;
  --color-vermilion: #E8542B;  /* energia / impacto */
  --color-pink: #E8557E;
  --color-plum: #C44E7C;       /* ameixa / exclusão */
  --color-purple: #7A5994;     /* dado LGBTQIA+ */
  --color-amber: #F5A23F;      /* destaque */
  --color-sky: #4AA8D8;        /* acesso / positivo */
  --color-sage: #8FC9B4;       /* saúde / inclusão */
  --color-slate: #8FB0AE;      /* neutro frio */
}
```

> **Nota:** os nomes antigos (`--color-teal`, `--color-magenta`, `--color-yellow`,
> `--color-orange`, `--color-gray`) permanecem como **aliases semânticos** para não
> quebrar o conteúdo já escrito:
> `teal → sky`, `magenta → plum`, `yellow → amber`, `orange → vermilion`, `gray → slate`.

## Uso semântico

| Cor                 | Hex       | Função                                |
| ------------------- | --------- | ------------------------------------- |
| `--color-paper`     | `#F1E9DB` | Fundo principal (papel quente)        |
| `--color-ink`       | `#1C2B44` | Texto, títulos, linhas (navy)         |
| `--color-sky`       | `#4AA8D8` | Saúde, acesso, prática esportiva      |
| `--color-plum`      | `#C44E7C` | Exclusão, discriminação, desigualdade |
| `--color-vermilion` | `#E8542B` | Energia, dado de impacto              |
| `--color-amber`     | `#F5A23F` | Destaques e chamadas                  |
| `--color-purple`    | `#7A5994` | Identidade LGBTQIA+                   |
| `--color-sage`      | `#8FC9B4` | Saúde, inclusão                       |
| `--color-slate`     | `#8FB0AE` | Informações secundárias               |
| `--color-pink`      | `#E8557E` | Identidade, recorte de gênero         |

## Modos de seção

A narrativa alterna **seções claras** (fundo `paper`, texto `ink`) e **seções escuras**
(fundo `navy`, texto `paper`) para criar ritmo de revista.

* Seções claras: base da narrativa e dos gráficos.
* Seções escuras: blocos de impacto — destaque de dado, alerta metodológico ou
  mensagem final.
* Em fundo escuro, usar acentos `amber`, `sky` ou `sage` (nunca plum sobre navy).

---

# 04. REGRA DE USO DAS CORES

A paleta deve ser limitada. Não utilizar todas as cores simultaneamente em todos os componentes.

Priorizar:

```text
FUNDO
→ papel

TEXTO
→ navy / ink

DADO POSITIVO / ACESSO
→ sky (ou sage)

DADO DE EXCLUSÃO
→ plum

DESTAQUE
→ amber

DADO SOCIOECONÔMICO
→ vermilion
```

A cor deve possuir significado. Não utilizar cor apenas como decoração.

**Contraste:** `amber` e `pink` sobre `paper` têm contraste baixo para texto pequeno —
usar apenas em display grande ou sobre fundo `navy`. O texto corrente permanece em
`ink` sobre `paper` (ou `paper` sobre `navy`).

---

# 05. TIPOGRAFIA

O sistema usa **quatro famílias**, cada uma com papel fixo. Como as fontes
originais da direção de arte são proprietárias, usamos substitutas do Google Fonts:

| Fonte original | Substituta     | Papel                                        |
| -------------- | -------------- | -------------------------------------------- |
| Elephant       | `Abril Fatface`| Título do hero, números gigantes, fechamento |
| Neufreit       | `Oswald`       | Títulos de seção, eyebrows, labels           |
| Futura MD BT   | `Jost`         | Sub-títulos, labels de gráfico, UI           |
| Corbel         | `Nunito Sans`  | Corpo de texto, legendas, fontes             |

Carregamento (Google Fonts):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Oswald:wght@400;500;700&family=Jost:wght@400;500;600&family=Nunito+Sans:wght@400;600;700;800&display=swap" />
```

## Papéis no CSS

```css
--font-hero:    "Abril Fatface", Georgia, serif;               /* hero + números */
--font-display: "Oswald", "Archivo Narrow", sans-serif;        /* seções + labels */
--font-geo:     "Jost", "Futura", sans-serif;                  /* sub-títulos + gráficos */
--font-text:    "Nunito Sans", "Inter", system-ui, sans-serif; /* corpo */
```

---

# 06. HIERARQUIA TIPOGRÁFICA

## Hero — Abril Fatface

```css
font-family: var(--font-hero);
font-weight: 400;
font-size: clamp(2.5rem, 6vw, 7rem);
line-height: 1.02;
```

## Títulos de seção — Oswald

```css
font-family: var(--font-display);
font-weight: 700;
font-size: clamp(1.75rem, 3.4vw, 3.5rem);
line-height: 1.02;
text-transform: uppercase;
```

## Sub-títulos / labels de gráfico — Jost

```css
font-family: var(--font-geo);
font-weight: 500;
font-size: clamp(1.1rem, 1.6vw, 1.4rem);
```

## Números — Abril Fatface

```css
font-family: var(--font-hero);
font-weight: 400;
font-size: clamp(4rem, 10vw, 10rem);
line-height: 0.85;
```

## Texto — Nunito Sans

```css
font-family: var(--font-text);
font-size: clamp(1rem, 1.2vw, 1.2rem);
line-height: 1.6;
```

## Texto de abertura — Oswald

A história de abertura (`.prose-intro`, sobre o canvas 3D) usa Oswald 500,
sem caixa alta, em linhas que entram em cascata (`--i` como degrau do atraso):

```css
font-family: var(--font-display);
font-weight: 500;
font-size: clamp(1.4rem, 2.6vw, 2.2rem);
line-height: 1.18;
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
HERO (abertura)
01 — INÍCIO (sections/inicio.php)
02 — CONFLITO (sections/conflito.php)
03 — DIAGNÓSTICO (sections/diagnostico.php)
04 — FECHAMENTO (sections/fechamento.php)
FONTES E LIMITAÇÕES (sections/fontes.php)
MENSAGEM FINAL (sections/final.php — "VEM COMIGO?")
```

As seções da narrativa antiga (12 blocos) estão arquivadas em `sections/_arquivo/`
e fora do `index.php`. Novas seções (ex.: créditos) entram como arquivos em
`sections/` + 1 linha na lista `$secoes` do `index.php` (+ rótulo em `$navLabels`).

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

# 12. CAPÍTULO 01 — INÍCIO (`sections/inicio.php`)

Fonte: WHO, 2024 (+ ONU WPP 2024 só para os totais adultos). Hero pronto, não refazer.

## Título bipartido

Linha 1 em 2 colunas (Oswald 700, caixa alta): "Nossa sociedade está se
tornando cada vez mais" + linha 2 em destaque maior (Elephant 400,
`vermilion`): "sedentária."

## História de abertura

Texto curto em linhas que entram em cascata (Oswald 500). Sem canvas
(a cena 3D mudou para o Cap. 02, ver §22).

## Faixa de ilustração

Slot genérico (2D ou cena 3D futura) com texto-grafite de apresentação:
três figuras em movimento (corredor, pessoa em pé, skatista).

## Números-coluna em escala real

Os numerões **são** as colunas (`main.js`, `initBigNums`): `31%` (`amber`,
dos adultos) e `80%` (`vermilion`, dos adolescentes) com altura proporcional
na escala 0–100 do eixo vertical; o eixo inferior separa os rótulos.
Animação tipo contador digital: contam e crescem juntos até o valor.

## Barra populacional

"Em um mundo com **8 bilhões** (display maior) **de pessoas** (escala grande)"
+ frase de apoio (`~1,8 bi` inativos; `35% até 2030`) + gráfico `popslider`
(`js/charts.js`): barra horizontal empilhada (total em `slate` × inativos em
`vermilion`) com slider 2010–2030, tooltip, legenda e marcas de escala.
Âncoras: 2010 derivado, 2024 dado, 2030 projeção; intermediários interpolados
(com nota de metodologia na fonte).

## Custo + quadra

Display "Um custo de até **300 bi** na saúde pública global" + slot da
quadra de basquete 3D (`data-scene="quadra"`; texto será gravado na textura
do chão quando a GLB existir).

## Banco

Slot PNG (pessoa sentada) + texto do risco `20–30%` em HTML.

## Benefício

Callout: atividade regular contribui para prevenção/manejo de DCV, câncer e
diabetes; reduz depressão e ansiedade.

## Transição (ponte para o Cap. 02)

Faixa rosa (`.bridge`): *"O que nos leva à pergunta: por que é que mais gente
'sobra' no banco?"* — redação ainda em revisão com o autor.

---

# 13. CAPÍTULO 02 — CONFLITO (`sections/conflito.php`)

Título: **Quem é que mais "sobra" no banco.** Três camadas separadas por fonte —
nunca comparar valores absolutos entre fontes distintas.

## Cena interativa (vinda do Cap. 01)

Palco `.scene-stage` (reaproveita `.prose-stage`) só com o canvas do quarto —
sem texto por cima, legenda funcional abaixo. Some com `reduced-motion`.

## Mundo (WHO, 2024)

Mulheres em média menos ativas. Barras agrupadas: meninas `85%` × meninos
`78%` (adolescentes sem o nível recomendado). Fonte após o gráfico.

## Brasil (IBGE, 2017, p. 12 e p. 15)

Barras agrupadas (`grouped-bar`), 1 linha, enquadramento de ausência:
não praticam `57,3% × 66,6%` (homens × mulheres). Abaixo, linha-drop (`.drop`,
texto menor): só esporte `31,7% × 16,9%` — a curva se acentua.

## LGBTQIA+ (NIX Diversidade/Nike, 2022, p. 21)

"Para pessoas LGBTQIAPN+, chegar é o primeiro desafio." Donut `42,8%` sem
acesso ao esporte. Cor: `purple`.

## Aviso metodológico (callout fixo)

WHO, IBGE e NIX têm populações, métodos e perguntas distintos.

---

# 14. CAPÍTULO 03 — DIAGNÓSTICO (`sections/diagnostico.php`)

Título: **Os motivos mudam quando se olha mais de perto.**
Leitura de **composição e ordem** dos motivos — nunca valor absoluto entre fontes.

## Comparador de motivos (IBGE × NIX)

Barras agrupadas nas categorias equivalentes — tempo (`38,2 × 26,3`),
companhia (`1,7 × 20,6`), não gostar/interesse (`35,0 × 18`).
Fontes: IBGE 2017 p. 20; NIX 2022 p. 27.

## Ranking IBGE ("Vamos olhar mais de perto")

Barras ordenadas com a lista completa: tempo (`38,2`), não gostar
(`35,0`), saúde/idade (`19,0`), instalação (`2,7`), financeiro (`1,9`),
companhia (`1,7`). Fonte: IBGE 2017 p. 20.

## Ranking NIX

Barras com a lista completa (`26,3 · 20,6 · 18 · 10 · 9,6 · 8,7`), precedidas
da linha-drop "O tempo ainda é a principal barreira — mas não é a única."
Fonte: NIX 2022 p. 27.

## Discriminação (NIX, p. 38–39)

"Afinal, todo mundo se sente incluso?" Par único de donuts: `63,5%`
(ao praticar) e `68,3%` (em ambientes esportivos). Sem repetição do par.

## Inclusão trans (NIX, p. 40)

"Inclusão também é pertencer." Gráfico `range`: `75,6%–76,8%` de apoio
a pessoas trans nos mesmos times.

## Companhia (Lopes & Del Vecchio, 2026)

"E a companhia faz diferença." Barras agrupadas: `40%` LGBT+ × `14%`
não-LGBT+; escore de barreiras `26,1 ± 9,2` (feminino) × `13,8 ± 13,7`
(masculino).

## Placeholder

Pessoa observando o grupo de fora / vestiário pouco acolhedor.

---

# 15. CAPÍTULO 04 — FECHAMENTO (`sections/fechamento.php`)

Título: **O que fica quando tiramos o que não podemos resolver.**

## Sem o tempo

Barras com os 6 motivos NIX: "falta de tempo" esmaecida (`data-muted`) e
"falta de companhia" em destaque (`vermilion`); demais esmaecidas.

## Fluxo

Companhia → Conexão → Pertencimento → Acolhimento (`.flow`, 4 colunas,
sem ícones). Entrada em cascata (`.flow--cascade`): cada etapa desliza da
esquerda com atraso em degrau (`--i` × 200ms) ao receber `.is-visible`;
estado final imediato com `reduced-motion`.

## Nota de projeto (faixa escura `.projeto-note`)

Separa achado de pesquisa de decisão de projeto: escopo mulheres cis +
LGBTQIA+ e gamificação/retenção como **hipótese de design**.

## Placeholder

Duas pessoas se encontrando para treinar / mão estendida ("vem comigo").

---

# 16. COMPONENTE STAT NUMBER

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

# 17. COMPONENTE DONUT CHART

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

# 18. NOVOS COMPONENTES DE GRÁFICO (`js/charts.js`)

Todos via `data-chart` + `data-*`, desenhados com D3 e animados ao entrar no
viewport (com `prefers-reduced-motion` mostrando o estado final de imediato).

* `grouped-bar` — linhas de `.gbar__bar` (`data-name`, `data-value`, `data-color`;
  `data-max` e `data-unit` opcionais). Uso: meninas × meninos, gênero IBGE,
  motivos IBGE × NIX, companhia Lopes. Comparações 1:1 usam barras agrupadas
  (o `dumbbell` foi removido por falta de coerência visual).
* `range` — linhas de `.range__row` (`data-min`, `data-max`). Uso: apoio trans.
* `projection` — pontos de `.projection__point` (`data-year`, `data-value`,
  `data-tag`); trecho projetado em tracejado com máscara `clipPath`.
* `bar` + `data-muted="true"` — linha esmaecida para o "sem o tempo".

## Alerta metodológico (regra permanente)

```text
42,8% não significa que 42,8% abandonaram
o esporte.

O estudo mede acesso, hábitos e experiências
da amostra pesquisada.
```

Não interpretar o dado além do que a fonte permite.

---

# 19. FONTES E LIMITAÇÕES (`sections/fontes.php`)

Apenas as quatro fontes da narrativa, cada uma com amostra e limitação:

## WHO — 2024
Dados globais sobre atividade física. Limitação: não apresenta recorte específico LGBTQIA+.

## IBGE / PNAD — 2015 (publicado em 2017)
Dados nacionais sobre prática esportiva. Limitação: não abre por orientação sexual ou identidade de gênero.

## NIX Diversidade/Nike — coleta 2021, publicado em 2022
Amostra: 1.037 pessoas. Limitação: amostra não probabilística. Não generalizar para toda a população.

## Lopes & Del Vecchio — 2026
Estudo com foco em jovens e ambiente escolar em Pelotas. Limitação: não representa toda a população brasileira.

---

# 20. MENSAGEM FINAL (`sections/final.php` — "VEM COMIGO?")

Faixa escura de encerramento.

```text
De: "Eu não vou sozinha."
Para: "Vem comigo?"
[ nome do projeto ]  ← placeholder
```

Texto de apoio: aproximar pessoas, formar conexões, tornar o ambiente
esportivo mais acolhedor. Visual: FUNDO → NAVY, TEXTO → PAPER, DESTAQUE → AMBER.
Botão `.btn--accent` "Conheça o projeto" (link placeholder `#`) + linha
"Esse é o nosso ponto de partida".

---

# 21. NAVEGAÇÃO "PERCURSO" (`includes/nav.php`)

A narrativa é um percurso: trilha lateral fixa com checkpoints numerados
(`01–07`), linha que preenche conforme a rolagem e rótulo no hover/foco/ativo.
Em telas estreitas, só os pontos.

* `index.php` gera `$navItems` a partir de `$secoes` + `$navLabels` — a navegação
  acompanha automaticamente a ordem das seções.
* `js/main.js` (`initTrail`) marca a seção ativa e preenche o progresso.
* Âncoras reais: funciona mesmo sem JavaScript.

---

# 22. CENA 3D — QUARTO (`assets/Quarto-interacao/`, `js/quarto.js`)

Exceção documentada à regra "sem 3D": a cena interativa do quarto (three.js,
GLB `quarto02.glb`), em palco ampliado (`.scene-stage--tall`: 1560px,
largura total da viewport) ao fim do Cap. 01.

* Fundo transparente (`alpha`, sem `scene.background`): o papel da página é
  o fundo (infinito). Palco base do Cap. 01 segue escuro.
* Câmera adotada do próprio GLB (posição, quaternion e `fov` copiados;
  `aspect` dinâmico; parallax de mouse sobre o quaternion-base). Fallback:
  câmera do `CONFIG` se o GLB não trouxer câmera.
* Colisores por nome (`colliders.js`, prefixo `Collider_`): `Collider_*`
  genérico vira caixa AABB dura com malha oculta; `Collider_Tabela` caixa
  dura visível; `Collider_Aro` anel de esferas; `Collider_Rede` zona de
  amortecimento (freia e deixa cair). Paredes alinhadas aos eixos; piso em
  `y=0`. Sem `Collider_*`, valem `CONFIG.room` + diagonal (fallback).
  Limites de arrasto/spawn/retorno seguem a união das paredes (`wallsBounds`).
* Sombras: `castShadow` em todas as malhas visíveis; janela ±10 com
  `updateProjectionMatrix()` e `bias` (mapa 2048).
* Arremesso: altura máxima de segurada `grabHeight: 7`, impulso vertical
  `throwBoost: 1.4`, `maxSpeed: 7`.
* `importmap` do three@0.160.0 no `header.php`.
* Inicialização preguiçosa (só ao entrar na tela); com
  `prefers-reduced-motion` o 3D nem inicia; sem WebGL/CDN, texto + véu seguem intactos.

---

# 23. COMPONENTES (`sections/` + `includes/`)

```text
LandingPage (index.php: $secoes + $navLabels + $navItems)
│
├── Hero (parallax em 4 camadas)
├── Capitulo01 (inicio.php)
│   ├── Título bipartido (Oswald + Elephant)
│   ├── ProseLines (texto em cascata, sem canvas)
│   ├── BignumsChart (31% · 80% como colunas + contador)
│   ├── PopsliderChart (slider 2010–2030)
│   ├── CostDisplay + QuadraSlot (futura)
│   └── BenchBlock + Bridge (ponte p/ Cap. 02)
├── Capitulo02 (conflito.php)
│   ├── SceneStage (canvas Quarto, vindo do Cap. 01)
│   ├── GroupedBarChart (85% × 78%)
│   ├── GroupedBarChart (não praticam 57,3% × 66,6%) + Drop (só esporte)
│   └── DonutChart (42,8%)
├── Capitulo03 (diagnostico.php)
│   ├── GroupedBarChart (motivos IBGE × NIX)
│   ├── BarChart (ranking IBGE completo)
│   ├── BarChart (ranking NIX completo) + Drop
│   ├── DonutChart × 2 (63,5% · 68,3%)
│   ├── RangeChart (75,6%–76,8%)
│   └── GroupedBarChart × 2 (companhia · escores)
├── Capitulo04 (fechamento.php)
│   ├── BarChart ("sem o tempo", 6 linhas, data-muted)
│   ├── FlowCascade (4 passos, entrada em cascata)
│   └── ProjetoNote (faixa escura)
├── FontesSection (4 fontes)
├── FinalStatement ("VEM COMIGO?")
└── TrailNav (includes/nav.php — percurso com progresso)
```

---

# 38. COMPONENTES DE APOIO

Criar também: `SectionHeader`, `SourceLabel`, `EditorialCallout`, `IllustrationBlock`, `Icon`, `Divider`.
Prontos: `Drop` (acento editorial pequeno com filete `amber`), `Btn` (`.btn--accent`).

---

# 25. DADOS

Os dados vivem nos atributos `data-*` do HTML em `sections/` (o projeto é PHP;
não há `src/data/*.ts`). Cada número carrega sua fonte no `stat__source` ao lado.

```text
WHO 2024 ............ 31 · 80 · 1,8 bi · +5 p.p. · 35 (2030) · 20–30 · US$ 300 bi
IBGE 2017 ........... 42,7 · 33,4 · 31,7 · 16,9 · motivos (38,2 · 35,0 · 19,0 · 2,7 · 1,9 · 1,7)
NIX 2022 ............ 42,8 · 63,5 · 68,3 · 75,6–76,8 · motivos (26,3 · 20,6 · 18 · 10 · 9,6 · 8,7)
Lopes & Del Vecchio . 40 · 14 · 26,1 ± 9,2 · 13,8 ± 13,7
```

---

# 26. FONTES

As quatro fontes estão documentadas em `sections/fontes.php` (nome, ano,
amostra e limitação). Não existem outras fontes ativas no site.

---

# 28. REGRA DOS DADOS

## OBRIGATÓRIO
Não inventar dados.

Se a fonte possui percentual, mostrar percentual. Se possui quantidade, mostrar quantidade. Se possui tendência, mostrar tendência. Nunca criar números intermediários para tornar um gráfico "mais bonito".

## Exceções documentadas
* **2010 derivado:** o ponto `26%` é aritmética explícita (`31 − 5 p.p.`), sempre
  rotulado como "derivado" — nunca apresentado como achado da OMS.
* **Sem comparação absoluta entre fontes:** WHO, IBGE, NIX e Lopes têm populações,
  métodos e perguntas distintos; a leitura entre elas é de composição/ordem.

---

# 42. REGRAS PARA GRÁFICOS

Todos os gráficos devem: ser responsivos; possuir fonte; possuir legenda quando necessário; possuir descrição textual; utilizar SVG quando possível; funcionar sem JavaScript para interpretação básica; possuir animação apenas como complemento.

---

# 27. ANIMAÇÕES

Utilizar animações apenas quando o elemento entrar no viewport
(`IntersectionObserver`; `prefers-reduced-motion` mostra o estado final).
Ao sair da tela, cada animação reseta ao estado inicial (classe
`.is-visible` removida, barras zeradas, contadores em 0, transições D3
interrompidas) para repetir a cada passagem pela seção.

* Barras: 0% → valor final.
* Donuts: 0° → percentual.
* Projeção (sequência ~2,9s): círculo → linha sólida cresce → círculo →
  tracejado cresce (máscara `clipPath`) → círculo final.
* Texto de abertura: linhas entram em cascata (`--i` × 240ms).
* Percurso: linha de progresso preenche conforme a rolagem; checkpoint ativo.
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
HERO → 01 INÍCIO (31% · 80% · projeção · 1,8 bi) →
02 CONFLITO (gênero · IBGE · 42,8%) →
03 DIAGNÓSTICO (motivos · 63,5% · 68,3% · 75,6–76,8% · companhia) →
04 FECHAMENTO (sem o tempo · fluxo · nota de projeto) →
FONTES → VEM COMIGO?
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

## Elementos gráficos e tom

* **Cantos arredondados suaves** em blocos, cartões e barras (`--radius-sm/md/lg`).
* **Elementos gráficos com personalidade:** pequenos ícones/mascotes acolhedores
  (formas orgânicas com expressão), reforçando o tom humano da narrativa.
* **Recortes de cor chapada:** faixas, etiquetas e realces usam cor sólida da paleta,
  sem gradientes chamativos.
* O mascote é apoio expressivo — **nunca** o único comunicador de um dado
  (nunca depender só da cor ou da ilustração).

---

# 32. MAPA DE IMAGENS (placeholders com o tipo de arte descrito)

* HERO: parallax em 4 camadas (`hero-ft-01..04.png`, 01 = primeiro plano).
* INÍCIO: cena 3D do quarto atrás do texto + placeholder "tênis parado e a segunda-feira que não chega".
* CONFLITO: placeholder "linha de partida com pessoas diversas; alguém ainda de fora".
* DIAGNÓSTICO: placeholder "pessoa observando o grupo de fora / vestiário pouco acolhedor".
* FECHAMENTO: placeholder grande "duas pessoas se encontrando para treinar / mão estendida".

---

# 33. O QUE NÃO FAZER

Não transformar a landing page em Dashboard. Não utilizar cards excessivos. Não utilizar sombras pesadas. Não utilizar fotografias aleatórias. Não utilizar números sem fonte. Não inventar dados. Não transformar tendência → percentual sem que a fonte forneça o percentual. Não comparar valores absolutos entre fontes distintas.

Sobre 3D e gradientes: valem apenas o deliberado — a cena do quarto (§22, com véu de leitura) e os véus de legibilidade do hero. Nada além disso.

---

# 34. PRINCÍPIO EDITORIAL

A página deve parecer uma história. Não uma coleção de informações.

```text
"O mundo se move menos." → "Mas não para todos igual." →
"Os motivos mudam de perto." → "O tempo não se resolve." →
"Companhia, conexão, pertencimento." → "Vem comigo?"
```

---

# 35. STATUS DE IMPLEMENTAÇÃO

## FEITO
* [x] Base, variáveis, grid, container, textura, estilos globais.
* [x] Estrutura em 4 capítulos + fontes + encerramento (seções antigas em `sections/_arquivo/`).
* [x] Componentes: StatNumber, BarChart (+`data-muted`), DonutChart, GroupedBarChart, RangeChart, ProjectionChart, Flow (+cascata), Drop, Btn, ProjetoNote, TrailNav, ProseStage.
* [x] Dados das 4 fontes nos `data-*` do HTML, cada número com sua fonte.
* [x] Direção de arte: paleta, 4 fontes, véus, cantos arredondados, cena do quarto.
* [x] Animações por IntersectionObserver + `prefers-reduced-motion`.
* [x] Responsividade desktop/tablet/mobile; HTML semântico, foco visível, `aria-label` nos gráficos.

## ABERTO
* [ ] Ilustrações finais nos placeholders (tênis, linha de partida, vestiário, encontro).
* [ ] Nome do projeto no "VEM COMIGO?".
* [ ] Novas seções futuras (ex.: créditos) via `sections/` + `$secoes`.

---

# 36. CRITÉRIO FINAL

A página estará conceitualmente correta quando o usuário conseguir entender apenas percorrendo os títulos e números:

```text
31% · 80% → 2030: 35% → MULHERES PRATICAM MENOS → 42,8% SEM ACESSO →
TEMPO × COMPANHIA → 63,5% · 68,3% → 75,6–76,8% → 40% × 14% →
SEM O TEMPO, SOBRA COMPANHIA → VEM COMIGO?
```

## Resultado visual esperado

```text
EDITORIAL + DADOS + ILUSTRAÇÃO + NARRATIVA + INTERAÇÃO + ACESSIBILIDADE
```

O resultado não deve ser apenas "uma página bonita". Deve ser uma **visualização editorial dos dados**, na qual cada gráfico, ilustração e número possui uma função dentro da narrativa.
