<?php
/**
 * includes/nav.php — Navegação de âncoras ("percurso")
 *
 * Recebe do index.php a variável $navItems: uma lista de
 * ['id' => 'id-da-secao', 'label' => 'Rótulo legível'].
 *
 * Conceito: cada seção é um checkpoint; a linha preenche conforme a
 * rolagem (a distância percorrida). Os links são âncoras reais —
 * funcionam mesmo sem JavaScript.
  */
if (!isset($navItems) || empty($navItems)) {
  return;
}
?>
<nav class="trail" id="trail" aria-label="Navegação de seções">
  <div class="trail__body">
    <span class="trail__track" aria-hidden="true">
      <span class="trail__progress" data-trail-progress></span>
    </span>
    <ul class="trail__list">
      <?php foreach ($navItems as $item): ?>
        <li class="trail__item">
          <a class="trail__link"
             href="#<?= htmlspecialchars($item['id'], ENT_QUOTES, 'UTF-8') ?>"
             data-trail-target="<?= htmlspecialchars($item['id'], ENT_QUOTES, 'UTF-8') ?>">
            <span class="trail__label"><?= htmlspecialchars($item['label'], ENT_QUOTES, 'UTF-8') ?></span>
            <span class="trail__dot" aria-hidden="true" style="--dot-color: <?= htmlspecialchars($item['dot'] ?? 'var(--color-ink)', ENT_QUOTES, 'UTF-8') ?>;"><?= htmlspecialchars($item['num'] ?? '', ENT_QUOTES, 'UTF-8') ?></span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</nav>
