// ==========================================
// ADMINISTRADOR DE ESCENAS
// ==========================================
// Flujo: título → servidor → login → personajes → creación → juego.
// Las pantallas de menú son HTML sobre el canvas (así funcionan teclado y
// campos de texto en PC y Android). El juego en sí sigue siendo el canvas.

import { Accounts } from "../services/accounts.js";
import { h } from "../ui/dom.js";
import { titleScene } from "./titleScene.js";
import { serverScene } from "./serverScene.js";
import { loginScene } from "./loginScene.js";
import { characterSelectScene } from "./characterSelectScene.js";
import { characterCreateScene } from "./characterCreateScene.js";

const SCENES = {
  title: titleScene,
  server: serverScene,
  login: loginScene,
  characters: characterSelectScene,
  create: characterCreateScene
};

const AUTOSAVE_MS = 5000;

let root = null;
let game = null;
let current = null;
let autosaveTimer = null;
let gameMenu = null;

const state = { server: null, session: null, character: null };

export function bootScenes(gameApi) {
  game = gameApi;
  root = document.getElementById("ui-root");
  document.body.classList.add("scenes-on");

  window.addEventListener("pagehide", saveNow);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.character && gameMenu) toggleMenu();
  });

  go("title");
}

export function go(name) {
  if (current && current.unmount) current.unmount();

  root.innerHTML = "";
  current = SCENES[name];
  current.mount({ root, go, state, enterGame });
}

// ------------------------------------------
// ENTRAR / SALIR DEL JUEGO
// ------------------------------------------

function enterGame(character) {
  if (current && current.unmount) current.unmount();
  current = null;

  root.innerHTML = "";
  state.character = character;

  game.enterGame(character);
  mountGameMenu();

  clearInterval(autosaveTimer);
  autosaveTimer = setInterval(saveNow, AUTOSAVE_MS);
}

function exitGame(next) {
  saveNow();
  clearInterval(autosaveTimer);
  autosaveTimer = null;

  game.leaveGame();
  gameMenu = null;
  state.character = null;

  if (next === "title") {
    Accounts.logout().then(() => { state.session = null; go("title"); });
  } else {
    go(next);
  }
}

function saveNow() {
  if (!state.character || !game) return;

  const snapshot = game.getPlayerSnapshot();
  if (!snapshot) return;

  Accounts.saveCharacter(state.character.id, {
    map: "valoria",
    x: Math.round(snapshot.x * 100) / 100,
    y: Math.round(snapshot.y * 100) / 100
  }).catch(() => {});
}

// ------------------------------------------
// MENÚ DENTRO DEL JUEGO (botón ☰ o Esc)
// ------------------------------------------

function mountGameMenu() {
  const modal = h(
    "div",
    { class: "game-menu-modal hidden" },
    h(
      "div",
      { class: "panel game-menu-panel" },
      h("h2", { text: "Menú" }),
      h("button", { class: "btn", text: "Continuar", onClick: toggleMenu }),
      h("button", { class: "btn", text: "Cambiar de personaje", onClick: () => exitGame("characters") }),
      h("button", { class: "btn btn-danger", text: "Cerrar sesión", onClick: () => exitGame("title") })
    )
  );

  const button = h("button", { class: "game-menu-btn", text: "☰", "aria-label": "Menú", onClick: toggleMenu });

  root.append(button, modal);
  gameMenu = modal;
}

function toggleMenu() {
  if (gameMenu) gameMenu.classList.toggle("hidden");
}
