<?php
/**
 * 05 — DESIGUALDADE SOCIOECONÔMICA
 * Gráfico de TENDÊNCIA QUALITATIVA (não inventa percentuais).
 * só indica que a prática SOBE conforme renda/escolaridade.
 *
 * O charts.js desenha a curva e os pontos a partir do container .trend.
 */
?>
<section class="section" id="socioeconomic">
  <div class="container">
    <div class="split">
      <div class="split-copy">
        <div class="section-head reveal">
          <span class="eyebrow">Condições sociais</span>
          <h2 class="section-title">O acesso também depende das condições sociais.</h2>
        </div>

        <p class="body-text reveal">
          A prática esportiva aumenta conforme aumentam escolaridade e renda.
        </p>

        <!-- Gráfico de tendência qualitativa (curva desenhada por D3) -->
        <div class="trend reveal" data-chart="trend"
          data-start-label="Menor escolaridade/renda" data-end-label="Maior escolaridade/renda"></div>

        <p class="small-note reveal" style="margin-top: var(--space-sm); max-width: 52ch;">
          Tendência qualitativa: a fonte não fornece percentuais por faixa. O gráfico representa apenas
          a existência da tendência, <strong>sem inventar valores</strong>.
        </p>
      </div>

      <div class="split-visual">
        <!-- SUA ILUSTRAÇÃO AQUI -->
        <figure class="illustration illustration--small reveal" role="img"
          aria-label="Ilustração editorial sugerindo aumento do acesso ao esporte conforme sobem renda e escolaridade.">
          <figcaption class="illustration__art">Trajetória de acesso</figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>
