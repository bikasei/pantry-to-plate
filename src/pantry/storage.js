import { PantryItem } from './model.js';

const STORAGE_KEY = 'pantry_v1';

export function savePantry(pantry) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pantry));
}

export function loadPantry() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const arr = JSON.parse(raw);
    return arr.map((o) => new PantryItem(o.name, o.quantity, o.unit));
  } catch {
    return [];
  }
}
