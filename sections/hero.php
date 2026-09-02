<?php
/**
 * 01 — HERO
 * Eyebrow, título gigante e pergunta de abertura sobre imagem de fundo.
 *
 * Para trocar a imagem de fundo, basta mudar a URL abaixo
 * (caminho relativo a partir da raiz do site).
 */
?>
<section class="section hero" id="hero">
  <!-- Camadas de parallax. data-layer: 01 é o primeiro plano (fronta, mais
       próximo), 04 o fundo. data-depth controla a velocidade relativa:
       quanto mais perto, mais rápido o deslocamento (scroll + mouse). -->
  <div class="hero-media" aria-hidden="true">
    <img class="hero-media__img" data-layer="1" data-depth="1" src="assets/img/hero-ft-01.png" alt="" />
    <img class="hero-media__img" data-layer="2" data-depth="0.68" src="assets/img/hero-ft-02.png" alt="" />
    <img class="hero-media__img" data-layer="3" data-depth="0.4" src="assets/img/hero-ft-03.png" alt="" />
    <img class="hero-media__img" data-layer="4" data-depth="0.18" src="assets/img/hero-ft-04.png" alt="" />
  </div>

  <div class="container">
    <div class="split">
      <div class="split-copy">
        <span class="eyebrow" style="color: var(--color-magenta);">Saúde e Direitos</span>
        <h1 class="hero-title">
          <span class="hero-title-color">Movimentar-se é um direito:</span><br />
          quem fica de fora e por quê?
        </h1>
        <p class="lede" style="margin-top: var(--space-lg);">
          Por que, mesmo sabendo que o esporte salva vidas, tantas pessoas ainda estão fora dele?
        </p>
      </div>
    </div>
  </div>
</section>