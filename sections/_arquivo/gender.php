<?php
/**
 * 04 — DESIGUALDADE DE GÊNERO
 * Gráfico de barras comparativo (Homens x Mulheres).
 *
 * Dados no HTML: cada .bar-row tem data-label, data-value e data-color.
 * O charts.js desenha a barra com D3 a partir desses atributos.
 */
?>
<section class="section" id="gender">
  <div class="container">
    <div class="split">
      <div class="split-copy">
        <div class="section-head reveal">
          <span class="eyebrow">Desigualdade de gênero</span>
          <h2 class="section-title">Quem pratica mais?</h2>
        </div>

        <p class="body-text reveal">
          Homens apresentam uma taxa de prática esportiva maior que mulheres.
        </p>

        <!-- Gráfico de barras (dados editáveis aqui) -->
        <div class="bar-chart reveal" data-chart="bar">
          <div class="bar-row" data-label="Homens" data-value="42.7" data-color="var(--color-teal)"></div>
          <div class="bar-row" data-label="Mulheres" data-value="33.4" data-color="var(--color-magenta)"></div>
        </div>
        <p class="stat__source small-note">Fonte: PNAD, 2015. Taxa de prática esportiva por gênero.</p>
      </div>

      <div class="split-visual">
        <!-- SUA ILUSTRAÇÃO AQUI -->
        <figure class="illustration illustration--medium reveal" role="img"
          aria-label="Ilustração editorial de pessoas em situações esportivas diferentes, sugerindo acesso, oportunidade e contexto.">
          <figcaption class="illustration__art">Pessoas em diferentes contextos esportivos</figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>
