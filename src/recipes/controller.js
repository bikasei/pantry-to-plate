import { $ } from '../utils/dom.js';
import { debounce } from '../utils/debounce.js';
import { searchRecipesAPI } from './api.js';
import { renderResults, resultsContainer } from './view.js';
import { addToDay } from '../planner/controller.js';

const searchInput = $('#search-input');

export function initRecipes() {
  // Initial hint
  renderResults([]);

  // Debounced search handler
  const onSearch = debounce(async () => {
    try {
      const results = await searchRecipesAPI(searchInput.value);
      renderResults(results);
    } catch (err) {
      console.error(err);
      resultsContainer().textContent = 'Couldn’t load recipes. Check your connection.';
    }
  }, 400);

  searchInput?.addEventListener('input', onSearch);

  // Event delegation for "Add to day…"
  resultsContainer().addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-day');
    if (!btn) return;

    const payload = btn.dataset.payload
      ? JSON.parse(decodeURIComponent(btn.dataset.payload))
      : null;

    if (!payload) { alert('Recipe data missing. Try searching again.'); return; }

    addToDay(payload); // hand off to planner module
  });
}
