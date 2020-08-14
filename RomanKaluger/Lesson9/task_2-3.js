class InitializatorDOM {
    initializeShop(catalog, basket) {
        const container = document.createElement('div');
        container.classList.add('container');

        const tabPanel = document.createElement('div');
        tabPanel.classList.add('tabPanel');

        const rootCatalogArea = document.createElement('div');
        const rootBasketArea = document.createElement('div');
        this.rootCatalogArea = rootCatalogArea;
        this.rootBasketArea = rootBasketArea;
        this.catalog = catalog;
        this.basket = basket;

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

        this.selectedPageNum = {
            'CATALOG': 1,
            'BASKET': 1,
        };
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

            const mode = tagCatalog.classList.contains('selectedArea') ? 'CATALOG' : 'BASKET';
            this.createOrUpdateItemsView(mode, this.selectedPageNum[mode]);

        });
        this.createOrUpdateItemsView('CATALOG', this.selectedPageNum['CATALOG']);

        tabPanel.append(tagCatalog, tabToggleButton, tagBasket);
        container.append(tabPanel, rootBasketArea, rootCatalogArea);
        document.body.append(container);
    }

    createCatalogCard(productGroupItem, mode) {
        const rootBasketArea = this.rootBasketArea;
        const basket = this. basket;
        const productCard = document.createElement('div');
        productCard.classList.add('productCard');
        productCard.setAttribute('data-cardname', `${productGroupItem.product.name}_${mode}`);

        const productName = document.createElement('div');
        productName.classList.add('productName');
        productName.innerHTML = productGroupItem.product.name;

        const imageCarousel = this.createImageCarousel(productGroupItem);
        imageCarousel.childNodes.item(2).onclick = () => {
            const modalPhoto = this.createModalWindowWithContent(this.createImageCarousel(productGroupItem));
            modalPhoto.openModal();
        };

        const productDescription = document.createElement('div');
        productDescription.classList.add('productDescription');
        productDescription.innerHTML = `${productGroupItem.product.description}<br><br>${productGroupItem.product.price}р`;

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
                if (basket.items.length !== 0) {
                    rootBasketArea.append(this.createBasketTotalInfo(basket));
                }
                this.createOrUpdateItemsView('BASKET',this.selectedPageNum['BASKET']);
            }
        };

        const productCountMinus = document.createElement('div');
        productCountMinus.classList.add('productCountMinus');
        productCountMinus.innerHTML = '-';
        productCountMinus.onclick = onAmountMinus;

        const productCount = document.createElement('div');
        productCount.classList.add('productCount');
        productCount.innerHTML = mode === 'CATALOG' ? '0' :productGroupItem.amount;

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
                    productCount.innerHTML = '0';
                    basket.addItem(productGroupItem.product, productGroupItem.amount, Basket.basketAddItemsModes.MERGE);
                }
            };
            productCatalogTotal.append(productCountMinus, productCount, productCountPlus, toBasketBtn, productPrice);
        }
        if (mode === 'BASKET') {
            productCatalogTotal.append(productCountMinus, productCount, productCountPlus, productPrice);
        }

        productCard.append(productName, imageCarousel, productDescription, productCatalogTotal);

        return productCard;
    }
    createImageCarousel(productGroupItem){
        const imageCarousel = document.createElement('div');
        imageCarousel.classList.add('imageCarousel');

        const imageCarouselContainer = document.createElement('div');
        imageCarouselContainer.classList.add('imageCarouselContainer');

        const imageSelectorContainer = document.createElement('div');
        imageSelectorContainer.classList.add('imageSelectorContainer');

        const slideLeft = document.createElement('div');
        slideLeft.innerHTML = '<';
        slideLeft.classList.add('slideLeft');
        const slideRight = document.createElement('div');
        slideRight.innerHTML = '>';
        slideRight.classList.add('slideRight');

        let curPhotoInx = 0;
        let lastSelected = 0;
        function checkSelectPhotoInx(){
            slideRight.classList.remove('slideBlock');
            slideLeft.classList.remove('slideBlock');
            if(curPhotoInx===0){
                slideLeft.classList.add('slideBlock');
            }
            if (productGroupItem.product.imgURLsArr.length === curPhotoInx+1){
                slideRight.classList.add('slideBlock');
            }

            imgsSelectors[lastSelected].classList.remove('imgSelectorSelected');
            imgsSelectors[curPhotoInx].classList.add('imgSelectorSelected');
            imageCarouselContainer.style.marginLeft = `${-curPhotoInx * 100}%`;
            lastSelected = curPhotoInx;
        }
        slideLeft.onclick = () => {
            curPhotoInx--;
            checkSelectPhotoInx();
        };
        slideRight.onclick = () =>{
            curPhotoInx++;
            checkSelectPhotoInx();
        };

        const imgsArr = productGroupItem.product.imgURLsArr.map(url => {
            const img = document.createElement('div');
            img.style.backgroundImage = `url(${url})`;
            img.classList.add('imageCarouselElement');

            return img;
        });
        const imgsSelectors = productGroupItem.product.imgURLsArr.map((url, inx) => {
            const imgSelector = document.createElement('div');
            imgSelector.classList.add('imgSelector');
            imgSelector.onclick =() => {
                curPhotoInx = inx;
                checkSelectPhotoInx();
            };
            return imgSelector;
        });
        checkSelectPhotoInx();

        imageSelectorContainer.append(...imgsSelectors);
        imageCarouselContainer.append(...imgsArr);
        imageCarousel.append(slideLeft, slideRight, imageCarouselContainer, imageSelectorContainer);
        return imageCarousel;
    }
    createModalWindowWithContent(content){
        const popper = document.createElement('div');
        popper.classList.add('popper');

        const modalWindow = document.createElement('div');
        modalWindow.classList.add('modalWindow');

        const modalWindowTopPanel = document.createElement('div');
        modalWindowTopPanel.classList.add('modalWindowTopPanel');

        const modalWindowBottomPanel= document.createElement('div');
        modalWindowBottomPanel.classList.add('modalWindowBottomPanel');

        const modalWindowContentContainer= document.createElement('div');
        modalWindowContentContainer.classList.add('modalWindowContentContainer');

        const OkButton= document.createElement('div');
        OkButton.classList.add('OkButton');
        OkButton.innerHTML = 'Ok';

        const exitButton= document.createElement('div');
        exitButton.classList.add('exitButton');
        exitButton.innerHTML = 'x';

        content.style.height = '90%';
        modalWindowContentContainer.append(content);
        modalWindowTopPanel.append(exitButton);
        modalWindowBottomPanel.append(OkButton);
        modalWindow.append(modalWindowTopPanel, modalWindowContentContainer, modalWindowBottomPanel);
        popper.append(modalWindow);

        const closeModal = () => {
            modalWindow.classList.remove('modalWindowOpen');
            setTimeout(() => popper.remove(), 500);
        };
        const openModal = () => {
          document.body.append(popper);
          setTimeout(() =>modalWindow.classList.add('modalWindowOpen'),0);
        };

        exitButton.onclick = closeModal;
        OkButton.onclick = closeModal;
        popper.onclick = (e) => {
            if (!e.target.closest('.modalWindow')){
                closeModal();
            }
        };

        return {
            openModal,
            closeModal,
        };
    }
    createEmptyLabel(mode){
        const emptyLabel = document.createElement('div');
        emptyLabel.classList.add('emptyBasketLabel');
        emptyLabel.innerHTML = 'Пустота';
        if (mode === 'BASKET') {
            this.rootBasketArea.append(emptyLabel);
        } else if (mode === 'CATALOG') {
            this.rootCatalogArea.append(emptyLabel);
        }
    }
    createBasketTotalInfo(basket) {
        const totalInfoPanel = document.createElement('div');
        totalInfoPanel.classList.add('totalInfoPanel');
        totalInfoPanel.innerHTML = `В корзине<strong>&nbsp;${basket.items.length}&nbsp;</strong>товаров на сумму <strong>&nbsp;${basket.countBasketPrice()}&nbsp;</strong>рублей`;
        return totalInfoPanel;
    }
    createOrUpdateItemsView(mode, selectedPageNum = 1){
        const productGroupItems = mode==='CATALOG' ? this.catalog.productList : this.basket.items;
        const paginator = document.createElement('div');
        paginator.classList.add('paginator');
        const pageCount = Math.ceil(productGroupItems.length / 3);
        if (selectedPageNum > pageCount){
            selectedPageNum = 1;
        }
        this.selectedPageNum = {
            ...this.selectedPageNum,
            [mode] : selectedPageNum
        };
        this.rootCatalogArea.innerHTML = '';
        this.rootBasketArea.innerHTML = '';
            if (!productGroupItems.length) {
                this.createEmptyLabel(mode);
                return;
            }

        const startCount = 3 * (selectedPageNum-1);
        if (mode === 'BASKET'){
            this.basket.items.slice(startCount, startCount+3).forEach(prItem => {
                this.rootBasketArea.append(this.createCatalogCard(prItem, 'BASKET'));
            });
            this.rootBasketArea.append(this.createBasketTotalInfo(this.basket));
        } else if (mode === 'CATALOG')
            this.catalog.productList.slice(startCount, startCount+3).forEach(prItem => {
                this.rootCatalogArea.append(this.createCatalogCard(prItem, 'CATALOG'));
            });

        for (let i = 0; i<pageCount; i++) {
            const pageSelector = document.createElement('div');
            pageSelector.classList.add('pageSelector');
            pageSelector.innerHTML = `${i+1}`;
            if (i === selectedPageNum-1){
                pageSelector.classList.add('pageSelectorSelected');
            }
            const buf = i;
            pageSelector.onclick = () => {
                paginator.remove();
                this.createOrUpdateItemsView(mode, buf+1)
            };
            paginator.append(pageSelector);
        }
        if (mode === 'CATALOG') {
            this.rootCatalogArea.prepend(paginator);
        } else if (mode === 'BASKET') {
            this.rootBasketArea.prepend(paginator);
        }
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
    constructor(name, price, description, features, imgURLsArr) {
        if (name && price && description && features && imgURLsArr
            && typeof name === 'string'
            && typeof description === 'string'
            && typeof features === 'string'
            && typeof price === 'number'
            && Array.isArray(imgURLsArr)
            && price > 0) {
            this._name = name;
            this._price = price;
            this._description = description;
            this._features = features;
            this._imgURLsArr = imgURLsArr.length ? imgURLsArr :['img/lorem1.jpg'];
        } else {
            throw new Error('некорректные данные при создании продукта');
        }
    }
    set imgURLsArr(val) {
        if (Array.isArray(val) && !val.find(x => !(typeof x === 'string'))) {
            this._imgURLsArr = val;
        } else {
            throw new Error('некорректные данные');
        }
    }

    get imgURLsArr() {
        return [].concat(this._imgURLsArr);
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

const pr1 = new Product('Хачапури', 100, 'Пальчики оближешь', '100g',
    ['https://static.1000.menu/img/content-v2/51/8f/43277/xachapuri-s-syrom-suluguni_1581752500_17_max.jpg',
                'https://rutxt.ru/files/12177/original/f79cb5878c.JPG'
                ]);
const pr2 = new Product('Шашлык', 200, 'Не из собак', '100g',
    ['https://www.patee.ru/r/x6/15/f9/7f/960m.jpg',
                'https://kopilka-kulinara.ru/upload/information_system_52/2/5/3/item_2537/item_2537.jpg',
                'https://www.povarenok.ru/data/cache/2016jun/25/46/1624257_55566-710x550x.jpg'
                ]);
const pr3 = new Product('Шаурма', 150, 'Не из кошек', '100g',
    ['https://static.1000.menu/img/content-v2/05/d8/21554/klassicheskaya-shaurma_1589963797_11_max.jpg',
                'https://images.cdn.inmyroom.ru/inmyroom/thumb/940x600/jpg:85/uploads/food_recipe/teaser/0b/0b0e/jpg_1000_0b0e915f-1dc7-41e9-a778-d3ac20d2e1b6.jpg?sign=7ac4ef5cd67b307374e0680358426af931bbb3bded2650d26b79b21ceeba74b5',
                'https://www.recept.ua/files/uploads/rec_img/schaurma-s-kuricey.jpg'
                ]);
const pr4 = new Product('Котяра', 1, 'Осторожно, кот', '100g',
    ['https://swan-swan.ru/sites/default/files/articles/11.jpg',
                'https://cdnmyslo.ru/BlogArticle/02/16/0216f815-4d2a-40a7-a84e-40d408f8987f_1.jpg'
    ]);

const catalog = new Catalog();
catalog.addProductToCatalog(new ProductGroupItem(pr1, 0));
catalog.addProductToCatalog(new ProductGroupItem(pr2, 0));
catalog.addProductToCatalog(new ProductGroupItem(pr3, 0));
catalog.addProductToCatalog(new ProductGroupItem(pr4, 0));

const basket = new Basket();

const initializatorDOM = new InitializatorDOM();
initializatorDOM.initializeShop(catalog, basket);
