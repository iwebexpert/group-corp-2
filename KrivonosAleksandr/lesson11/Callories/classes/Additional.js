class Additional extends HamburgerParts{
    constructor() {
        super('.additional-types');
    }

    setPriceAndCalories(){
        this.property.forEach((item, i) => {
            item.addEventListener('input', () => {
                this.price = 0;
                this.calories = 0;

                for(let i = 0; i < this.property.length; i++){
                    if(this.property[i].checked === true){
                        switch (this.property[i].id) {
                            case 'seasonings':
                                this.price += 15;
                                this.calories += 0;
                                break;
                            case 'mayonnaise':
                                this.price += 20;
                                this.calories += 5;
                                break;
                        }
                    }
                }
            });
        });
    }
}