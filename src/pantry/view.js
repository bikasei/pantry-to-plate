// pantry/view.js
import { $ } from '../utils/dom.js';

const listEl = $('#pantry-list'); // one lookup at module load

// Render = "turn data (array) into DOM"
export function renderPantry(pantry) {
  listEl.innerHTML = '';
  pantry.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.quantity} ${item.unit}`;
    listEl.appendChild(li);
  });
}
