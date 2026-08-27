import { defineConfig } from "vite";

// Base "./" para hospedagem estática: funciona na raiz do Hostgator
// (public_html) ou em qualquer subpasta, sem precisar de config extra.
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets"
  }
});
