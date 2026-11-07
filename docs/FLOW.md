# Flujo de juego: portada con login → personajes (selección y creación) → mundo

Estilo MU Online. Las pantallas de menú son HTML sobre una ilustración; el juego sigue siendo Canvas 2D.
Mientras hay un menú abierto el mundo de Valoria no se dibuja (ahorra batería); se dibuja solo al jugar.

## Archivos

| Archivo | Función |
|---|---|
| `src/scenes/sceneManager.js` | Controla las escenas, entra y sale del juego, autoguardado (5 s) y menú ☰ / Esc |
| `src/scenes/loginScene.js` | Portada + login sobre la ilustración `assets/ui/login_bg.png`. Registrarse y Opciones abren ventanas. El servidor es siempre el local (Valoria-01) |
| `src/scenes/characterScene.js` | Selección + creación sobre `assets/ui/select_bg.png`: 5 espacios, panel Crear Personaje (o ficha del personaje elegido), Volver / Eliminar / Crear o Entrar |
| `src/ui/artStage.js` | Ajusta la ilustración a pantalla (sin recortar) y coloca elementos reales encima con coordenadas de la imagen |
| `src/services/accounts.js` | Cuentas y personajes (interfaz `Accounts`, guardado local) |
| `src/data/classes.js` | Las 5 clases (Guerrero, Mago, Arquera, Caballero Oscuro, Summoner) |
| `src/data/appearance.js` | Género y color (tinte del sprite) |
| `src/ui/` (resto) | `scenes.css`, `ui.css` (base y menú del juego), `dom.js`, `portrait.js` |

## Cambiar las ilustraciones

Las pantallas usan tus imágenes tal cual (`assets/ui/login_bg.png` y `select_bg.png`) con la interfaz ya dibujada;
los campos y botones reales van encima. Si reemplazas una imagen por otra distinta, hay que reajustar las
coordenadas en `loginScene.js` / `characterScene.js` (están en píxeles de la imagen original, 1344×896 y 1672×941).
Lo que viene dibujado y no cambia al jugar: el personaje central, su retrato, los textos "Vacío" de los espacios
(se tapan con el nombre al haber personaje) y las etiquetas de apariencia.

## Reglas actuales

- Usuario: 4–12 caracteres (letras, números, `_`). Contraseña: 4–20.
- Nombre de personaje: 3–10 letras o números, único en todo el dispositivo (sin distinguir mayúsculas).
- Máximo 5 personajes por cuenta.
- Apariencia (cabello, rostro, color) y género femenino: dibujados en la ilustración pero aún sin función ("próximamente").
- El personaje nace en el mapa inicial de su clase (`startMap`, `spawn`) y se guarda su posición.

## Seguridad (importante)

En modo local la contraseña NO protege nada: todo vive en el dispositivo (`localStorage`).
Sirve para separar perfiles. La seguridad real llega con el servidor.

## Pasar a multijugador

Las pantallas solo llaman a `Accounts` (métodos async): `register`, `login`, `logout`, `getSession`,
`listCharacters`, `createCharacter`, `deleteCharacter`, `saveCharacter`.
Para multijugador se escribe una clase con esos mismos métodos que hable con el servidor y se
cambia la línea `export const Accounts = new LocalBackend();`. Las pantallas no se tocan.

## Añadir una clase

En `src/data/classes.js` cambiar `available: true` en la clase que corresponda y rellenar su `sprite` (hoja 5 × 4 de 64 × 64),
`stats`, `startMap` y `spawn`. El icono y el color ya están definidos.
