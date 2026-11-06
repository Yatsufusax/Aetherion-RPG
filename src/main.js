
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_WIDTH = 64;
const TILE_HEIGHT = 32;
const MAP_WIDTH = 13;
const MAP_HEIGHT = 11;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawGame();
}

function drawTile(x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + TILE_WIDTH / 2, y + TILE_HEIGHT / 2);
  ctx.lineTo(x, y + TILE_HEIGHT);
  ctx.lineTo(x - TILE_WIDTH / 2, y + TILE_HEIGHT / 2);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();

  ctx.strokeStyle = "rgba(0,0,0,0.2)";
  ctx.stroke();
}

function drawPlayer(x, y) {
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(x, y + 5, 11, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#315b9a";
  ctx.fillRect(x - 7, y - 23, 14, 18);

  ctx.fillStyle = "#e5b98b";
  ctx.fillRect(x - 6, y - 34, 12, 11);

  ctx.fillStyle = "#493021";
  ctx.fillRect(x - 6, y - 36, 12, 5);

  ctx.fillStyle = "#aeb8c4";
  ctx.fillRect(x - 7, y - 23, 14, 4);
}

function drawGame() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#17251d";
  ctx.fillRect(0, 0, width, height);

  const minX = -(MAP_HEIGHT - 1) * TILE_WIDTH / 2;
  const maxX = (MAP_WIDTH - 1) * TILE_WIDTH / 2;
  const maxY = (MAP_WIDTH + MAP_HEIGHT - 2) * TILE_HEIGHT / 2;

  const offsetX = (width - (maxX - minX)) / 2 - minX;
  const offsetY = Math.max(30, (height - maxY) / 2);

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const screenX = offsetX + (x - y) * TILE_WIDTH / 2;
      const screenY = offsetY + (x + y) * TILE_HEIGHT / 2;

      const color = (x + y) % 2 === 0
        ? "#527747"
        : "#496d40";

      drawTile(screenX, screenY, color);
    }
  }

  const playerX = offsetX + (6 - 5) * TILE_WIDTH / 2;
  const playerY = offsetY + (6 + 5) * TILE_HEIGHT / 2;

  drawPlayer(playerX, playerY);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
