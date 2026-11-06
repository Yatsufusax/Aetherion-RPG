AETHERION RPG — TASKS

Versión: 0.1
Estado: Planificación inicial

Este documento organiza las tareas de desarrollo de Aetherion RPG.

Las tareas deben completarse progresivamente. No marcar una tarea como terminada sin haberla implementado y probado.

1. Documentación y planificación

- [x] Definir la visión general del proyecto.
- [x] Crear README.md.
- [x] Crear ART_DIRECTION.md.
- [x] Crear GAME_DESIGN.md.
- [x] Crear COMBAT.md.
- [x] Crear CLASSES.md.
- [x] Crear WORLD.md.
- [ ] Crear CHANGELOG.md.
- [ ] Crear BUGS.md.
- [ ] Definir estructura técnica definitiva.
- [ ] Revisar coherencia entre documentos.

2. Preparación técnica

- [ ] Configurar proyecto HTML5.
- [ ] Configurar JavaScript modular.
- [ ] Configurar Canvas 2D.
- [ ] Configurar CSS.
- [ ] Crear punto de entrada del juego.
- [ ] Implementar ciclo principal de actualización y renderizado.
- [ ] Implementar sistema de escalado de pantalla.
- [ ] Implementar gestión de recursos gráficos.
- [ ] Preparar arquitectura para Android y Windows.

3. Motor gráfico isométrico

- [ ] Implementar conversión de coordenadas isométricas.
- [ ] Crear sistema de tiles.
- [ ] Implementar renderizado del mapa.
- [ ] Implementar cámara fija.
- [ ] Implementar orden de profundidad.
- [ ] Implementar capas del escenario.
- [ ] Implementar colisiones.
- [ ] Implementar obstáculos.
- [ ] Probar rendimiento en Android.

4. Personaje principal

- [ ] Crear estructura del personaje.
- [ ] Implementar clase Guerrero.
- [ ] Implementar movimiento.
- [ ] Implementar animación Idle.
- [ ] Implementar animación de caminar.
- [ ] Implementar orientación del personaje.
- [ ] Implementar HP y MP.
- [ ] Implementar atributos.
- [ ] Implementar sistema de experiencia.
- [ ] Implementar subida de nivel.

5. Sistema de combate

- [ ] Implementar selección manual de objetivos.
- [ ] Implementar ataque básico.
- [ ] Implementar cálculo de daño.
- [ ] Implementar defensa.
- [ ] Implementar sistema de habilidades.
- [ ] Implementar consumo de MP.
- [ ] Implementar cooldowns.
- [ ] Implementar recepción de daño.
- [ ] Implementar muerte del personaje.
- [ ] Implementar efectos de combate.

6. Monstruos

- [ ] Crear estructura base de enemigos.
- [ ] Implementar Goblin.
- [ ] Implementar Esqueleto.
- [ ] Implementar Guardián de la Cripta.
- [ ] Implementar movimiento de enemigos.
- [ ] Implementar detección del jugador.
- [ ] Implementar ataques enemigos.
- [ ] Implementar muerte de enemigos.
- [ ] Implementar reaparición de monstruos.

7. Objetos e inventario

- [ ] Implementar Zen.
- [ ] Implementar sistema de drops.
- [ ] Implementar pociones HP.
- [ ] Implementar pociones MP.
- [ ] Crear inventario.
- [ ] Implementar recoger objetos.
- [ ] Implementar equipamiento.
- [ ] Implementar estadísticas de objetos.
- [ ] Implementar uso y descarte de objetos.

8. Mapas y mundo

- [ ] Crear mapa de Valoria.
- [ ] Crear mapa del Bosque de Elden.
- [ ] Implementar transición entre mapas.
- [ ] Crear NPC básicos.
- [ ] Crear puntos de aparición de monstruos.
- [ ] Implementar zonas seguras.
- [ ] Implementar zonas de combate.

9. Interfaz y controles

- [ ] Crear interfaz principal.
- [ ] Implementar barras HP y MP.
- [ ] Implementar barra de experiencia.
- [ ] Implementar indicador de objetivo.
- [ ] Crear joystick virtual Android.
- [ ] Crear botones de combate Android.
- [ ] Implementar controles de teclado Windows.
- [ ] Implementar selección mediante mouse.
- [ ] Crear inventario visual.
- [ ] Adaptar interfaz a diferentes resoluciones.

10. Guardado local

- [ ] Implementar IndexedDB.
- [ ] Crear estructura de datos guardados.
- [ ] Guardar personaje.
- [ ] Guardar inventario.
- [ ] Guardar equipamiento.
- [ ] Guardar progreso.
- [ ] Implementar carga de partida.
- [ ] Probar cierre y reapertura del juego.
- [ ] Probar recuperación de datos.

11. Pruebas del MVP 0.1

- [ ] Probar movimiento isométrico.
- [ ] Probar colisiones.
- [ ] Probar combate manual.
- [ ] Probar habilidades.
- [ ] Probar enemigos.
- [ ] Probar recompensas.
- [ ] Probar inventario.
- [ ] Probar guardado.
- [ ] Probar controles táctiles.
- [ ] Probar rendimiento en Samsung S22.
- [ ] Corregir errores detectados.

12. Empaquetado

- [ ] Preparar versión web instalable.
- [ ] Integrar Capacitor.
- [ ] Generar APK Android.
- [ ] Probar instalación Android.
- [ ] Validar funcionamiento offline.
- [ ] Investigar y validar integración con Tauri.
- [ ] Generar versión Windows.
- [ ] Probar versión Windows.

---

Orden de prioridades

Prioridad 1 — Fundación

Motor gráfico, mapa isométrico, cámara, movimiento y colisiones.

Prioridad 2 — Juego básico

Guerrero, monstruos, combate manual, HP, MP y experiencia.

Prioridad 3 — Progresión

Drops, Zen, inventario, equipamiento y guardado.

Prioridad 4 — Mundo

Valoria, Bosque de Elden, NPC y transiciones.

Prioridad 5 — Plataformas

Controles Android, controles Windows, APK y versión de escritorio.

Reglas de trabajo

1. Trabajar por tareas pequeñas y verificables.
2. No implementar sistemas innecesarios antes del MVP.
3. Probar cada sistema antes de continuar.
4. Actualizar este documento cuando una tarea cambie de estado.
5. Registrar errores en BUGS.md.
6. Registrar cambios importantes en CHANGELOG.md.
7. No marcar tareas como terminadas sin pruebas.
8. No eliminar funcionalidades existentes sin justificarlo.
9. Mantener compatibilidad con el funcionamiento offline.
10. Actualizar la documentación cuando cambien las decisiones técnicas.

Objetivo principal: conseguir una primera versión jugable, estable y completamente offline.

Aetherion RPG — Un nuevo mundo, con el espíritu de los MMORPG clásicos.
