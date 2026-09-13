import { initQuarto } from "../assets/Quarto-interacao/main.js";

const stage = document.querySelector("[data-quarto-canvas]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (stage && !reducedMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        try {
          /* A câmera agora vem do próprio GLB (posição, rotação e fov). */
          initQuarto(stage, {
            modelURL: "assets/Quarto-interacao/quadra.glb",
          });
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
