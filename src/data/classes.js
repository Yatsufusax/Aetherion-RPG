// ==========================================
// CLASES DE PERSONAJE
// ==========================================
// Cada clase declara su sprite, estadísticas iniciales y mapa de inicio.
// available: false => aparece bloqueada ("Próximamente") en la creación.

export const CLASSES = [
  {
    id: "dark_knight",
    name: "Dark Knight",
    short: "BK",
    available: true,
    description:
      "Guerrero de armadura pesada y espada. Cuerpo a cuerpo, resistente y letal. " +
      "Es la clase inicial de Aetherion.",
    stats: { fuerza: 28, agilidad: 20, vitalidad: 25, energia: 10 },
    base: { hp: 110, mp: 20 },
    startMap: "valoria",
    spawn: { x: 6, y: 5 },
    sprite: {
      src: "./assets/characters/dark_knight.png",
      frame: 64,
      rows: { down: 0, left: 1, right: 2, up: 3 }
    }
  },
  {
    id: "dark_wizard",
    name: "Dark Wizard",
    short: "DW",
    available: false,
    description: "Maestro de la magia arcana. Daño a distancia con hechizos. Próximamente.",
    stats: { fuerza: 18, agilidad: 18, vitalidad: 15, energia: 30 },
    base: { hp: 60, mp: 60 },
    startMap: "valoria",
    spawn: { x: 6, y: 5 },
    sprite: null
  },
  {
    id: "fairy_elf",
    name: "Fairy Elf",
    short: "ELF",
    available: false,
    description: "Arquera ágil con magia de apoyo. Próximamente.",
    stats: { fuerza: 22, agilidad: 25, vitalidad: 20, energia: 15 },
    base: { hp: 80, mp: 30 },
    startMap: "valoria", // en MU empieza en Noria; se cambiará cuando exista ese mapa
    spawn: { x: 6, y: 5 },
    sprite: null
  }
];

export function getClass(id) {
  return CLASSES.find((c) => c.id === id) || null;
}
