import { initPlanet } from "../assets/earth/planet.js";

// Um planeta por [data-planet]; modelURL por data-model (hoje todos o
// planet.glb — amanhã cada camada aponta o seu sem mexer no JS).
document.querySelectorAll("[data-planet]").forEach((el) => {
  try {
    initPlanet(el, { modelURL: el.dataset.model || "assets/earth/planet.glb" });
  } catch (err) {
    /* Sem WebGL/CDN o espaço fica vazio sem quebrar a página. */
  }
});
