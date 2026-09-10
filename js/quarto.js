import { initQuarto } from "../assets/Quarto-interacao/main.js";

const stage = document.querySelector("[data-quarto-canvas]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (stage && !reducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        try {
          const quarto = initQuarto(stage, {
            modelURL: "assets/Quarto-interacao/quarto02.glb",
            /* Ponto de vista um pouco mais à direita que o padrão. */
            cameraPos: [3.1, 3.5, 3.0],
          });
          /* Zoom mais fechado em direção à parede (padrão: 42). */
          if (quarto && quarto.camera) {
            quarto.camera.fov = 33;
            quarto.camera.updateProjectionMatrix();
          }
        } catch (err) {
          /* Sem WebGL/CDN o palco segue só com texto + véu. */
        }
        io.disconnect();
      });
    },
    { threshold: 0.15 }
  );
  io.observe(stage);
}
