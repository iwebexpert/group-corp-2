//Классы начинок
class Stuffings {
    constructor(price, calories) {
        this.price = price;
        this.calories = calories;
    }

}

class Cheese extends Stuffings {
    constructor() {
        super(10, 20);
    }
}

class Salad extends Stuffings {
    constructor() {
        super(20, 5);
    }
}

class Potato extends Stuffings {
    constructor() {
        super(15, 10);
    }
}
