class InitializatorDOM {
    initializeShop(catalog, basket) {
        const container = document.createElement('div');
        container.classList.add('container');

        const tabPanel = document.createElement('div');
        tabPanel.classList.add('tabPanel');

        const rootCatalogArea = document.createElement('div');
        const rootBasketArea = document.createElement('div');

        rootCatalogArea.classList.add('rootArea');
        rootBasketArea.classList.add('rootArea', 'hideClass', 'closeClass');

        const tabToggleButton = document.createElement('div');
        const tagCatalog = document.createElement('div');
        const tagBasket = document.createElement('div');

        tagCatalog.classList.add('tagArea', 'selectedArea');
        tagCatalog.innerHTML = `Каталог`;
        tagBasket.classList.add('tagArea');
        tagBasket.innerHTML = `Корзина`;
        tabToggleButton.classList.add('tabToggleButton', 'tabToggleButtonLeft');
        tabToggleButton.innerHTML = 'ТЫК';

        tabToggleButton.onmousedown = (() => {
            tabToggleButton.classList.toggle('disableBtn');


            tabToggleButton.classList.toggle('tabToggleButtonLeft');
            tabToggleButton.classList.toggle('tabToggleButtonRight');
            tagCatalog.classList.toggle('selectedArea');
            tagBasket.classList.toggle('selectedArea');

            rootCatalogArea.classList.toggle('closeClass');
            rootBasketArea.classList.toggle('closeClass');
            setTimeout(() => {
                tabToggleButton.classList.toggle('disableBtn');
            }, 2000);

            rootBasketArea.innerHTML = '';
            if (basket.items.length) {
                basket.items.forEach(prItem => {
                    rootBasketArea.append(this.createCatalogCard(prItem, basket, 'BASKET', rootBasketArea));
                });
                rootBasketArea.append(this.createBasketTotalInfo(basket));
            } else {
                const emptyLabel = document.createElement('div');
                emptyLabel.classList.add('emptyBasketLabel');
                emptyLabel.innerHTML = 'Корзина пуста';
                rootBasketArea.append(emptyLabel);
            }
            rootCatalogArea.innerHTML = '';
            catalog.productList.forEach(prItem => {
                rootCatalogArea.append(this.createCatalogCard(prItem, basket, 'CATALOG'));
            });

        });


        catalog.productList.forEach(prItem => {
            rootCatalogArea.append(this.createCatalogCard(prItem, basket, 'CATALOG'));
        });

        tabPanel.append(tagCatalog, tabToggleButton, tagBasket);
        container.append(tabPanel, rootBasketArea, rootCatalogArea);
        document.body.append(container);
    }

    createCatalogCard(productGroupItem, basket, mode, rootBasketArea) {
        const productCard = document.createElement('div');
        productCard.classList.add('productCard');
        productCard.setAttribute('data-cardname', `${productGroupItem.product.name}_${mode}`);

        const productName = document.createElement('div');
        productName.classList.add('productName');
        productName.innerHTML = productGroupItem.product.name;

        const img = document.createElement('img');
        img.setAttribute('src', 'img/lorem1.jpg');

        const productDescription = document.createElement('div');
        productDescription.classList.add('productDescription');
        productDescription.innerHTML = productGroupItem.product.description;

        const productCatalogTotal = document.createElement('div');
        productCatalogTotal.classList.add('productCatalogTotal');

        const onAmountPlus = () => {
            const productCount = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productCount`);
            const productPrice = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productPrice`);


            productCount.innerHTML = `${+productCount.innerHTML + 1}`;
            productGroupItem.amount += 1;
            productPrice.innerHTML = `${productGroupItem.countItemTotalPriceWithSale()}р`;
            if (mode === 'BASKET') {
                const totalInfoPanel = document.querySelector(`.totalInfoPanel`);
                totalInfoPanel.remove();
                rootBasketArea.append(this.createBasketTotalInfo(basket));
            }
        };
        const onAmountMinus = () => {
            const productCount = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productCount`);
            const productPrice = document.querySelector(`[data-cardname=${productGroupItem.product.name}_${mode}] .productPrice`);
            if (productCount.innerHTML !== '0') {
                productCount.innerHTML = `${+productCount.innerHTML - 1}`;
                productGroupItem.amount -= 1;
                productPrice.innerHTML = `${productGroupItem.countItemTotalPriceWithSale()}р`;
            }
            if (mode === 'BASKET') {
                if (productCount.innerHTML === '0') {
                    productCard.remove();
                    basket.removeItem(productGroupItem.product);
                }

                const totalInfoPanel = document.querySelector(`.totalInfoPanel`);
                totalInfoPanel.remove();
                rootBasketArea.append(this.createBasketTotalInfo(basket));
            }
        };

        const productCountMinus = document.createElement('div');
        productCountMinus.classList.add('productCountMinus');
        productCountMinus.innerHTML = '-';
        productCountMinus.onclick = onAmountMinus;

        const productCount = document.createElement('div');
        productCount.classList.add('productCount');
        productCount.innerHTML = productGroupItem.amount;

        const productCountPlus = document.createElement('div');
        productCountPlus.classList.add('productCountPlus');
        productCountPlus.innerHTML = '+';
        productCountPlus.onclick = onAmountPlus;

        const productPrice = document.createElement('div');
        productPrice.classList.add('productPrice');
        productPrice.innerHTML = productGroupItem.countItemTotalPriceWithSale() + '  р';

        if (mode === 'CATALOG') {
            const toBasketBtn = document.createElement('div');
            toBasketBtn.classList.add('toBasketBtn');
            toBasketBtn.innerHTML = 'В корзину';
            toBasketBtn.onclick = () => {
                if (productGroupItem.amount > 0) {
                    basket.addItem(productGroupItem.product, productGroupItem.amount, Basket.basketAddItemsModes.MERGE);
                }
            };
            productCatalogTotal.append(productCountMinus, productCount, productCountPlus, toBasketBtn, productPrice);
        }
        if (mode === 'BASKET') {
            productCatalogTotal.append(productCountMinus, productCount, productCountPlus, productPrice);
        }

        productCard.append(productName, img, productDescription, productCatalogTotal);

        return productCard;
    }

    createBasketTotalInfo(basket) {
        const totalInfoPanel = document.createElement('div');
        totalInfoPanel.classList.add('totalInfoPanel');
        totalInfoPanel.innerHTML = `В корзине<strong>&nbsp;${basket.items.length}&nbsp;</strong>товаров на сумму <strong>&nbsp;${basket.countBasketPrice()}&nbsp;</strong>рублей`;
        return totalInfoPanel;
    }
}

class Catalog {
    productList = [];

    addProductToCatalog(productItem) {
        if (!(productItem instanceof ProductGroupItem) || this.productList.map(x => x.name).includes(productItem.product.name)) {
            throw new Error('Некорректные данные');
        }
        this.productList.push(productItem);
    }

    removeProductFromCatalog(productItem) {
        if (!(productItem instanceof ProductGroupItem && productItem.map(x => x.name).includes(productItem.product.name))) {
            throw new Error('Некорректные данные');
        }
        this.productList.push(productItem);
    }
}

class Product {
    constructor(name, price, description, features) {
        if (name && price && description && features
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
        if (typeof val === 'number' && val > 0) {
            this._price = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get price() {
        return this._price;
    }

    set name(val) {
        if (typeof val === 'string') {
            this._name = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get name() {
        return this._name;
    }

    set description(val) {
        if (typeof val === 'string') {
            this._description = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get description() {
        return this._description;
    }

    set features(val) {
        if (typeof val === 'string') {
            this._features = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get features() {
        return this._features;
    }
}

class ProductGroupItem {
    static saleMode = {
        PERCENTAGE: 'PERCENTAGE',
        RUBLES: 'RUBLES',
    };

    constructor(product, initialAmount, sale, saleMode) {
        if (product && initialAmount >= 0
            && product instanceof Product
            && typeof initialAmount === 'number') {
            this._product = product;
            this._amount = initialAmount;
            if (sale && saleMode) {
                this.setSale(sale, saleMode);
            } else {
                this._sale = {
                    percentage: 0,
                    roubles: 0,
                }
            }
        } else {
            throw new Error('некорректные данные при создании элемента корзины');
        }
    }

    get product() {
        return this._product;
    }

    set product(val) {
        if (val instanceof Product) {
            this._product = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get amount() {
        return this._amount;
    }

    set amount(val) {
        if (typeof val === 'number' && val >= 0) {
            this._amount = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    convertSalePercentageToRubles(salePercentage) {
        return this.product.price * this.amount * salePercentage / 100;
    }

    convertSaleRublesToPercentage(saleRubles) {
        return saleRubles / (this.product.price * this.amount) * 100;
    }

    setSale(sale, saleMode) {
        if (sale && saleMode
            && typeof sale === 'number'
            && sale > 0
            && saleMode in ProductGroupItem.saleMode
            && !(saleMode === ProductGroupItem.saleMode.PERCENTAGE && sale > 100 || saleMode === ProductGroupItem.saleMode.RUBLES && sale > this.product.price * this.amount)
        ) {
            this._sale = {
                percentage: saleMode === ProductGroupItem.saleMode.PERCENTAGE ? sale : this.convertSaleRublesToPercentage(sale),
                roubles: saleMode === ProductGroupItem.saleMode.RUBLES ? sale : this.convertSalePercentageToRubles(sale),
            }
        } else {
            throw new Error('некорректные данные');
        }
    }

    getSale() {
        return this._sale;
    }

    countItemTotalPriceWithSale() {
        return this.product.price * this.amount * (this._sale.percentage ? (1 - this._sale.percentage / 100) : 1);
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
                && product instanceof Product)) {
                console.log('некорректные данные');
                return false;
            }
            const found = this._items.find(val => val.product === product);
            switch (mode) {
                case Basket.basketAddItemsModes.ADD_OR_RESET: {
                    if (found) {
                        found.amount = amount;
                    } else {
                        this._items.push(new ProductGroupItem(product, amount));
                    }
                    break;
                }
                case Basket.basketAddItemsModes.MERGE: {
                    if (found) {
                        found.amount += amount;
                    } else if (amount > 0) {
                        this.addItem(product, amount, Basket.basketAddItemsModes.ADD_OR_RESET);
                    }
                    break;
                }
                default:
                    console.log('Видимо, все плохо');
            }
            return true;
        } catch (e) {
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
            return this.items.reduce((acc, val) => acc + val.countItemTotalPriceWithSale(), 0);
        } catch (e) {
            console.log('Ошибка в countBasketPrice');
            return null;
        }
    };
}

const pr1 = new Product('Хачапури', 100, 'Пальчики оближешь', '100g');
const pr2 = new Product('Шашлык', 200, 'Не из собак', '100g');
const pr3 = new Product('Шаурма', 150, 'Не из кошек', '100g');

const catalog = new Catalog();
catalog.addProductToCatalog(new ProductGroupItem(pr1, 0));
catalog.addProductToCatalog(new ProductGroupItem(pr2, 0));
catalog.addProductToCatalog(new ProductGroupItem(pr3, 0));

const basket = new Basket();

const initializatorDOM = new InitializatorDOM();
initializatorDOM.initializeShop(catalog, basket);
