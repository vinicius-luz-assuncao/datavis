<?php
/**
 * EQUIPE
 * Grade de cartões com foto, nome e texto de cada integrante.
 * Dados em includes/equipe.php (fotos e reviews vêm do disco;
 * sem arquivo, iniciais + lorem ipsum).
 */
require_once __DIR__ . "/../includes/equipe.php";
?>
<section class="section" id="equipe">
  <div class="container">
    <header class="chapter__head reveal">
      <span class="chapter__marker">Equipe</span>
      <h2 class="section-title">Quem somos</h2>
    </header>

    <div class="team-grid">
      <?php foreach ($equipe as $pessoa): ?>
        <article class="team-card reveal" data-team-card>
          <div class="team-card__photo">
            <span class="team-card__initials" style="background: <?= htmlspecialchars($pessoa["cor"], ENT_QUOTES, "UTF-8") ?>;" aria-hidden="true"><?= htmlspecialchars($pessoa["iniciais"], ENT_QUOTES, "UTF-8") ?></span>
            <?php if ($pessoa["foto"]): ?>
              <img class="team-card__img" data-src="<?= htmlspecialchars($pessoa["foto"], ENT_QUOTES, "UTF-8") ?>" alt="Foto de <?= htmlspecialchars($pessoa["nome"], ENT_QUOTES, "UTF-8") ?>" loading="lazy" />
            <?php endif; ?>
          </div>
          <div class="team-card__body">
            <h3 class="team-card__name"><?= htmlspecialchars($pessoa["nome"], ENT_QUOTES, "UTF-8") ?></h3>
            <p class="team-card__review" data-team-review><?= htmlspecialchars($pessoa["review"], ENT_QUOTES, "UTF-8") ?></p>
            <button type="button" class="team-card__more" data-team-more aria-expanded="false" hidden>Ler mais</button>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
