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
    <!-- Rolagem horizontal de teste: camadas 1–3 lado a lado (sticky);
         sem JS vira pilha vertical. Ao fim, o vertical continua. -->
    <div class="hwrap" data-hscroll>
      <div class="hstage" data-hstage>
        <header class="chapter__head chapter__head--wide reveal hstage__head">
          <span class="chapter__marker">Capítulo 02 · Conflito</span>
          <h2 class="chapter-title-split">
            <span class="split-l1">Quem é que realmente "sobra"</span>
            <span class="split-l2">no banco</span>
          </h2>
        </header>
        <div class="htrack" data-htrack>
          <!-- Camada 1 — Mundo (WHO): planeta, texto e gráfico -->
          <div class="hpanel">
    <div class="block reveal">
      <div class="split-block split-block--trio">
        <div class="split-block__planet">
          <div class="planet-canvas" data-planet data-model="assets/earth/planet.glb" aria-hidden="true"></div>
        </div>
        <div class="split-block__text">
          <p class="byline">No Mundo,</p>
          <p class="body-text">
            Mulheres são, em média, menos ativas que homens. <br>Já na <strong style="color: var(--color-pink);">adolescência 85% das meninas</strong> não atingem os níveis recomendados, em comparação aos <strong style="color: var(--color-sky);">78% dos meninos.</strong></p>
        </div>
        <div class="split-block__chart">
          <div class="gbar" data-chart="grouped-bar">
            <div class="gbar__row">
              <p class="gbar__row-label">Não atingem o nível recomendado de atividade física</p>
              <div class="gbar__bar" data-name="Meninas" data-value="85" data-color="var(--color-plum)"></div>
              <div class="gbar__bar" data-name="Meninos" data-value="78" data-color="var(--color-sky)"></div>
            </div>
            <div class="gbar__legend">
              <span class="gbar__legend-item"><i style="background: var(--color-plum);"></i> Meninas</span>
              <span class="gbar__legend-item"><i style="background: var(--color-sky);"></i> Meninos</span>
            </div>
          </div>
          <p class="stat__source small-note">Fonte: WHO, 2024.</p>
        </div>
      </div>
    </div>
          </div>

          <!-- Camada 2 — Brasil (IBGE): planeta, texto e gráfico -->
          <div class="hpanel">
    <div class="block reveal">
      <div class="split-block split-block--trio">
        <div class="split-block__planet">
          <div class="planet-canvas" data-planet data-model="assets/earth/planet-brasil.glb" data-mode="float" aria-hidden="true"></div>
        </div>
        <div class="split-block__text">
          <p class="byline">E no Brasil,</p>
          <p class="body-text">quem mais fica de fora? <strong style="color: var(--color-sky);">57,3% dos homens</strong> não praticam esporte ou
            atividade física — enquanto entre as <strong style="color: var(--color-pink);">mulheres</strong> esse número chega a <strong style="color: var(--color-pink);">66,6%.</strong></p>
          <div class="editorial-callout" style="margin-top: var(--space-md);">
            <p class="small-note">E quando olhamos só para o cenário do esporte, a curva se acentua:
              <strong>31,7%</strong> dos homens × <strong>16,9%</strong> das mulheres praticam.</p>
          </div>
        </div>
        <div class="split-block__chart">
          <div class="gbar" data-chart="grouped-bar">
            <div class="gbar__row">
              <p class="gbar__row-label">Não praticam esporte ou atividade física</p>
              <div class="gbar__bar" data-name="Homens" data-value="57.3" data-color="var(--color-sky)"></div>
              <div class="gbar__bar" data-name="Mulheres" data-value="66.6" data-color="var(--color-plum)"></div>
            </div>
            <div class="gbar__legend">
              <span class="gbar__legend-item"><i style="background: var(--color-sky);"></i> Homens</span>
              <span class="gbar__legend-item"><i style="background: var(--color-plum);"></i> Mulheres</span>
            </div>
          </div>
          <p class="stat__source small-note">Fonte: IBGE, 2017, p. 12 e p. 15.</p>
        </div>
      </div>
    </div>
          </div>

          <!-- Camada 3 — LGBTQIA+ (NIX): planeta, texto e gráfico -->
          <div class="hpanel">
    <div class="block reveal">
      <div class="split-block split-block--trio">
        <div class="split-block__planet">
          <div class="planet-canvas" data-planet data-model="assets/earth/planet-lgbtqia.glb" data-mode="float" aria-hidden="true"></div>
        </div>
        <div class="split-block__text">
          <p class="byline">Já a Comunidade LGBTQIAPN+</p>
          <p class="body-text">tem como desafio o acesso com <strong style="color: var(--color-purple);">42,8% da população</strong>
            representada na pesquisa afirmando não ter acesso ao esporte.</p>
        </div>
        <div class="split-block__chart">
          <div class="donut donut--side" data-chart="donut" data-value="42.8" data-color="var(--color-purple)"
            data-label="da população LGBTQIA+ representada no estudo não tinha acesso ao esporte"></div>
          <p class="stat__source small-note">Fonte: NIX Diversidade/Nike, 2022, p. 21.</p>
        </div>
            </div>
    </div>
          </div>
        </div>
        <!-- Nota fixa do palco (visível nas 3 camadas) -->
        <div class="hstage__note">
        <div class="editorial-callout-02 ">
         <span class="small-note">
      <strong>Nota metodológica:</strong> os dados apresentados provêm de fontes distintas
      (<strong>WHO</strong>, <strong>IBGE</strong> e <strong>NIX</strong>), com populações, métodos
      e instrumentos de coleta diferentes. Não se trata, portanto, de
      <strong>comparações em valores absolutos</strong>.
      </span>
        </div>
        </div>
  </div>
    </div>
    </div>
</section>
