<?php
/**
 * CAPÍTULO 03 — DIAGNÓSTICO
 * "Os motivos mudam quando se olha mais de perto" — IBGE 2017, NIX 2022, Lopes & Del Vecchio 2026.
 *
 * Comparação de COMPOSIÇÃO de motivos (não de valores absolutos): as fontes
 * têm categorias e metodologias diferentes.
 *
 * Estrutura em carrossel (mesmo padrão do capítulo 02): título fixo no topo
 * e 4 painéis que passam um por vez. Sem JS vira pilha vertical.
 */
?>
<section class="section chapter" id="diagnostico">
  <div class="container">
    <div class="hwrap" data-hscroll style="--hpanels: 3;">
      <div class="hstage" data-hstage>
        <header class="chapter__head chapter__head--wide reveal hstage__head">
          <span class="chapter__marker">Capítulo 03 · Diagnóstico</span>
          <h2 class="chapter-title-split">
            <span class="split-l1">Olhando de perto</span>
            <span class="split-l2">algo muda drasticamente</span>
          </h2>
        </header>

        <div class="htrack" data-htrack>
          <!-- Carrossel 01 — Motivos em 2 colunas: população em geral · comunidade -->
          <div class="hpanel">
            <div class="block reveal">
              <p class="block__lede">na dificuldade para praticar atividade física</p>
              <div class="trio-cols trio-cols--duo">
                <div class="trio__col">
                  <p class="byline">A População brasileira em geral</p>
                  <p class="body-text">
                    tem como principal motivo a falta de tempo.
                  </p>
                  <div class="bar-chart" data-chart="bar">
                    <div class="bar-row" data-label="Falta de tempo" data-value="38.2" data-color="var(--color-amber)"></div>
                    <div class="bar-row" data-label="Não gostar ou não querer" data-value="35" data-color="var(--color-amber)"></div>
                    <div class="bar-row" data-label="Saúde ou idade" data-value="19" data-color="var(--color-amber)"></div>
                    <div class="bar-row" data-label="Falta de instalação acessível" data-value="2.7" data-color="var(--color-amber)"></div>
                    <div class="bar-row" data-label="Problema financeiro" data-value="1.9" data-color="var(--color-amber)"></div>
                    <div class="bar-row" data-label="Falta de companhia" data-value="1.7" data-color="var(--color-amber)"></div>
                  </div>
                  <p class="stat__source small-note">Fonte: IBGE, 2017, p. 20.</p>
                </div>
                <div class="trio__col">
                  <p class="byline">Na Comunidade LGBTQIAPN+</p>
                  <p class="body-text">
                    A composição muda mas algo se destaca
                  </p>
                  <div class="bar-chart" data-chart="bar">
                    <div class="bar-row" data-label="Falta de tempo" data-value="26.3" data-color="var(--color-purple)"></div>
                    <div class="bar-row" data-label="Falta de companhia" data-value="20.6" data-color="var(--color-pink)"></div>
                    <div class="bar-row" data-label="Falta de interesse" data-value="18" data-color="var(--color-purple)"></div>
                    <div class="bar-row" data-label="Falta de capacidade física" data-value="10" data-color="var(--color-purple)"></div>
                    <div class="bar-row" data-label="Homofobia ou transfobia" data-value="9.6" data-color="var(--color-pink)"></div>
                    <div class="bar-row" data-label="Bullying ou assédio" data-value="8.7" data-color="var(--color-vermilion)"></div>
                  </div>
                  <p class="stat__source small-note">Fonte: NIX Diversidade/Nike, 2022, p. 27.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Carrossel 02 — Destaques em 3 colunas -->
          <div class="hpanel">
            <div class="block reveal">
              <p class="byline">Destaques</p>
              <p class="body-text">
                A falta de companhia é um fator importante e destoante
              </p>
              <div class="trio-cols">
                <div class="trio__col">
                  <div class="gbar" data-chart="grouped-bar">
                    <div class="gbar__row">
                      <p class="gbar__row-label">Falta de tempo</p>
                      <div class="gbar__bar" data-name="População geral" data-value="38.2" data-color="var(--color-amber)"></div>
                      <div class="gbar__bar" data-name="LGBTQIAPN+" data-value="26.3" data-color="var(--color-purple)"></div>
                    </div>
                  </div>
                </div>
                <div class="trio__col">
                  <div class="gbar" data-chart="grouped-bar">
                    <div class="gbar__row">
                      <p class="gbar__row-label">Falta de companhia</p>
                      <div class="gbar__bar" data-name="População geral" data-value="1.7" data-color="var(--color-amber)"></div>
                      <div class="gbar__bar" data-name="LGBTQIAPN+" data-value="20.6" data-color="var(--color-pink)"></div>
                    </div>
                  </div>
                </div>
                <div class="trio__col">
                  <div class="gbar" data-chart="grouped-bar">
                    <div class="gbar__row">
                      <p class="gbar__row-label">Não gostar / falta de interesse</p>
                      <div class="gbar__bar" data-name="População geral" data-value="35.0" data-color="var(--color-amber)"></div>
                      <div class="gbar__bar" data-name="LGBTQIAPN+" data-value="18" data-color="var(--color-purple)"></div>
                    </div>
                  </div>
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
          </div>

          <!-- Carrossel 03 — Inclusão (donuts) -->
          <div class="hpanel">
            <div class="block reveal">
              <p class="block__lede">Afinal, todo mundo se sente incluso?</p>
              <p class="body-text">O medo também faz parte da experiência de muita gente — e a barreira não termina
                quando a pessoa começa a praticar.</p>
              <div class="section-grid grid-duo" style="margin-top: var(--space-lg);">
                <div class="donut donut--side" data-chart="donut" data-value="63.5" data-color="var(--color-plum)"
                  data-label="já sofreu ou presenciou discriminação ao praticar esporte"></div>
                <div class="donut donut--side" data-chart="donut" data-value="68.3" data-color="var(--color-vermilion)"
                  data-label="relataram discriminação em ambientes esportivos (estádios, ginásios, competições de rua)"></div>
              </div>
              <p class="stat__source small-note">Fonte: NIX Diversidade/Nike, 2022, p. 38–39.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>