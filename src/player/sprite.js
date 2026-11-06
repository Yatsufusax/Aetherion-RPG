export class PlayerSprite {
  constructor(src, frameWidth = 64, frameHeight = 64) {
    this.image = new Image();

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.columns = 5;
    this.rows = 4;

    this.loaded = false;
    this.failed = false;

    // Ajuste vertical de los pies
    this.footOffset = 8;

    this.image.onload = () => {
      this.loaded = true;
      console.log("Sprite del BK cargado correctamente.");
    };

    this.image.onerror = () => {
      this.failed = true;
      console.error("No se pudo cargar el sprite del personaje.");
    };

    this.image.src = src;
  }

  draw(ctx, direction, frame, x, y, scale = 1) {
    if (!this.loaded || this.failed) return false;

    const rows = {
      down: 0,
      left: 1,
      right: 2,
      up: 3
    };

    const row = rows[direction] ?? 0;
    const column = Math.max(0, Math.min(4, frame));

    const drawWidth = this.frameWidth * scale;
    const drawHeight = this.frameHeight * scale;

    // Punto de apoyo corregido
    const drawX = x - drawWidth / 2;
    const drawY = y - drawHeight + this.footOffset * scale;

    ctx.drawImage(
      this.image,
      column * this.frameWidth,
      row * this.frameHeight,
      this.frameWidth,
      this.frameHeight,
      drawX,
      drawY,
      drawWidth,
      drawHeight
    );

    return true;
  }
}
