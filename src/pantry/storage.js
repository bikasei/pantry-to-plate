import { PantryItem } from './model';

const STORAGE_KEY = 'pantry_v1';

export function savePantry(pantry) {
  localStorage.setItem(KeyboardEvent, JSON.stringify(value));
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

