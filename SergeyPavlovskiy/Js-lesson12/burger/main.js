class Burger {
  constructor(size, ...stuffings) {
    this.size = size;
    this.stuffings = stuffings;
  }

  addstuffing(stuffing) {
    this.stuffings.push(stuffing);
  }

  getSize() {
    return this.size;
  }

  getstuffings() {
    return this.stuffings;
  }

  calculatePrice(adds = 0) {
    let sizePrice = 0;
    let stuffingsPrice = 0;

    switch (this.size) {
      case "Small": 
        sizePrice = 50;
        break;
      case "Big":
        sizePrice = 100;
        break;
      default:
        alert("бургеры не выбраны");
        break;
    }

    for (let i = 0; i < this.stuffings.length; i++) {
      stuffingsPrice += this.stuffings[i].price;
    }
    return stuffingsPrice + +sizePrice + +adds;
  }

  calculateCalories(adds = 0) {
    let sizeCalories = 0;
    let stuffingsCalories = 0;

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

    for (let i = 0; i < this.stuffings.length; i++) {
      stuffingsCalories += this.stuffings[i].calories;
    }

    return stuffingsCalories + sizeCalories + adds; 
  }
}


//начинки
class stuffing {
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

class Cheese extends stuffing {
  constructor(name, price, calories) {
    super(name, price, calories);
  }
}

class Salad extends stuffing {
  constructor(name, price, calories) {
    super(name, price, calories);
  }
}

class Potato extends stuffing {
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


//Выбор бургера
function choosingSizeRadio() {
  let radios = document.getElementsByName('choosing-size');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
}

//выбор начинки
function choosingstuffingsCheckBoxes() {
  let checkboxes = document.getElementsByName('value-stuffings');
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
  let checkboxes = document.getElementsByName('value-seasoning');
  let checkboxesCheckedValues = []; 
  for (var index = 0; index < checkboxes.length; index++) {
    if (checkboxes[index].checked) {
      checkboxesCheckedValues.push(checkboxes[index].value);
    }
  }
  return checkboxesCheckedValues; 
}


document.getElementById("button-count").addEventListener("click", calculate);
function calculate() {
  const burger = new Burger(choosingSizeRadio());

  for (let i = 0; i < choosingstuffingsCheckBoxes().length; i++) {
    switch (choosingstuffingsCheckBoxes()[i]) {
      case "Cheese":
        burger.addstuffing(new Cheese(choosingstuffingsCheckBoxes()[i], 10, 20));
        break;
      case "Salad":
        burger.addstuffing(new Salad(choosingstuffingsCheckBoxes()[i], 20, 5));
        break;
      case "Potato":
        burger.addstuffing(new Potato(choosingstuffingsCheckBoxes()[i], 15, 5));
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

  document.getElementById("total").textContent = burger.calculatePrice(AllAddsPrice) + " рублей, " + burger.calculateCalories(AllAddsCalories) + " калорий.";
}