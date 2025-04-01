import { a } from "./a.mjs";

setTimeout(() => { console.log(a); }, 0);

console.log('b-->a');

export const b = "b";