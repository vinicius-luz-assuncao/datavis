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
  "sections/fontes.php",
  "sections/equipe.php"
];

include $BASE . "/includes/header.php";

// Navegação de âncoras: número (abertura = 00) e cor do design system
// por bolinha. A chave é o nome do arquivo da seção.
$navLabels = [
  "hero" => ["label" => "Abertura", "num" => "00", "dot" => "var(--color-sky)"],
  "inicio" => ["label" => "Introdução", "num" => "01", "dot" => "var(--color-amber)"],
  "conflito" => ["label" => "Conflito", "num" => "02", "dot" => "var(--color-plum)"],
  "diagnostico" => ["label" => "Diagnóstico", "num" => "03", "dot" => "var(--color-purple)"],
  "fechamento" => ["label" => "Conclusão", "num" => "04", "dot" => "var(--color-vermilion)"],
  "final" => ["label" => "Vem comigo?", "num" => "05", "dot" => "var(--color-pink)"],
  "fontes" => ["label" => "Fontes", "num" => "06", "dot" => "var(--color-slate)"],
  "equipe" => ["label" => "Equipe", "num" => "07", "dot" => "var(--color-sage)"],
];

$navItems = [];
foreach ($secoes as $sec) {
  $id = basename($sec, ".php");
  if (isset($navLabels[$id])) {
    $navItems[] = [
      "id" => $id,
      "label" => $navLabels[$id]["label"],
      "num" => $navLabels[$id]["num"],
      "dot" => $navLabels[$id]["dot"],
    ];
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
