<?php
/**
 * includes/nav.php — Navegação de âncoras ("percurso")
 *
 * Recebe do index.php a variável $navItems: uma lista de
 * ['id' => 'id-da-secao', 'label' => 'Rótulo legível'].
 *
 * Conceito: a narrativa é um percurso. Cada seção é um checkpoint
 * numerado; a linha preenche conforme a rolagem (a distância percorrida).
 * Os links são âncoras reais — funcionam mesmo sem JavaScript.
 */
if (!isset($navItems) || empty($navItems)) {
  return;
}
?>
<nav class="trail" id="trail" aria-label="Percurso da narrativa">
  <span class="trail__eyebrow" aria-hidden="true">Percurso</span>
  <div class="trail__body">
    <span class="trail__track" aria-hidden="true">
      <span class="trail__progress" data-trail-progress></span>
    </span>
    <ul class="trail__list">
      <?php foreach ($navItems as $i => $item): ?>
        <li class="trail__item">
          <a class="trail__link"
             href="#<?= htmlspecialchars($item['id'], ENT_QUOTES, 'UTF-8') ?>"
             data-trail-target="<?= htmlspecialchars($item['id'], ENT_QUOTES, 'UTF-8') ?>">
            <span class="trail__label"><?= htmlspecialchars($item['label'], ENT_QUOTES, 'UTF-8') ?></span>
            <span class="trail__dot" aria-hidden="true"><?= str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT) ?></span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</nav>
