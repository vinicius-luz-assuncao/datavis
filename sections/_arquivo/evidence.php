<?php
/**
 * 03 — EVIDÊNCIAS PRINCIPAIS
 * Três números gigantes. Cada um tem: data-value (número), label,
 * color e uma <span class="stat-source"> com a fonte.
 *
 * O main.js anima a contagem de 0 até o data-value quando entra no viewport.
 */
?>
<section class="section" id="evidence">
  <div class="container">
    <div class="section-head reveal">
      <span class="eyebrow">Evidências principais</span>
      <h2 class="section-title">Os números mostram isso</h2>
    </div>

    <div class="section-grid">
      <!-- STAT 01 -->
      <div class="stat col-span-4 reveal">
        <span class="stat-number stat-count" style="color: var(--color-teal);"
          data-value="42.8" data-decimals="1">0%</span>
        <p class="stat__label">da amostra LGBTQIA+ não tem acesso ao esporte.</p>
        <p class="stat__source">Fonte: Nike/Nix, 2021</p>
      </div>

      <!-- STAT 02 -->
      <div class="stat col-span-4 reveal">
        <span class="stat-number stat-count" style="color: var(--color-magenta);"
          data-value="63.5" data-decimals="1">0%</span>
        <p class="stat__label">já sofreu ou presenciou discriminação em ambientes esportivos.</p>
        <p class="stat__source">Fonte: Nike/Nix, 2021</p>
      </div>

      <!-- STAT 03 -->
      <div class="stat col-span-4 reveal">
        <span class="stat-number stat-count" style="color: var(--color-orange);"
          data-value="76" data-decimals="0">0%</span>
        <p class="stat__label">da população geral não pratica esporte.</p>
        <p class="stat__source">Fonte: PNAD, 2015</p>
      </div>
    </div>
  </div>
</section>
