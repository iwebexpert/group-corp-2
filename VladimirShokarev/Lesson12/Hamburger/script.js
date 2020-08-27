const button = document.querySelector('#allSum');

const miniBurg = document.querySelector('#miniBurg');
const bigBurg = document.querySelector('#bigBurg');

const cheese = document.querySelector('#cheese');
const salad = document.querySelector('#salad');
const potato = document.querySelector('#potato');

const seasoning = document.querySelector('#seasoning');
const mayonnaise = document.querySelector('#mayonnaise');

const informTable = document.querySelector('#informTable');

button.addEventListener('click', () => {
  let burger;

  if(miniBurg.checked) burger = new MiniBurger();
  else burger = new BigBurger();

  burger.addStuffing();
  burger.addAdditionally();

  informTable.textContent = `${burger.getToppings()}, ${burger.getSize()}, ${burger.calculatePrice()}, ${burger.calculateCalories()}`;
});
