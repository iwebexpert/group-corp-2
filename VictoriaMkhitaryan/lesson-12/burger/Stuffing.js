// начинки 
class Stuffing {
  constructor(price, calories) {
    this.price = price;
    this.calories = calories;
  }
}

class Cheese extends Stuffing {
  constructor() {
    super(10, 20);
  }
}

class Salad extends Stuffing {
  constructor() {
    super(20, 5);
  }
}

class Potato extends Stuffing {
  constructor() {
    super(15, 10);
  }
}