# Character Sprites — Aetherion RPG

## Dark Knight (BK)

Personaje inicial de la primera versión jugable.

### Sprite Sheet

- Archivo: `dark_knight.png`
- Formato: PNG.
- Fondo: transparente real.
- Tamaño total: 320 × 256 píxeles.
- Tamaño de cada cuadro: 64 × 64 píxeles.
- Distribución: 5 columnas × 4 filas.
- Total: 20 cuadros.

### Orden de las filas

1. Abajo / frontal: reposo + 4 cuadros de caminata.
2. Izquierda: reposo + 4 cuadros de caminata.
3. Derecha: reposo + 4 cuadros de caminata.
4. Arriba / espalda: reposo + 4 cuadros de caminata.

### Apariencia inicial

- Camisa o túnica sencilla marrón.
- Pantalón oscuro.
- Botas sencillas.
- Sin espada.
- Sin escudo.
- Sin armadura equipada.
- Sin alas ni accesorios.

### Reglas de animación

- Mantener la misma proporción en los 20 cuadros.
- Mantener una paleta de colores consistente.
- No cambiar la apariencia entre direcciones.
- Pixel Art limpio, inspirado en los RPG clásicos.
- Sin sombras de fondo ni elementos adicionales.
- El personaje debe quedar centrado en cada cuadro.

### Integración

El juego debe cargar el sprite sheet y seleccionar la fila según
la dirección del movimiento y la columna según el estado de animación.

La animación debe funcionar tanto con joystick táctil como con
movimiento mediante clic en PC.
