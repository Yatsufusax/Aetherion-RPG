# Flujo de juego: título → servidor → login → personajes → creación → mundo

Estilo MU Online. Las pantallas de menú son HTML sobre el canvas; el juego sigue siendo Canvas 2D.
Detrás de las pantallas se dibuja Valoria con una cámara que recorre la plaza.

## Archivos

| Archivo | Función |
|---|---|
| `src/scenes/sceneManager.js` | Controla las escenas, entra y sale del juego, autoguardado (5 s) y menú ☰ / Esc |
| `src/scenes/titleScene.js` | Pantalla de título |
| `src/scenes/serverScene.js` | Selección de servidor (hoy solo el local; los demás aparecen bloqueados) |
| `src/scenes/loginScene.js` | Iniciar sesión / crear cuenta |
| `src/scenes/characterSelectScene.js` | 5 espacios de personaje, entrar y eliminar |
| `src/scenes/characterCreateScene.js` | Elegir clase, ver stats, nombre y crear |
| `src/services/accounts.js` | Cuentas y personajes (interfaz `Accounts`, guardado local) |
| `src/data/classes.js` | Datos de las clases: sprite, stats, mapa inicial |
| `src/ui/` | `ui.css`, ayudante `dom.js` y vista previa animada `spritePreview.js` |

## Reglas actuales

- Usuario: 4–12 caracteres (letras, números, `_`). Contraseña: 4–20.
- Nombre de personaje: 3–10 letras o números, único en todo el dispositivo (sin distinguir mayúsculas).
- Máximo 5 personajes por cuenta.
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

Añadir una entrada en `src/data/classes.js` con `available: true`, su `sprite` (hoja 5 × 4 de 64 × 64),
`stats`, `startMap` y `spawn`. Aparece sola en la creación.
