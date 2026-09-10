<?php
/**
 * CAPÍTULO 02 — CONFLITO
 * "Quem fica de fora primeiro" — WHO 2024, IBGE 2017, NIX Diversidade/Nike 2022.
 *
 * Três camadas separadas por fonte: Mundo (WHO) · Brasil (IBGE) ·
 * comunidade LGBTQIA+ (NIX). Os números de fontes diferentes não são
 * comparados em valor absoluto.
 */
?>
<section class="section chapter" id="conflito">
  <div class="container">
    <header class="chapter__head reveal">
      <span class="chapter__marker">Capítulo 02 · Conflito</span>
      <h2 class="section-title">Quem fica de fora primeiro</h2>
      <p class="block__lede">Quando olhamos mais de perto, a desigualdade aparece.</p>
    </header>

    <!-- Camada 1 — Mundo (WHO) -->
    <div class="block reveal">
      <p class="byline">Mundo · WHO, 2024</p>
      <p class="body-text">
        Mulheres são, em média, 5 pontos percentuais menos ativas que homens. Entre adolescentes, a diferença é maior.
      </p>
      <div class="dumbbell" data-chart="dumbbell" data-scale="0,100" data-unit="%"
        data-a-label="Meninas" data-a-color="var(--color-plum)"
        data-b-label="Meninos" data-b-color="var(--color-sky)">
        <div class="dumbbell__row" data-label="Não atingem o nível recomendado de atividade física" data-a="85" data-b="78"></div>
      </div>
      <div class="dumbbell__legend">
        <span class="dumbbell__legend-item"><i style="background: var(--color-plum);"></i> Meninas</span>
        <span class="dumbbell__legend-item"><i style="background: var(--color-sky);"></i> Meninos</span>
      </div>
    </div>

    <!-- Camada 2 — Brasil (IBGE) -->
    <div class="block reveal">
      <p class="byline">Brasil · IBGE, 2017</p>
      <p class="body-text">No Brasil, o IBGE encontra o mesmo tipo de desigualdade, com seus próprios números.</p>
      <div class="gbar" data-chart="grouped-bar">
        <div class="gbar__legend">
          <span class="gbar__legend-item"><i style="background: var(--color-sky);"></i> Homens</span>
          <span class="gbar__legend-item"><i style="background: var(--color-plum);"></i> Mulheres</span>
        </div>
        <div class="gbar__row">
          <p class="gbar__row-label">Praticou esporte ou atividade física</p>
          <div class="gbar__bar" data-name="Homens" data-value="42.7" data-color="var(--color-sky)"></div>
          <div class="gbar__bar" data-name="Mulheres" data-value="33.4" data-color="var(--color-plum)"></div>
        </div>
        <div class="gbar__row">
          <p class="gbar__row-label">Praticou somente esporte</p>
          <div class="gbar__bar" data-name="Homens" data-value="31.7" data-color="var(--color-sky)"></div>
          <div class="gbar__bar" data-name="Mulheres" data-value="16.9" data-color="var(--color-plum)"></div>
        </div>
      </div>
      <p class="stat__source small-note">Fonte: IBGE, 2017, p. 12 e p. 15.</p>
    </div>

    <!-- Camada 3 — LGBTQIA+ (NIX) -->
    <div class="block reveal">
      <p class="byline">Comunidade LGBTQIA+ · NIX Diversidade/Nike, 2022</p>
      <p class="body-text">E existe ainda outra camada de exclusão.</p>
      <div class="donut" data-chart="donut" data-value="42.8" data-color="var(--color-purple)"
        data-label="da população LGBTQIA+ representada no estudo não tinha acesso ao esporte"></div>
      <p class="stat__source small-note">Fonte: NIX Diversidade/Nike, 2022, p. 21.</p>
    </div>

    <!-- Aviso -->
    <div class="block reveal">
      <div class="editorial-callout">
        <span class="small-note">
          <strong>Leia com cuidado:</strong> os números vêm de pesquisas diferentes (WHO, IBGE e NIX), com
          populações, métodos e perguntas distintos. Eles <strong>não devem ser comparados em valor absoluto</strong>.
        </span>
      </div>
    </div>

    <!-- Ilustração -->
    <figure class="illustration illustration--medium reveal" style="margin-top: var(--space-xl);" role="img"
      aria-label="Ilustração editorial: uma linha de partida com pessoas diversas; algumas já dentro da quadra, uma pessoa ainda de fora. Sem reforçar estereótipos.">
      <figcaption class="illustration__art">Uma linha de partida, e quem ainda está de fora</figcaption>
    </figure>
  </div>
</section>
