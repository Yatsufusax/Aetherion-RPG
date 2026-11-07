// Portada + login. El fondo es la ilustración (assets/ui/login_bg.png) y encima van
// los campos y botones reales, colocados sobre los dibujados.

import { Accounts, AccountError } from "../services/accounts.js";
import { h } from "../ui/dom.js";
import { createStage } from "../ui/artStage.js";

const W = 1344;
const H = 896;
const SERVER = { id: "local-01", name: "Valoria-01", detail: "Mundo local · sin conexión" };

let stage = null;

export const loginScene = {
  async mount({ root, go, state }) {
    state.server = SERVER;

    // Si ya hay una sesión abierta se salta directo a los personajes.
    const existing = await Accounts.getSession();
    if (existing) {
      state.session = existing;
      go("characters");
      return;
    }

    stage = createStage("./assets/ui/login_bg.png", W, H);

    const message = h("div", { class: "art-message", role: "status" });
    const user = h("input", { type: "text", autocomplete: "username", maxlength: "12", placeholder: "Usuario", spellcheck: "false", "aria-label": "Usuario" });
    const pass = h("input", { type: "password", autocomplete: "current-password", maxlength: "20", placeholder: "Contraseña", "aria-label": "Contraseña" });
    const enter = h("button", { class: "hit", type: "button", "aria-label": "Ingresar" });

    user.value = Accounts.getLastUsername();

    async function login() {
      message.textContent = "";
      enter.disabled = true;
      try {
        state.session = await Accounts.login(user.value.trim(), pass.value);
        go("characters");
      } catch (error) {
        message.textContent = error instanceof AccountError ? error.message : "No se pudo completar la operación.";
        enter.disabled = false;
      }
    }

    enter.addEventListener("click", login);
    for (const input of [user, pass]) {
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") login(); });
    }

    // Los campos tapan el texto dibujado ("Usuario", "Contraseña") con el mismo color de fondo
    stage.spot(h("label", { class: "cover field-cover" }, user), 1010, 439, 258, 36);
    stage.spot(h("label", { class: "cover field-cover" }, pass), 1010, 502, 258, 36);
    stage.spot(enter, 948, 560, 334, 86);
    stage.spot(h("button", { class: "hit", type: "button", "aria-label": "Registrarse", onClick: openRegister }), 1018, 680, 192, 45);
    stage.spot(h("button", { class: "hit", type: "button", "aria-label": "Opciones", onClick: openOptions }), 1018, 737, 192, 45);
    stage.spot(h("button", { class: "hit", type: "button", "aria-label": "Salir", onClick: exit }), 1018, 793, 192, 45);
    stage.spot(message, 920, 368, 390, 30);

    root.append(stage.el);
    (user.value ? pass : user).focus();

    function exit() {
      // Un navegador solo deja cerrar pestañas abiertas por el propio script.
      window.close();
      setTimeout(() => { message.textContent = "Puedes cerrar esta pestaña o la aplicación."; }, 150);
    }

    function modal(title, ...content) {
      const box = h("div", { class: "modal", onClick: (e) => { if (e.target === box) box.remove(); } },
        h("div", { class: "frame modal-box" }, h("h2", { class: "frame-title", text: title }), ...content));
      stage.el.append(box);
      return box;
    }

    function openRegister() {
      const u = h("input", { type: "text", autocomplete: "username", maxlength: "12", placeholder: "Usuario", spellcheck: "false" });
      const p1 = h("input", { type: "password", autocomplete: "new-password", maxlength: "20", placeholder: "Contraseña" });
      const p2 = h("input", { type: "password", autocomplete: "new-password", maxlength: "20", placeholder: "Repetir contraseña" });
      const msg = h("div", { class: "form-message", role: "status" });
      const ok = h("button", { class: "btn-ruby", type: "button", text: "Crear cuenta" });

      const box = modal(
        "Crear cuenta",
        h("label", { class: "field" }, u),
        h("label", { class: "field" }, p1),
        h("label", { class: "field" }, p2),
        msg,
        ok,
        h("button", { class: "btn-slab", type: "button", text: "Cancelar", onClick: () => box.remove() }),
        h("div", { class: "note", text: "Cuenta local: se guarda solo en este dispositivo." })
      );

      async function send() {
        msg.textContent = "";
        ok.disabled = true;
        try {
          if (p1.value !== p2.value) throw new AccountError("Las contraseñas no coinciden.");
          state.session = await Accounts.register(u.value.trim(), p1.value);
          go("characters");
        } catch (error) {
          msg.textContent = error instanceof AccountError ? error.message : "No se pudo completar la operación.";
          ok.disabled = false;
        }
      }

      ok.addEventListener("click", send);
      for (const input of [u, p1, p2]) input.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
      u.focus();
    }

    function openOptions() {
      const fs = h("button", { class: "toggle", type: "button", role: "switch" });
      const paint = () => {
        const on = !!document.fullscreenElement;
        fs.textContent = on ? "Activada" : "Desactivada";
        fs.setAttribute("aria-checked", String(on));
        fs.classList.toggle("on", on);
      };
      fs.addEventListener("click", async () => {
        try {
          if (document.fullscreenElement) await document.exitFullscreen();
          else await document.documentElement.requestFullscreen();
        } catch { /* no disponible en este dispositivo */ }
        paint();
      });
      paint();

      const box = modal(
        "Opciones",
        h("div", { class: "opt-row" }, h("span", { text: "Pantalla completa" }), fs),
        h("button", { class: "btn-slab", type: "button", text: "Cerrar", onClick: () => box.remove() })
      );
    }
  },

  unmount() {
    if (stage) stage.destroy();
    stage = null;
  }
};
