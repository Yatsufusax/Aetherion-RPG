# Valoria — Recursos gráficos

Dirección artística: **Pixel Art oscuro con atmósfera MU** (ver `ART_DIRECTION.md`).
Luz fija desde arriba a la izquierda. Contorno `#241812`. PNG RGBA, sin suavizado.

## Convención de ancla

Cada sprite tiene un punto de ancla que coincide con el **centro del tile**
(`worldToScreen(x, y)` + `(0, 16)`), el mismo punto de apoyo del jugador y de las colisiones.
Las anclas y tamaños se declaran en `src/maps/valoria_assets.js`.

## Casas — clase S "Cabaña"

- Lienzo: **144 × 160 px**. Ancla: **(72, 124)**.
- Huella: 48 × 40 px (1.5 × 1.25 tiles), equivalente a la elipse de colisión actual.
- Sombra de suelo integrada (alfa 78).

| Archivo | Posición |
|---|---|
| `buildings/house_s_a_brown.png` | (2, 2) |
| `buildings/house_s_b_slate.png` | (10, 2) |
| `buildings/house_s_c_redbrown.png` | (2, 8) |
| `buildings/house_s_d_moss.png` | (10, 8) |

## Terreno

- `ground/valoria_ground.png`: **768 × 400 px**, todo el mapa de 13 × 11 tiles en una sola imagen con transparencia fuera del rombo y borde de tierra en los dos lados frontales.
- Ancla: **(352, 0)** = vértice superior del tile (0, 0).
- Tierra para los caminos, adoquín gris oscuro en la plaza con anillo, pasto oscuro con manchas secas.

## Árboles, fuente y estructuras

| Archivo | Tamaño | Ancla | Uso |
|---|---|---|---|
| `trees/tree_a..d.png` | 104 × 120 | (52, 108) | 6 árboles del mapa (4 siluetas) |
| `fountain/fountain_main.png` | 120 × 120 | (60, 92) | fuente en (6, 4) |
| `structures/sign_valoria.png` | 65 × 46 | (32, 42) | letrero en (6, 1) |
| `structures/gate_x.png` | 140 × 120 | (70, 84) | salida NORTE |
| `structures/gate_y.png` | 140 × 120 | (70, 84) | salidas OESTE y ESTE |

## NPC

`npcs/npc_herrero.png` y `npcs/npc_mercader.png`: 64 × 64, ancla (32, 57) = mismo punto de apoyo que el BK.
Son versiones recoloreadas del cuadro de reposo del BK con rasgos propios (delantal y barba, gorro).
El BK no se modifica.

## Props colocados

`props/` + lista `PROPS` en `src/maps/valoria_assets.js` (posición, colisión y luz de cada uno):
4 braseros en la plaza, 6 antorchas en los portales, 6 barriles, 2 cajas y 5 arbustos.
Sus colisiones y las de los 6 pilares de los portales salen de `PROP_OBSTACLES`, que `main.js` suma a `obstacles`.
Las cercas (`fence_x`, `fence_y`) están listas pero sin colocar.

> Importante: si borras las imágenes, los props desaparecen pero sus colisiones se mantienen.

## Atmósfera

`Sprites.drawAtmosphere(ctx)` aplica tinte frío, niebla alta y viñeta sobre la escena, bajo la interfaz.
Los braseros y antorchas suman brillo cálido parpadeante (`Sprites.drawGlows`).
Todo se desactiva con `USE_ATMOSPHERE = false` en `valoria_assets.js`.

## Respaldo

Si un sprite no carga, `valoria.js` usa el dibujo vectorial anterior.
`USE_PIXEL_ART = false` en `valoria_assets.js` desactiva todos los sprites.
