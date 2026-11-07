import {
  Sprites,
  HOUSE_SPRITE_BY_SLOT,
  TREE_SPRITE_BY_SLOT,
  EXIT_SPRITE_BY_LABEL,
  NPC_SPRITE_BY_SLOT,
  PROPS
} from "./valoria_assets.js";

export function drawValoria(ctx, worldToScreen, playerRender = null) {
  const MAP_WIDTH = 13;
  const MAP_HEIGHT = 11;

  // =====================================
  // TERRENO Y PLAZA
  // =====================================

  function drawTile(x, y, color, isPath) {
    const pos = worldToScreen(x, y);

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + 32, pos.y + 16);
    ctx.lineTo(pos.x, pos.y + 32);
    ctx.lineTo(pos.x - 32, pos.y + 16);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = isPath
      ? "rgba(48,42,32,0.24)"
      : "rgba(25,45,24,0.22)";
    ctx.lineWidth = 1;
    ctx.stroke();

    if (isPath) {
      ctx.strokeStyle = "rgba(225,215,185,0.13)";
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y + 5);
      ctx.lineTo(pos.x + 22, pos.y + 16);
      ctx.lineTo(pos.x, pos.y + 27);
      ctx.lineTo(pos.x - 22, pos.y + 16);
      ctx.stroke();

      // Pequeñas marcas de piedra
      if ((x * 3 + y * 7) % 4 === 0) {
        ctx.fillStyle = "rgba(65,59,48,0.18)";
        ctx.fillRect(pos.x - 3, pos.y + 14, 6, 2);
      }
    } else {
      // Hierba decorativa discreta
      if ((x * 7 + y * 3) % 5 === 0) {
        ctx.strokeStyle = "rgba(153,183,91,0.42)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(pos.x - 3, pos.y + 19);
        ctx.lineTo(pos.x - 5, pos.y + 14);
        ctx.moveTo(pos.x, pos.y + 19);
        ctx.lineTo(pos.x + 1, pos.y + 13);
        ctx.moveTo(pos.x + 3, pos.y + 19);
        ctx.lineTo(pos.x + 6, pos.y + 15);
        ctx.stroke();
      }
    }
  }

  function isStonePath(x, y) {
    const centralPlaza =
      x >= 4 && x <= 8 && y >= 3 && y <= 7;

    const verticalRoad = x >= 5 && x <= 7;
    const horizontalRoad = y >= 4 && y <= 6;

    return centralPlaza || verticalRoad || horizontalRoad;
  }

  // Pixel Art: terreno pre-renderizado de todo el mapa. Si aún no cargó,
  // se usa el dibujo por tiles anterior como respaldo.
  const groundOrigin = worldToScreen(0, 0);

  if (!Sprites.drawGround(ctx, groundOrigin.x, groundOrigin.y)) {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const isPath = isStonePath(x, y);

        const color = isPath
          ? ((x + y) % 2 === 0 ? "#a49a82" : "#8e856f")
          : ((x + y) % 2 === 0 ? "#587d48" : "#4b7041");

        drawTile(x, y, color, isPath);
      }
    }
  }

  // =====================================
  // UTILIDADES
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

  function line(x1, y1, x2, y2, color, width = 1) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  // =====================================
  // CASAS MEDIEVALES
  // =====================================

  function drawHouse(x, y, variant = 0) {
    const pos = worldToScreen(x, y);

    // Pixel Art: el sprite se ancla al centro del tile (vértice superior + 16 px).
    // Si no está disponible, se usa el dibujo vectorial de abajo como respaldo.
    const spriteId = HOUSE_SPRITE_BY_SLOT[`${x},${y}`];
    if (spriteId && Sprites.draw(ctx, spriteId, pos.x, pos.y + 16)) return;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    const roofLeft = variant === 1 ? "#91452f" : "#a34e36";
    const roofRight = variant === 1 ? "#71372b" : "#783d2e";

    // Sombra
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(0, 3, 45, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Paredes laterales
    polygon([
      [0, -43], [34, -61], [34, -17], [0, 2]
    ], "#806b51");

    polygon([
      [-34, -61], [0, -43], [0, 2], [-34, -17]
    ], "#b49a72");

    // Textura de paredes
    for (let i = 0; i < 3; i++) {
      line(
        -30, -48 + i * 12,
        -5, -35 + i * 12,
        "rgba(86,64,43,0.3)"
      );

      line(
        5, -34 + i * 12,
        29, -47 + i * 12,
        "rgba(54,43,32,0.28)"
      );
    }

    // Madera estructural
    line(-32, -18, -32, -57, "#60432e", 3);
    line(-2, 0, -2, -42, "#60432e", 3);
    line(31, -18, 31, -59, "#503a2b", 3);

    // Puerta
    ctx.fillStyle = "#513626";
    ctx.fillRect(-25, -31, 14, 31);

    ctx.fillStyle = "#755034";
    ctx.fillRect(-23, -29, 10, 27);

    ctx.fillStyle = "#d2a75d";
    ctx.fillRect(-15, -16, 2, 3);

    // Ventanas
    ctx.fillStyle = "#44382d";
    ctx.fillRect(-6, -37, 13, 13);

    ctx.fillStyle = "#e0b96e";
    ctx.fillRect(-4, -35, 9, 9);

    ctx.fillStyle = "#49372b";
    ctx.fillRect(13, -46, 11, 11);

    ctx.fillStyle = "#e2b76a";
    ctx.fillRect(15, -44, 7, 7);

    // Cruces de las ventanas
    line(-4, -30, 5, -30, "#674a30", 1);
    line(0, -35, 0, -26, "#674a30", 1);

    line(15, -40, 22, -40, "#674a30", 1);
    line(18, -44, 18, -36, "#674a30", 1);

    // Techos
    polygon([
      [0, -87], [39, -67], [34, -57], [0, -76]
    ], roofRight);

    polygon([
      [-39, -67], [0, -87], [0, -76], [-34, -57]
    ], roofLeft);

    // Líneas de tejas
    for (let i = 0; i < 3; i++) {
      const offset = i * 9;

      line(
        -31 + offset,
        -69 + offset * 0.5,
        -2 + offset,
        -83 + offset * 0.5,
        "rgba(65,34,27,0.45)",
        2
      );

      line(
        4 + offset,
        -84 + offset * 0.5,
        33 + offset,
        -69 + offset * 0.5,
        "rgba(55,29,23,0.4)",
        2
      );
    }

    // Bordes del techo
    line(-39, -67, 0, -87, "#542e25", 3);
    line(0, -87, 39, -67, "#542e25", 3);

    // Chimenea
    ctx.fillStyle = "#694234";
    ctx.fillRect(18, -91, 9, 22);

    ctx.fillStyle = "#9a5b43";
    ctx.fillRect(16, -94, 13, 5);

    // Pequeña maceta
    ctx.fillStyle = "#98513b";
    ctx.fillRect(-36, -24, 7, 6);

    ctx.fillStyle = "#467344";
    ctx.fillRect(-35, -29, 2, 6);
    ctx.fillRect(-31, -30, 3, 7);

    ctx.restore();
  }

  // =====================================
  // ÁRBOLES
  // =====================================

  function drawTree(x, y) {
    const pos = worldToScreen(x, y);

    // Pixel Art (ancla = centro del tile); respaldo vectorial si no carga
    const treeId = TREE_SPRITE_BY_SLOT[`${x},${y}`];
    if (treeId && Sprites.draw(ctx, treeId, pos.x, pos.y + 16)) return;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    ctx.fillStyle = "rgba(0,0,0,0.23)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 22, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tronco
    polygon([
      [-5, -35], [5, -35], [5, 0], [-5, 0]
    ], "#68452e");

    line(-3, -30, -3, -5, "#966340", 2);

    // Copa
    ctx.fillStyle = "#294d32";
    ctx.fillRect(-20, -60, 40, 27);

    ctx.fillStyle = "#396a3d";
    ctx.fillRect(-15, -73, 30, 30);

    ctx.fillStyle = "#56864a";
    ctx.fillRect(-9, -67, 18, 16);

    ctx.fillStyle = "rgba(140,177,86,0.35)";
    ctx.fillRect(-13, -65, 7, 6);
    ctx.fillRect(5, -70, 6, 7);

    ctx.fillStyle = "#203f2b";
    ctx.fillRect(-17, -47, 7, 7);
    ctx.fillRect(10, -54, 6, 8);

    ctx.restore();
  }

  // =====================================
  // FUENTE CENTRAL
  // =====================================

  function drawFountain(x, y) {
    const pos = worldToScreen(x, y);

    if (Sprites.draw(ctx, "fountain_main", pos.x, pos.y + 16)) return;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    // Sombra
    ctx.fillStyle = "rgba(0,0,0,0.24)";
    ctx.beginPath();
    ctx.ellipse(0, 4, 30, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Base exterior
    polygon([
      [-28, -9], [0, -23], [28, -9], [0, 5]
    ], "#716c60");

    // Borde de piedra
    polygon([
      [-25, -15], [0, -28], [25, -15], [0, -2]
    ], "#b4aa91");

    // Agua
    polygon([
      [-18, -15], [0, -24], [18, -15], [0, -6]
    ], "#438fa4");

    polygon([
      [-12, -15], [0, -21], [12, -15], [0, -9]
    ], "#67b6c1");

    // Columna central
    ctx.fillStyle = "#8d826d";
    ctx.fillRect(-4, -38, 8, 19);

    ctx.fillStyle = "#c9b995";
    ctx.fillRect(-6, -40, 12, 4);

    // Agua superior
    ctx.fillStyle = "#6fc5d0";
    ctx.fillRect(-3, -45, 6, 6);

    ctx.fillStyle = "rgba(210,247,246,0.8)";
    ctx.fillRect(-1, -48, 2, 4);

    // Detalles de piedra
    line(-23, -14, 0, -3, "#d2c6a7", 1);
    line(0, -3, 23, -14, "#d2c6a7", 1);

    ctx.restore();
  }

  // =====================================
  // NPC
  // =====================================

  function drawNPC(x, y, color) {
    const pos = worldToScreen(x, y);

    // Pixel Art: mismo punto de apoyo que el jugador (centro del tile) y sombra equivalente.
    const npcId = NPC_SPRITE_BY_SLOT[`${x},${y}`];
    if (npcId && Sprites.isReady(npcId)) {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y + 16 + 2, 11, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      if (Sprites.draw(ctx, npcId, pos.x, pos.y + 16)) return;
    }

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

    const gateId = EXIT_SPRITE_BY_LABEL[label];
    if (gateId && Sprites.draw(ctx, gateId, pos.x, pos.y + 16)) {
      ctx.save();
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillText(label, pos.x + 1, pos.y - 55);
      ctx.fillStyle = "#e1cd96";
      ctx.fillText(label, pos.x, pos.y - 56);
      ctx.restore();
      return;
    }

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
  // LETRERO DE VALORIA
  // =====================================

  function drawSign() {
    const pos = worldToScreen(6, 1);

    if (Sprites.draw(ctx, "sign_valoria", pos.x, pos.y + 16)) return;

    ctx.save();
    ctx.translate(pos.x, pos.y);

    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.beginPath();
    ctx.ellipse(0, -29, 49, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#503725";
    ctx.fillRect(-3, -44, 6, 26);

    ctx.fillStyle = "#63432d";
    ctx.fillRect(-47, -65, 94, 25);

    ctx.strokeStyle = "#c2a16b";
    ctx.lineWidth = 3;
    ctx.strokeRect(-47, -65, 94, 25);

    ctx.fillStyle = "#ead5a0";
    ctx.font = "bold 16px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("VALORIA", 0, -47);

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

  // Casas
  addObject(2, 2, () => drawHouse(2, 2, 0));
  addObject(10, 2, () => drawHouse(10, 2, 1));
  addObject(2, 8, () => drawHouse(2, 8, 1));
  addObject(10, 8, () => drawHouse(10, 8, 0));

  // Árboles
  addObject(0, 3, () => drawTree(0, 3));
  addObject(12, 3, () => drawTree(12, 3));
  addObject(0, 8, () => drawTree(0, 8));
  addObject(12, 8, () => drawTree(12, 8));
  addObject(3, 1, () => drawTree(3, 1));
  addObject(9, 1, () => drawTree(9, 1));

  // Fuente
  addObject(6, 4, () => drawFountain(6, 4));

  // NPC
  addObject(4.5, 5.8, () => drawNPC(4.5, 5.8, "#796044"));
  addObject(8, 5.5, () => drawNPC(8, 5.5, "#536b85"));

  // Salidas
  addObject(6, 0, () => drawExit(6, 0, "NORTE"));
  addObject(0, 5, () => drawExit(0, 5, "OESTE"));
  addObject(12, 5, () => drawExit(12, 5, "ESTE"));

  // Letrero
  addObject(6, 1, drawSign);

  // Props decorativos (braseros, antorchas, barriles, cajas, arbustos)
  function drawProp(prop) {
    const pos = worldToScreen(prop.x, prop.y);
    Sprites.draw(ctx, prop.sprite, pos.x, pos.y + 16);
  }

  for (const prop of PROPS) {
    addObject(prop.x, prop.y, () => drawProp(prop));
  }

  // Jugador
  if (playerRender) {
    objects.push({
      depth: playerRender.x + playerRender.y,
      draw: playerRender.draw
    });
  }

  // Orden de profundidad
  objects.sort((a, b) => a.depth - b.depth);

  for (const object of objects) {
    object.draw();
  }

  // Atmósfera: tinte frío, niebla y viñeta (se dibuja sobre toda la escena, bajo la interfaz)
  Sprites.drawAtmosphere(ctx);
  Sprites.drawGlows(ctx, worldToScreen);
}
