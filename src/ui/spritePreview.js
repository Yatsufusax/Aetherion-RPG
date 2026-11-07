// Vista previa animada de un personaje en un <canvas> (usa la hoja de sprites de la clase).
import { h } from "./dom.js";

const images = new Map();

function loadImage(src) {
  if (!images.has(src)) {
    const image = new Image();
    image.src = src;
    images.set(src, image);
  }
  return images.get(src);
}

export function createSpritePreview(cls, { scale = 3, walking = true } = {}) {
  const sprite = cls.sprite;
  const size = sprite.frame * scale;
  const canvas = h("canvas", { class: "sprite-preview", width: size, height: size });
  const g = canvas.getContext("2d");
  const image = loadImage(sprite.src);

  const view = { direction: "down", walking };
  let start = performance.now();

  function draw(now) {
    if (!canvas.isConnected && now - start > 500) return; // ya no está en pantalla

    const frame = view.walking ? 1 + (Math.floor((now - start) / 130) % 4) : 0;
    const row = sprite.rows[view.direction] ?? 0;

    g.clearRect(0, 0, size, size);
    g.imageSmoothingEnabled = false;

    if (image.complete && image.naturalWidth > 0) {
      g.drawImage(
        image,
        frame * sprite.frame, row * sprite.frame, sprite.frame, sprite.frame,
        0, 0, size, size
      );
    }
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

  return {
    el: canvas,
    setDirection(direction) { view.direction = direction; },
    setWalking(value) { view.walking = value; }
  };
}
