// ==========================================
// VALORIA — RECURSOS GRÁFICOS PIXEL ART
// ==========================================
// Cargador de sprites del mapa. Vive a nivel de módulo (no dentro de
// drawValoria) para que las imágenes se carguen una sola vez.
//
// Convención de ancla: (ax, ay) es el punto del sprite que coincide con el
// CENTRO del tile = vértice superior de worldToScreen + (0, TILE_HEIGHT / 2).
// Ese es el mismo punto de apoyo que usan el jugador y las colisiones.
//
// Si un sprite no carga (o USE_PIXEL_ART es false) draw() devuelve false y
// valoria.js usa el dibujo vectorial anterior como respaldo.

export const USE_PIXEL_ART = true;
export const USE_ATMOSPHERE = true; // niebla, viñeta y tinte frío sobre la escena

const BASE = "./assets/maps/valoria/";

export const SPRITES = {
  // Terreno completo de Valoria (13 × 11 tiles). El ancla es el vértice superior del tile (0,0).
  ground_valoria: { file: "ground/valoria_ground.png", size: [768, 400], anchor: [352, 0] },

  // Casas clase S "Cabaña": 144 × 160 px, huella 1.5 × 1.25 tiles
  house_s_a_brown:    { file: "buildings/house_s_a_brown.png",    size: [144, 160], anchor: [72, 124] },
  house_s_b_slate:    { file: "buildings/house_s_b_slate.png",    size: [144, 160], anchor: [72, 124] },
  house_s_c_redbrown: { file: "buildings/house_s_c_redbrown.png", size: [144, 160], anchor: [72, 124] },
  house_s_d_moss:     { file: "buildings/house_s_d_moss.png",     size: [144, 160], anchor: [72, 124] },

  // Árboles: 104 × 120 px, ancla en la base del tronco
  tree_a: { file: "trees/tree_a.png", size: [104, 120], anchor: [52, 108] },
  tree_b: { file: "trees/tree_b.png", size: [104, 120], anchor: [52, 108] },
  tree_c: { file: "trees/tree_c.png", size: [104, 120], anchor: [52, 108] },
  tree_d: { file: "trees/tree_d.png", size: [104, 120], anchor: [52, 108] },

  fountain_main: { file: "fountain/fountain_main.png", size: [120, 120], anchor: [60, 92] },

  sign_valoria: { file: "structures/sign_valoria.png", size: [65, 46],  anchor: [32, 42] },
  gate_x:       { file: "structures/gate_x.png",       size: [140, 120], anchor: [70, 84] },
  gate_y:       { file: "structures/gate_y.png",       size: [140, 120], anchor: [70, 84] },

  npc_herrero:  { file: "npcs/npc_herrero.png",  size: [64, 64], anchor: [32, 57] },
  npc_mercader: { file: "npcs/npc_mercader.png", size: [64, 64], anchor: [32, 57] },

  // Props (ver PROPS más abajo)
  prop_brazier: { file: "props/brazier.png", size: [56, 92],  anchor: [28, 82] },
  prop_torch:   { file: "props/torch.png",   size: [32, 84],  anchor: [16, 76] },
  prop_barrel:  { file: "props/barrel.png",  size: [32, 36],  anchor: [16, 30] },
  prop_crate:   { file: "props/crate.png",   size: [40, 48],  anchor: [20, 36] },
  prop_fence_x: { file: "props/fence_x.png", size: [72, 60],  anchor: [20, 30] },
  prop_fence_y: { file: "props/fence_y.png", size: [104, 60], anchor: [52, 46] },
  prop_bush:    { file: "props/bush.png",    size: [44, 32],  anchor: [22, 26] }
};

// Qué sprite usa cada casa (clave = "x,y" de su posición en el mapa)
export const HOUSE_SPRITE_BY_SLOT = {
  "2,2": "house_s_a_brown",
  "10,2": "house_s_b_slate",
  "2,8": "house_s_c_redbrown",
  "10,8": "house_s_d_moss"
};

export const TREE_SPRITE_BY_SLOT = {
  "0,3": "tree_a",
  "12,3": "tree_b",
  "0,8": "tree_c",
  "12,8": "tree_d",
  "3,1": "tree_d",
  "9,1": "tree_c"
};

// Clave = "x,y" del NPC en el mapa
export const NPC_SPRITE_BY_SLOT = {
  "4.5,5.8": "npc_herrero",
  "8,5.5": "npc_mercader"
};

// Props colocados en el mapa. collider = [rx, ry] en tiles (se suma a las colisiones de main.js).
// light = { h: altura de la llama sobre el suelo en px, r: radio del brillo en px, a: intensidad }
export const PROPS = [
  // Braseros de la plaza
  { sprite: "prop_brazier", x: 4, y: 3, collider: [0.26, 0.26], light: { h: 40, r: 95, a: 0.55 } },
  { sprite: "prop_brazier", x: 8, y: 3, collider: [0.26, 0.26], light: { h: 40, r: 95, a: 0.55 } },
  { sprite: "prop_brazier", x: 4, y: 7, collider: [0.26, 0.26], light: { h: 40, r: 95, a: 0.55 } },
  { sprite: "prop_brazier", x: 8, y: 7, collider: [0.26, 0.26], light: { h: 40, r: 95, a: 0.55 } },

  // Antorchas junto a los portales
  { sprite: "prop_torch", x: 4.65, y: 0.35, collider: [0.1, 0.1], light: { h: 56, r: 70, a: 0.45 } },
  { sprite: "prop_torch", x: 7.35, y: 0.35, collider: [0.1, 0.1], light: { h: 56, r: 70, a: 0.45 } },
  { sprite: "prop_torch", x: 0.35, y: 3.65, collider: [0.1, 0.1], light: { h: 56, r: 70, a: 0.45 } },
  { sprite: "prop_torch", x: 0.35, y: 6.35, collider: [0.1, 0.1], light: { h: 56, r: 70, a: 0.45 } },
  { sprite: "prop_torch", x: 11.65, y: 3.65, collider: [0.1, 0.1], light: { h: 56, r: 70, a: 0.45 } },
  { sprite: "prop_torch", x: 11.65, y: 6.35, collider: [0.1, 0.1], light: { h: 56, r: 70, a: 0.45 } },

  // Barriles y cajas junto a las casas (fuera de caminos y plaza)
  { sprite: "prop_barrel", x: 3.15, y: 2.9,  collider: [0.2, 0.2] },
  { sprite: "prop_barrel", x: 3.5,  y: 3.15, collider: [0.2, 0.2] },
  { sprite: "prop_crate",  x: 3.2,  y: 3.6,  collider: [0.22, 0.22] },
  { sprite: "prop_barrel", x: 9.2,  y: 3.35, collider: [0.2, 0.2] },
  { sprite: "prop_barrel", x: 3.1,  y: 7.45, collider: [0.2, 0.2] },
  { sprite: "prop_crate",  x: 3.4,  y: 9.35, collider: [0.22, 0.22] },
  { sprite: "prop_barrel", x: 9.7,  y: 7.9,  collider: [0.2, 0.2] },
  { sprite: "prop_barrel", x: 9.4,  y: 9.2,  collider: [0.2, 0.2] },

  // Arbustos (fuera de caminos)
  { sprite: "prop_bush", x: 1.4,  y: 3.2, collider: [0.25, 0.22] },
  { sprite: "prop_bush", x: 4.1,  y: 1.2, collider: [0.25, 0.22] },
  { sprite: "prop_bush", x: 11.2, y: 6.9, collider: [0.25, 0.22] },
  { sprite: "prop_bush", x: 2.0,  y: 9.7, collider: [0.25, 0.22] },
  { sprite: "prop_bush", x: 10.8, y: 9.5, collider: [0.25, 0.22] }
];

// Pilares de los portales de salida (los sprites gate_x / gate_y los dibujan a ±0.75 tiles)
const GATE_PILLARS = [
  [5.25, 0], [6.75, 0],
  [0, 4.25], [0, 5.75],
  [12, 4.25], [12, 5.75]
];

// Colisiones de props y pilares. main.js las suma a su lista `obstacles`.
export const PROP_OBSTACLES = [
  ...PROPS
    .filter(prop => prop.collider)
    .map(prop => ({ x: prop.x, y: prop.y, rx: prop.collider[0], ry: prop.collider[1] })),
  ...GATE_PILLARS.map(([x, y]) => ({ x, y, rx: 0.2, ry: 0.2 }))
];

export const EXIT_SPRITE_BY_LABEL = {
  NORTE: "gate_x",
  OESTE: "gate_y",
  ESTE: "gate_y"
};

const images = {};

for (const [id, def] of Object.entries(SPRITES)) {
  const image = new Image();
  image.addEventListener("error", () => {
    console.warn(`No se pudo cargar el sprite de Valoria: ${id}`);
  });
  image.src = BASE + def.file;
  images[id] = image;
}

export const Sprites = {
  isReady(id) {
    const image = images[id];
    return Boolean(image && image.complete && image.naturalWidth > 0);
  },

  // Dibuja el sprite con su ancla en (x, y) de pantalla. Devuelve true si dibujó.
  draw(ctx, id, x, y) {
    if (!USE_PIXEL_ART || !this.isReady(id)) return false;

    const def = SPRITES[id];
    const image = images[id];

    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      image,
      Math.round(x - def.anchor[0]),
      Math.round(y - def.anchor[1])
    );
    ctx.restore();

    return true;
  },

  // Terreno completo: devuelve true si dibujó. (x, y) = vértice superior del tile (0,0).
  drawGround(ctx, x, y) {
    return this.draw(ctx, "ground_valoria", x, y);
  },

  // Brillo cálido y parpadeante de braseros y antorchas (suma luz sobre la escena).
  drawGlows(ctx, worldToScreen) {
    if (!USE_ATMOSPHERE) return;

    const t = performance.now() / 1000;

    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    for (const prop of PROPS) {
      if (!prop.light) continue;

      const pos = worldToScreen(prop.x, prop.y);
      const flicker =
        1 + Math.sin(t * 11 + prop.x * 7 + prop.y * 3) * 0.08 +
        Math.sin(t * 27 + prop.x) * 0.05;

      const cx = pos.x;
      const cy = pos.y + 16 - prop.light.h;
      const r = prop.light.r * flicker;
      const a = prop.light.a;

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `rgba(255, 170, 80, ${a})`);
      g.addColorStop(0.45, `rgba(255, 120, 40, ${a * 0.35})`);
      g.addColorStop(1, "rgba(255, 100, 30, 0)");

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.8);
      ctx.translate(-cx, -cy);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  },

  // Tinte frío + niebla alta + viñeta, en coordenadas lógicas del canvas.
  drawAtmosphere(ctx) {
    if (!USE_ATMOSPHERE) return;

    const scale = ctx.getTransform().a || 1;
    const width = ctx.canvas.width / scale;
    const height = ctx.canvas.height / scale;

    ctx.save();

    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgb(214, 228, 255)";
    ctx.fillRect(0, 0, width, height);

    ctx.globalCompositeOperation = "source-over";

    const fog = ctx.createLinearGradient(0, 0, 0, height * 0.42);
    fog.addColorStop(0, "rgba(14, 20, 28, 0.30)");
    fog.addColorStop(1, "rgba(14, 20, 28, 0)");
    ctx.fillStyle = fog;
    ctx.fillRect(0, 0, width, height * 0.42);

    const radius = Math.hypot(width, height) / 2;
    const vignette = ctx.createRadialGradient(
      width / 2, height / 2, radius * 0.45,
      width / 2, height / 2, radius
    );
    vignette.addColorStop(0, "rgba(14, 20, 28, 0)");
    vignette.addColorStop(1, "rgba(14, 20, 28, 0.62)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }
};
