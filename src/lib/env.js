/** Environment flags and tiny DOM helpers shared by every feature. */
export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = matchMedia('(hover:hover)').matches;

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
