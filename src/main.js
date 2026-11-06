const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_WIDTH = 64;
const TILE_HEIGHT = 32;
const MAP_WIDTH = 13;
const MAP_HEIGHT = 11;

const isTouchDevice =
  navigator.maxTouchPoints > 0 || "ontouchstart" in window;

const player = {
  x: 6,
  y: 5,
  speed: 3.5,
  targetX: null,
  targetY: null
};

const joystick = {
  active: false,
  pointerId: null,
  dx: 0,
  dy: 0,
  radius: 48
};

let offsetX = 0;
let offsetY = 0;
let lastTime = 0;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function calculateMapPosition() {
  const minX = -(MAP_HEIGHT - 1) * TILE_WIDTH / 2;
  const maxX = (MAP_WIDTH - 1) * TILE_WIDTH / 2;
  const maxY = (MAP_WIDTH + MAP_HEIGHT - 2) * TILE_HEIGHT / 2;

  offsetX = (window.innerWidth - (maxX - minX)) / 2 - minX;
  offsetY = Math.max(30, (window.innerHeight - maxY) / 2);
}

function worldToScreen(x, y) {
  return {
    x: offsetX + (x - y) * TILE_WIDTH / 2,
    y: offsetY + (x + y) * TILE_HEIGHT / 2
  };
}

function screenToWorld(x, y) {
  const sx = (x - offsetX) / (TILE_WIDTH / 2);
  const sy = (y - offsetY) / (TILE_HEIGHT / 2);

  return {
    x: (sx + sy) / 2,
    y: (sy - sx) / 2
  };
}

function drawTile(x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 32, y + 16);
  ctx.lineTo(x, y + 32);
  ctx.lineTo(x - 32, y + 16);
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

function drawDestination() {
  if (player.targetX === null) return;

  const pos = worldToScreen(player.targetX, player.targetY);

  ctx.beginPath();
  ctx.ellipse(pos.x, pos.y + 3, 10, 5, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "#f2d47b";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawJoystick() {
  if (!isTouchDevice) return;

  const baseX = 85;
  const baseY = window.innerHeight - 95;

  ctx.globalAlpha = 0.65;

  ctx.beginPath();
  ctx.arc(baseX, baseY, joystick.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#18231e";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#b6b6a0";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(
    baseX + joystick.dx * joystick.radius,
    baseY + joystick.dy * joystick.radius,
    21, 0, Math.PI * 2
  );
  ctx.fillStyle = "#c6b98c";
  ctx.fill();

  ctx.globalAlpha = 1;
}

function updateJoystick(event) {
  if (!joystick.active || event.pointerId !== joystick.pointerId) return;

  const baseX = 85;
  const baseY = window.innerHeight - 95;

  let dx = (event.clientX - baseX) / joystick.radius;
  let dy = (event.clientY - baseY) / joystick.radius;

  const length = Math.hypot(dx, dy);

  if (length > 1) {
    dx /= length;
    dy /= length;
  }

  joystick.dx = dx;
  joystick.dy = dy;
}

function getMovement() {
  if (joystick.active) {
    return {
      x: joystick.dx / 2 + joystick.dy,
      y: joystick.dy - joystick.dx / 2
    };
  }

  if (player.targetX !== null) {
    const dx = player.targetX - player.x;
    const dy = player.targetY - player.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 0.06) {
      player.x = player.targetX;
      player.y = player.targetY;
      player.targetX = null;
      player.targetY = null;

      return { x: 0, y: 0 };
    }

    return {
      x: dx / distance,
      y: dy / distance
    };
  }

  return { x: 0, y: 0 };
}

function update(deltaTime) {
  const movement = getMovement();
  const length = Math.hypot(movement.x, movement.y);

  if (length === 0) return;

  const factor = Math.min(1, length);

  player.x += movement.x * factor * player.speed * deltaTime;
  player.y += movement.y * factor * player.speed * deltaTime;

  player.x = Math.max(0, Math.min(MAP_WIDTH - 1, player.x));
  player.y = Math.max(0, Math.min(MAP_HEIGHT - 1, player.y));
}

function drawGame() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  calculateMapPosition();

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#17251d";
  ctx.fillRect(0, 0, width, height);

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const pos = worldToScreen(x, y);
      const color = (x + y) % 2 === 0 ? "#527747" : "#496d40";
      drawTile(pos.x, pos.y, color);
    }
  }

  drawDestination();

  const playerPos = worldToScreen(player.x, player.y);
  drawPlayer(playerPos.x, playerPos.y);

  drawJoystick();
}

function gameLoop(timestamp) {
  const deltaTime = lastTime
    ? Math.min((timestamp - lastTime) / 1000, 0.05)
    : 0;

  lastTime = timestamp;

  update(deltaTime);
  drawGame();

  requestAnimationFrame(gameLoop);
}

// Clic izquierdo para caminar en PC
canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse") {
    if (event.button !== 0) return;

    const destination = screenToWorld(event.clientX, event.clientY);

    if (
      destination.x >= 0 &&
      destination.x <= MAP_WIDTH - 1 &&
      destination.y >= 0 &&
      destination.y <= MAP_HEIGHT - 1
    ) {
      player.targetX = destination.x;
      player.targetY = destination.y;
    }

    return;
  }

  // Joystick táctil en Android
  const baseX = 85;
  const baseY = window.innerHeight - 95;

  const distance = Math.hypot(
    event.clientX - baseX,
    event.clientY - baseY
  );

  if (distance <= joystick.radius + 25 && !joystick.active) {
    joystick.active = true;
    joystick.pointerId = event.pointerId;
    player.targetX = null;
    player.targetY = null;

    canvas.setPointerCapture(event.pointerId);
    updateJoystick(event);
  }
});

canvas.addEventListener("pointermove", updateJoystick);

function releaseJoystick(event) {
  if (event.pointerId !== joystick.pointerId) return;

  joystick.active = false;
  joystick.pointerId = null;
  joystick.dx = 0;
  joystick.dy = 0;
}

canvas.addEventListener("pointerup", releaseJoystick);
canvas.addEventListener("pointercancel", releaseJoystick);

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
requestAnimationFrame(gameLoop);
