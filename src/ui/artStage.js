// ==========================================
// ESCENARIO DE ILUSTRACIÓN
// ==========================================
// Muestra una ilustración completa (con su interfaz dibujada) ajustada a la pantalla
// y permite colocar encima elementos reales (campos, botones) con las coordenadas
// de la imagen original. Se escala siempre completa (sin recortar) y los lados que
// sobran se rellenan con la misma imagen desenfocada.

import { h } from "./dom.js";

export function createStage(src, W, H) {
  const blur = h("img", { class: "art-blur", src, alt: "", draggable: "false" });
  const box = h("div", { class: "art-box" }, h("img", { class: "art-img", src, alt: "", draggable: "false" }));
  const hint = h("div", { class: "rotate-hint", text: "Gira el dispositivo para jugar en horizontal" });
  const el = h("section", { class: "scene scene-art" }, blur, box, hint);

  function fit() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = Math.min(vw / W, vh / H);
    box.style.width = `${W * s}px`;
    box.style.height = `${H * s}px`;
    box.style.left = `${(vw - W * s) / 2}px`;
    box.style.top = `${(vh - H * s) / 2}px`;
    box.style.setProperty("--u", `${s}px`); // 1 píxel de la imagen original
  }

  window.addEventListener("resize", fit);
  fit();

  return {
    el,
    box,
    // Coloca un elemento sobre la imagen: x, y, ancho y alto en píxeles de la imagen original
    spot(node, x, y, w, hh) {
      node.classList.add("spot");
      node.style.left = `${(x / W) * 100}%`;
      node.style.top = `${(y / H) * 100}%`;
      node.style.width = `${(w / W) * 100}%`;
      node.style.height = `${(hh / H) * 100}%`;
      box.append(node);
      return node;
    },
    destroy() { window.removeEventListener("resize", fit); }
  };
}
