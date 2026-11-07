// Selección + creación de personaje en una sola pantalla (estilo MU Online).
// El fondo es la ilustración (assets/ui/select_bg.png). Encima van los elementos reales:
// izquierda los 5 espacios, derecha el panel de creación (o la ficha del personaje elegido).

import { Accounts, AccountError, MAX_CHARACTERS, validateNickname } from "../services/accounts.js";
import { CLASSES, getClass } from "../data/classes.js";
import { DEFAULT_LOOK, normalizeLook } from "../data/appearance.js";
import { createStage } from "../ui/artStage.js";
import { createPortrait } from "../ui/portrait.js";
import { h } from "../ui/dom.js";

const W = 1672;
const H = 941;

// Posiciones sobre la ilustración (píxeles de la imagen original)
const SLOT_X = 70;
const SLOT_W = 275;
const SLOT_CENTERS = [255, 328, 401, 473, 546];
const CLASS_CENTERS = [1237, 1324, 1412, 1497, 1583]; // en el orden de CLASSES

const STAT_LABELS = { fuerza: "Fuerza", agilidad: "Agilidad", vitalidad: "Vitalidad", energia: "Energía" };
const STAT_MAX = 40;

let stage = null;

export const characterScene = {
  async mount({ root, go, state, enterGame }) {
    stage = createStage("./assets/ui/select_bg.png", W, H);
    root.append(stage.el);

    let characters = await Accounts.listCharacters();
    let slot = 0;
    let cls = CLASSES.find((c) => c.available);
    const look = { ...DEFAULT_LOOK };
    const selected = () => characters[slot] || null;

    const nameInput = h("input", { type: "text", maxlength: "10", placeholder: "Ingresa un nombre...", autocomplete: "off", spellcheck: "false", "aria-label": "Nombre del personaje" });
    const message = h("div", { class: "art-message", role: "status" });
    const plate = h("div", { class: "cover plate" });

    // Capa que se vuelve a dibujar cada vez que cambia algo
    const dynamic = h("div", { class: "layer" });
    stage.box.append(dynamic);

    // Elementos fijos (no cambian entre modos)
    const nameCover = stage.spot(h("label", { class: "cover field-cover name-cover" }, nameInput), 1210, 225, 384, 37);
    stage.spot(plate, 660, 766, 306, 36);
    stage.spot(message, 1180, 768, 470, 30);

    function updatePlate() {
      const c = selected();
      const typed = nameInput.value.trim();
      plate.textContent = c ? c.name : typed || "Nombre del Personaje";
      plate.classList.toggle("placeholder", !c && !typed);
    }

    // ---------------- dibujo de la capa variable ----------------
    function put(node, x, y, w, hh) {
      node.classList.add("spot");
      node.style.left = `${(x / W) * 100}%`;
      node.style.top = `${(y / H) * 100}%`;
      node.style.width = `${(w / W) * 100}%`;
      node.style.height = `${(hh / H) * 100}%`;
      dynamic.append(node);
      return node;
    }

    function render() {
      dynamic.innerHTML = "";
      const c = selected();
      nameCover.classList.toggle("hidden", !!c); // en modo ficha el panel derecho se reemplaza

      // --- espacios de la izquierda ---
      for (let i = 0; i < MAX_CHARACTERS; i++) {
        const y = SLOT_CENTERS[i] - 31;
        const ch = characters[i];
        const chCls = ch ? getClass(ch.classId) : null;

        if (ch && chCls) {
          const p = createPortrait(44);
          p.set(chCls, normalizeLook(ch.look));
          put(
            h("div", { class: "cover slot-cover" },
              h("span", { class: "slot-avatar" }, p.el),
              h("span", { class: "slot-text" },
                h("b", { text: ch.name }),
                h("small", { text: `${chCls.name} · Nv. ${ch.level}` }))),
            SLOT_X + 3, y + 3, SLOT_W - 6, 56
          );
        }

        put(
          h("button", {
            class: `hit slot-hit${i === slot ? " selected" : ""}`,
            type: "button",
            "aria-label": ch ? `Personaje ${ch.name}` : "Espacio vacío",
            "aria-pressed": String(i === slot),
            onClick: () => { slot = i; message.textContent = ""; render(); },
            onDblclick: () => ch && enterGame(ch)
          }),
          SLOT_X, y, SLOT_W, 62
        );
      }

      // --- panel derecho ---
      if (c) renderInfo(c);
      else renderCreate();

      // --- botón inferior central ---
      if (c) {
        put(h("button", { class: "btn-gold", type: "button", text: "Entrar al Mundo", onClick: () => enterGame(c) }), 632, 820, 360, 92);
      } else {
        put(h("button", { class: "hit", type: "button", "aria-label": "Crear Personaje", onClick: create }), 640, 826, 345, 80);
      }

      // --- Eliminar: atenuado cuando no hay personaje ---
      if (!c) put(h("div", { class: "dim" }), 1425, 852, 212, 56);
      else put(h("button", { class: "hit", type: "button", "aria-label": "Eliminar", onClick: askDelete }), 1425, 852, 212, 56);

      put(h("button", { class: "hit", type: "button", "aria-label": "Volver", onClick: back }), 38, 852, 212, 56);

      updatePlate();
    }

    function renderCreate() {
      // Clases: la ilustración trae seleccionada la primera; aquí se marca la elegida
      CLASSES.forEach((item, i) => {
        const x = CLASS_CENTERS[i] - 42;
        if (item === cls) {
          put(h("div", { class: "ring" }), x, 318, 84, 92);
        } else if (i === 0) {
          put(h("div", { class: "dim" }), x, 318, 84, 92); // apaga el brillo dibujado del Guerrero
        }
        put(
          h("button", {
            class: "hit",
            type: "button",
            title: item.available ? item.name : `${item.name} · Próximamente`,
            "aria-label": item.name,
            onClick: () => {
              if (!item.available) { message.textContent = `${item.name}: próximamente.`; return; }
              message.textContent = "";
              cls = item;
              render();
            }
          }),
          x - 4, 314, 92, 122
        );
      });

      // Género femenino y apariencia: aún sin sprites
      put(h("button", { class: "hit", type: "button", "aria-label": "Femenino", onClick: () => { message.textContent = "Femenino: próximamente."; } }), 1426, 498, 174, 48);
      for (const y of [604, 648, 690]) {
        put(h("button", { class: "hit", type: "button", "aria-label": "Apariencia", onClick: () => { message.textContent = "Más opciones de apariencia: próximamente."; } }), 1208, y, 230, 42);
      }
    }

    function renderInfo(c) {
      const ch = getClass(c.classId);
      const p = createPortrait(96);
      p.set(ch, normalizeLook(c.look));

      put(
        h("div", { class: "frame info-panel" },
          h("h2", { class: "frame-title", text: "Personaje" }),
          h("div", { class: "info-head" },
            h("div", { class: "portrait-box" }, p.el),
            h("div", { class: "info-name" },
              h("b", { text: c.name }),
              h("span", { class: "cls-line", style: `color:${ch.color}`, text: ch.name }),
              h("span", { class: "lvl", text: `Nivel ${c.level}` }))),
          h("div", { class: "lbl", text: "Atributos:" }),
          h("div", { class: "stats" },
            ...Object.entries(ch.stats).map(([key, value]) =>
              h("div", { class: "stat" },
                h("span", { class: "stat-label", text: STAT_LABELS[key] }),
                h("span", { class: "stat-bar" }, h("i", { style: `width:${Math.round((value / STAT_MAX) * 100)}%;background:${ch.color}` })),
                h("span", { class: "stat-value", text: value })))),
          h("p", { class: "cls-desc", text: ch.description })),
        1168, 83, 486, 686
      );
    }

    // ---------------- acciones ----------------
    async function create() {
      message.textContent = "";
      const name = nameInput.value.trim();
      const error = validateNickname(name);
      if (error) { message.textContent = error; nameInput.focus(); return; }

      try {
        const character = await Accounts.createCharacter({ name, classId: cls.id, look });
        enterGame(character); // MU: tras crear, el personaje aparece en su mapa inicial
      } catch (err) {
        message.textContent = err instanceof AccountError ? err.message : "No se pudo crear el personaje.";
      }
    }

    function askDelete() {
      const c = selected();
      if (!c) return;

      const modal = h(
        "div",
        { class: "modal", onClick: (e) => { if (e.target === modal) modal.remove(); } },
        h("div", { class: "frame modal-box" },
          h("h2", { class: "frame-title", text: "Eliminar personaje" }),
          h("p", { class: "modal-text", text: `¿Eliminar a ${c.name}? No se puede deshacer.` }),
          h("div", { class: "modal-actions" },
            h("button", { class: "btn-slab", type: "button", text: "Cancelar", onClick: () => modal.remove() }),
            h("button", {
              class: "btn-slab danger",
              type: "button",
              text: "Eliminar",
              onClick: async () => {
                await Accounts.deleteCharacter(c.id);
                characters = await Accounts.listCharacters();
                modal.remove();
                slot = Math.min(slot, characters.length);
                render();
              }
            })))
      );
      stage.el.append(modal);
    }

    async function back() {
      await Accounts.logout();
      state.session = null;
      go("title");
    }

    nameInput.addEventListener("input", updatePlate);
    nameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") create(); });

    render();
  },

  unmount() {
    if (stage) stage.destroy();
    stage = null;
  }
};
