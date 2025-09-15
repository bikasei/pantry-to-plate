import { $ } from '../utils/dom.js';
import { PantryItem } from './model.js';
import { savePantry, loadPantry } from './storage.js';
import { renderPantry } from './view.js';

// Get DOM elements once (faster + clearer)
const form       = $('#pantry-form');
const nameInput  = $('#item-name');
const qtyInput   = $('#item-quantity');
const unitSelect = $('#item-unit');
const clearBtn   = $('#clear-all');

// The pantry "state" lives here in this module
let pantry = loadPantry();  // initial value from storage

function getFormData() {
  return {
    name: nameInput.value.trim(),
    quantity: Number(qtyInput.value),
    unit: unitSelect.value
  };
}

function clearForm() { form.reset(); nameInput.focus(); }

// Public API of this module: initialise + expose getters if needed
export function initPantry() {
  // Initial paint
  renderPantry(pantry);

  // Add item
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { name, quantity, unit } = getFormData();
    const item = new PantryItem(name, quantity, unit);
    if (!item.isValid()) { alert('Please enter a name and a number.'); return; }
    pantry.push(item);
    savePantry(pantry);
    renderPantry(pantry);
    clearForm();
  });

  // Clear all
  clearBtn.addEventListener('click', () => {
    if (!pantry.length) return;
    if (!confirm('Clear all items?')) return;
    pantry = [];
    savePantry(pantry);
    renderPantry(pantry);
    nameInput.focus();
  });
}

// Provide read-access for other modules (e.g., shopping list later)
export function getPantry() {
  return pantry;
}
