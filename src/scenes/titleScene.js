import { h } from "../ui/dom.js";

export const titleScene = {
  mount({ root, go }) {
    const start = () => go("server");

    const el = h(
      "section",
      { class: "scene scene-title" },
      h(
        "div",
        { class: "logo" },
        h("div", { class: "logo-main", text: "AETHERION" }),
        h("div", { class: "logo-sub", text: "R P G" })
      ),
      h("div", { class: "press", text: "Toca la pantalla o presiona una tecla" }),
      h("div", { class: "version", text: "v0.1 · Modo local" })
    );

    el.addEventListener("pointerdown", start);
    this._key = (event) => { if (event.key !== "F5") start(); };
    window.addEventListener("keydown", this._key);

    root.append(el);
  },

  unmount() {
    window.removeEventListener("keydown", this._key);
  }
};
