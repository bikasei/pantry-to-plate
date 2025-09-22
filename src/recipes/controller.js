import { $ } from '../utils/dom.js';
import { debounce } from '../utils/debounce.js';
import { searchRecipesAPI } from './api.js';
import { renderResults, resultsContainer } from './view.js';
import { DAYS } from '../planner/storage.js';
import { addToDay } from '../planner/controller.js';

const searchInput = $('#search-input');
const modal = $('#day-modal');
const dayOptions = $('#day-options');
const closeModalBtn = $('#close-modal');

export function initRecipes() {
  renderResults([]);

  const onSearch = debounce(async () => {
    try {
      const results = await searchRecipesAPI(searchInput.value);
      renderResults(results);
    } catch (err) {
      console.error(err);
      resultsContainer().textContent =
        'Couldn’t load recipes. Check your connection.';
    }
  }, 400);

  searchInput?.addEventListener('input', onSearch);

  resultsContainer().addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-day');
    if (!btn) return;

    const payload = btn.dataset.payload
      ? JSON.parse(decodeURIComponent(btn.dataset.payload))
      : null;

    if (!payload) {
      alert('Recipe data missing. Try searching again.');
      return;
    }

    openDayModal(payload);
  });

  closeModalBtn.addEventListener('click', () => (modal.style.display = 'none'));
  dayOptions.addEventListener('click', (e) => {
    const dayBtn = e.target.closest('button');
    if (!dayBtn) return;

    const day = dayBtn.dataset.day;
    const recipePayload = JSON.parse(modal.dataset.recipePayload);

    addToDay(recipePayload, day);
    modal.style.display = 'none';
  });
}

function openDayModal(recipePayload) {
  dayOptions.innerHTML = '';
  modal.dataset.recipePayload = JSON.stringify(recipePayload);

  DAYS.forEach((day) => {
    const button = document.createElement('button');
    button.textContent = day;
    button.dataset.day = day;
    dayOptions.appendChild(button);
  });

  modal.style.display = 'flex';
}
