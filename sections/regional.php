<?php
/**
 * 09 — DISTRIBUIÇÃO DAS EQUIPES LGBTQIA+
 * Mapa editorial do Brasil com círculos proporcionais por região.
 *
 * Os dados regionais ficam em js/config.js (ou podem vir para o HTML).
 * O charts.js monta o SVG do Brasil com os círculos a partir dos dados.
 */
?>
<section class="section" id="regional">
  <div class="container">
    <div class="split">
      <div class="split-copy">
        <div class="section-head reveal">
          <span class="eyebrow">Distribuição das equipes</span>
          <h2 class="section-title">Onde estão as equipes LGBTQIA+?</h2>
        </div>

        <p class="lede reveal" style="margin-bottom: var(--space-lg);">
          <strong>103</strong> perfis analisados
        </p>

        <div class="reveal">
          <span class="region-label"><strong>Região:</strong> Sudeste (51,1%), Sul (28,9%), Nordeste (11,1%), Centro-Oeste (5,6%), Norte (3,3%).</span>
        </div>

        <div class="editorial-callout reveal" style="margin-top: var(--space-lg);">
          <span class="stat-number" style="color: var(--color-magenta); font-size: clamp(3rem, 7vw, 6rem);">80%</span>
          <p class="stat__label">das equipes estão concentradas no Sul/Sudeste.</p>
        </div>

        <p class="stat__source small-note">Fonte: Tesser &amp; Kovaleski, 2023</p>
      </div>

      <div class="split-visual">
        <!-- O Mapa é gerado por D3 aqui -->
        <div class="brazil-map reveal" data-chart="map"></div>
      </div>
    </div>
  </div>
</section>