import { Accounts, AccountError } from "../services/accounts.js";
import { h } from "../ui/dom.js";

export const loginScene = {
  mount({ root, go, state }) {
    let mode = "login"; // "login" | "register"

    const user = h("input", { type: "text", autocomplete: "username", maxlength: "12", placeholder: "Usuario" });
    const pass = h("input", { type: "password", autocomplete: "current-password", maxlength: "20", placeholder: "Contraseña" });
    const pass2 = h("input", { type: "password", autocomplete: "new-password", maxlength: "20", placeholder: "Repetir contraseña" });
    const message = h("div", { class: "form-message" });
    const submit = h("button", { class: "btn btn-primary" });
    const tabLogin = h("button", { class: "tab", text: "Iniciar sesión", onClick: () => setMode("login") });
    const tabRegister = h("button", { class: "tab", text: "Crear cuenta", onClick: () => setMode("register") });
    const row2 = h("label", { class: "field" }, pass2);

    user.value = Accounts.getLastUsername();

    function setMode(next) {
      mode = next;
      tabLogin.classList.toggle("active", mode === "login");
      tabRegister.classList.toggle("active", mode === "register");
      row2.classList.toggle("hidden", mode === "login");
      submit.textContent = mode === "login" ? "Entrar" : "Crear cuenta";
      pass.autocomplete = mode === "login" ? "current-password" : "new-password";
      message.textContent = "";
    }

    async function send() {
      message.textContent = "";
      submit.disabled = true;

      try {
        if (mode === "register" && pass.value !== pass2.value) {
          throw new AccountError("Las contraseñas no coinciden.");
        }

        state.session = mode === "login"
          ? await Accounts.login(user.value.trim(), pass.value)
          : await Accounts.register(user.value.trim(), pass.value);

        go("characters");
      } catch (error) {
        message.textContent = error instanceof AccountError ? error.message : "No se pudo completar la operación.";
        submit.disabled = false;
      }
    }

    submit.addEventListener("click", send);
    for (const input of [user, pass, pass2]) {
      input.addEventListener("keydown", (event) => { if (event.key === "Enter") send(); });
    }

    root.append(
      h(
        "section",
        { class: "scene" },
        h(
          "div",
          { class: "panel panel-narrow" },
          h("div", { class: "server-tag", text: state.server ? state.server.name : "" }),
          h("div", { class: "tabs" }, tabLogin, tabRegister),
          h("label", { class: "field" }, user),
          h("label", { class: "field" }, pass),
          row2,
          message,
          h("div", { class: "note", text: "Cuenta local: se guarda solo en este dispositivo." }),
          h(
            "div",
            { class: "row" },
            h("button", { class: "btn", text: "Volver", onClick: () => go("server") }),
            submit
          )
        )
      )
    );

    setMode("login");
    (user.value ? pass : user).focus();
  }
};
