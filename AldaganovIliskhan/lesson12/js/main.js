const bigHamburgerInput = document.querySelector("#big-burger-input");
const smallHamburgerInput = document.querySelector("#small-burger-input");
const chesee = document.querySelector("#toppings__cheese");
const salad = document.querySelector("#toppings__salad");
const potato = document.querySelector("#toppings__potato");
const mayonnaise = document.querySelector("#seasonings__mayonnaise");
const ketchup = document.querySelector("#seasonings__ketchup");
const countAll = document.querySelector(".count-all");

class Hamburger {
  constructor(size) {
    this.size = size;
    this.items = [];
    this.price = 0;
    this.calories = 0;
  }
  createHamburger() {
    if (salad.checked) {
      this.items.push(new Salad());
    }
    if (chesee.checked) {
      this.items.push(new Chesse());
    }
    if (potato.checked) {
      this.items.push(new Potato());
    }
    if (bigHamburgerInput.checked) {
      this.items.push(new BigHamburger());
    }
    if (smallHamburgerInput.checked) {
      this.items.push(new SmallHamburger());
    }
    if (ketchup.checked) {
      this.items.push(new Ketchup());
    }
    if (mayonnaise.checked) {
      this.items.push(new Mayonnaise());
    }
  }
  countPrice() {
    this.price = this.items.reduce((total, item) => (total += item.price), 0);
  }
  countCalories() {
    this.calories = this.items.reduce(
      (total, item) => (total += item.calories),
      0
    );
  }
  countAll() {
    this.countPrice();
    this.countCalories();
    this.items = [];
    countAll.textContent = `Стоимость : ${this.price} p. Калорий : ${this.calories}`;
  }
}
class BigHamburger extends Hamburger {
  constructor() {
    super("big");
    this.price = 100;
    this.calories = 40;
  }
}
class SmallHamburger extends Hamburger {
  constructor() {
    super("small");
    this.price = 50;
    this.calories = 20;
  }
}
class Stuffing {
  constructor(price, calories) {
    this.price = price;
    this.calories = calories;
  }
}
class Chesse extends Stuffing {
  constructor() {
    super(10, 20);
  }
}
class Salad extends Stuffing {
  constructor() {
    super(20, 50);
  }
}
class Potato extends Stuffing {
  constructor() {
    super(15, 10);
  }
}
class Ketchup extends Stuffing {
  constructor() {
    super(15, 0);
  }
}
class Mayonnaise extends Stuffing {
  constructor() {
    super(20, 5);
  }
}
let hamburger = new Hamburger();
const orderBtn = document.querySelector(".order-btn");
orderBtn.addEventListener("click", () => {
  hamburger.createHamburger();
  hamburger.countAll();
});
