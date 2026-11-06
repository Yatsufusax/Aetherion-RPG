import { drawValoria } from "./maps/valoria.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const TILE_WIDTH = 64;
const TILE_HEIGHT = 32;
const MAP_WIDTH = 13;
const MAP_HEIGHT = 11;

const isTouchDevice =
  navigator.maxTouchPoints > 0 || "ontouchstart" in window;

// ==========================================
// SPRITE DEL BK
// ==========================================

let playerSprite = null;

import("./player/sprite.js")
  .then(({ PlayerSprite }) => {
    const sprite = new PlayerSprite(
      "./assets/characters/dark_knight.png",
      64,
      64
    );

    playerSprite = sprite;

    sprite.image.addEventListener("error", () => {
      console.warn("No se pudo cargar el sprite del BK.");
    });
  })
  .catch((error) => {
    console.warn("Error al iniciar el cargador del BK:", error);
  });

// ==========================================
// JUGADOR
// ==========================================

const player = {
  x: 6,
  y: 5,
  speed: 3.5,
  targetX: null,
  targetY: null,
  facing: "down",
  moving: false,

  equipment: {
    weapon: null,
    armor: null,
    shield: null,
    wings: null
  }
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
let animationTime = 0;

// ==========================================
// PANTALLA
// ==========================================

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
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

// ==========================================
// PERSONAJE PRINCIPAL
// ==========================================

function drawPlayer(x, groundY) {
  const walking = player.moving;
  const cycle = animationTime * 10;

  const legSwing = walking ? Math.sin(cycle) * 2.5 : 0;
  const armSwing = walking ? Math.sin(cycle + Math.PI) * 2 : 0;

  const bob = walking
    ? Math.abs(Math.sin(cycle)) * 1.2
    : Math.sin(animationTime * 2) * 0.5;

  // Movimiento visual del cuerpo
  const visualY = groundY - bob;

  // Sombra directamente debajo de los pies
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(x, groundY + 2, 11, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  const frame = walking
    ? 1 + Math.floor(animationTime * 8) % 4
    : 0;

  // Sprite real con detección automática de los pies
  if (
    playerSprite &&
    playerSprite.draw(
      ctx,
      player.facing,
      frame,
      x,
      visualY,
      1
    )
  ) {
    return;
  }

  // Personaje provisional
  ctx.save();
  ctx.translate(x, visualY);

  if (player.facing === "down") {
    drawFront(legSwing, armSwing);
  } else if (player.facing === "up") {
    drawBack(legSwing, armSwing);
  } else if (player.facing === "left") {
    ctx.scale(-1, 1);
    drawSide(legSwing, armSwing);
  } else {
    drawSide(legSwing, armSwing);
  }

  ctx.restore();
}

// ==========================================
// VISTA FRONTAL
// ==========================================

function drawFront(legSwing, armSwing) {
  ctx.fillStyle = "#514638";
  ctx.fillRect(-5 - legSwing, -12, 5, 11);
  ctx.fillRect(1 + legSwing, -12, 5, 11);

  ctx.fillStyle = "#493324";
  ctx.fillRect(-6 - legSwing, -3, 6, 4);
  ctx.fillRect(1 + legSwing, -3, 6, 4);

  ctx.fillStyle = "#806044";
  ctx.fillRect(-10, -24 + armSwing, 5, 14);
  ctx.fillRect(5, -24 - armSwing, 5, 14);

  ctx.fillStyle = "#d6a47d";
  ctx.fillRect(-10, -11 + armSwing, 5, 4);
  ctx.fillRect(5, -11 - armSwing, 5, 4);

  ctx.fillStyle = "#806044";
  ctx.fillRect(-7, -26, 14, 16);

  ctx.fillStyle = "#654a35";
  ctx.fillRect(-1, -24, 2, 10);

  ctx.fillStyle = "#d6a47d";
  ctx.fillRect(-6, -37, 12, 11);

  ctx.fillStyle = "#493021";
  ctx.fillRect(-6, -39, 12, 5);
  ctx.fillRect(-7, -36, 3, 5);

  ctx.fillStyle = "#30251e";
  ctx.fillRect(-3, -32, 2, 2);
  ctx.fillRect(2, -32, 2, 2);

  drawEquippedItems(armSwing);
}

// ==========================================
// VISTA TRASERA
// ==========================================

function drawBack(legSwing, armSwing) {
  ctx.fillStyle = "#514638";
  ctx.fillRect(-5 - legSwing, -12, 5, 11);
  ctx.fillRect(1 + legSwing, -12, 5, 11);

  ctx.fillStyle = "#493324";
  ctx.fillRect(-6 - legSwing, -3, 6, 4);
  ctx.fillRect(1 + legSwing, -3, 6, 4);

  ctx.fillStyle = "#806044";
  ctx.fillRect(-10, -24 + armSwing, 5, 14);
  ctx.fillRect(5, -24 - armSwing, 5, 14);

  ctx.fillStyle = "#d6a47d";
  ctx.fillRect(-10, -11 + armSwing, 5, 4);
  ctx.fillRect(5, -11 - armSwing, 5, 4);

  ctx.fillStyle = "#806044";
  ctx.fillRect(-7, -26, 14, 16);

  ctx.fillStyle = "#654a35";
  ctx.fillRect(-1, -24, 2, 12);

  ctx.fillStyle = "#d6a47d";
  ctx.fillRect(-6, -37, 12, 11);

  ctx.fillStyle = "#493021";
  ctx.fillRect(-7, -39, 14, 8);
  ctx.fillRect(-6, -32, 12, 4);

  drawEquippedItems(armSwing);
}

// ==========================================
// VISTA LATERAL
// ==========================================

function drawSide(legSwing, armSwing) {
  ctx.fillStyle = "#514638";
  ctx.fillRect(-3 - legSwing, -12, 5, 11);
  ctx.fillRect(2 + legSwing, -12, 5, 11);

  ctx.fillStyle = "#493324";
  ctx.fillRect(-3 - legSwing, -3, 7, 4);
  ctx.fillRect(2 + legSwing, -3, 6, 4);

  ctx.fillStyle = "#654a35";
  ctx.fillRect(-5, -23 - armSwing, 5, 13);

  ctx.fillStyle = "#806044";
  ctx.fillRect(-4, -26, 11, 16);
  ctx.fillRect(3, -23 + armSwing, 5, 13);

  ctx.fillStyle = "#d6a47d";
  ctx.fillRect(4, -11 + armSwing, 5, 4);
  ctx.fillRect(-2, -37, 11, 11);
  ctx.fillRect(8, -33, 3, 3);

  ctx.fillStyle = "#493021";
  ctx.fillRect(-3, -39, 12, 5);
  ctx.fillRect(-3, -35, 4, 7);

  ctx.fillStyle = "#30251e";
  ctx.fillRect(6, -33, 2, 2);

  drawEquippedItems(armSwing);
}

// ==========================================
// EQUIPAMIENTO
// ==========================================

function drawEquippedItems(armSwing) {
  if (player.equipment.armor) {
    ctx.fillStyle = "#aeb8c4";
    ctx.fillRect(-7, -26, 14, 16);
  }

  if (player.equipment.shield) {
    ctx.fillStyle = "#8c653b";
    ctx.fillRect(-13, -22 + armSwing, 5, 11);
  }

  if (player.equipment.weapon) {
    ctx.save();
    ctx.translate(9, -18 + armSwing);

    ctx.fillStyle = "#d7dce3";
    ctx.fillRect(0, -12, 3, 13);

    ctx.fillStyle = "#a47a3c";
    ctx.fillRect(-2, 1, 7, 3);

    ctx.fillStyle = "#604329";
    ctx.fillRect(0, 4, 3, 6);

    ctx.restore();
  }
}

// ==========================================
// DESTINO
// ==========================================

function drawDestination() {
  if (player.targetX === null) return;

  const pos = worldToScreen(player.targetX, player.targetY);

  const groundY = pos.y + TILE_HEIGHT / 2;

  ctx.beginPath();
  ctx.ellipse(
    pos.x,
    groundY,
    10,
    5,
    0,
    0,
    Math.PI * 2
  );

  ctx.strokeStyle = "#f2d47b";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ==========================================
// JOYSTICK
// ==========================================

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
    21,
    0,
    Math.PI * 2
  );

  ctx.fillStyle = "#c6b98c";
  ctx.fill();

  ctx.globalAlpha = 1;
}

function updateJoystick(event) {
  if (!joystick.active || event.pointerId !== joystick.pointerId) {
    return;
  }

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

// ==========================================
// MOVIMIENTO
// ==========================================

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

  player.moving = length > 0.01;

  if (!player.moving) return;

  const screenDX = movement.x - movement.y;
  const screenDY = movement.x + movement.y;

  if (Math.abs(screenDX) > Math.abs(screenDY)) {
    player.facing = screenDX > 0 ? "right" : "left";
  } else {
    player.facing = screenDY > 0 ? "down" : "up";
  }

  const factor = Math.min(1, length);

  player.x += movement.x * factor * player.speed * deltaTime;
  player.y += movement.y * factor * player.speed * deltaTime;

  player.x = Math.max(0, Math.min(MAP_WIDTH - 1, player.x));
  player.y = Math.max(0, Math.min(MAP_HEIGHT - 1, player.y));
}

// ==========================================
// DIBUJAR VALORIA
// ==========================================

function drawGame() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  calculateMapPosition();

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#17251d";
  ctx.fillRect(0, 0, width, height);

  drawValoria(ctx, worldToScreen);

  drawDestination();

  const playerPos = worldToScreen(player.x, player.y);

  // Centro del rombo: punto de apoyo del personaje
  const groundY = playerPos.y + TILE_HEIGHT / 2;

  drawPlayer(playerPos.x, groundY);

  drawJoystick();
}

// ==========================================
// CONTROLES DE PC Y ANDROID
// ==========================================

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "mouse") {
    if (event.button !== 0) return;

    const destination = screenToWorld(
      event.clientX,
      event.clientY
    );

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

// ==========================================
// BUCLE PRINCIPAL
// ==========================================

function gameLoop(timestamp) {
  const deltaTime = lastTime
    ? Math.min((timestamp - lastTime) / 1000, 0.05)
    : 0;

  lastTime = timestamp;
  animationTime += deltaTime;

  update(deltaTime);
  drawGame();

  requestAnimationFrame(gameLoop);
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
requestAnimationFrame(gameLoop);
