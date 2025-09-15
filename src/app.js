// This file "starts" the app by initialising each feature area.
import { initPantry }  from './pantry/controller.js';
import { initPlanner } from './planner/controller.js';
import { initRecipes } from './recipes/controller.js';

// Wait for DOM to be ready (safe for when script is in <head> with type="module")
// If script is at the bottom of <body>, DOM is already ready. This is safe anyway.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}

function start() {
  initPantry();   // builds pantry UI and handlers
  initPlanner();  // draws week grid and remove handlers
  initRecipes();  // wires search box + API + add-to-day
}

