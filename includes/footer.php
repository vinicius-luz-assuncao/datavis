<?php
/**
 * Rodapé da página: scripts JS (Vendor + app) e fechamento do <body>.
 *
 * - js/vendor/d3.min.js  → biblioteca D3 (local, funciona offline/host)
 * - js/main.js           → animações de scroll, contagem de números
 * - js/charts.js         → gráficos em D3 (donut, barras, etc.)
 * - js/quarto.js         → canvas three.js atrás do texto de abertura
 * - js/planets.js        → planetas do Capítulo 02 (um por [data-planet])
  */
?>
  <!-- Scripts -->
  <script src="js/vendor/d3.min.js"></script>
  <script src="js/main.js"></script>
  <script src="js/charts.js"></script>
  <script type="module" src="js/quarto.js"></script>
  <script type="module" src="js/planets.js"></script>
</body>
</html>
