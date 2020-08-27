class Burger {
  constructor(size) {
    this.size = size;
    this.fillers = [];
  }

  // Узнать начинку гамбургера 
  getStuffings() {
    if (cheese.checked) {
      this.fillers.push(new Cheese);
    } else if (salad.checked) {
      this.fillers.push(new Salad);
    } else if (potato.checked) {
      this.fillers.push(new Potato);
    } else if (pepper.checked) {
      this.fillers.push(new Pepper);
    } else if (mayonnaise.checked) {
      this.fillers.push(new Mayonnaise);
    }
  }

  // Узнать цену 
  calculatePrice() {
    if (this.fillers.length == 0) return 0;

    return this.fillers.map(item => 
      item.price
    ).reduce((a, b) => a + b);
  }

  // Узнать калорийность 
  calculateCalories() {
    if (this.fillers.length == 0) return 0;
    return this.fillers.map(item => 
      item.calories
    ).reduce((a, b) => a + b);
  }

  calculateTotal() {
    if (this.size === 'little') {
      console.log(`Цена бургера: ${this.calculatePrice() + 50} RUB, в нем ${this.calculateCalories() + 20} калорий`);
      result.textContent = `Цена бургера: ${this.calculatePrice() + 50} RUB, в нем ${this.calculateCalories() + 20} калорий`;
    } else if (this.size === 'big') {
      console.log(`Цена бургера: ${this.calculatePrice() + 100} RUB, в нем ${this.calculateCalories() + 40} калорий`);
      result.textContent = `Цена бургера: ${this.calculatePrice() + 100} RUB, в нем ${this.calculateCalories() + 40} калорий`;
  }
  }
}

const cheese = document.getElementById('cheese'),
    container = document.getElementsByClassName('container'),
    salad = document.getElementById('salad'),
    potato = document.getElementById('potato'),
    pepper = document.getElementById('pepper'),
    mayonnaise = document.getElementById('mayonnaise'),
    result = document.getElementsByClassName('result');