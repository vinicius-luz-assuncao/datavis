import "./styles/index.css";

import { content } from "./data/content";
import { statistics, teamProfilesTotal } from "./data/statistics";
import { sources, sourceLabel } from "./data/sources";
import { StatNumber } from "./components/StatNumber";
import { BarChart } from "./components/BarChart";
import { DonutChart } from "./components/DonutChart";
import { TrendChart } from "./components/TrendChart";
import { BrazilMap } from "./components/BrazilMap";
import { BarrierFlow, FlowStep } from "./components/BarrierFlow";
import { sectionHead, Divider, IllustrationBlock, fromHTML } from "./components/misc";
import { icon, IconName } from "./components/Icon";
import { initReveal } from "./components/util";

const app = document.getElementById("app")!;

/** Envelope de seção editorial (padding generoso + container). */
function section(id: string, ...children: HTMLElement[]): HTMLElement {
  const sec = document.createElement("section");
  sec.className = "section";
  sec.id = id;
  const c = document.createElement("div");
  c.className = "container";
  c.append(...children);
  sec.appendChild(c);
  return sec;
}

/** Callout editorial (highlight de % + texto). */
function callout(value: string, text: string, color: string): HTMLElement {
  return fromHTML<HTMLElement>(`
    <div class="editorial-callout reveal" style="margin-block: var(--space-lg);">
      <span class="stat-number" style="color:${color}; font-size:clamp(3rem,7vw,6rem);">${value}</span>
      <p class="stat__label">${text}</p>
    </div>
  `);
}

/* ------------------------------------------------------------------ HERO */
function hero(): HTMLElement {
  const sec = document.createElement("section");
  sec.className = "section";
  sec.id = "hero";

  const c = document.createElement("div");
  c.className = "container";

  const eyebrow = document.createElement("span");
  eyebrow.className = "eyebrow";
  eyebrow.style.color = "var(--color-magenta)";
  eyebrow.textContent = content.hero.eyebrow;

  const h1 = document.createElement("h1");
  h1.className = "hero-title";
  h1.textContent = content.hero.title;

  const question = document.createElement("p");
  question.className = "lede";
  question.style.marginTop = "var(--space-lg)";
  question.textContent = content.hero.question;

  const copy = document.createElement("div");
  copy.className = "split-copy";
  copy.append(eyebrow, h1, question);

  const visual = document.createElement("div");
  visual.className = "split-visual";
  visual.appendChild(
    IllustrationBlock({
      size: "large",
      art: "Pessoa correndo | obstáculos, grades e caminhos interrompidos",
      alt: "Ilustração editorial de uma pessoa praticando corrida, cercada por obstáculos e grades que interrompem o caminho."
    })
  );

  const grid = document.createElement("div");
  grid.className = "split";
  grid.append(copy, visual);

  c.appendChild(grid);
  sec.appendChild(c);
  return sec;
}

/* ------------------------------------------------------------------ INTRO */
function intro(): HTMLElement {
  return section(
    "intro",
    fromHTML<HTMLElement>(`
      <p class="lede reveal"><strong>${content.intro.headline}</strong></p>
    `),
    (() => {
      const split = document.createElement("div");
      split.className = "split";
      const copy = document.createElement("div");
      copy.className = "split-copy";
      const body = document.createElement("p");
      body.className = "body-text reveal";
      body.textContent = content.intro.body;
      copy.appendChild(body);

      const visual = document.createElement("div");
      visual.className = "split-visual";
      visual.appendChild(
        IllustrationBlock({
          size: "medium",
          art: "Pessoas tentando acessar uma quadra",
          alt: "Ilustração editorial de pessoas tentando acessar um espaço esportivo, usando a quadra como metáfora de acesso."
        })
      );

      split.append(copy, visual);
      return split;
    })()
  );
}

/* -------------------------------------------------------------- EVIDENCE */
function evidence(): HTMLElement {
  return section(
    "evidence",
    sectionHead("Os números mostram isso", "Evidências principais"),
    (() => {
      const grid = document.createElement("div");
      grid.className = "section-grid";
      const stats = [
        {
          value: statistics.lgbtqiaNoAccess,
          label: "da amostra LGBTQIA+ não tem acesso ao esporte.",
          source: sourceLabel("nikeNix"),
          color: "var(--color-teal)"
        },
        {
          value: statistics.discrimination,
          label: "já sofreu ou presenciou discriminação em ambientes esportivos.",
          source: sourceLabel("nikeNix"),
          color: "var(--color-magenta)"
        },
        {
          value: statistics.generalInactive,
          label: "da população geral não pratica esporte.",
          source: sourceLabel("pnad"),
          color: "var(--color-orange)"
        }
      ];
      stats.forEach((s) => {
        const cell = document.createElement("div");
        cell.className = "col-span-4";
        cell.appendChild(
          StatNumber({
            value: s.value,
            label: s.label,
            source: s.source,
            color: s.color
          })
        );
        grid.appendChild(cell);
      });
      return grid;
    })()
  );
}

/* ---------------------------------------------------------------- GENDER */
function gender(): HTMLElement {
  const split = document.createElement("div");
  split.className = "split";
  const copy = document.createElement("div");
  copy.className = "split-copy";
  copy.appendChild(sectionHead(content.gender.title, "Desigualdade de gênero"));

  const insight = document.createElement("p");
  insight.className = "body-text reveal";
  insight.textContent = content.gender.insight;
  copy.appendChild(insight);

  copy.appendChild(
    BarChart({
      data: [
        { label: "Homens", value: statistics.menPractice, color: "var(--color-teal)" },
        { label: "Mulheres", value: statistics.womenPractice, color: "var(--color-magenta)" }
      ],
      source: sourceLabel("pnad"),
      description: "Taxa de prática esportiva por gênero."
    })
  );

  const visual = document.createElement("div");
  visual.className = "split-visual";
  visual.appendChild(
    IllustrationBlock({
      size: "medium",
      art: "Pessoas em diferentes contextos esportivos",
      alt: "Ilustração editorial de pessoas em situações esportivas diferentes, sugerindo acesso, oportunidade e contexto."
    })
  );

  split.append(copy, visual);
  return section("gender", split);
}

/* ------------------------------------------------------- SOCIOECONOMIC */
function socioeconomic(): HTMLElement {
  const split = document.createElement("div");
  split.className = "split";
  const copy = document.createElement("div");
  copy.className = "split-copy";
  copy.appendChild(sectionHead(content.socioeconomic.title, "Condições sociais"));
  const msg = document.createElement("p");
  msg.className = "body-text reveal";
  msg.textContent = content.socioeconomic.message;
  copy.appendChild(msg);
  copy.appendChild(
    TrendChart({
      startLabel: "Menor escolaridade/renda",
      endLabel: "Maior escolaridade/renda",
      note: content.socioeconomic.qualitativeNote
    })
  );

  const visual = document.createElement("div");
  visual.className = "split-visual";
  visual.appendChild(
    IllustrationBlock({
      size: "small",
      art: "Trajetória de acesso",
      alt: "Ilustração editorial sugerindo aumento do acesso ao esporte conforme sobem renda e escolaridade."
    })
  );

  split.append(copy, visual);
  return section("socioeconomic", split);
}

/* ------------------------------------------------------------ LGBTQIA+ */
function lgbtqia(): HTMLElement {
  const head = sectionHead(content.lgbtqia.title, "População LGBTQIA+");
  const body = document.createElement("p");
  body.className = "body-text reveal";
  body.textContent = content.lgbtqia.body;

  const grids = document.createElement("div");
  grids.className = "section-grid";
  const acc = document.createElement("div");
  acc.className = "col-span-6";
  acc.appendChild(
    DonutChart({
      value: statistics.lgbtqiaNoAccess,
      label: content.lgbtqia.access.label,
      source: sourceLabel(content.lgbtqia.access.sourceKey),
      color: "var(--color-teal)",
      description: `${statistics.lgbtqiaNoAccess}% da amostra LGBTQIA+ não tem acesso ao esporte. ${content.lgbtqia.methodologicalNote}`
    })
  );
  const disc = document.createElement("div");
  disc.className = "col-span-6";
  disc.appendChild(
    DonutChart({
      value: statistics.discrimination,
      label: content.lgbtqia.discrimination.label,
      source: sourceLabel(content.lgbtqia.discrimination.sourceKey),
      color: "var(--color-magenta)",
      description: `${statistics.discrimination}% da amostra sofreu ou presenciou discriminação em ambientes esportivos.`
    })
  );
  grids.append(acc, disc);

  const calloutWrap = callout(
    `${statistics.lgbtqiaNoAccess}%`,
    content.lgbtqia.methodologicalNote,
    "var(--color-gray)"
  );
  calloutWrap.classList.add("editorial-callout");

  return section("lgbtqia", head, body, grids, calloutWrap);
}

/* -------------------------------------------------------------- INTEREST */
function interest(): HTMLElement {
  const head = sectionHead(content.interest.title, "O interesse existe");

  const grids = document.createElement("div");
  grids.className = "section-grid grid-duo";
  content.interest.data.forEach((d, i) => {
    const cell = document.createElement("div");
    cell.appendChild(
      DonutChart({
        value: d.value,
        label: d.label,
        source: sourceLabel(d.sourceKey),
        color: i === 0 ? "var(--color-yellow)" : "var(--color-teal)",
        description: `${d.value}% ${d.label}. Fonte: ${sourceLabel(d.sourceKey)}.`
      })
    );
    grids.appendChild(cell);
  });

  const art = IllustrationBlock({
    size: "large",
    art: "Pessoas diversas praticando esporte coletivo",
    alt: "Ilustração editorial de pessoas diversas, com diferentes corpos e expressões, praticando esporte coletivo em clima de pertencimento."
  });

  return section("interest", head, grids, art);
}

/* -------------------------------------------------------------- BARRIERS */
function barriers(): HTMLElement {
  const split = document.createElement("div");
  split.className = "split";
  const copy = document.createElement("div");
  copy.className = "split-copy";
  copy.appendChild(sectionHead(content.barriers.title, "Barreiras ambientais", 2));
  const src = document.createElement("p");
  src.className = "stat__source";
  src.textContent = `Fonte: ${sourceLabel(content.barriers.sourceKey)}.`;
  copy.appendChild(src);
  copy.appendChild(
    BarrierFlow({
      items: content.barriers.items,
      flow: content.barriers.flow as unknown as FlowStep[]
    })
  );

  const visual = document.createElement("div");
  visual.className = "split-visual";
  visual.appendChild(
    IllustrationBlock({
      size: "medium",
      art: "Uma pessoa isolada enquanto outras praticam esporte",
      alt: "Ilustração editorial e discreta de uma pessoa afastada enquanto outras pessoas praticam esporte, sugerindo isolamento."
    })
  );

  split.append(copy, visual);
  return section("barriers", split);
}

/* -------------------------------------------------------------- REGIONAL */
function regional(): HTMLElement {
  const split = document.createElement("div");
  split.className = "split";
  const copy = document.createElement("div");
  copy.className = "split-copy";
  copy.appendChild(sectionHead(content.regional.title, "Distribuição das equipes"));
  const total = document.createElement("p");
  total.className = "lede";
  total.style.marginBottom = "var(--space-lg)";
  total.innerHTML = `<strong>${teamProfilesTotal}</strong> ${content.regional.totalLabel}`;
  copy.appendChild(total);

  const visual = document.createElement("div");
  visual.className = "split-visual";
  visual.appendChild(
    BrazilMap({
      data: [{ region: "Sudeste", value: 51.1 }, { region: "Sul", value: 28.9 }, { region: "Nordeste", value: 11.1 }, { region: "Centro-Oeste", value: 5.6 }, { region: "Norte", value: 3.3 }],
      total: teamProfilesTotal,
      totalLabel: content.regional.totalLabel,
      highlight: content.regional.highlight,
      sourceKey: "tesserKovaleski",
      legendTitle: content.regional.legendTitle
    })
  );

  split.append(copy, visual);
  return section("regional", split);
}

/* ------------------------------------------------------------- CONCLUSION */
function conclusion(): HTMLElement {
  const head = sectionHead(content.conclusion.title, "Conclusão");

  const grid = document.createElement("div");
  grid.className = "section-grid";
  content.conclusion.steps.forEach((step) => {
    const cell = document.createElement("div");
    cell.className = "col-span-3";
    cell.classList.add("reveal");
    cell.style.cssText =
      "border-top: var(--line-ink); padding-top: var(--space-md); display:flex; flex-direction:column; gap: var(--space-sm);";
    cell.innerHTML = `
      <span style="width:2.5rem;height:2.5rem;color:var(--color-teal);">${icon(step.icon as IconName)}</span>
      <span class="barrier-step__keyword">${step.title}</span>
      <span class="barrier-step__desc">${step.message}</span>
    `;
    grid.appendChild(cell);
  });

  const art = IllustrationBlock({
    size: "small",
    art: "Grupo praticando esporte de forma inclusiva",
    alt: "Ilustração editorial de um grupo praticando esporte de maneira inclusiva."
  });

  return section("conclusion", head, grid, art);
}

/* --------------------------------------------------------------- SOURCES */
function sourcesSection(): HTMLElement {
  const head = sectionHead(content.sources.title, "Método");
  const list = document.createElement("div");
  content.sources.items.forEach((item) => {
    const s = sources[item.key];
    const el = document.createElement("div");
    el.className = "source-item reveal";
    el.innerHTML = `
      <div class="source-item__name">${s.name} · ${s.year}</div>
      ${
        s.sample
          ? `<div class="source-item__sample">Amostra: ${s.sample.toLocaleString("pt-BR")} pessoas.</div>`
          : ""
      }
      <div class="small-note"><strong>Limitação:</strong> ${s.limitation}</div>
    `;
    list.appendChild(el);
  });
  return section("sources", head, list);
}

/* --------------------------------------------------------------- FINAL */
function finalStatement(): HTMLElement {
  const sec = document.createElement("section");
  sec.id = "final";
  sec.className = "final-statement";
  const c = document.createElement("div");
  c.className = "container";
  const lines = document.createElement("div");
  lines.className = "final-statement__lines";
  content.final.lines.forEach((line, i) => {
    const p = document.createElement("p");
    p.className =
      i === content.final.lines.length - 1 ? "fs-line fs-line--accent" : "fs-line";
    p.textContent = line;
    lines.appendChild(p);
  });
  c.appendChild(lines);
  sec.appendChild(c);
  return sec;
}

/* ------------------------------------------------------------- ASSEMBLE */
app.append(
  hero(),
  intro(),
  Divider(),
  evidence(),
  Divider(),
  gender(),
  Divider(),
  socioeconomic(),
  Divider(),
  lgbtqia(),
  Divider(),
  interest(),
  Divider(),
  barriers(),
  Divider(),
  regional(),
  Divider(),
  conclusion(),
  Divider(),
  sourcesSection(),
  finalStatement()
);

initReveal();
