//Классы приправ
class Toppings {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }

}

class Pepper extends Toppings {
    constructor() {
        super(15, 0);
    }
}

class Mayonnaise extends Toppings {
    constructor() {
        super(20, 5);
    }
}

