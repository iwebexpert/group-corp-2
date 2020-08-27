class Burger {
    constructor() {
        this.price = 0;
        this.calories = 0;
        this.filingCount = 0;
    }
    getPrice(){
        if (!this.filingCount){
            throw new Error('Please, add 1 filing :)');
        }
        return `Цена: ${this.price}`;
    }

    getCalories(){
        if (!this.filingCount){
            throw new Error('Please, add 1 filing :)');
        }
        return  `Калории: ${this.calories}`;
    }
}

class SmallBurger extends Burger {
    constructor() {
        super();
        this.price = 50;
        this.calories = 20;
    }
}

class BigBurger extends Burger{
    constructor() {
        super();
        this.price = 100;
        this.calories = 40;
    }
}

class Cheese extends Burger{
    constructor() {
        super();
    }

    addCheese(burger){
        burger.price += 10;
        burger.calories += 20;
        burger.filingCount ++;
    }
}

class Salad extends Burger{
    constructor() {
        super();
    }

    addSalad(burger){
        burger.price += 20;
        burger.calories += 5;
        burger.filingCount ++;
    }
}

class Potato extends Burger{
    constructor() {
        super();
    }

    addPotato(burger){
        burger.price += 15;
        burger.calories += 10;
        burger.filingCount ++;
    }
}

class Spice extends Burger{
    constructor() {
        super();
    }

    addSpice(burger){
        burger.price += 15;
        burger.filingCount ++;
    }
}

class Mayonnaise extends Burger{
    constructor() {
        super();
    }

    addMayonnaise(burger){
        burger.price += 20;
        burger.calories += 5;
        burger.filingCount ++;
    }
}

let smBurger = new SmallBurger();

let cheese = new Cheese();
let salad = new Salad();
let potato = new Potato();
let spice = new Spice();
let mayonnaise = new Mayonnaise();


cheese.addCheese(smBurger);
mayonnaise.addMayonnaise(smBurger);
console.log(smBurger.getCalories());
console.log(smBurger.getPrice());