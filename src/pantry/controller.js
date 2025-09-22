import { $ } from '../utils/dom.js';
import { PantryItem } from './model.js';
import { savePantry, loadPantry } from './storage.js';
import { renderPantry } from './view.js';

const form = $('#pantry-form');
const nameInput = $('#item-name');
const qtyInput = $('#item-quantity');
const unitSelect = $('#item-unit');
const clearBtn = $('#clear-all');
const listEl = $('#pantry-list');

let pantry = loadPantry();

function getFormData() {
  return {
    name: nameInput.value.trim(),
    quantity: Number(qtyInput.value),
    unit: unitSelect.value,
  };
}

function clearForm() {
  form.reset();
  nameInput.focus();
}

export function initPantry() {
  renderPantry(pantry);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { name, quantity, unit } = getFormData();
    const item = new PantryItem(name, quantity, unit);
    if (!item.isValid()) {
      alert('Please enter a name and a number.');
      return;
    }
    pantry.push(item);
    savePantry(pantry);
    renderPantry(pantry);
    clearForm();
  });

  clearBtn.addEventListener('click', () => {
    if (!pantry.length) return;
    if (!confirm('Clear all items?')) return;
    pantry = [];
    savePantry(pantry);
    renderPantry(pantry);
    nameInput.focus();
  });

  listEl.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove');
    if (!removeBtn) return;
    const indexToRemove = Number(removeBtn.parentElement.dataset.index);

    pantry.splice(indexToRemove, 1);

    savePantry(pantry);
    renderPantry(pantry);
  });
}

export function getPantry() {
  return pantry;
}
