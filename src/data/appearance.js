// ==========================================
// APARIENCIA
// ==========================================
// Hoy solo el color (tinte del sprite) tiene efecto visible. Cabello y rostro
// quedan reservados hasta que existan sprites con variantes.

export const GENDERS = [
  { id: "m", name: "Masculino", available: true },
  { id: "f", name: "Femenino", available: false } // sin sprite todavía
];

export const COLORS = [
  { name: "Original", filter: "none" },
  { name: "Carmesí", filter: "hue-rotate(-38deg) saturate(2.2)" },
  { name: "Zafiro", filter: "hue-rotate(185deg) saturate(2)" },
  { name: "Esmeralda", filter: "hue-rotate(100deg) saturate(2)" },
  { name: "Violeta", filter: "hue-rotate(235deg) saturate(2)" }
];

export const DEFAULT_LOOK = { gender: "m", hair: 0, face: 0, color: 0 };

export function normalizeLook(look) {
  const l = { ...DEFAULT_LOOK, ...(look || {}) };
  const color = Number.isInteger(l.color) ? l.color : 0;
  return {
    gender: GENDERS.some((g) => g.id === l.gender && g.available) ? l.gender : "m",
    hair: 0,
    face: 0,
    color: color >= 0 && color < COLORS.length ? color : 0
  };
}

export function tintFilter(look) {
  return COLORS[normalizeLook(look).color].filter;
}
