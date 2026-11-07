// ==========================================
// CLASES DE PERSONAJE
// ==========================================
// Cada clase declara su sprite, estadísticas iniciales y mapa de inicio.
// available: false => aparece bloqueada ("Próximamente") en la creación.
// El orden de esta lista es el de los iconos en la pantalla de creación.

export const CLASSES = [
  {
    id: "warrior",
    name: "Guerrero",
    short: "Warrior",
    icon: "sword",
    color: "#ff7a3a",
    available: true,
    description: "Combatiente de primera línea con espada y escudo.",
    stats: { fuerza: 26, agilidad: 18, vitalidad: 28, energia: 8 },
    base: { hp: 120, mp: 15 },
    startMap: "valoria",
    spawn: { x: 6, y: 5 },
    // TEMPORAL: usa el sprite del Caballero Oscuro hasta tener el suyo
    sprite: {
      src: "./assets/characters/dark_knight.png",
      frame: 64,
      rows: { down: 0, left: 1, right: 2, up: 3 }
    }
  },
  {
    id: "mage",
    name: "Mago",
    short: "Mage",
    icon: "staff",
    color: "#4aa8ff",
    available: false,
    description: "Maestro de la magia arcana. Daño a distancia con hechizos. Próximamente.",
    stats: { fuerza: 18, agilidad: 18, vitalidad: 15, energia: 30 },
    base: { hp: 60, mp: 60 },
    startMap: "valoria",
    spawn: { x: 6, y: 5 },
    sprite: null
  },
  {
    id: "archer",
    name: "Arquera",
    short: "Archer",
    icon: "bow",
    color: "#5fd36b",
    available: false,
    description: "Arquera ágil con magia de apoyo. Próximamente.",
    stats: { fuerza: 22, agilidad: 25, vitalidad: 20, energia: 15 },
    base: { hp: 80, mp: 30 },
    startMap: "valoria",
    spawn: { x: 6, y: 5 },
    sprite: null
  },
  {
    id: "dark_knight",
    name: "Caballero Oscuro",
    short: "BK",
    icon: "blade",
    color: "#b46cff",
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
    id: "summoner",
    name: "Summoner",
    short: "Summoner",
    icon: "wings",
    color: "#ffd25a",
    available: false,
    description: "Invoca criaturas del más allá para que luchen a su lado. Próximamente.",
    stats: { fuerza: 12, agilidad: 16, vitalidad: 18, energia: 32 },
    base: { hp: 65, mp: 70 },
    startMap: "valoria",
    spawn: { x: 6, y: 5 },
    sprite: null
  }
];

export function getClass(id) {
  return CLASSES.find((c) => c.id === id) || null;
}
