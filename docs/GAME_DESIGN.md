AETHERION RPG — GAME DESIGN DOCUMENT

Documento: Diseño general del juego
Versión: 0.1
Estado: Diseño inicial
Género: RPG medieval de acción
Plataformas: Android y Windows
Modo: Un jugador, offline

---

1. Concepto general

Aetherion RPG es un RPG 2D isométrico inspirado en los MMORPG medievales clásicos.

El jugador crea un personaje, explora diferentes regiones, combate monstruos manualmente, consigue experiencia, sube de nivel, obtiene equipamiento y descubre nuevas zonas.

La experiencia estará centrada en la progresión del personaje y la exploración.

El juego funcionará sin conexión a Internet.

2. Pilares del juego

Los pilares principales son:

1. Combate manual: el jugador controla todos los movimientos y ataques.
2. Progresión: subir de nivel y mejorar el personaje.
3. Exploración: descubrir mapas, enemigos y zonas nuevas.
4. Equipamiento: conseguir armas, armaduras y objetos especiales.
5. Farmeo: derrotar monstruos para conseguir experiencia y recompensas.
6. Descubrimiento: encontrar objetos raros y enfrentarse a enemigos poderosos.

No se utilizará autoataque ni combate automático.

3. Mundo

El mundo tendrá diferentes regiones medievales conectadas mediante accesos y zonas de transición.

Nombres provisionales:

Región| Descripción
Valoria| Ciudad inicial y zona segura
Bosque de Elden| Primera región de combate
Cripta Olvidada| Mazmorra subterránea
Nivalis| Región de montañas nevadas
Fortaleza de Sangre| Zona avanzada

Los nombres y características podrán modificarse durante el desarrollo.

Ciudad segura

La ciudad funcionará como centro principal.

Contendrá:

- NPC comerciantes.
- Herrero.
- Almacenamiento.
- NPC de misiones.
- Accesos a otras regiones.
- Espacios para organizar el equipamiento.

En las zonas seguras no habrá combate normal contra monstruos.

4. Clases

El juego tendrá cinco clases iniciales.

Guerrero

Especialista en combate cuerpo a cuerpo.

- Espadas.
- Hachas.
- Escudos.
- Armaduras resistentes.
- Habilidades físicas.

Mago

Especialista en daño mágico.

- Bastones.
- Magia elemental.
- Ataques a distancia.
- Habilidades de área.

Arquera

Especialista en combate a distancia.

- Arcos.
- Ataques rápidos.
- Habilidades de precisión.
- Movilidad.

Caballero Oscuro

Combatiente pesado con gran presencia física.

- Armas grandes.
- Armaduras pesadas.
- Habilidades de fuerza.
- Ataques de alto impacto.

Summoner

Especialista en magia sobrenatural.

- Magia oscura.
- Habilidades especiales.
- Efectos mágicos.
- Posibles invocaciones, según el diseño definitivo.

Las clases tendrán atributos, habilidades y equipamiento diferenciados.

5. Atributos del personaje

Atributos principales:

Atributo| Función
Fuerza| Daño físico y requisitos de equipamiento
Agilidad| Velocidad y capacidad defensiva
Vitalidad| Puntos de vida
Energía| Poder mágico y puntos de maná

Los atributos podrán distribuirse al subir de nivel, según las reglas definitivas de cada clase.

Valores iniciales y fórmulas pendientes de balance.

6. Progresión

El personaje ganará experiencia derrotando enemigos y completando actividades.

Al alcanzar la experiencia necesaria:

- Sube de nivel.
- Mejora sus atributos.
- Puede desbloquear habilidades.
- Puede acceder a nuevos equipamientos.
- Puede explorar regiones más avanzadas.

La curva de experiencia deberá aumentar progresivamente.

El sistema debe permitir tanto sesiones cortas como sesiones largas de farmeo.

7. Sistema de combate

El combate será completamente manual.

Funcionamiento

1. El jugador identifica un enemigo.
2. Se acerca o mantiene distancia según su clase.
3. Selecciona un objetivo.
4. Ejecuta ataques o habilidades.
5. Esquiva o se reposiciona.
6. Utiliza pociones cuando sea necesario.
7. Derrota al enemigo y recibe las recompensas.

Elementos del combate

- Ataque básico.
- Habilidades especiales.
- Puntos de vida (HP).
- Puntos de maná (MP).
- Tiempo de reutilización de habilidades.
- Daño físico y mágico.
- Defensa.
- Recibir daño.
- Muerte del personaje.
- Muerte de monstruos.

Controles Android

- Joystick virtual para movimiento.
- Botón de ataque básico.
- Botones de habilidades.
- Botón de poción de vida.
- Botón de poción de maná.
- Selección de objetivos mediante toque.

Controles Windows

- Teclado para movimiento.
- Mouse para seleccionar objetivos.
- Teclas configurables para habilidades y pociones.

Los controles deberán ser configurables en futuras versiones.

8. Monstruos

Los enemigos estarán distribuidos según la dificultad de cada región.

Cada monstruo tendrá:

- Nivel.
- Vida.
- Daño.
- Defensa.
- Experiencia otorgada.
- Recompensas posibles.
- Comportamiento de movimiento.
- Rango de detección.
- Animaciones de combate.

Enemigos iniciales del prototipo

Monstruo| Tipo
Goblin| Enemigo básico
Esqueleto| Enemigo intermedio
Guardián de la Cripta| Enemigo fuerte

Los valores de estadísticas y recompensas se definirán durante las pruebas.

9. Sistema de objetos y recompensas

Los monstruos podrán soltar objetos al morir.

Categorías:

- Zen (moneda del juego).
- Armas.
- Armaduras.
- Pociones.
- Accesorios.
- Materiales.
- Objetos especiales.

Rareza

Sistema inicial propuesto:

- Común.
- Poco común.
- Raro.
- Épico.
- Legendario.

La rareza determinará la probabilidad de aparición y las características de los objetos.

Los porcentajes de drop deberán ser configurables.

10. Inventario y equipamiento

El inventario permitirá:

- Recoger objetos.
- Consultar información.
- Equipar y desequipar.
- Usar pociones.
- Vender objetos.
- Descartar objetos.

El equipamiento tendrá diferentes espacios:

- Casco.
- Pechera.
- Pantalones.
- Guantes.
- Botas.
- Arma principal.
- Escudo o segunda mano.
- Anillos.
- Amuleto.

Los objetos equipados podrán modificar los atributos del personaje.

El inventario deberá tener una capacidad definida y ampliable mediante progresión futura.

11. NPC y comercios

Los NPC tendrán funciones específicas.

Tipos iniciales:

- Comerciante.
- Herrero.
- Almacenamiento.
- NPC de misiones.

El jugador podrá comprar y vender objetos utilizando Zen.

Las tiendas tendrán inventarios definidos y precios configurables.

12. Misiones

El sistema de misiones se incorporará progresivamente.

Ejemplos:

- Derrotar determinada cantidad de monstruos.
- Conseguir materiales.
- Explorar una región.
- Derrotar un jefe.
- Entregar objetos a un NPC.

Las misiones podrán otorgar experiencia, Zen y objetos.

No serán necesarias para el funcionamiento del primer prototipo.

13. Guardado y persistencia

El juego será completamente offline.

Los datos se guardarán localmente en el dispositivo.

Tecnología prevista: IndexedDB para la versión web.

Se deberá guardar:

- Personaje.
- Nivel.
- Experiencia.
- Atributos.
- Zen.
- Inventario.
- Equipamiento.
- Progreso de misiones.
- Mapas desbloqueados.
- Configuración del jugador.

El sistema deberá permitir cerrar el juego y continuar desde el último guardado.

Se deberá contemplar la prevención de pérdida de datos y futuras migraciones del formato de guardado.

14. Economía

La moneda principal será Zen.

Se utilizará para:

- Comprar objetos.
- Comprar pociones.
- Reparar equipamiento, si se incorpora ese sistema.
- Realizar mejoras.
- Acceder a determinados servicios.

La economía deberá mantener una progresión equilibrada.

No habrá compras con dinero real en el diseño inicial.

15. Jefes y eventos

En versiones posteriores se incorporarán:

- Jefes de región.
- Jefes de mazmorra.
- Eventos especiales.
- Enemigos de aparición limitada dentro del mundo del juego.

Los jefes tendrán mecánicas y recompensas diferenciadas.

16. Experiencia de juego

El ciclo principal será:

Ciudad → Preparación → Exploración → Combate → Recompensas → Progresión → Nueva exploración.

El jugador deberá tener motivos para continuar mejorando su personaje y explorando nuevas zonas.

No se utilizarán sistemas que obliguen a conectarse diariamente.

17. Alcance del MVP 0.1

La primera versión jugable será deliberadamente pequeña.

Contenido obligatorio

- Una ciudad segura.
- Una zona de exploración.
- Una clase jugable: Guerrero.
- Tres monstruos.
- Movimiento isométrico.
- Combate completamente manual.
- Ataque básico.
- Al menos dos habilidades.
- HP y MP.
- Pociones.
- Experiencia y niveles.
- Drops básicos.
- Inventario funcional.
- Equipamiento básico.
- Zen.
- Guardado local.

Fuera del MVP

- Las cinco clases completas.
- Multijugador.
- PvP.
- Grandes mazmorras.
- Alas.
- Mejoras avanzadas.
- Eventos complejos.
- Sistema completo de misiones.
- Jefes con múltiples fases.

18. Arquitectura y desarrollo

El proyecto utilizará:

- HTML5.
- JavaScript.
- Canvas 2D.
- CSS.
- IndexedDB.
- Capacitor para Android.
- Tauri para Windows, sujeto a validación técnica.

El código deberá organizarse por módulos.

Los sistemas de combate, personajes, inventario, mapas y enemigos no deberán depender directamente de la interfaz gráfica.

La lógica del juego deberá funcionar sin conexión.

El diseño deberá permitir incorporar nuevas clases, mapas, monstruos y objetos sin reescribir los sistemas principales.

19. Posible expansión futura

La arquitectura deberá dejar abierta la posibilidad de incorporar:

- Nuevas clases.
- Nuevos mapas.
- Nuevos monstruos.
- Nuevas mazmorras.
- Alas y equipamiento avanzado.
- Sistemas de mejora.
- Misiones.
- Jefes.
- Multijugador futuro.

El multijugador no forma parte del desarrollo inicial y no debe complicar innecesariamente la primera versión offline.

---

Aetherion RPG — Un nuevo mundo, con el espíritu de los MMORPG clásicos.
