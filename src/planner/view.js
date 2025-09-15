import { $ } from '../utils/dom.js';
import { DAYS } from './storage.js';

const plannerBox = $('#week');

export function renderPlanner(planner) {
  plannerBox.innerHTML = '';
  DAYS.forEach(day => {
    const dayBox = document.createElement('div');
    dayBox.className = 'day';
    dayBox.innerHTML = `<h3>${day}</h3><ul></ul>`;
    const ul = dayBox.querySelector('ul');

    (planner[day] || []).forEach((rec, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${rec.title}</span>
        <button class="remove" data-day="${day}" data-index="${index}"
                aria-label="Remove ${rec.title} from ${day}">×</button>
      `;
      ul.appendChild(li);
    });

    plannerBox.appendChild(dayBox);
  });
}