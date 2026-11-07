AETHERION RPG — CHANGELOG

Este documento registra los cambios realizados en Aetherion RPG.

Se registrarán las nuevas funcionalidades, correcciones, mejoras y modificaciones importantes.

[Unreleased]

Planificación

- Definida la visión general de Aetherion RPG.
- Establecida la tecnología HTML5, JavaScript y Canvas 2D.
- Definido el funcionamiento offline.
- Establecidas las plataformas objetivo: Android y Windows.
- Definida la dirección artística Pixel Art isométrica.
- Documentadas las cinco clases iniciales.
- Definido el sistema de combate manual.
- Diseñado el mundo inicial.
- Definido el alcance del MVP 0.1.

Documentación

- Creado README.md.
- Creado ART_DIRECTION.md.
- Creado docs/GAME_DESIGN.md.
- Creado docs/COMBAT.md.
- Creado docs/CLASSES.md.
- Creado docs/WORLD.md.
- Creado TASKS.md.
- Creado BUGS.md.

Historial de versiones

0.1.0 — MVP inicial

Estado: Pendiente de desarrollo.

Objetivos:

- Motor isométrico.
- Movimiento del personaje.
- Primera zona jugable.
- Combate manual.
- Monstruos.
- Experiencia y niveles.
- Inventario.
- Drops.
- Guardado local.

---

Reglas para actualizar el documento

- Registrar cambios importantes.
- Utilizar fechas cuando se publique una actualización.
- Identificar la versión correspondiente.
- Separar nuevas funcionalidades de correcciones.
- No registrar como implementada una función que solamente está planificada.

Formato recomendado:

[Versión] — AAAA-MM-DD

Added

Nuevas funcionalidades.

Changed

Modificaciones de funcionalidades existentes.

Fixed

Errores corregidos.

Removed

Funcionalidades eliminadas.

Aetherion RPG — Un nuevo mundo, con el espíritu de los MMORPG clásicos.

Arte de Valoria

- Nuevo cargador de sprites del mapa: src/maps/valoria_assets.js.
- Primeras 4 casas medievales en Pixel Art (assets/maps/valoria/buildings/), 144 × 160 px, ancla al centro del tile.
- valoria.js: drawHouse usa los sprites y conserva el dibujo vectorial como respaldo.
- Posiciones, colisiones, cámara, profundidad, main.js y el sprite del BK sin cambios.
- Terreno pixel art de todo el mapa (assets/maps/valoria/ground/), con tierra, plaza de adoquín y pasto oscuro.
- Árboles, fuente, letrero VALORIA y portales de salida en Pixel Art.
- Atmósfera de escena (tinte frío, niebla y viñeta) con interruptor USE_ATMOSPHERE.
- Props listos sin colocar: brasero, antorcha, barril, caja, cerca y arbusto.
- NPC Herrero y Mercader en Pixel Art, con el mismo punto de apoyo que el BK.
- Props colocados con colisión: 4 braseros, 6 antorchas, 6 barriles, 2 cajas, 5 arbustos y pilares de portales.
- main.js: solo se suman las colisiones de PROP_OBSTACLES a la lista obstacles (import + 1 línea).
- Brillo de fuego parpadeante en braseros y antorchas.

Motor: cámara y zoom

- main.js: la cámara sigue al jugador (CAMERA_FOLLOWS_PLAYER) con zoom entero automático (WORLD_ZOOM = null).
- La lógica sigue en tiles de 64 × 32; el zoom se aplica solo al dibujar el mundo. La interfaz y el joystick no llevan zoom.
- screenToWorld convierte el clic a espacio de arte. El resto de main.js, las colisiones y la profundidad no cambian.
- CAMERA_FOLLOWS_PLAYER = false vuelve al mapa completo centrado.

Ambiente

- Suelo de Valoria rehecho como losas de piedra gris azulada a doble resolución (res: 2).
- Sprites.draw soporta res (píxeles del PNG por píxel de arte).
- Casas con revoque de arenisca cálida y piedra más fría.
- Charcos de luz cálida en el suelo bajo braseros y antorchas; tinte general más suave.

Flujo de inicio estilo MU

- Nuevo flujo: título → servidor → login/registro → selección de personaje → creación → mundo (docs/FLOW.md).
- Cuentas y personajes con guardado local detrás de una interfaz intercambiable (src/services/accounts.js).
- Datos de clases en src/data/classes.js (Dark Knight disponible; Dark Wizard y Fairy Elf bloqueados).
- Menú dentro del juego (botón ☰ o Esc): continuar, cambiar de personaje, cerrar sesión. Autoguardado de posición.
- main.js: modos "menu" y "game", Valoria como fondo en los menús, nombre sobre el personaje y arranque de las escenas.
- El rótulo "AETHERION RPG" del HTML se oculta (ahora es el logo de la pantalla de título).

Nueva interfaz de inicio (portada, login y personajes)

- Las pantallas usan las ilustraciones del diseño (assets/ui/login_bg.png y select_bg.png) con los campos y botones reales colocados encima (src/ui/artStage.js).
- Título, servidor y login se fusionan en una portada: Usuario, Contraseña, Ingresar, Registrarse (ventana), Opciones (ventana) y Salir. Ya no hay selección de servidor: se usa Valoria-01.
- Selección y creación de personaje en una sola pantalla: 5 espacios, panel Crear Personaje (nombre y clase funcionales), ficha del personaje elegido, Volver / Eliminar / Crear o Entrar.
- Clases: Guerrero (provisional, usa el sprite del BK), Mago, Arquera, Caballero Oscuro y Summoner. Solo Guerrero y Caballero Oscuro están disponibles.
- Cabello, rostro, color y género femenino aparecen dibujados pero aún no funcionan.
- En vertical se pide girar el dispositivo.
- main.js: el mundo solo se dibuja jugando.
- Eliminados: titleScene, serverScene, characterSelectScene, characterCreateScene y spritePreview.
