<?php
/**
 * CAPÍTULO 01 — INÍCIO
 * "O mundo se move menos do que deveria" — WHO, 2024.
 *
 * Estrutura: história de abertura → escala global (donuts) → projeção →
 * impacto (risco/custo) → benefício da prática regular.
 */
?>
<section class="section chapter" id="inicio">
  <div class="container">
    <header class="chapter__head reveal">
      <span class="chapter__marker">Capítulo 01 · Início</span>
      <h2 class="section-title">O mundo se move menos do que deveria</h2>
    </header>

    <!-- História de abertura (enxuta) sobre o canvas 3D -->
    <div class="prose-stage quarto-section reveal">
      <div class="prose-canvas" data-quarto-canvas aria-hidden="true"></div>
      <div class="prose-scrim" aria-hidden="true"></div>
      <blockquote class="prose-intro prose-intro--overlay">
        <p class="prose-line" style="--i: 0;">Ela compra um tênis.</p>
        <p class="prose-line" style="--i: 1;">Escolhe uma academia.</p>
        <p class="prose-line" style="--i: 2;">Salva um treino e promete que na segunda-feira, vai...</p>
        <p class="prose-line" style="--i: 3;">mas a segunda-feira nunca chega.</p>
        <p class="prose-line" style="--i: 4;">Talvez falte tempo.</p>
        <p class="prose-line" style="--i: 5;">Talvez falte companhia.</p>
      </blockquote>
    </div>

    <!-- Escala global -->
    <div class="block reveal">
      <p class="block__lede">
        Segundo a Organização Mundial da Saúde, a maioria não atinge o nível mínimo recomendado de atividade física.
      </p>

      <div class="section-grid grid-duo" style="margin-top: var(--space-lg);">
        <div class="donut" data-chart="donut" data-value="31" data-color="var(--color-vermilion)"
          data-label="dos adultos não atingem o nível recomendado"></div>
        <div class="donut" data-chart="donut" data-value="80" data-color="var(--color-amber)"
          data-label="dos adolescentes não atingem o nível recomendado"></div>
      </div>

      <!-- Projeção: 2010 (derivado) → atual → 2030 -->
      <div class="projection reveal" data-chart="projection" data-unit="%" data-scale-min="20" data-scale-max="40"
        style="margin-top: var(--space-xl);">
        <div class="projection__point" data-year="2010" data-value="26" data-tag="derivado"></div>
        <div class="projection__point" data-year="2024" data-value="31"></div>
        <div class="projection__point" data-year="2030" data-value="35" data-tag="projeção"></div>
      </div>
      <p class="small-note" style="margin-top: var(--space-sm); max-width: 60ch;">
        Inatividade física em adultos. O ponto de 2010 é derivado do “+5 p.p. desde 2010” informado pela OMS;
        o de 2030 é projeção. <strong>Fonte: WHO, 2024.</strong>
      </p>
    </div>

    <!-- Impacto: risco e custo -->
    <div class="block reveal">
      <p class="block__lede">O impacto é individual e coletivo.</p>
      <div class="section-grid stat-row" style="margin-top: var(--space-lg);">
        <div class="stat stat--compact col-span-4">
          <span class="stat-number" style="color: var(--color-vermilion);">1,8 bi</span>
          <p class="stat__label">de adultos estão fisicamente inativos no mundo.</p>
        </div>
        <div class="stat stat--compact col-span-4">
          <span class="stat-number" style="color: var(--color-amber);">20–30%</span>
          <p class="stat__label">mais risco de morte para quem é insuficientemente ativo.</p>
        </div>
        <div class="stat stat--compact col-span-4">
          <span class="stat-number" style="color: var(--color-plum);">US$ 300 bi</span>
          <p class="stat__label">custo estimado da inatividade para a saúde pública (2020–2030).</p>
        </div>
      </div>
    </div>

    <!-- Benefício -->
    <div class="block reveal">
      <div class="editorial-callout">
        <span class="small-note">
          Na direção oposta, a atividade física regular contribui para a <strong>prevenção e o manejo</strong> de
          doenças cardiovasculares, câncer e diabetes, além de reduzir sintomas de depressão e ansiedade.
        </span>
      </div>
    </div>

    <!-- Ilustração -->
    <figure class="illustration illustration--medium reveal" style="margin-top: var(--space-xl);" role="img"
      aria-label="Ilustração editorial: tênis parado ao lado de alguém sentado, com um calendário marcando uma segunda-feira que não chega. Tom discreto, sem drama.">
      <figcaption class="illustration__art">Tênis parado e a segunda-feira que não chega</figcaption>
    </figure>
  </div>
</section>
