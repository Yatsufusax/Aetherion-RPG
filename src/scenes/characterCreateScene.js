import { Accounts, AccountError, validateNickname } from "../services/accounts.js";
import { CLASSES } from "../data/classes.js";
import { createSpritePreview } from "../ui/spritePreview.js";
import { h } from "../ui/dom.js";

const STAT_LABELS = { fuerza: "Fuerza", agilidad: "Agilidad", vitalidad: "Vitalidad", energia: "Energía" };
const STAT_MAX = 40;

export const characterCreateScene = {
  mount({ root, go, enterGame }) {
    let cls = CLASSES.find((c) => c.available);
    let preview = null;

    const classList = h("div", { class: "class-list" });
    const stage = h("div", { class: "preview-stage" });
    const info = h("div", { class: "class-info" });
    const name = h("input", { type: "text", maxlength: "10", placeholder: "Nombre del personaje", autocomplete: "off" });
    const message = h("div", { class: "form-message" });
    const create = h("button", { class: "btn btn-primary", text: "Crear" });

    function renderClassList() {
      classList.innerHTML = "";

      for (const item of CLASSES) {
        classList.append(
          h(
            "button",
            {
              class: `class-item${item === cls ? " selected" : ""}${item.available ? "" : " locked"}`,
              disabled: !item.available,
              onClick: () => { cls = item; renderClassList(); renderClass(); }
            },
            h("span", { class: "class-name", text: item.name }),
            h("span", { class: "class-tag", text: item.available ? item.short : "Próximamente" })
          )
        );
      }
    }

    function renderClass() {
      stage.innerHTML = "";
      preview = createSpritePreview(cls, { scale: 4, walking: true });

      const turn = (dir) => () => preview.setDirection(dir);

      stage.append(
        preview.el,
        h(
          "div",
          { class: "turn-row" },
          h("button", { class: "btn btn-small", text: "◀", onClick: turn("left") }),
          h("button", { class: "btn btn-small", text: "▼", onClick: turn("down") }),
          h("button", { class: "btn btn-small", text: "▶", onClick: turn("right") }),
          h("button", { class: "btn btn-small", text: "▲", onClick: turn("up") })
        )
      );

      info.innerHTML = "";
      info.append(
        h("h3", { text: cls.name }),
        h("p", { class: "class-desc", text: cls.description }),
        ...Object.entries(cls.stats).map(([key, value]) =>
          h(
            "div",
            { class: "stat" },
            h("span", { class: "stat-label", text: STAT_LABELS[key] }),
            h("span", { class: "stat-bar" }, h("i", { style: `width:${Math.round((value / STAT_MAX) * 100)}%` })),
            h("span", { class: "stat-value", text: value })
          )
        )
      );
    }

    async function send() {
      message.textContent = "";
      const value = name.value.trim();
      const error = validateNickname(value);

      if (error) { message.textContent = error; return; }

      create.disabled = true;

      try {
        const character = await Accounts.createCharacter({ name: value, classId: cls.id });
        enterGame(character); // MU: tras crear, el personaje aparece en su mapa inicial
      } catch (err) {
        message.textContent = err instanceof AccountError ? err.message : "No se pudo crear el personaje.";
        create.disabled = false;
      }
    }

    create.addEventListener("click", send);
    name.addEventListener("keydown", (event) => { if (event.key === "Enter") send(); });

    renderClassList();
    renderClass();

    root.append(
      h(
        "section",
        { class: "scene" },
        h(
          "div",
          { class: "panel panel-wide" },
          h("h2", { text: "Crear personaje" }),
          h("div", { class: "create-layout" }, classList, stage, info),
          h("label", { class: "field" }, name),
          message,
          h(
            "div",
            { class: "row" },
            h("button", { class: "btn", text: "Cancelar", onClick: () => go("characters") }),
            create
          )
        )
      )
    );

    name.focus();
  }
};
