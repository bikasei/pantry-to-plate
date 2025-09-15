import { $ } from '../utils/dom.js';

const resultsBox = $('#results');

export function renderResults(list) {
  resultsBox.innerHTML = '';
  if (!list.length) {
    resultsBox.textContent = 'Type to search recipes (e.g., pasta, chicken, salad)…';
    return;
  }

  list.forEach(r => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${r.thumb}" alt="" style="max-width:100%;height:auto;border-radius:.5rem;margin-bottom:.5rem;" />
      <h3>${r.title}</h3>
      <p>${[r.area, r.category].filter(Boolean).join(' • ')}</p>
      <button data-id="${r.id}" class="add-to-day">Add to day…</button>
    `;
    // Attach the full recipe as an encoded string for later retrieval
    card.querySelector('button').dataset.payload = encodeURIComponent(JSON.stringify(r));
    resultsBox.appendChild(card);
  });
}

export function resultsContainer() {
  // expose for event delegation in controller
  return resultsBox;
}
