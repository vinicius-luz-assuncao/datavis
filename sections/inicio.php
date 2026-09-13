<?php

/**
 * CAPÍTULO 01 — INÍCIO
 * "O mundo se move menos do que deveria" — WHO, 2024.
 *
 * Composição: título bipartido → história de abertura → faixa ilustrada →
 * barras com escala real (31%/80%) → barra populacional com slider →
 * custo + quadra 3D → banco (risco) → benefício → pergunta de transição.
 */
?>
<section class="section chapter" id="inicio">
<div class="screen container">
  
    
      <header class="chapter__head chapter__head--wide reveal">
        <span class="chapter__marker">Capítulo 01 · Início</span>
        <h2 class="chapter-title-split">
          <span class="split-l1">Nossa sociedade está se tornando cada vez mais...</span>
          <span class="split-l2">Sedentária.</span>
        </h2>
      </header>

      <!-- Números-coluna em escala real -->
      <div class="block reveal">

        <div class="bignums" data-bignums role="img"
          aria-label="31% dos adultos e 80% dos adolescentes não atingem o nível recomendado de atividade física. Fonte: WHO, 2024.">
          <div class="bignums__axis" aria-hidden="true">
            <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
          </div>
          <div class="bignums__col-1">
            <span class="bignums__value" data-bignum data-value="31" style="color: var(--color-amber);">0%</span>
          </div>
          <span class="bignums__conj" aria-hidden="true">e</span>
          <div class="bignums__col-2">
            <span class="bignums__value" data-bignum data-value="80" style="color: var(--color-vermilion);">0%</span>
          </div>
          <div class="bignums__rule" aria-hidden="true"></div>
          <span class="bignums__cap bignums__cap--a">dos adultos</span>
          <span class="bignums__cap bignums__cap--b">dos adolescentes</span>
        </div>
        <p class="stat__source small-note">Fonte: WHO, 2024.</p>
        <p class="block__lede">Não atinge o nível <strong class="text-vermilion">mínimo recomendado</strong> de atividade física.</p>
      </div>
    <div class="screen container">

      <!-- Barra populacional com slider -->
      <div class="block reveal">
        <p class="block__lede">Em um mundo com <strong class="pop-huge">8 bilhões</strong> <span class="pop-big">de pessoas</span></p>

        <div class="popslider" data-chart="popslider">
          <div class="popslider__canvas" data-pop-canvas></div>
          <div class="popslider__legend" aria-hidden="true">
            <span class="popslider__legend-item"><i style="background: var(--color-vermilion);"></i> Nº de Adultos Inativos</span>
            <span class="popslider__legend-item"><i style="background: var(--color-slate);"></i> População Mundial Total</span>
          </div>
          <div class="popslider__tip" data-pop-tip></div>
          <p class="small-note" style="margin-top: var(--space-sm); max-width: 62ch;">
            Fonte: OMS (2024) e ONU (2024). 2010 e 2022: dados observados;
            2026 e 2030: projeções baseadas na tendência atual. Anos entre marcos:
            interpolação linear.
          </p>
        </div>
        <p class="body-text">
          Quase <strong>1,8 bilhão</strong> de adultos estão fisicamente inativos — e, se a tendência
          continuar, esse número pode chegar a <strong>35% até 2030</strong>.
        </p>
      </div>
    </div>

    <div class="block reveal scene-block scene-block--overlap">
      <div class="prose-stage quarto-section scene-stage scene-stage--tall">
        <div class="prose-canvas" data-quarto-canvas aria-hidden="true"></div>
      </div>
     
    </div>
</div>

<!-- Banco: imagem + risco (começa sobre o canvas) -->
<div class="block reveal block--overlap">
  <div class="bench-block">
    <figure class="photo">
      <img src="assets/img/banco.png" alt="Pessoa sentada no banco, fora do jogo" loading="lazy" />
    </figure>
    <div class="bench-text">
      <p class="body-text">
        Pessoas insuficientemente ativas têm de <strong>20% a 30%</strong> mais risco
        de morte em comparação às suficientemente ativas.
      </p>
      <p class="stat__source small-note">Fonte: WHO, 2024.</p>
      <div class="block reveal">
    <div class="editorial-callout">
      <span class="small-note">
        Na direção oposta, a atividade física regular contribui para a <strong>prevenção e o manejo</strong> de
        doenças cardiovasculares, câncer e diabetes, além de reduzir sintomas de depressão e ansiedade.
      </span>
    </div>
  </div>
    </div>
    
  </div>
</div>

<!-- Benefício -->

<div class="container">
 
  <!-- Transição para o Capítulo 02 -->
  <div class="block reveal">
    <p class="bridge">O que nos leva à <strong>pergunta...</strong></p>
  </div>
</div>

</section>