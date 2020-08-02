//task 3
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min + 1);
  return Math.round(rand);
}

let a = randomInteger(-100, 100);
let b = randomInteger(-100, 100);
console.log(`a = ${a}\nb = ${b}`);

if (a >= 0 && b >= 0) {
  console.log(`a - b = ${a - b}`);
}

if (a < 0 && b < 0) {
  console.log(`a * b = ${a * b}`);
}

if (a * b < 0) {
  console.log(`a + b = ${a + b}`);
}