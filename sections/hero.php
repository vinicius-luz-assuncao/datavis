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
  <!-- Camada de imagem (parcialmente maior que o hero, dá "sobra"
       para o parallax de mouse revelar mais da foto) -->
  <div class="hero-media" aria-hidden="true">
    <img class="hero-media__img" src="assets/img/hero-ft.jpg" alt="" />
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