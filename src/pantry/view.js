import { $ } from '../utils/dom.js';

const listEl = $('#pantry-list');

export function renderPantry(pantry) {
  listEl.innerHTML = '';
  pantry.forEach((item, index) => {
    const li = document.createElement('li');
    li.dataset.index = index;

    li.innerHTML = `
      <span>${item.name} — ${item.quantity} ${item.unit}</span>
      <button class="remove" aria-label="Remove ${item.name}">×</button>
    `;
    listEl.appendChild(li);
  });
}
