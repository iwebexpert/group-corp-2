class Product {
    constructor(name, price, description, features) {
        if ( name && price && description && features
            && typeof name === 'string'
            && typeof description === 'string'
            && typeof features === 'string'
            && typeof price === 'number'
            && price > 0) {
            this._name = name;
            this._price = price;
            this._description = description;
            this._features = features;
        } else {
            throw new Error('некорректные данные при создании продукта');
        }
    }
    set price(val) {
        if (typeof val === 'number' && val > 0){
            this._price = val;
        } else {
            throw new Error('некорректные данные');
        }
    }
    get price() {
        return this._price;
    }
    set name(val) {
        if (typeof val === 'string'){
            this._name = val;
        } else {
            throw new Error('некорректные данные');
        }
    }
    get name() {
        return this._name;
    }
    set description(val) {
        if (typeof val === 'string'){
            this._description = val;
        } else {
            throw new Error('некорректные данные');
        }
    }
    get description() {
        return this._description;
    }
    set features(val) {
        if (typeof val === 'string'){
            this._features = val;
        } else {
            throw new Error('некорректные данные');
        }
    }
    get features() {
        return this._features;
    }
}
class BasketItem {
    static saleMode = {
        PERCENTAGE: 'PERCENTAGE',
        RUBLES: 'RUBLES',
    };
    constructor(product, initialAmount, sale, saleMode) {
        if (product && initialAmount
            && product instanceof Product
            && typeof initialAmount === 'number') {
            this._product = product;
            this._amount = initialAmount;
            if (sale && saleMode){
                this.setSale(sale, saleMode);
            }  else {
                this._sale = {
                    percentage: 0,
                    roubles: 0,
                }
            }
        } else {
            throw new Error('некорректные данные при создании элемента корзины');
        }
    }
    get product(){
        return this._product;
    }
    set product(val){
        if (val instanceof Product){
            this._product = val;
        } else {
            throw new Error('некорректные данные');
        }
    }
    get amount(){
        return this._amount;
    }
    set amount(val){
        if (typeof val === 'number' && val > 0){
            this._amount = val;
        } else {
            throw new Error('некорректные данные');
        }
    }
    convertSalePercentageToRubles(salePercentage){
        return this.product.price * this.amount * salePercentage / 100;
    }
    convertSaleRublesToPercentage(saleRubles){
        return saleRubles / (this.product.price * this.amount) * 100;
    }
    setSale(sale, saleMode){
        if (sale && saleMode
            && typeof sale === 'number'
            && sale > 0
            && saleMode in BasketItem.saleMode
            && !(saleMode === BasketItem.saleMode.PERCENTAGE && sale > 100 || saleMode === BasketItem.saleMode.RUBLES && sale > this.product.price * this.amount)
        ){
            this._sale = {
                percentage: saleMode === BasketItem.saleMode.PERCENTAGE ? sale : this.convertSaleRublesToPercentage(sale),
                roubles: saleMode === BasketItem.saleMode.RUBLES ? sale : this.convertSalePercentageToRubles(sale),
            }
        }
        else {
            throw new Error('некорректные данные');
        }
    }
    getSale(){
        return this._sale;
    }
    countItemTotalPriceWithSale() {
        return this.product.price * this.amount * (this._sale.percentage ? (1-this._sale.percentage/100) : 1);
    }
    countItemTotalPriceWithoutSale() {
        return this.product.price * this.amount;
    }
}
class Basket {
    static basketAddItemsModes = {
        ADD_OR_RESET: 'ADD_OR_RESET',
        MERGE: 'MERGE',
    };
    _items = [];
    addItem(product, amount, mode) { // true если добавили успешно
        try {
            if (!(typeof amount === 'number'
                && mode in Basket.basketAddItemsModes
                && product instanceof  Product)){
                console.log('некорректные данные');
                return false;
            }
            const found = this._items.find(val => val.product === product);
            switch (mode) {
                case Basket.basketAddItemsModes.ADD_OR_RESET: {
                    if (found) {
                        found.amount = amount;
                    } else {
                        this._items.push(new BasketItem(product, amount));
                    }
                    break;
                }
                case Basket.basketAddItemsModes.MERGE: {
                    if (found) {
                        found.amount += amount;
                    } else if (amount>0) {
                        addItem(product, amount, Basket.basketAddItemsModes.ADD_OR_RESET);
                    }
                    break;
                }
                default: console.log('Видимо, все плохо');
            }
            return true;
        }
        catch (e) {
            console.log('Ошибка при добавлении');
            return false;
        }
    }
    removeItem(product) {
        this._items = this._items.filter(val => val.product !== product);
    }
    clearBasket() {
        this._items = [];
    }
    get items() {
        return this._items;
    }
    countBasketPrice() {
        try {
            return this.items.reduce((acc,val)=>acc+val.countItemTotalPriceWithSale(),0);
        }
        catch (e) {
            console.log('Ошибка в countBasketPrice');
            return null;
        }
    };
}
module.exports = {Product, BasketItem, Basket};

