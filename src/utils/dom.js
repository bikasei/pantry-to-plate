// SELECT ONE element. Example: const form = $("#pantry-form")
// The (=) assigns a function to the constant $, which is an arrow function.
// (sel, root = document) means: if root isn't passed, use document.
export const $  = (sel, root = document) => root.querySelector(sel);

// SELECT MANY elements. Returns a real array with [...]
// Example: const buttons = $$(".remove", listEl)
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
