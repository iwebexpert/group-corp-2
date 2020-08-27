class Sauces {
    constructor(price, caloricContent) {
        this.price = price;
        this.caloricContent = caloricContent;
    }
}

class Mayo extends Sauces {
    constructor() {
        super(20, 5);
    }
}

class Pepper extends Sauces {
    constructor() {
        super(15, 0);
    }
}