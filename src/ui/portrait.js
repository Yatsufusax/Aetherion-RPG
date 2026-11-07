// Retrato de la cara del personaje (recorte de su sprite) para listas y paneles.
import { h } from "./dom.js";
import { tintFilter } from "../data/appearance.js";

const images = new Map();
function loadImage(src) {
  if (!images.has(src)) {
    const image = new Image();
    image.src = src;
    images.set(src, image);
  }
  return images.get(src);
}

export function createPortrait(size) {
  const canvas = h("canvas", { class: "portrait", width: size, height: size });
  const g = canvas.getContext("2d");
  let current = null;

  function paint() {
    g.clearRect(0, 0, size, size);
    if (!current || !current.cls || !current.cls.sprite) return;

    const sprite = current.cls.sprite;
    const image = loadImage(sprite.src);

    if (!image.complete || !image.naturalWidth) {
      image.addEventListener("load", paint, { once: true });
      return;
    }

    g.imageSmoothingEnabled = false;
    const filter = tintFilter(current.look);
    if (filter !== "none") g.filter = filter;
    // La cabeza ocupa la parte alta del cuadro frontal (fila 0, cuadro 0)
    g.drawImage(image, 16, 4, 32, 32, 0, 0, size, size);
    g.filter = "none";
  }

  return {
    el: canvas,
    set(cls, look) { current = { cls, look }; paint(); }
  };
}
