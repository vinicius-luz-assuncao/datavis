<?php
/**
 * 06 — POPULAÇÃO LGBTQIA+
 * Dois donuts (42,8% acesso / 63,5% discriminação).
 *
 * Cada .donut tem data-value, data-label, data-color e data-source.
 * O charts.js desenha a rosca com D3 e mostra o % no centro.
 */
?>
<section class="section" id="lgbtqia">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">População LGBTQIA+</span>
      <h2 class="section-title">Quando o problema não é falta de interesse.</h2>
    </div>

    <p class="body-text reveal" style="max-width: 60ch;">
      Para parte da população LGBTQIA+, a exclusão não acontece apenas porque faltam espaços ou oportunidades.
      Ela também acontece quando o espaço esportivo deixa de ser percebido como seguro.
    </p>

    <div class="section-grid" style="margin-top: var(--space-xl);">
      <!-- Gráfico 1: Acesso -->
      <div class="col-span-6 reveal">
        <div class="donut" data-chart="donut"
          data-value="42.8" data-color="var(--color-teal)"
          data-label="da amostra não tem acesso ao esporte">
        </div>
        <p class="stat__source small-note">Fonte: Nike/Nix, 2021</p>
      </div>

      <!-- Gráfico 2: Discriminação -->
      <div class="col-span-6 reveal">
        <div class="donut" data-chart="donut"
          data-value="63.5" data-color="var(--color-magenta)"
          data-label="sofreu ou presenciou discriminação">
        </div>
        <p class="stat__source small-note">Fonte: Nike/Nix, 2021</p>
      </div>
    </div>

    <!-- Alerta metodológico -->
    <div class="editorial-callout reveal" style="margin-top: var(--space-xl);">
      <span class="small-note"><strong>Alerta metodológico:</strong> 42,8% não significa que 42,8% abandonaram o
        esporte. O estudo mede acesso, hábitos e experiências da amostra pesquisada.</span>
    </div>
  </div>
</section>
