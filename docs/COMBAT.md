AETHERION RPG — COMBAT SYSTEM

Documento: Sistema de combate
Versión: 0.1
Estado: Diseño inicial
Plataformas: Android y Windows

---

1. Filosofía del combate

El combate de Aetherion RPG será completamente manual.

El jugador tendrá control directo sobre el movimiento, selección de objetivos, ataques, habilidades y pociones.

La experiencia estará inspirada en los RPG medievales clásicos, especialmente en la sensación de combate de los primeros MU Online.

Reglas principales

- No habrá autoataque.
- No habrá movimiento automático hacia los enemigos.
- No habrá selección automática de objetivos.
- El jugador decidirá cuándo atacar.
- Las habilidades tendrán tiempos de reutilización.
- Los enemigos podrán atacar al jugador.
- La posición y la distancia serán importantes.
- El combate deberá ser comprensible y fluido.

2. Estados del combate

El personaje podrá encontrarse en los siguientes estados:

Estado| Descripción
Idle| Personaje quieto
Moving| En movimiento
Attacking| Ejecutando un ataque
Casting| Utilizando una habilidad
Taking Damage| Recibiendo daño
Dead| Personaje derrotado

Los estados deberán gestionarse mediante un sistema que evite animaciones y acciones incompatibles.

Por ejemplo, el personaje no debería ejecutar dos ataques simultáneamente.

3. Selección de objetivos

El jugador podrá seleccionar monstruos tocándolos o haciendo clic sobre ellos.

Al seleccionar un enemigo:

- Se mostrará un indicador visual debajo del objetivo.
- Aparecerá su nombre.
- Se mostrará su barra de vida.
- Se actualizará la información cuando reciba daño.

Seleccionar un enemigo NO significa atacarlo automáticamente.

El jugador deberá ejecutar el ataque manualmente.

Si el enemigo muere o desaparece, la selección se eliminará.

4. Movimiento y distancia

El movimiento será independiente del sistema de ataque.

El jugador podrá moverse mientras observa a los enemigos y decidir cuándo entrar en combate.

Las habilidades tendrán diferentes alcances:

- Cuerpo a cuerpo.
- Distancia media.
- Largo alcance.
- Área de efecto.

Si el enemigo está fuera del alcance de un ataque, la acción no deberá ejecutarse.

El juego mostrará una respuesta visual o textual indicando que el objetivo está demasiado lejos.

No habrá desplazamiento automático para alcanzar al enemigo.

5. Ataque básico

Todas las clases tendrán un ataque básico.

Características:

- Se ejecuta mediante un botón o comando.
- Consume tiempo de animación.
- Puede causar daño según los atributos y el arma.
- Tiene un alcance determinado.
- Puede fallar si el objetivo está fuera de alcance o no es válido.

El ataque básico será la principal acción de combate inicial.

Los tiempos de animación y velocidad de ataque serán configurables.

6. Sistema de habilidades

Cada clase tendrá habilidades propias.

Las habilidades podrán ser:

- Ataques físicos.
- Ataques mágicos.
- Ataques a distancia.
- Ataques de área.
- Habilidades defensivas.
- Mejoras temporales.

Cada habilidad tendrá:

Propiedad| Función
Nombre| Identificación
Daño| Potencia del ataque
Alcance| Distancia permitida
Coste MP| Maná requerido
Cooldown| Tiempo de reutilización
Animación| Representación visual
Efecto| Resultado de la habilidad

Los valores deberán poder modificarse sin alterar el sistema principal.

Reglas

- No se podrá usar una habilidad sin suficiente MP.
- No se podrá utilizar durante su cooldown.
- Las habilidades deberán respetar su alcance.
- Las habilidades de área afectarán solamente a los objetivos dentro de su zona.
- Las animaciones deberán corresponder con el efecto real.

7. Atributos y cálculo de daño

El daño dependerá de los atributos, armas, habilidades y defensa del objetivo.

El sistema deberá separar:

- Daño físico.
- Daño mágico.
- Defensa física.
- Defensa mágica.
- Multiplicadores de habilidades.
- Bonificaciones del equipamiento.

Las fórmulas definitivas todavía no están fijadas.

Se deberán implementar de forma centralizada y configurable para facilitar el balance.

No se deben distribuir fórmulas de daño por diferentes archivos de la interfaz.

8. Enemigos

Los monstruos tendrán su propio comportamiento.

Comportamiento básico

1. Permanecen en una zona.
2. Detectan al jugador dentro de su rango.
3. Se acercan cuando corresponde.
4. Ejecutan ataques cuando están a distancia válida.
5. Reciben daño.
6. Mueren cuando su HP llega a cero.

Los enemigos no deben detectar al jugador desde distancias exageradas.

Cada monstruo tendrá parámetros configurables:

- HP.
- Daño.
- Defensa.
- Velocidad.
- Rango de detección.
- Alcance de ataque.
- Tiempo entre ataques.
- Experiencia otorgada.
- Recompensas.

9. Pociones

Existirán inicialmente dos tipos:

Poción de vida (HP)

Recupera puntos de vida.

Poción de maná (MP)

Recupera puntos de maná.

Reglas:

- Deben existir en el inventario.
- Su uso será manual.
- Tendrán una animación o indicador visual.
- No podrán recuperar más allá del máximo permitido.
- Se descontará una unidad por uso válido.

Los tiempos de reutilización serán configurables.

10. Muerte y derrota

Cuando el HP del personaje llegue a cero:

- Se detendrá el combate.
- Se reproducirá la animación de muerte.
- El personaje no podrá atacar ni utilizar habilidades.
- Se mostrará una pantalla o ventana de derrota.

La penalización por morir queda pendiente de definición.

No implementar pérdida de equipamiento o experiencia sin una decisión de diseño posterior.

11. Recompensas de combate

Al derrotar un monstruo:

- Se otorgará experiencia.
- Se generará el drop correspondiente.
- Podrá aparecer Zen.
- Podrán aparecer objetos.
- Se reproducirá una animación de muerte.

El sistema de recompensas será independiente del sistema de animaciones.

Los drops serán configurables por monstruo.

12. Controles Android

La interfaz táctil tendrá:

- Joystick virtual.
- Botón de ataque básico.
- Botones de habilidades.
- Botón de poción HP.
- Botón de poción MP.
- Selección de objetivos mediante toque.

Los botones deberán ser suficientemente grandes para utilizarse cómodamente.

La interfaz no deberá cubrir al personaje ni impedir ver los enemigos.

El joystick no deberá interferir con los botones de habilidades.

13. Controles Windows

La versión de Windows tendrá:

- Teclado para movimiento.
- Mouse para seleccionar objetivos.
- Teclas configurables para ataques y habilidades.
- Teclas configurables para pociones.

Los controles deberán poder modificarse en futuras versiones.

14. Indicadores visuales

Durante el combate se mostrarán:

- Barra HP del personaje.
- Barra MP del personaje.
- Barra de vida del enemigo seleccionado.
- Nivel del enemigo.
- Números de daño.
- Indicadores de cooldown.
- Efectos de habilidades.
- Efectos de impacto.
- Indicadores de muerte.

Los números de daño deberán ser legibles sin llenar la pantalla de información.

15. Rendimiento y arquitectura

El sistema de combate deberá estar separado de la interfaz.

Módulos conceptuales:

src/
├── combat/
│   ├── CombatSystem.js
│   ├── DamageCalculator.js
│   ├── TargetSystem.js
│   ├── SkillSystem.js
│   └── CooldownSystem.js
├── enemies/
│   ├── Enemy.js
│   ├── EnemyAI.js
│   └── EnemyCombat.js
└── player/
    ├── Player.js
    ├── PlayerCombat.js
    └── PlayerStats.js

Los nombres son una propuesta inicial y podrán ajustarse a la arquitectura real.

El combate deberá funcionar con una lógica independiente del dispositivo.

Android y Windows compartirán las mismas reglas de daño, habilidades y enemigos.

16. Pruebas obligatorias

Antes de considerar terminado el sistema de combate se comprobará:

1. El jugador puede moverse libremente.
2. Puede seleccionar enemigos.
3. Seleccionar no provoca ataques automáticos.
4. Puede ejecutar ataques manualmente.
5. No puede atacar fuera del alcance.
6. Las habilidades consumen MP correctamente.
7. Los cooldowns funcionan.
8. Los enemigos pueden atacar.
9. Las pociones funcionan.
10. La muerte del enemigo otorga recompensas.
11. El personaje puede morir.
12. Los controles funcionan en Android y Windows.
13. No existen ataques duplicados ni acciones automáticas inesperadas.

17. Alcance del combate MVP 0.1

Para la primera versión jugable:

- Una clase: Guerrero.
- Un ataque básico.
- Dos habilidades.
- Tres monstruos.
- Selección manual de objetivos.
- Movimiento manual.
- HP y MP.
- Daño y defensa.
- Pociones.
- Muerte de enemigos.
- Experiencia y drops.

Las demás clases y habilidades se incorporarán posteriormente.

---

Regla fundamental: el jugador controla el combate. Aetherion RPG nunca debe jugar por él.

Aetherion RPG — Un nuevo mundo, con el espíritu de los MMORPG clásicos.
