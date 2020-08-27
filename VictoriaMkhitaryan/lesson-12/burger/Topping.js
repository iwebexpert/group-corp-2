class Topping {
  constructor(price, colories) {
    this.price = price;
    this.calories = colories;
  }
}

class Seasoning extends Topping {
  constructor() {
    super(15, 0);
  }
}

class Mayonnaise extends Topping {
  constructor() {
    super(20, 5);
  }
}