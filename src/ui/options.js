// Opciones del jugador (se guardan en el dispositivo).
const KEY = "aetherion.options.v1";

const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const DEFAULTS = { fx: !reduced };

function read() {
  try {
    return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY)) || {}) };
  } catch {
    return { ...DEFAULTS };
  }
}

export const Options = {
  get(name) { return read()[name]; },
  set(name, value) {
    try { localStorage.setItem(KEY, JSON.stringify({ ...read(), [name]: value })); } catch { /* sin almacenamiento */ }
  }
};
