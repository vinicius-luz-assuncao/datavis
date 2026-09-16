<?php
/**
 * includes/equipe.php — dados da equipe.
 *
 * Foto e review vêm do disco quando existirem (assets/equipe/<slug>.<ext>
 * e <slug>.txt); senão, iniciais coloridas + lorem ipsum. Para adicionar
 * gente, basta soltar a foto e o txt com o slug abaixo — sem mexer no HTML.
 */
function equipe_lorem() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
}

function equipe_foto($slug) {
  foreach (["jpeg", "jpg", "png", "PNG"] as $ext) {
    $rel = "assets/equipe/" . $slug . "." . $ext;
    if (is_file(__DIR__ . "/../" . $rel)) return $rel;
  }
  return null;
}

function equipe_review($slug) {
  $path = __DIR__ . "/../assets/equipe/" . $slug . ".txt";
  if (is_readable($path)) {
    $t = trim((string) file_get_contents($path));
    if ($t !== "") return $t;
  }
  return equipe_lorem();
}

$equipeDef = [
  ["nome" => "Emilly", "slug" => "emilly", "cor" => "var(--color-sky)"],
  ["nome" => "Ferdinand", "slug" => "ferdinand", "cor" => "var(--color-sage)"],
  ["nome" => "Gaby", "slug" => "gaby", "cor" => "var(--color-amber)"],
  ["nome" => "Leandro", "slug" => "leandro", "cor" => "var(--color-plum)"],
  ["nome" => "Lyliam", "slug" => "lyliam", "cor" => "var(--color-purple)"],
  ["nome" => "Monique", "slug" => "monique", "cor" => "var(--color-vermilion)"],
  ["nome" => "Vini L", "slug" => "vini_l", "cor" => "var(--color-sky)"],
  ["nome" => "Vini O", "slug" => "vini_o", "cor" => "var(--color-sage)"],
];

$equipe = array_map(function ($p) {
  $iniciais = mb_strtoupper(mb_substr($p["nome"], 0, 1, "UTF-8"), "UTF-8");
  return [
    "nome" => $p["nome"],
    "foto" => equipe_foto($p["slug"]),
    "review" => equipe_review($p["slug"]),
    "iniciais" => $iniciais,
    "cor" => $p["cor"],
  ];
}, $equipeDef);
