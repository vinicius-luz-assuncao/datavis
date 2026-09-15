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

// Ordem da narrativa em 4 tempos + encerramento. As fontes ficam
// depois do fechamento, como um bloco recolhível, atrás do "Vem comigo?".
$secoes = [
  "sections/hero.php",
  "sections/inicio.php",
  "sections/conflito.php",
  "sections/diagnostico.php",
  "sections/fechamento.php",
  "sections/final.php",
  "sections/fontes.php"
];

include $BASE . "/includes/header.php";

// Rótulos do "percurso" (navegação de âncoras). A chave é o nome do
// arquivo da seção — assim a navegação acompanha automaticamente a
// ordem de $secoes. Seções sem rótulo aqui simplesmente não entram.
$navLabels = [
  "hero" => "Abertura",
  "inicio" => "Início",
  "conflito" => "Conflito",
  "diagnostico" => "Diagnóstico",
  "fechamento" => "Fechamento",
  "fontes" => "Fontes",
  "final" => "Vem comigo?"
];

$navItems = [];
foreach ($secoes as $sec) {
  $id = basename($sec, ".php");
  if (isset($navLabels[$id])) {
    $navItems[] = ["id" => $id, "label" => $navLabels[$id]];
  }
}

include $BASE . "/includes/nav.php";
?>

<main id="conteudo">
  <?php
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
