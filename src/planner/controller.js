import { $, $$ } from '../utils/dom.js';
import { DAYS, loadPlanner, savePlanner } from './storage.js';
import { renderPlanner } from './view.js';

let planner = loadPlanner(); // module state

export function initPlanner() {
  renderPlanner(planner);

  // Remove handler (event delegation)
  $('#week').addEventListener('click', (e) => {
    const btn = e.target.closest('.remove');
    if (!btn) return;
    const day = btn.dataset.day;
    const index = Number(btn.dataset.index);
    if (!DAYS.includes(day) || Number.isNaN(index)) return;
    planner[day].splice(index, 1);
    savePlanner(planner);
    renderPlanner(planner);
  });
}

// Add a recipe to a day (called from recipes controller)
export function addToDay(recipeObj) {
  const day = prompt('Add to which day? (Sun, Mon, Tue, Wed, Thu, Fri, Sat)');
  if (!day) return;

  const D = day.trim().slice(0,3).toLowerCase();
  const match = DAYS.find(d => d.toLowerCase() === D);
  if (!match) { alert('Please type one of: Sun, Mon, Tue, Wed, Thu, Fri, Sat'); return; }

  // Store minimal shape for shopping list later
  const planned = {
    id: recipeObj.id,
    title: recipeObj.title,
    area: recipeObj.area,
    category: recipeObj.category,
    ingredients: recipeObj.ingredients
  };

  planner[match].push(planned);
  savePlanner(planner);
  renderPlanner(planner);
}

// For shopping-list module later:
export function getPlanner() { return planner; }
