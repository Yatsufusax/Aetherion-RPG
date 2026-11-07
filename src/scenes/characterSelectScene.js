import { Accounts, MAX_CHARACTERS } from "../services/accounts.js";
import { getClass } from "../data/classes.js";
import { createSpritePreview } from "../ui/spritePreview.js";
import { h } from "../ui/dom.js";

export const characterSelectScene = {
  async mount({ root, go, state, enterGame }) {
    const section = h("section", { class: "scene" });
    root.append(section);

    const characters = await Accounts.listCharacters();
    let selected = characters[0] || null;

    const grid = h("div", { class: "slot-grid" });
    const enter = h("button", { class: "btn btn-primary", text: "Entrar al mundo" });
    const del = h("button", { class: "btn btn-danger", text: "Eliminar" });
    const confirmBox = h("div", { class: "confirm hidden" });

    function renderGrid() {
      grid.innerHTML = "";

      for (let i = 0; i < MAX_CHARACTERS; i++) {
        const character = characters[i];

        if (!character) {
          grid.append(
            h(
              "button",
              { class: "slot empty", onClick: () => go("create") },
              h("span", { class: "plus", text: "+" }),
              h("span", { text: "Crear personaje" })
            )
          );
          continue;
        }

        const cls = getClass(character.classId);
        const preview = createSpritePreview(cls, { scale: 2, walking: false });

        grid.append(
          h(
            "button",
            {
              class: `slot${character === selected ? " selected" : ""}`,
              onClick: () => { selected = character; renderGrid(); },
              onDblclick: () => enterGame(character)
            },
            preview.el,
            h("span", { class: "slot-name", text: character.name }),
            h("span", { class: "slot-class", text: `${cls.name} · Nv. ${character.level}` })
          )
        );
      }

      enter.disabled = !selected;
      del.disabled = !selected;
    }

    enter.addEventListener("click", () => selected && enterGame(selected));

    del.addEventListener("click", () => {
      if (!selected) return;
      confirmBox.classList.remove("hidden");
      confirmBox.innerHTML = "";
      confirmBox.append(
        h("p", { text: `¿Eliminar a ${selected.name}? No se puede deshacer.` }),
        h(
          "div",
          { class: "row" },
          h("button", { class: "btn", text: "Cancelar", onClick: () => confirmBox.classList.add("hidden") }),
          h("button", {
            class: "btn btn-danger",
            text: "Eliminar",
            onClick: async () => {
              await Accounts.deleteCharacter(selected.id);
              go("characters");
            }
          })
        )
      );
    });

    renderGrid();

    section.append(
      h(
        "div",
        { class: "panel panel-wide" },
        h(
          "div",
          { class: "panel-head" },
          h("h2", { text: "Selecciona tu personaje" }),
          h("span", { class: "server-tag", text: `${state.server ? state.server.name : ""} · ${state.session ? state.session.username : ""}` })
        ),
        grid,
        confirmBox,
        h(
          "div",
          { class: "row" },
          h("button", {
            class: "btn",
            text: "Cerrar sesión",
            onClick: async () => { await Accounts.logout(); state.session = null; go("title"); }
          }),
          del,
          enter
        )
      )
    );
  }
};
