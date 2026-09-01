<?php
/**
 * Esporte como direito — quem fica de fora e por quê?
 * Landing page editorial / infográfico.
 *
 * Estrutura: o conteúdo de cada seção vive em um arquivo PHP separado
 * em /sections e é incluído aqui. Assim você edita uma seção por vez,
 * sem tocar no resto.
 */

$BASE = __DIR__;

include $BASE . "/includes/header.php";
?>

<main id="conteudo">
  <?php
  // Ordem obrigatória da narrativa (01 a 12).
  $secoes = [
    "sections/hero.php",
    "sections/intro.php",
    "sections/evidence.php",
    "sections/gender.php",
    "sections/socioeconomic.php",
    "sections/lgbtqia.php",
    "sections/interest.php",
    "sections/barriers.php",
    "sections/regional.php",
    "sections/conclusion.php",
    "sections/sources.php",
    "sections/final.php"
  ];

  foreach ($secoes as $sec) {
    $arquivo = $BASE . "/" . $sec;
    if (file_exists($arquivo)) {
      include $arquivo;
    } else {
      echo "<!-- Seção não encontrada: " . htmlspecialchars($sec) . " -->";
    }
  }
  ?>
</main>

<?php include $BASE . "/includes/footer.php"; ?>
