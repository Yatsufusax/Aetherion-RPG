export function drawValoria(ctx, worldToScreen, playerRender = null) {
  const MAP_WIDTH = 13;
  const MAP_HEIGHT = 11;

  // =====================================
  // TERRENO
  // =====================================

  function drawTile(x, y, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 32, y + 16);
    ctx.lineTo(x, y + 32);
    ctx.lineTo(x - 32, y + 16);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = "rgba(0,0,0,0.16)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function isStonePath(x, y) {
    const centralPlaza =
      x >= 4 && x <= 8 && y >= 3 && y <= 7;

    const verticalRoad = x >= 5 && x <= 7;
    const horizontalRoad = y >= 4 && y <= 6;

    return centralPlaza || verticalRoad || horizontalRoad;
  }

  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      const pos = worldToScreen(x, y);

      const color = isStonePath(x, y)
        ? ((x + y) % 2 === 0 ? "#99917b" : "#857e6b")
        : ((x + y) % 2 === 0 ? "#527747" : "#496d40");

      drawTile(pos.x, pos.y, color);
    }
  }

  // =====================================
  // UTILIDADES DE DIBUJO
  // =====================================

  function polygon(points, color) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  // =====================================
  // CASAS
  // =====================================

  function drawHouse(x, y, variant = 0) {
    const pos = worldToScreen(x, y);

    ctx.save();
    ctx.translate(pos.x, pos.y);

    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 43, 17, 0, 0, Math.PI * 2);
    ctx.fill();

    polygon([
      [0, -43], [34, -61], [34, -17], [0, 2]
    ], "#8b7558");

    polygon([
      [-34, -61], [0, -43], [0, 2], [-34, -17]
    ], "#b39a72");

    polygon([
      [0, -87], [39, -67], [34, -57], [0, -76]
    ], "#713b2c");

    polygon([
      [-39, -67], [0, -87], [0, -76], [-34, -57]
    ], "#a34e36");

    ctx.strokeStyle = "#542d25";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-39, -67);
    ctx.lineTo(0, -87);
    ctx.lineTo(39, -67);
    ctx.stroke();

    ctx.fillStyle = "#513626";
    ctx.fillRect(-24, -29, 13, 29);

    ctx.fillStyle = "#c49a52";
    ctx.fillRect(-14, -16, 2, 2);

    ctx.fillStyle = "#4b3930";
    ctx.fillRect(-5, -36, 12, 12);

    ctx.fillStyle = "#e4bd72";
    ctx.fillRect(-3, -34, 8, 8);

    ctx.fillStyle = "#49382d";
    ctx.fillRect(13, -46, 10, 10);

    ctx.fillStyle = "#d7ad65";
    ctx.fillRect(15, -44, 6, 6);

    if (variant === 1) {
      ctx.fillStyle = "#8c4234";
      ctx.fillRect(-24, -55, 9, 4);
    }

    ctx.restore();
  }

  // =====================================
  // ÁRBOLES
  // =====================================

  function drawTree(x, y) {
    const pos = worldToScreen(x, y);

    ctx.save();
    ctx.translate(pos.x, pos.y);

    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.ellipse(0, 1, 20, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#62432d";
    ctx.fillRect(-5, -35, 10, 35);

    ctx.fillStyle = "#294d32";
    ctx.fillRect(-20, -60, 40, 27);

    ctx.fillStyle = "#396a3d";
    ctx.fillRect(-15, -73, 30, 30);

    ctx.fillStyle = "#56864a";
    ctx.fillRect(-9, -67, 18, 16);

    ctx.restore();
  }

  // =====================================
  // FUENTE
  // =====================================

  function drawFountain(x, y) {
    const pos = worldToScreen(x, y);

    ctx.save();
    ctx.translate(pos.x, pos.y);

    polygon([
      [-25, -9], [0, -21], [25, -9], [0, 3]
    ], "#716c60");

    polygon([
      [-25, -15], [0, -27], [25, -15], [0, -3]
    ], "#b4aa91");

    polygon([
      [-17, -15], [0, -23], [17, -15], [0, -7]
    ], "#4b9aab");

    ctx.fillStyle = "#d0c4a2";
    ctx.fillRect(-3, -36, 6, 17);

    ctx.fillStyle = "#6eb6c0";
    ctx.fillRect(-2, -39, 4, 5);

    ctx.restore();
  }

  // =====================================
  // NPC
  // =====================================

  function drawNPC(x, y, color) {
    const pos = worldToScreen(x, y);

    ctx.save();
    ctx.translate(pos.x, pos.y);

    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#403b35";
    ctx.fillRect(-5, -12, 4, 11);
    ctx.fillRect(1, -12, 4, 11);

    ctx.fillStyle = color;
    ctx.fillRect(-7, -28, 14, 16);

    ctx.fillStyle = "#d5a47d";
    ctx.fillRect(-5, -39, 10, 11);

    ctx.fillStyle = "#39291f";
    ctx.fillRect(-6, -41, 12, 5);

    ctx.restore();
  }

  // =====================================
  // SALIDAS
  // =====================================

  function drawExit(x, y, label) {
    const pos = worldToScreen(x, y);

    ctx.save();
    ctx.translate(pos.x, pos.y);

    ctx.fillStyle = "rgba(35,30,23,0.8)";
    ctx.fillRect(-15, -37, 30, 34);

    ctx.strokeStyle = "#b49a67";
    ctx.lineWidth = 3;
    ctx.strokeRect(-15, -37, 30, 34);

    ctx.fillStyle = "#d6c18a";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, 0, -43);

    ctx.restore();
  }

  // =====================================
  // OBJETOS CON PROFUNDIDAD
  // =====================================

  const objects = [];

  function addObject(x, y, draw) {
    objects.push({
      depth: x + y,
      draw
    });
  }

  addObject(2, 2, () => drawHouse(2, 2, 0));
  addObject(10, 2, () => drawHouse(10, 2, 1));
  addObject(2, 8, () => drawHouse(2, 8, 1));
  addObject(10, 8, () => drawHouse(10, 8, 0));

  addObject(0, 3, () => drawTree(0, 3));
  addObject(12, 3, () => drawTree(12, 3));
  addObject(0, 8, () => drawTree(0, 8));
  addObject(12, 8, () => drawTree(12, 8));
  addObject(3, 1, () => drawTree(3, 1));
  addObject(9, 1, () => drawTree(9, 1));

  addObject(6, 4, () => drawFountain(6, 4));

  addObject(4.5, 5.8, () => drawNPC(4.5, 5.8, "#796044"));
  addObject(8, 5.5, () => drawNPC(8, 5.5, "#536b85"));

  addObject(6, 0, () => drawExit(6, 0, "NORTE"));
  addObject(0, 5, () => drawExit(0, 5, "OESTE"));
  addObject(12, 5, () => drawExit(12, 5, "ESTE"));

  // Letrero fijo
  const sign = worldToScreen(6, 1);

  ctx.fillStyle = "#e1cf9a";
  ctx.font = "bold 16px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("VALORIA", sign.x, sign.y - 48);

  // =====================================
  // ORDENAR OBJETOS Y JUGADOR
  // =====================================

  if (playerRender) {
    objects.push({
      depth: playerRender.x + playerRender.y,
      draw: playerRender.draw
    });
  }

  objects.sort((a, b) => a.depth - b.depth);

  for (const object of objects) {
    object.draw();
  }
}
