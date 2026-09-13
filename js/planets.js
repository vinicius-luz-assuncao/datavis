import { initPlanet } from "../assets/earth/planet.js";

// Um planeta por [data-planet]; modelURL por data-model (hoje planet.glb e
// planet-brasil.glb — cada camada aponta o seu sem mexer no JS) e modo por
// data-mode ("spin" padrão; "float" flutua e retorna à origem ao soltar).
document.querySelectorAll("[data-planet]").forEach((el) => {
  try {
    initPlanet(el, {
      modelURL: el.dataset.model || "assets/earth/planet.glb",
      mode: el.dataset.mode || "spin"
    });
  } catch (err) {
    /* Sem WebGL/CDN o espaço fica vazio sem quebrar a página. */
  }
});
