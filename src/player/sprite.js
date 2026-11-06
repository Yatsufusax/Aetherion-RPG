export class PlayerSprite {
  constructor(src, frameWidth = 64, frameHeight = 64) {
    this.image = new Image();

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;

    this.columns = 5;
    this.rows = 4;

    this.loaded = false;
    this.failed = false;

    // Última fila visible de cada cuadro
    this.bottomPixels = [];

    this.image.onload = () => {
      try {
        this.detectFootPositions();
        this.loaded = true;
        console.log("BK cargado. Puntos de apoyo calculados.");
      } catch (error) {
        console.warn("No se pudieron calcular los pies:", error);

        this.bottomPixels = Array(
          this.rows * this.columns
        ).fill(this.frameHeight - 1);

        this.loaded = true;
      }
    };

    this.image.onerror = () => {
      this.failed = true;
      console.error("No se pudo cargar el sprite del personaje.");
    };

    this.image.src = src;
  }

  detectFootPositions() {
    const scanCanvas = document.createElement("canvas");

    scanCanvas.width = this.image.width;
    scanCanvas.height = this.image.height;

    const scanCtx = scanCanvas.getContext("2d", {
      willReadFrequently: true
    });

    scanCtx.drawImage(this.image, 0, 0);

    const imageData = scanCtx.getImageData(
      0,
      0,
      this.image.width,
      this.image.height
    );

    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        let bottom = this.frameHeight - 1;

        const startX = column * this.frameWidth;
        const startY = row * this.frameHeight;

        let found = false;

        for (let py = this.frameHeight - 1; py >= 0; py--) {
          for (let px = 0; px < this.frameWidth; px++) {
            const index =
              ((startY + py) * this.image.width + startX + px) * 4;

            const alpha = imageData.data[index + 3];

            if (alpha > 0) {
              bottom = py;
              found = true;
              break;
            }
          }

          if (found) break;
        }

        this.bottomPixels.push(bottom);
      }
    }
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

    const frameIndex = row * this.columns + column;

    const bottomPixel =
      this.bottomPixels[frameIndex] ?? this.frameHeight - 1;

    const drawWidth = this.frameWidth * scale;
    const drawHeight = this.frameHeight * scale;

    // Alinear el último píxel visible de las botas con el suelo
    const drawX = x - drawWidth / 2;
    const drawY = y - (bottomPixel + 1) * scale;

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
