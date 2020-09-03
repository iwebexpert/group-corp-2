
class Sauces {
    constructor(price, caloric) {
        this.price = price;
        this.caloric = caloric;
    }
}

class Mayo extends Sauces {
    constructor() {
        super(20, 5);
    }
}

class Spice extends Sauces {
    constructor() {
        super(15, 0);
    }
}
