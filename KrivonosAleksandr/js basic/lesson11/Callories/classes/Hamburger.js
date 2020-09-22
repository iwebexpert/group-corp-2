class Hamburger {
    constructor(price = 0, calories = 0) {
        this.price = price;
        this.calories = calories;
    }

    calculatePrice(size, filling ,additional){
        if(size instanceof Sizes && filling instanceof Filling && additional && Additional
            && size.price + filling.price + additional.price !== 0){
            this.price = size.price + filling.price + additional.price;
        }
    }
    calculateCalories(size, filling ,additional){
        if(size instanceof Sizes && filling instanceof Filling && additional && Additional
            && size.calories + filling.calories + additional.calories !== 0){
            this.calories = size.calories + filling.calories + additional.calories;
        }
    }

    getPrice(){
        return this.price;
    }
    getCalories(){
        return this.calories;
    }
}