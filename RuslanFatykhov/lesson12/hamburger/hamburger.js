class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.price = 0;
        this.calories = 0;
        this.toppingSpice = 0;
        this.toppingMayo = 0;
        this.toppings = this.toppingSpice + this.toppingMayo;
    };

    handlePrice() {
        switch (this.size) {
            case 'big':
                this.price += 100;
                break
            case 'small':
                this.price += 50;
                break
        }
        switch (this.stuffing) {
            case 'cheese':
                this.price += 10;
                break
            case 'salad':
                this.price += 20;
                break
            case 'potato':
                this.price += 15;
                break
        }
        if (this.toppingSpice == 1) this.price += 15;
        if (this.toppingMayo == 1) this.price += 20;
        if (this.toppings === 2) this.price += 35;

        return this.price;
    }

    handleCalories() {
        switch (this.size) {
            case 'big':
                this.calories += 40;
                break
            case 'small':
                this.calories += 20;
                break
        }
        switch (this.stuffing) {
            case 'cheese':
                this.calories += 20;
                break
            case 'salad':
                this.calories += 5;
                break
            case 'potato':
                this.calories += 10;
                break
        }

        if (this.toppingSpice == 1) this.calories += 0;
        if (this.toppingMayo == 1) this.calories += 5;
        if (this.toppings == 2) this.calories += 5;
        return this.calories;
    }

    addTopping(topping) {
        switch (topping) {
            case 'spice':
                this.toppingSpice++;
                break
            case 'mayo':
                this.toppingMayo++;
                break
        }
    };


}

document.querySelector('.button').addEventListener('click', (e) => {
    e.preventDefault();
    const sizes = document.getElementsByName('size');
    const stuffings = document.getElementsByName('stuffing');
    const mayo = document.getElementById('mayo');
    const spice = document.getElementById('spice');
    const result = document.getElementById('result');

    let sizeBurger;
    sizes.forEach(el => {
        if (el.checked) {
            sizeBurger = el.value;
        }
    });

    let stuffingBurger;
    stuffings.forEach(el => {
        if (el.checked) {
            stuffingBurger = el.value;
        }
    });

    let burger = new Hamburger(sizeBurger, stuffingBurger);

    if (mayo.checked) {
        burger.addTopping('mayo');
    }
    if (spice.checked) {
        burger.addTopping('spice');
    }

    result.innerHTML = `Стоимость: ${burger.handlePrice()}, калории: ${burger.handleCalories()}`;

})