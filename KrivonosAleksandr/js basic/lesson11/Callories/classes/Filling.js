class Filling extends HamburgerParts{
    constructor() {
        super('.filling-types');
    }

    setPriceAndCalories(){
        this.property[0].checked = true;
        this.price = 10;
        this.calories = 20;

        this.property.forEach((item, i) => {
            item.addEventListener('input', () => {
                this.price = 0;
                this.calories = 0;

                for(let i = 0; i < this.property.length; i++){
                    if(this.property[i].checked === true){
                        switch (this.property[i].id) {
                            case 'cheese':
                                this.price += 10;
                                this.calories += 20;
                                break;
                            case 'salad':
                                this.price += 20;
                                this.calories += 5;
                                break;
                            case 'potato':
                                this.price += 15;
                                this.calories += 10;
                                break;
                        }
                    }
                }
            });
        });
    }
}