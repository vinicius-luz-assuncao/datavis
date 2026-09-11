<?php
/**
 * Página discreta do Design System (documento interno, sem link no site).
 * Espelha os valores definidos em css/tokens.css e DESIGN_SYSTEM.md.
 * URL: /datavis/design-system.php
 */

$BASE = __DIR__;
$pageTitle = "Design System — Esporte como direito (interno)";
$pageRobots = "noindex, nofollow";

include $BASE . "/includes/header.php";
?>
<style>
  .ds-back {
    display: inline-block;
    margin-bottom: var(--space-md);
    font-family: var(--font-geo);
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--color-plum);
  }
  .ds-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-lg);
  }
  .ds-swatch {
    border: var(--line-soft);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
  .ds-swatch__color {
    height: 84px;
  }
  .ds-swatch__body {
    padding: var(--space-sm) var(--space-md);
  }
  .ds-swatch__name {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .ds-swatch__hex {
    font-family: var(--font-geo);
    font-size: 0.85rem;
    color: var(--color-gray);
  }
  .ds-swatch__use {
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }
  .ds-type-card {
    border: var(--line-soft);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    margin-top: var(--space-md);
  }
  .ds-type-card__meta {
    font-family: var(--font-geo);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-gray);
    margin-bottom: var(--space-sm);
  }
  .ds-space-row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-top: var(--space-sm);
  }
  .ds-space-row__bar {
    height: 1.25rem;
    background: var(--color-vermilion);
    border-radius: var(--radius-sm);
  }
  .ds-space-row__label {
    font-family: var(--font-geo);
    font-size: 0.85rem;
    min-width: 12ch;
  }
  .ds-radius-row {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
    margin-top: var(--space-lg);
  }
  .ds-radius-box {
    width: 120px;
    height: 84px;
    background: var(--color-sky);
    display: grid;
    place-items: center;
    font-family: var(--font-geo);
    font-size: 0.8rem;
    color: var(--color-paper);
  }
  .ds-mode {
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    margin-top: var(--space-md);
  }
  .ds-mode--light {
    background: var(--color-paper);
    color: var(--color-ink);
    border: var(--line-soft);
  }
  .ds-mode--dark {
    background: var(--color-navy);
    color: var(--color-paper);
  }
  .ds-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: var(--space-lg);
    font-size: 0.95rem;
  }
  .ds-table th,
  .ds-table td {
    text-align: left;
    padding: 0.6rem 0.75rem;
    border-bottom: var(--line-soft);
    vertical-align: top;
  }
  .ds-table th {
    font-family: var(--font-display);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: 0.8rem;
  }
  .ds-table code {
    font-family: var(--font-geo);
    font-size: 0.85em;
    background: rgba(28, 43, 68, 0.07);
    padding: 0.1em 0.35em;
    border-radius: 4px;
    white-space: nowrap;
  }
  .ds-note {
    margin-top: var(--space-lg);
  }
</style>

<main id="conteudo">
  <section class="section" id="ds-topo">
    <div class="container">
      <a class="ds-back" href="./">← Voltar ao site</a>
      <div class="section-head">
        <span class="eyebrow">Documento interno · não indexado</span>
        <h1 class="section-title">Design System</h1>
      </div>
      <p class="body-text">
        Referência visual do projeto <strong>Esporte como direito</strong>.
        Os valores abaixo espelham <code>css/tokens.css</code> e
        <code>DESIGN_SYSTEM.md</code>; em caso de divergência, o token CSS prevalece.
      </p>
    </div>
  </section>

  <section class="section" id="ds-cores">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">01 · Paleta</span>
        <h2 class="section-title">Cores</h2>
      </div>
      <div class="ds-grid">
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-paper)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Paper</div>
            <div class="ds-swatch__hex">--color-paper · #F1E9DB</div>
            <p class="ds-swatch__use">Fundo principal (papel quente).</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-ink)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Ink / Navy</div>
            <div class="ds-swatch__hex">--color-ink · #1C2B44</div>
            <p class="ds-swatch__use">Texto, títulos, linhas; fundo das seções escuras.</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-vermilion)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Vermilion</div>
            <div class="ds-swatch__hex">--color-vermilion · #E8542B</div>
            <p class="ds-swatch__use">Energia, dado de impacto.</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-pink)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Pink</div>
            <div class="ds-swatch__hex">--color-pink · #E8557E</div>
            <p class="ds-swatch__use">Identidade, recorte de gênero.</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-plum)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Plum</div>
            <div class="ds-swatch__hex">--color-plum · #C44E7C</div>
            <p class="ds-swatch__use">Exclusão, discriminação, desigualdade.</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-purple)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Purple</div>
            <div class="ds-swatch__hex">--color-purple · #7A5994</div>
            <p class="ds-swatch__use">Identidade LGBTQIA+.</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-amber)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Amber</div>
            <div class="ds-swatch__hex">--color-amber · #F5A23F</div>
            <p class="ds-swatch__use">Destaques e chamadas.</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-sky)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Sky</div>
            <div class="ds-swatch__hex">--color-sky · #4AA8D8</div>
            <p class="ds-swatch__use">Saúde, acesso, prática esportiva.</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-sage)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Sage</div>
            <div class="ds-swatch__hex">--color-sage · #8FC9B4</div>
            <p class="ds-swatch__use">Saúde, inclusão.</p>
          </div>
        </div>
        <div class="ds-swatch">
          <div class="ds-swatch__color" style="background:var(--color-slate)"></div>
          <div class="ds-swatch__body">
            <div class="ds-swatch__name">Slate</div>
            <div class="ds-swatch__hex">--color-slate · #8FB0AE</div>
            <p class="ds-swatch__use">Informações secundárias.</p>
          </div>
        </div>
      </div>
      <p class="body-text ds-note">
        <strong>Aliases semânticos</strong> (mantidos para não quebrar o conteúdo):
        <code>teal → sky</code> · <code>magenta → plum</code> · <code>yellow → amber</code> ·
        <code>orange → vermilion</code> · <code>gray → slate</code>.
        A cor deve ter significado — nunca usar apenas como decoração.
        <code>amber</code> e <code>pink</code> sobre papel têm contraste baixo para texto
        pequeno: usar só em display grande ou sobre <code>navy</code>.
      </p>
    </div>
  </section>

  <section class="section" id="ds-tipografia">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">02 · Tipografia</span>
        <h2 class="section-title">Fontes e hierarquia</h2>
      </div>
      <p class="body-text">Quatro famílias com papéis fixos (as originais da direção de arte são proprietárias; abaixo, as substitutas do Google Fonts em uso).</p>

      <div class="ds-type-card">
        <div class="ds-type-card__meta">--font-hero · Abril Fatface (no lugar de Elephant) · hero + números</div>
        <div class="hero-title">Movimentar-se é um direito</div>
        <div class="stat-number" style="margin-top:var(--space-md)">42,8%</div>
      </div>

      <div class="ds-type-card">
        <div class="ds-type-card__meta">--font-display · Oswald (no lugar de Neufreit) · seções + labels (+ texto de abertura 500)</div>
        <div class="section-title">Quem fica de fora primeiro</div>
        <div class="eyebrow" style="margin-top:var(--space-md)">Capítulo 02 · Conflito</div>
      </div>

      <div class="ds-type-card">
        <div class="ds-type-card__meta">--font-geo · Jost (no lugar de Futura MD BT) · sub-títulos + gráficos</div>
        <div class="sub-title">A prática esportiva aumenta conforme aumentam escolaridade e renda.</div>
      </div>

      <div class="ds-type-card">
        <div class="ds-type-card__meta">--font-text · Nunito Sans (no lugar de Corbel) · corpo</div>
        <p class="body-text">Mulheres, pessoas de baixa renda e, especialmente, a população LGBTQIA+ enfrentam barreiras que vão além da infraestrutura — são barreiras culturais, sociais e discriminatórias.</p>
        <p class="small-note" style="margin-top:var(--space-sm)">Legenda / fonte pequena — 0.85rem, Nunito Sans 500.</p>
      </div>
    </div>
  </section>

  <section class="section" id="ds-espacamento">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">03 · Espaçamento e raios</span>
        <h2 class="section-title">Medidas</h2>
      </div>
      <div class="ds-space-row"><span class="ds-space-row__label">--space-xs · 0.5rem</span><span class="ds-space-row__bar" style="width:var(--space-xs)"></span></div>
      <div class="ds-space-row"><span class="ds-space-row__label">--space-sm · 1rem</span><span class="ds-space-row__bar" style="width:var(--space-sm)"></span></div>
      <div class="ds-space-row"><span class="ds-space-row__label">--space-md · 1.5rem</span><span class="ds-space-row__bar" style="width:var(--space-md)"></span></div>
      <div class="ds-space-row"><span class="ds-space-row__label">--space-lg · 2.5rem</span><span class="ds-space-row__bar" style="width:var(--space-lg)"></span></div>
      <div class="ds-space-row"><span class="ds-space-row__label">--space-xl · 4rem</span><span class="ds-space-row__bar" style="width:var(--space-xl)"></span></div>
      <div class="ds-space-row"><span class="ds-space-row__label">--space-xxl · 7rem</span><span class="ds-space-row__bar" style="width:var(--space-xxl)"></span></div>
      <div class="ds-radius-row">
        <div class="ds-radius-box" style="border-radius:var(--radius-sm)">sm · 6px</div>
        <div class="ds-radius-box" style="border-radius:var(--radius-md)">md · 14px</div>
        <div class="ds-radius-box" style="border-radius:var(--radius-lg)">lg · 24px</div>
      </div>
      <p class="body-text ds-note">Container: <code>min(1280px, 100% − 64px)</code> centralizado. Grid: 12 colunas (desktop) · 8 (tablet) · 4 (mobile).</p>
    </div>
  </section>

  <section class="section" id="ds-modos">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">04 · Modos de seção</span>
        <h2 class="section-title">Claro e escuro</h2>
      </div>
      <div class="ds-mode ds-mode--light">
        <span class="eyebrow">Seção clara</span>
        <p class="body-text" style="margin-top:var(--space-sm)">Fundo <code>paper</code>, texto <code>ink</code>. Base da narrativa e dos gráficos.</p>
      </div>
      <div class="ds-mode ds-mode--dark">
        <span class="eyebrow" style="color:var(--color-amber)">Seção escura</span>
        <p class="body-text" style="margin-top:var(--space-sm);color:var(--color-paper)">Fundo <code>navy</code>, texto <code>paper</code>. Blocos de impacto e mensagem final — acentos <code>amber</code>, <code>sky</code> ou <code>sage</code> (nunca <code>plum</code> sobre navy).</p>
      </div>
    </div>
  </section>

  <section class="section" id="ds-componentes">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">05 · Componentes e gráficos</span>
        <h2 class="section-title">Peças do sistema</h2>
      </div>
      <table class="ds-table">
        <thead>
          <tr><th>Peça</th><th>Onde vive</th><th>Uso</th></tr>
        </thead>
        <tbody>
          <tr><td><code>donut</code></td><td><code>js/charts.js</code></td><td>Percentual em rosca (ex.: 31%, 42,8%, 63,5%).</td></tr>
          <tr><td><code>bar</code> (+ <code>data-muted</code>)</td><td><code>js/charts.js</code></td><td>Barras horizontais; linha esmaecida no “sem o tempo”.</td></tr>
          <tr><td><code>grouped-bar</code></td><td><code>js/charts.js</code></td><td>Barras agrupadas (gênero IBGE, companhia Lopes).</td></tr>
          <tr><td><code>dumbbell</code></td><td><code>js/charts.js</code></td><td>Comparação 1:1 (meninas × meninos; motivos IBGE × NIX).</td></tr>
          <tr><td><code>range</code></td><td><code>js/charts.js</code></td><td>Intervalo mín–máx (apoio trans 75,6–76,8%).</td></tr>
          <tr><td><code>projection</code></td><td><code>js/charts.js</code></td><td>Linha 2010 → 2024 → 2030, trecho projetado em tracejado.</td></tr>
          <tr><td><code>flow</code> · <code>projeto-note</code></td><td><code>css/components.css</code></td><td>Companhia → conexão → pertencimento; faixa escura de decisão de projeto.</td></tr>
          <tr><td><code>trail</code> (“Percurso”)</td><td><code>includes/nav.php</code> + <code>js/main.js</code></td><td>Âncoras numeradas com progresso da rolagem.</td></tr>
          <tr><td><code>prose-stage</code> + quarto 3D</td><td><code>js/quarto.js</code> + <code>assets/Quarto-interacao/</code></td><td>Canvas three.js atrás do texto de abertura, com véu de leitura.</td></tr>
        </tbody>
      </table>
      <p class="body-text ds-note">
        <strong>Regras rápidas:</strong> todo número com fonte ao lado · sem comparação
        absoluta entre fontes distintas · animações só ao entrar na tela, com
        <code>prefers-reduced-motion</code> mostrando o estado final · nunca depender
        só da cor para comunicar informação.
      </p>
    </div>
  </section>
</main>

<?php include $BASE . "/includes/footer.php"; ?>
