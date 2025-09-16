// utils/dom.js
// Named exports (import { $, $$ } from './utils/dom.js')
export const $  = (sel, root = document) => root.querySelector(sel);     // select first match
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)]; // select all matches
