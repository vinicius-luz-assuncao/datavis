<?php
/**
 * HERO — abertura
 * Eyebrow, título e pergunta de abertura sobre as camadas de parallax.
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
        <span class="eyebrow" style="color: var(--color-paper-in-ink);">Direito a Saúde</span>
        <h1 class="hero-title">
          <span class="hero-title-color">Movimentar-se é Saúde </span><br />
          <span class="hero-title-color-02">e saúde é um direito.</span>
        </h1>
        <p class="lede hero-title-color-02" style="margin-top: var(--space-md);">
          Ainda assim, a maioria das pessoas não praticam atividades físicas, o que provoca isto?
        </p>
      </div>
    </div>
  </div>
</section>
