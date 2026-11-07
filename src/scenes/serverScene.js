import { Accounts } from "../services/accounts.js";
import { h } from "../ui/dom.js";

const SERVERS = [
  { id: "local-01", name: "Valoria-01", detail: "Mundo local · sin conexión", available: true },
  { id: "global-02", name: "Aetherion-02", detail: "Multijugador · Próximamente", available: false },
  { id: "global-03", name: "Aetherion-03", detail: "Multijugador · Próximamente", available: false }
];

export const serverScene = {
  mount({ root, go, state }) {
    let selected = SERVERS[0];
    const list = h("div", { class: "server-list" });

    const connect = h("button", { class: "btn btn-primary", text: "Conectar" });

    function renderList() {
      list.innerHTML = "";

      for (const server of SERVERS) {
        list.append(
          h(
            "button",
            {
              class: `server-item${server === selected ? " selected" : ""}${server.available ? "" : " locked"}`,
              disabled: !server.available,
              onClick: () => { selected = server; renderList(); }
            },
            h("span", { class: "server-name", text: server.name }),
            h("span", { class: "server-detail", text: server.detail }),
            h("span", { class: `server-dot ${server.available ? "on" : "off"}` })
          )
        );
      }
    }

    connect.addEventListener("click", async () => {
      state.server = selected;
      state.session = await Accounts.getSession();
      go(state.session ? "characters" : "login");
    });

    renderList();

    root.append(
      h(
        "section",
        { class: "scene" },
        h(
          "div",
          { class: "panel panel-narrow" },
          h("h2", { text: "Selecciona un servidor" }),
          list,
          h(
            "div",
            { class: "row" },
            h("button", { class: "btn", text: "Volver", onClick: () => go("title") }),
            connect
          )
        )
      )
    );
  }
};
