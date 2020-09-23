class HamburgerParts{
    constructor(container, ) {
        this.price = 0;
        this.calories = 0;

        this.form = document.querySelector('form');
        this.checkboxesDiv = this.form.querySelector(container);
        this.property = this.checkboxesDiv.querySelectorAll('.checkbox');
    }

    setPriceAndCalories(){};
}