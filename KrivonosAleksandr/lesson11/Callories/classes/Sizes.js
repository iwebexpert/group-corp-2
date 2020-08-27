class Sizes extends HamburgerParts{
    constructor() {
        super('.sizes-container');
    }

    setPriceAndCalories(){
        this.property[0].checked = true;
        this.price = 50;
        this.calories = 20;

        this.property.forEach((item, i) => {
            item.addEventListener('input', () => {
                if (item.id === 'small') {
                    this.price = 50;
                    this.calories = 20;
                }
                else if (item.id === 'big'){
                    this.price = 100;
                    this.calories = 40;
                }
            });
        });
    }
}