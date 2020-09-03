const small = document.getElementById('small');
const big = document.getElementById('big');
const cheese = document.getElementById('cheese');
const salad = document.getElementById('salad');
const potato = document.getElementById('potato');
const spice = document.getElementById('spice');
const mayo = document.getElementById('mayo');
const calc = document.getElementById('result');
const check = document.querySelectorAll('input');

check.forEach((checkItem) =>
  checkItem.addEventListener(`change`, (e) => {
    e.preventDefault();
      let burger = big.checked ? new Big() : new Small();
        if (cheese.checked) {
          burger.addToppings(new Cheese);
        }
        if (salad.checked) {
          burger.addToppings(new Salad);
        }
        if (potato.checked) {
          burger.addToppings(new Potato);
        }
        if (spice.checked) {
          burger.addSauces(new Spice);
        }
        if (mayo.checked) {
          burger.addSauces(new Mayo);
        }
        burger.countPrice();
        burger.countCalories();
        burger.showTotal();
    })
);
