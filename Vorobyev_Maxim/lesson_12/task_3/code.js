//бургер
class Humburger {
  constructor(size, ...toppings) {
    this.size = size;
    this.toppings = toppings;
  }

  addTopping(topping) {
    this.toppings.push(topping);
  }

  getSize() {
    return this.size;
  }

  getToppings() {
    return this.toppings;
  }

  calculatePrice(adds = 0) {
    let sizePrice = 0;
    let toppingsPrice = 0;

    switch (this.size) {
      case "Small": 
        sizePrice = 50;
        break;
      case "Big":
        sizePrice = 100;
        break;
      default:
        alert("Вы не выбрали размер бургера");
        break;
    }

    for (let i = 0; i < this.toppings.length; i++) {
      toppingsPrice += this.toppings[i].price;
    }
    return toppingsPrice + +sizePrice + +adds;
  }

  calculateCalories(adds = 0) {
    let sizeCalories = 0;
    let toppingsCalories = 0;

    switch (this.size) {
      case "Small": 
        sizeCalories = 20;
        break;
      case "Big":
        sizeCalories = 40;
        break;
      default:
        break;
    }

    for (let i = 0; i < this.toppings.length; i++) {
      toppingsCalories += this.toppings[i].calories;
    }

    return toppingsCalories + +sizeCalories + +adds;
  }
}


//начинки
class Topping {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getCalories() {
    return this.calories;
  }
}

class Cheese extends Topping {
  constructor(name, price, calories) {
    super(name, price, calories);
  }
}

class Salad extends Topping {
  constructor(name, price, calories) {
    super(name, price, calories);
  }
}

class Potato extends Topping {
  constructor(name, price, calories) {
    super(name, price, calories);
  }
}


//дополпнительно
class Additionally {
  constructor(name, price, calories) {
    this.name = name;
    this.price = price;
    this.calories = calories;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getCalories() {
    return this.calories;
  }
}

class Seasoning extends Additionally {
  constructor(name, price, calories) {
    super(name, price, calories);
  }
}

class Mayonnaise extends Additionally {
  constructor(name, price, calories) {
    super(name, price, calories);
  } 
}


//какой размер выбран
function choosingSizeRadio() {
  let radios = document.getElementsByName('choosing__size');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
}

//выбор начинки
function choosingToppingsCheckBoxes() {
  let checkboxes = document.getElementsByName('choosing__toppings');
  let checkboxesCheckedValues = []; 
  for (var index = 0; index < checkboxes.length; index++) {
    if (checkboxes[index].checked) {
      checkboxesCheckedValues.push(checkboxes[index].value);
    }
  }
  return checkboxesCheckedValues; 
}

//выбор добавок
function choosingAdditionallyCheckBoxes() {
  let checkboxes = document.getElementsByName('choosing__seasoning');
  let checkboxesCheckedValues = []; 
  for (var index = 0; index < checkboxes.length; index++) {
    if (checkboxes[index].checked) {
      checkboxesCheckedValues.push(checkboxes[index].value);
    }
  }
  return checkboxesCheckedValues; 
}


document.getElementById("result__button").addEventListener("click", calculate);
function calculate() {
  const burger = new Humburger(choosingSizeRadio());

  for (let i = 0; i < choosingToppingsCheckBoxes().length; i++) {
    switch (choosingToppingsCheckBoxes()[i]) {
      case "Cheese":
        burger.addTopping(new Cheese(choosingToppingsCheckBoxes()[i], 10, 20));
        break;
      case "Salad":
        burger.addTopping(new Salad(choosingToppingsCheckBoxes()[i], 20, 5));
        break;
      case "Potato":
        burger.addTopping(new Potato(choosingToppingsCheckBoxes()[i], 15, 5));
        break;
      default:
        break;
    }  
  }

  let seasoning = new Seasoning();
  let mayonnaise = new Mayonnaise();
  let AllAddsPrice = 0;
  let AllAddsCalories = 0;
  for (let i = 0; i < choosingAdditionallyCheckBoxes().length; i++) {
    switch (choosingAdditionallyCheckBoxes()[i]) {
      case "Seasoning":
        seasoning = new Seasoning(choosingAdditionallyCheckBoxes()[i], 15, 0);
        AllAddsPrice += seasoning.price;
        AllAddsCalories += seasoning.calories;
        break;
      case "Mayonnaise":
        mayonnaise = new Mayonnaise(choosingAdditionallyCheckBoxes()[i], 20, 5);
        AllAddsPrice += mayonnaise.price; 
        AllAddsCalories += mayonnaise.calories;
        break;
      default:
        break;
    }
  }
  
  document.getElementById("result__text").textContent = burger.calculatePrice(AllAddsPrice) + " рублей, " + burger.calculateCalories(AllAddsCalories) + " калорий.";
}
