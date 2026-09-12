<?php
/**
 * CAPÍTULO 03 — DIAGNÓSTICO
 * "Os motivos mudam quando se olha mais de perto" — IBGE 2017, NIX 2022, Lopes & Del Vecchio 2026.
 *
 * Comparação de COMPOSIÇÃO de motivos (não de valores absolutos): as fontes
 * têm categorias e metodologias diferentes.
 */
?>
<section class="section chapter" id="diagnostico">
  <div class="container">
    <header class="chapter__head reveal">
      <span class="chapter__marker">Capítulo 03 · Diagnóstico</span>
      <h2 class="section-title">Os motivos mudam quando se olha mais de perto</h2>
    </header>

    <!-- 3.1 Motivos: IBGE x NIX -->
    <div class="block reveal">
      <p class="block__lede">
        Na população em geral, o motivo mais citado é a falta de tempo. Dentro da comunidade LGBTQIA+, o tempo
        continua em primeiro — mas a composição muda.
      </p>

      <div class="gbar" data-chart="grouped-bar">
        <div class="gbar__legend">
          <span class="gbar__legend-item"><i style="background: var(--color-amber);"></i> IBGE, 2017</span>
          <span class="gbar__legend-item"><i style="background: var(--color-purple);"></i> NIX Diversidade/Nike, 2022</span>
        </div>
        <div class="gbar__row">
          <p class="gbar__row-label">Falta de tempo</p>
          <div class="gbar__bar" data-name="IBGE" data-value="38.2" data-color="var(--color-amber)"></div>
          <div class="gbar__bar" data-name="NIX" data-value="26.3" data-color="var(--color-purple)"></div>
        </div>
        <div class="gbar__row">
          <p class="gbar__row-label">Falta de companhia</p>
          <div class="gbar__bar" data-name="IBGE" data-value="1.7" data-color="var(--color-amber)"></div>
          <div class="gbar__bar" data-name="NIX" data-value="20.6" data-color="var(--color-purple)"></div>
        </div>
        <div class="gbar__row">
          <p class="gbar__row-label">Não gostar / falta de interesse</p>
          <div class="gbar__bar" data-name="IBGE" data-value="35.0" data-color="var(--color-amber)"></div>
          <div class="gbar__bar" data-name="NIX" data-value="18" data-color="var(--color-purple)"></div>
        </div>
      </div>
      <p class="stat__source small-note">Fontes: IBGE, 2017, p. 20; NIX Diversidade/Nike, 2022, p. 27.</p>

      <div class="editorial-callout" style="margin-top: var(--space-lg);">
        <span class="small-note">
          As categorias e os pesos de cada pesquisa são próprios. A leitura aqui é de <strong>composição e ordem</strong>
          dos motivos — não de comparação em valor absoluto.
        </span>
      </div>
    </div>

    <!-- 3.2 Motivos na população em geral (ranking IBGE) -->
    <div class="block reveal">
      <p class="block__lede">Vamos olhar mais de perto.</p>
      <p class="body-text">
        Na população brasileira em geral, o principal motivo para não praticar esporte é a falta de tempo —
        seguida de perto por simplesmente não gostar ou não querer.
      </p>
      <div class="bar-chart" data-chart="bar">
        <div class="bar-row" data-label="Falta de tempo" data-value="38.2" data-color="var(--color-amber)"></div>
        <div class="bar-row" data-label="Não gostar ou não querer" data-value="35" data-color="var(--color-amber)"></div>
        <div class="bar-row" data-label="Saúde ou idade" data-value="19" data-color="var(--color-slate)"></div>
        <div class="bar-row" data-label="Falta de instalação acessível" data-value="2.7" data-color="var(--color-slate)"></div>
        <div class="bar-row" data-label="Problema financeiro" data-value="1.9" data-color="var(--color-slate)"></div>
        <div class="bar-row" data-label="Falta de companhia" data-value="1.7" data-color="var(--color-slate)"></div>
      </div>
      <p class="stat__source small-note">Fonte: IBGE, 2017, p. 20.</p>
    </div>

    <!-- 3.3 Motivos na comunidade LGBTQIA+ (ranking NIX) -->
    <div class="block reveal">
      <p class="byline">Comunidade LGBTQIAPN+</p>
      <p class="body-text">
        Na comunidade LGBTQIAPN+, algo muda drasticamente: entre os motivos aparecem barreiras que nem
        existem como categoria na pesquisa do IBGE.
      </p>
      <p class="drop">O tempo ainda é a principal barreira — mas não é a única.</p>
      <div class="bar-chart" data-chart="bar">
        <div class="bar-row" data-label="Falta de tempo" data-value="26.3" data-color="var(--color-purple)"></div>
        <div class="bar-row" data-label="Falta de companhia" data-value="20.6" data-color="var(--color-purple)"></div>
        <div class="bar-row" data-label="Falta de interesse" data-value="18" data-color="var(--color-purple)"></div>
        <div class="bar-row" data-label="Falta de capacidade física" data-value="10" data-color="var(--color-purple)"></div>
        <div class="bar-row" data-label="Homofobia ou transfobia" data-value="9.6" data-color="var(--color-plum)"></div>
        <div class="bar-row" data-label="Bullying ou assédio" data-value="8.7" data-color="var(--color-vermilion)"></div>
      </div>
      <p class="stat__source small-note">Fonte: NIX Diversidade/Nike, 2022, p. 27.</p>
    </div>

    <!-- 3.4 Discriminação -->
    <div class="block reveal">
      <p class="block__lede">Afinal, todo mundo se sente incluso?</p>
      <p class="body-text">O medo também faz parte da experiência de muita gente — e a barreira não termina
        quando a pessoa começa a praticar.</p>
      <div class="section-grid grid-duo" style="margin-top: var(--space-lg);">
        <div class="donut" data-chart="donut" data-value="63.5" data-color="var(--color-plum)"
          data-label="já sofreu ou presenciou discriminação ao praticar esporte"></div>
        <div class="donut" data-chart="donut" data-value="68.3" data-color="var(--color-vermilion)"
          data-label="relataram discriminação em ambientes esportivos (estádios, ginásios, competições de rua)"></div>
      </div>
      <p class="stat__source small-note">Fonte: NIX Diversidade/Nike, 2022, p. 38–39.</p>
    </div>

    <!-- 3.5 Apoio à inclusão trans -->
    <div class="block reveal">
      <p class="block__lede">
        Inclusão também é pertencer.
      </p>
      <p class="body-text">A própria comunidade apoia a superação de divisões rígidas de categoria.</p>
      <div class="range" data-chart="range" data-scale="0,100" data-unit="%">
        <div class="range__row"
          data-label="Concordam que pessoas trans deveriam jogar nos mesmos times que pessoas cisgêneras de mesmo gênero"
          data-min="75.6" data-max="76.8" data-color="var(--color-purple)"></div>
      </div>
      <p class="stat__source small-note">Fonte: NIX Diversidade/Nike, 2022, p. 40.</p>
    </div>

    <!-- 3.6 Companhia (Lopes) -->
    <div class="block reveal">
      <p class="byline">Estudantes do Ensino Médio · Pelotas</p>
      <p class="block__lede">E a companhia faz diferença.</p>
      <p class="body-text">Outro estudo reforça a importância da companhia entre estudantes do Ensino Médio.</p>

      <div class="gbar" data-chart="grouped-bar">
        <div class="gbar__legend">
          <span class="gbar__legend-item"><i style="background: var(--color-plum);"></i> Estudantes LGBT+</span>
          <span class="gbar__legend-item"><i style="background: var(--color-sky);"></i> Estudantes não-LGBT+</span>
        </div>
        <div class="gbar__row">
          <p class="gbar__row-label">Citaram “falta de companhia” como barreira</p>
          <div class="gbar__bar" data-name="LGBT+" data-value="40" data-color="var(--color-plum)"></div>
          <div class="gbar__bar" data-name="Não-LGBT+" data-value="14" data-color="var(--color-sky)"></div>
        </div>
      </div>

      <div class="gbar" data-chart="grouped-bar" data-max="40" data-unit=" pts" style="margin-top: var(--space-xl);">
        <div class="gbar__row">
          <p class="gbar__row-label">Escore de barreiras específicas (média ± desvio)</p>
          <div class="gbar__bar" data-name="Feminino 26,1 ± 9,2" data-value="26.1" data-color="var(--color-plum)"></div>
          <div class="gbar__bar" data-name="Masculino 13,8 ± 13,7" data-value="13.8" data-color="var(--color-sky)"></div>
        </div>
      </div>
      <p class="stat__source small-note">Fonte: Lopes &amp; Del Vecchio, 2026.</p>
    </div>

    <!-- Ilustração -->
    <figure class="illustration illustration--medium reveal" style="margin-top: var(--space-xl);" role="img"
      aria-label="Ilustração editorial: uma pessoa observando o grupo de fora, ou um vestiário pouco acolhedor. Foco em pertencimento e segurança.">
      <figcaption class="illustration__art">Quem observa o grupo de fora</figcaption>
    </figure>
  </div>
</section>
