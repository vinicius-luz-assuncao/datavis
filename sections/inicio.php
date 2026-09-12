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
  <div class="container">
    <header class="chapter__head reveal">
      <span class="chapter__marker">Capítulo 01 · Início</span>
      <h2 class="chapter-title-split">
        <span class="split-l1">Nossa sociedade está se tornando cada vez mais...</span>
        <span class="split-l2">Sedentária.</span>
      </h2>
    </header>

    <!-- História de abertura (texto em cascata, sem canvas) -->
    <!-- <div class="block reveal">
      <blockquote class="prose-intro prose-plain">
        <p class="prose-line" style="--i: 0;">Ela compra um tênis.</p>
        <p class="prose-line" style="--i: 1;">Escolhe uma academia.</p>
        <p class="prose-line" style="--i: 2;">Salva um treino e promete que na segunda-feira, vai...</p>
        <p class="prose-line" style="--i: 3;">mas a segunda-feira nunca chega.</p>
        <p class="prose-line" style="--i: 4;">Talvez falte tempo.</p>
        <p class="prose-line" style="--i: 5;">Talvez falte companhia.</p>
      </blockquote>
    </div> -->

    <!-- Faixa de ilustração de abertura -->
    <!-- <div class="block reveal">
      <p class="graphite-note">Faixa de abertura — gente diversa em movimento (arte final 2D ou cena 3D)</p>
      <figure class="illustration illustration--large" role="img"
        aria-label="Ilustração editorial: corredor, pessoa em pé e skatista lado a lado, sugerindo diferentes formas de se mover.">
        <figcaption class="illustration__art">Corredor, pessoa em pé e skatista</figcaption>
      </figure>
    </div> -->

    <!-- Números-coluna em escala real -->
    <div class="block reveal">
      
      <div class="bignums" data-bignums role="img"
        aria-label="31% dos adultos e 80% dos adolescentes não atingem o nível recomendado de atividade física. Fonte: WHO, 2024.">
        <div class="bignums__axis" aria-hidden="true">
          <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
        </div>
        <div class="bignums__col">
          <span class="bignums__value" data-bignum data-value="31" style="color: var(--color-amber);">0%</span>
        </div>
        <span class="bignums__conj" aria-hidden="true">e</span>
        <div class="bignums__col">
          <span class="bignums__value" data-bignum data-value="80" style="color: var(--color-vermilion);">0%</span>
        </div>
        <div class="bignums__rule" aria-hidden="true"></div>
        <span class="bignums__cap bignums__cap--a">dos adultos</span>
        <span class="bignums__cap bignums__cap--b">dos adolescentes</span>
      </div>
      <p class="block__lede">
              Não atinge o nível mínimo recomendado de atividade física.
            </p>  
            <p class="stat__source small-note">Fonte: WHO, 2024.</p>
    </div>
    
    <!-- Barra populacional com slider -->
    <div class="block reveal">
      <p class="block__lede">Em um mundo com <strong class="pop-huge">8 bilhões</strong> <span class="pop-big">de pessoas</span>, arraste o ano e veja a conta crescer:</p>
      <p class="body-text">
        Quase <strong>1,8 bilhão</strong> de adultos estão fisicamente inativos — e, se a tendência
        continuar, esse número pode chegar a <strong>35% até 2030</strong>.
      </p>
      <div class="popslider" data-chart="popslider">
        <div class="popslider__canvas" data-pop-canvas></div>
        <div class="popslider__controls">
          <label for="popYear">Ano</label>
          <input type="range" id="popYear" min="2010" max="2030" step="1" value="2010" aria-label="Ano da estimativa" />
          <span class="popslider__year" data-pop-year>2010</span>
        </div>
        <div class="popslider__legend" aria-hidden="true">
          <span class="popslider__legend-item"><i style="background: var(--color-slate);"></i> População adulta total</span>
          <span class="popslider__legend-item"><i style="background: var(--color-vermilion);"></i> Adultos insuficientemente ativos</span>
        </div>
        <div class="popslider__tip" data-pop-tip></div>
        <p class="small-note" style="margin-top: var(--space-sm); max-width: 62ch;">
          Fonte: OMS (2024); totais adultos: ONU WPP 2024. O dado de 2010 é derivado do “+5 p.p. desde 2010”
          informado pela OMS; o de 2030 é projeção. Valores intermediários são interpolação linear.
        </p>
      </div>
    </div>

    <!-- Custo + quadra 3D (futura) -->
    <div class="block reveal">
      <p class="cost-display">Um custo de até <strong>300 bi</strong> na saúde pública global</p>
      <p class="stat__source small-note">Estimativa 2020–2030. Fonte: WHO, 2024.</p>
      <!-- Futura cena 3D: plugar a GLB da quadra aqui (padrão js/quarto.js);
           o texto do custo será gravado na textura do chão da quadra. -->
      <figure class="illustration illustration--large" data-scene="quadra" role="img"
        aria-label="Espaço 3D futuro de uma quadra de basquete onde a bola cai na quadra; o texto do custo será gravado na textura do chão.">
        <figcaption class="illustration__art">Quadra de basquete 3D (cena futura — bola cai na quadra; texto no chão)</figcaption>
      </figure>
    </div>

    <!-- Banco: imagem + risco -->
    <div class="block reveal">
      <div class="bench-block">
        <figure class="illustration illustration--medium" role="img"
          aria-label="Ilustração editorial de uma pessoa sentada no banco, fora do jogo.">
          <figcaption class="illustration__art">Pessoa sentada no banco (PNG futuro)</figcaption>
        </figure>
        <div class="bench-text">
          <p class="body-text">
            Pessoas insuficientemente ativas têm de <strong>20% a 30%</strong> mais risco
            de morte em comparação às suficientemente ativas.
          </p>
          <p class="stat__source small-note">Fonte: WHO, 2024.</p>
        </div>
      </div>
    </div>

    <!-- Benefício -->
    <div class="block reveal">
      <div class="editorial-callout">
        <span class="small-note">
          Na direção oposta, a atividade física regular contribui para a <strong>prevenção e o manejo</strong> de
          doenças cardiovasculares, câncer e diabetes, além de reduzir sintomas de depressão e ansiedade.
        </span>
      </div>
    </div>

    <!-- Transição para o Capítulo 02 -->
    <div class="block reveal">
      <p class="bridge">O que nos leva à pergunta: <strong>por que é que mais gente “sobra” no banco?</strong></p>
    </div>

     <!-- Cena interativa (quarto 3D, vinda do Cap. 01) -->
    <div class="block reveal scene-block">
      <div class="prose-stage quarto-section scene-stage">
        <div class="prose-canvas" data-quarto-canvas aria-hidden="true"></div>
      </div>
      <p class="graphite-note" style="margin-top: var(--space-sm);">Cena interativa — arraste a bola com o mouse ou o dedo.</p>
    </div>
    
  </div>
</section>
