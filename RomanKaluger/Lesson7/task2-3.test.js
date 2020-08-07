const {Product, BasketItem, Basket} = require('./task2-3');

describe('Product Class ', () => {
    let product=new Product('qq', 100, 'dsds', 'dsdsd');
    test('creates properly', () => {
        expect(product).toBeDefined();
        expect(new Product('qq', 100, 'dsds', 'dsdsd')).toEqual({
            _name: 'qq',
            _price: 100,
            _description: 'dsds',
            _features: 'dsdsd',
        });
        expect(()=>{new Product('qq', '100', 'dsds', 'dsdsd')}).toThrowError();
        expect(()=>{new Product('qq', -5, 'dsds', 'dsdsd')}).toThrowError();
    });
    test('has correct setters', ()=>{

        expect(()=>{product.price = -5}).toThrowError();
        expect(()=>{product.price = '445'}).toThrowError();
        product.price = 100;
        expect(product.price).toBe(100);

        expect(()=>{product.name = []}).toThrowError();
        product.name = 'fff';
        expect(product.name).toBe('fff');

        expect(()=>{product.description = []}).toThrowError();
        product.description = 'fff';
        expect(product.description).toBe('fff');

        expect(()=>{product.features = []}).toThrowError();
        product.features = 'fff';
        expect(product.features).toBe('fff');
    });
});

describe('BasketItem Class ', () => {
    let correctProduct, errorProduct, basketItem;
    beforeEach(()=>{
        correctProduct = new Product('qq', 100, 'dsds', 'dsdsd');
        errorProduct = {name: 'qq'};
        basketItem = new BasketItem(correctProduct, 1, 10, BasketItem.saleMode.RUBLES);
    });
    test('creates properly', () => {
        expect(basketItem).toBeDefined();
        expect(basketItem).toEqual({
            _product : correctProduct,
            _amount : 1,
            _sale : {
                percentage: 10,
                roubles: 10,
            }
        });
        expect(()=>{new BasketItem(errorProduct, 1, 10, BasketItem.saleMode.RUBLES)}).toThrowError();
        expect(()=>{new BasketItem(correctProduct, 2, 50, 'PERCENTAG')}).toThrowError();
        expect(new BasketItem(correctProduct, 1)).toEqual({
            _product : correctProduct,
            _amount : 1,
            _sale : {
                percentage: 0,
                roubles: 0,
            }
        });
    });
    test('setSale function works properly', () => {
        basketItem.setSale(20, BasketItem.saleMode.PERCENTAGE);
        expect(basketItem.getSale()).toEqual({
            percentage: 20,
            roubles: 20,
        });
        expect(()=>basketItem.setSale(-20, 'fgg')).toThrowError();
        expect(()=>basketItem.setSale(120, BasketItem.saleMode.PERCENTAGE)).toThrowError();
        expect(()=>basketItem.setSale(100000020, BasketItem.saleMode.RUBLES)).toThrowError();
    });
    test('sale converters works properly', () => {
        expect(basketItem.convertSalePercentageToRubles(10)).toBe(10);
        expect(basketItem.convertSaleRublesToPercentage(10)).toBe(10);
    });
    test('has correct setters', ()=>{
        expect(()=>{basketItem.product = errorProduct}).toThrowError();
        basketItem.product = correctProduct;
        expect(basketItem.product).toEqual(correctProduct);

        expect(()=>{basketItem.amount = -5}).toThrowError();
        basketItem.amount = 10;
        expect(basketItem.amount).toBe(10);
    });
    test('countTotalPriceWithSale works properly', () => {
        basketItem.amount = 10;
        basketItem.setSale(50, BasketItem.saleMode.PERCENTAGE);
        expect(basketItem.countItemTotalPriceWithSale()).toBeCloseTo(500);
        basketItem.setSale(700, BasketItem.saleMode.RUBLES);
        expect(basketItem.countItemTotalPriceWithSale()).toBeCloseTo(300);
        expect(basketItem.countItemTotalPriceWithoutSale()).toBeCloseTo(1000);
    });
});

describe('Basket Class ', () => {
    const basket = new Basket();
    const product=new Product('qq', 100, 'dsds', 'dsdsd');

    test('add items method works correctly', () => {
        basket.addItem(product, 2, Basket.basketAddItemsModes.ADD_OR_RESET);
        expect(basket._items).toEqual([new BasketItem(product, 2)]);
        basket.addItem(product, 5, Basket.basketAddItemsModes.ADD_OR_RESET);
        expect(basket._items).toEqual([new BasketItem(product, 5)]);
        basket.addItem(product, 10, Basket.basketAddItemsModes.MERGE);
        expect(basket._items).toEqual([new BasketItem(product, 15)]);
    });
    test('removeItems method works correctly', () => {
        expect(basket.items.length).toBe(1);
        basket.removeItem(product);
        expect(basket.items.length).toBe(0);
    });
    test('clearBasket method works correctly', () => {
        basket.addItem(product, 2, Basket.basketAddItemsModes.ADD_OR_RESET);
        basket.addItem(new  Product('fss',55, 'df', 'fdf'), 2, Basket.basketAddItemsModes.ADD_OR_RESET);
        expect(basket.items.length).toBeGreaterThan(0);
        basket.clearBasket();
        expect(basket.items.length).toBe(0);
    });
    test('countBasketPrice works correctly', () => {
        basket.addItem(product, 2, Basket.basketAddItemsModes.ADD_OR_RESET);
        basket.addItem(new  Product('fss',1000, 'df', 'fdf'), 2, Basket.basketAddItemsModes.ADD_OR_RESET);
        expect(basket.countBasketPrice()).toBeCloseTo(2200);
    });
});
