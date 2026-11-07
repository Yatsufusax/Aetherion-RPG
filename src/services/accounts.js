// ==========================================
// CUENTAS Y PERSONAJES
// ==========================================
// Las pantallas solo usan la interfaz `Accounts` (métodos async).
// Hoy se guarda en el dispositivo (localStorage); en el futuro puede
// cambiarse por un cliente de servidor con los mismos métodos, sin tocar las pantallas.
//
// AVISO: en modo local la contraseña NO protege nada (los datos viven en el propio
// dispositivo). Sirve para separar perfiles. La seguridad real llega con el servidor.

import { getClass } from "../data/classes.js";

export const MAX_CHARACTERS = 5;

const DB_KEY = "aetherion.db.v1";
const SESSION_KEY = "aetherion.session.v1";
const LAST_USER_KEY = "aetherion.lastUser";

export class AccountError extends Error {}

const RESERVED_NAMES = ["admin", "gm", "master", "system", "aetherion", "moderador"];

export function validateUsername(value) {
  if (!/^[A-Za-z0-9_]{4,12}$/.test(value)) {
    return "El usuario debe tener 4 a 12 caracteres (letras, números o _).";
  }
  return null;
}

export function validatePassword(value) {
  if (typeof value !== "string" || value.length < 4 || value.length > 20) {
    return "La contraseña debe tener entre 4 y 20 caracteres.";
  }
  return null;
}

export function validateNickname(value) {
  if (!/^[A-Za-z0-9]{3,10}$/.test(value)) {
    return "El nombre debe tener 3 a 10 caracteres (solo letras y números).";
  }
  if (RESERVED_NAMES.some((word) => value.toLowerCase().includes(word))) {
    return "Ese nombre no está permitido.";
  }
  return null;
}

async function hashPassword(password, salt) {
  const text = `${salt}:${password}`;

  if (globalThis.crypto && crypto.subtle) {
    const bytes = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // Respaldo (contextos sin crypto.subtle): no es criptográfico.
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return "f" + (h >>> 0).toString(16);
}

function randomSalt() {
  const bytes = new Uint8Array(8);
  if (globalThis.crypto && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < 8; i++) bytes[i] = Math.floor(Math.random() * 256);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function readDb() {
  try {
    const db = JSON.parse(localStorage.getItem(DB_KEY));
    return db && db.accounts ? db : { accounts: {} };
  } catch {
    return { accounts: {} };
  }
}

function writeDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

class LocalBackend {
  // ---------- sesión ----------
  async getSession() {
    const key = localStorage.getItem(SESSION_KEY);
    const db = readDb();
    const account = key ? db.accounts[key] : null;
    return account ? { username: account.username } : null;
  }

  getLastUsername() {
    return localStorage.getItem(LAST_USER_KEY) || "";
  }

  async register(username, password) {
    const error = validateUsername(username) || validatePassword(password);
    if (error) throw new AccountError(error);

    const db = readDb();
    const key = username.toLowerCase();
    if (db.accounts[key]) throw new AccountError("Ese usuario ya existe.");

    const salt = randomSalt();
    db.accounts[key] = {
      username,
      salt,
      hash: await hashPassword(password, salt),
      createdAt: Date.now(),
      characters: []
    };
    writeDb(db);
    return this._openSession(key);
  }

  async login(username, password) {
    const db = readDb();
    const key = String(username).toLowerCase();
    const account = db.accounts[key];

    if (!account || (await hashPassword(password, account.salt)) !== account.hash) {
      throw new AccountError("Usuario o contraseña incorrectos.");
    }
    return this._openSession(key);
  }

  async logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  _openSession(key) {
    const account = readDb().accounts[key];
    localStorage.setItem(SESSION_KEY, key);
    localStorage.setItem(LAST_USER_KEY, account.username);
    return { username: account.username };
  }

  _account(db) {
    const key = localStorage.getItem(SESSION_KEY);
    const account = key ? db.accounts[key] : null;
    if (!account) throw new AccountError("Sesión no iniciada.");
    return account;
  }

  // ---------- personajes ----------
  async listCharacters() {
    return this._account(readDb()).characters.map((c) => ({ ...c }));
  }

  async createCharacter({ name, classId }) {
    const error = validateNickname(name);
    if (error) throw new AccountError(error);

    const cls = getClass(classId);
    if (!cls || !cls.available) throw new AccountError("Esa clase no está disponible.");

    const db = readDb();
    const account = this._account(db);

    if (account.characters.length >= MAX_CHARACTERS) {
      throw new AccountError(`Máximo ${MAX_CHARACTERS} personajes por cuenta.`);
    }

    // El apodo es único en todo el servidor (aquí, en todo el dispositivo)
    const taken = Object.values(db.accounts).some((a) =>
      a.characters.some((c) => c.name.toLowerCase() === name.toLowerCase())
    );
    if (taken) throw new AccountError("Ese nombre ya está en uso.");

    const character = {
      id: `c${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`,
      name,
      classId: cls.id,
      level: 1,
      exp: 0,
      map: cls.startMap,
      x: cls.spawn.x,
      y: cls.spawn.y,
      createdAt: Date.now()
    };

    account.characters.push(character);
    writeDb(db);
    return { ...character };
  }

  async deleteCharacter(id) {
    const db = readDb();
    const account = this._account(db);
    account.characters = account.characters.filter((c) => c.id !== id);
    writeDb(db);
  }

  async saveCharacter(id, patch) {
    const db = readDb();
    const account = this._account(db);
    const character = account.characters.find((c) => c.id === id);
    if (!character) return;
    Object.assign(character, patch);
    writeDb(db);
  }
}

// Punto único de acceso. Para multijugador se sustituye por un cliente de servidor.
export const Accounts = new LocalBackend();
