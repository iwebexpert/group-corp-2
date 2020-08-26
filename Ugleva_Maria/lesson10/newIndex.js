const catalogContainer = document.getElementById('catalog');
const basketContainer = document.getElementById('basket');
const catalogItems = document.createElement('div');
catalogItems.id = 'catalog__items';
const addressContainer = document.getElementById('address');
const commentContainer = document.getElementById('comment');

const baseWithCatalogProduct = {
    catalogBox: [],
    getCatalogProduct(id) {
        return this.catalogBox.find(item => item.id === id);
    },
    setCatalogProduct(product) {
        this.catalogBox.push(product);
    },
    getAll() {
        return this.catalogBox;
    }
}

const baseWithBasketProduct = {
    basketBox: [],
    getBasketProduct(id) {
        return this.basketBox.find(item => item.id === id);
    },
    setBasketProduct(product) {
        this.basketBox.push(product);
    },
    getAll() {
        return this.basketBox;
    },
    setProps(id, name, value) {
        this.basketBox.find(item => item.id === +id)[name] = +value;
    }
}

class CatalogProduct {
    constructor(name, price, currency, count, id) {
        this.name = name
        this.price = price
        this.currency = currency
        this.count = count
        this.id = id
    }
}

//обертка для заголовка + добавление стрелочки для сворачивания
function wrapperForHeader(header, idForRollUp) {
    const wrapperHeader = document.createElement('div');
    wrapperHeader.insertAdjacentHTML('afterbegin', header);
    const btnRollUp = createRollUpElem(idForRollUp);
    wrapperHeader.append(btnRollUp);
    return wrapperHeader;
}
// отрисовка стрелочки для сворачивания блока
function createRollUpElem(id) {
    const btnForRollUp = document.createElement('div');
    btnForRollUp.classList.add('rollUp');
    btnForRollUp.addEventListener('click', () => btnForRollUpFunc(id, btnForRollUp));
    function btnForRollUpFunc(blockForRollUp) {
        const block = document.getElementById(blockForRollUp);
        block.classList.toggle('hide');
        btnForRollUp.classList.toggle('rollDown');
    }
    return btnForRollUp;
}

// закрытие предыдущего блока при нажатии "далее"
function closePreviousBlock(idPrevBlock, mainBlock) {
    const getBtn = document.querySelector(`#${mainBlock} .rollUp`);
    getBtn.classList.toggle('rollDown');
    const elemForClose = document.getElementById(idPrevBlock);
    elemForClose.classList.add('hide');
}


// общие функции для корзины и каталога
class objWithBaseFunc {
    //шаблон для кнопок увеличения/уменьшения кол-ва товаров
    createButtonsCountItem(content, listener) {
        const elem = document.createElement('button');
        elem.classList.add('btn__changeCount');
        elem.textContent = content;
        elem.addEventListener('click', listener);
        return elem;
    }
    // шаблон для контента продукта
    paintItem(product) {
        return `<div class="item__img"></div><p>Название: ${product.name}</p><p>Цена: ${product.price}</p><p>Валюта: ${product.currency}</p>`
    }


};

class Catalog extends objWithBaseFunc {
    constructor(baseCatalogProduct, baseBasketProduct) {
        super()
        this.catalogProduct = baseCatalogProduct
        this.buyProduct = baseBasketProduct
    }
    createCatalog() {
        const headerCatalog = `<h2 class="header">Каталог</h2>`;
        const headerCatalogBox = wrapperForHeader(headerCatalog, 'catalog__items');
        catalogContainer.append(headerCatalogBox);

        headerCatalogBox.insertAdjacentHTML("beforeend", '<p id="emptyCatalog">Каталог пуст</p>');
        this.catalogProduct.getAll().forEach((item) => this.addNewProduct(item));
        catalogContainer.append(catalogItems);
    }
    renderBasketItems(boxToBuy) {
        const basketInfo = document.createElement('p');
        const box = document.getElementById('basketBody');
        box.innerHTML = '';
        const btnToAddress = createBtnFurther('toAddress', createWindowAddress);
        function createWindowAddress(event) {
            event.preventDefault();
            addressContainer.style.display = 'block';
            closePreviousBlock("basketBody", 'basket');
            createAddress();
        }
        basketInfo.textContent = this.updateQuantity();
        box.append(basketInfo);
        box.append(btnToAddress);

        boxToBuy.getAll().map((item) => {
            const basketItem = document.createElement('div');
            basketItem.classList.add('basketItem');
            basketItem.id = item.id;
            basketItem.insertAdjacentHTML("afterbegin", this.paintItem(item));
            const addDelContainer = document.createElement('div');
            const input = document.createElement('input');
            input.classList.add('basketItem__input');
            input.type = 'text';
            input.value = item.count;
            // увеличить кол-во товаров в корзине
            let countBasketItemAdd = (event) => {
                event.preventDefault();
                input.value++;
                boxToBuy.setProps(basketItem.id, 'count', input.value);
                basketInfo.textContent = this.updateQuantity();
            }
            // уменьшить кол-во товаров в корзине
            let countBasketItemDel = (event) => {
                event.preventDefault();
                if (input.value > 1)
                    input.value--;
                boxToBuy.setProps(basketItem.id, 'count', input.value);
                basketInfo.textContent = this.updateQuantity();
            }
            addDelContainer.prepend(this.createButtonsCountItem('-', countBasketItemDel));
            addDelContainer.append(input);
            addDelContainer.append(this.createButtonsCountItem('+', countBasketItemAdd));
            addDelContainer.classList.add('btns__changeCount');
            // удалить элемент корзины
            let deleteItemBasket = (event) => {
                boxToBuy.getAll().splice(boxToBuy.getAll().findIndex(item => item.id === event.target.id), 1);
                console.log(boxToBuy);
                this.renderBasketItems(boxToBuy);
            }
            const btnDelete = document.createElement('button');
            btnDelete.textContent = 'Удалить';
            btnDelete.id = item.id;
            btnDelete.classList.add('btn__delete');
            btnDelete.addEventListener('click', deleteItemBasket);
            basketItem.append(addDelContainer);
            basketItem.append(btnDelete);
            box.append(basketItem);
            box.append(btnToAddress);
        });
        const btnThen = document.getElementById('toAddress');
        if (boxToBuy.getAll().length) {
            btnThen.style.display = 'block';
        }
        else {
            btnThen.style.display = 'none';
            addressContainer.style.display = 'none';
            commentContainer.style.display = 'none';
        }
    }
    // обновить строчку с кол-вом товаров и суммой
    updateQuantity() {
        let count = this.buyProduct.getAll().reduce((quantity, item) => quantity + +item.count, 0);
        let quantity = count % 100;
        let word = 'товаров';
        if (quantity >= 5 && quantity <= 20) {
            word = 'товаров';
        }
        quantity %= 10;
        if (quantity === 1) {
            word = 'товар';
        }
        if (quantity >= 2 && quantity <= 4) {
            word = 'товара';
        }
        let currency = {
            "RUB": 1,
            "USD": 72.95,
            "EUR": 86.61
        };
        let result = this.buyProduct.getAll().reduce((sum, item) => sum + item.price * currency[item.currency] * item.count, 0);
        let str = this.buyProduct.getAll().length !== 0 ? `В корзине ${count} ${word} на сумму ${result} рублей` : "Корзина пуста";
        return str;
    }

    addNewProduct = (product) => {
        const createBasketItem = (id, count) => {
            const objToChange = this.buyProduct.getBasketProduct(+id);
            if (objToChange) {
                this.buyProduct.setProps(id, 'count', count);
            }
            else {
                const newElemBasket = this.catalogProduct.getCatalogProduct(+id);
                newElemBasket.count = count;
                this.buyProduct.setBasketProduct(newElemBasket);
            }
            this.renderBasketItems(this.buyProduct);
        };
        const clearEmptyCatalog = document.getElementById('emptyCatalog');
        clearEmptyCatalog.classList.add('hide');

        const catalogItemBox = document.createElement('div');
        catalogItemBox.classList.add('itemBasket');
        function btnCatalogItem(event) {
            event.preventDefault();
            console.log(input.value);
            createBasketItem(event.target.id, +input.value);
        }
        const btnItem = document.createElement('button');
        btnItem.textContent = 'Купить';
        btnItem.id = product.id;
        btnItem.classList.add('btn__buy');
        btnItem.addEventListener('click', btnCatalogItem);
        catalogItemBox.insertAdjacentHTML("afterbegin", this.paintItem(product));

        const addDelContainer = document.createElement('div');
        addDelContainer.classList.add('btns__changeCount');
        const input = document.createElement('input');
        input.classList.add('basketItem__input');
        input.type = 'text';
        input.value = product.count;
        // увеличение кол-ва товаров
        function countBasketItemAdd(event) {
            event.preventDefault();
            input.value++;
        }
        // уменьшение кол-ва товаров
        function countBasketItemDel(event) {
            event.preventDefault();
            if (input.value > 1)
                input.value--;
        }

        addDelContainer.prepend(this.createButtonsCountItem('-', countBasketItemDel));
        addDelContainer.append(input);
        addDelContainer.append(this.createButtonsCountItem('+', countBasketItemAdd));
        catalogItemBox.append(addDelContainer);
        catalogItemBox.append(btnItem);
        catalogItems.append(catalogItemBox);
    }

}

class Basket extends objWithBaseFunc {
    constructor() {
        super()
    }
    // отображение корзины
    createBasket() {
        const headerBasket = `<h2 class="header">Корзина</h2>`;
        const headerBasketBox = wrapperForHeader(headerBasket, 'basketBody');
        basketContainer.append(headerBasketBox);

        basketContainer.insertAdjacentHTML('beforeend', '<div id = "basketBody" class="basketBody"></div>');
        const basketBody = document.getElementById('basketBody');
        basketContainer.append(basketBody);
    }

}

function createAddress() {
    addressContainer.style.display = 'block';
    addressContainer.innerHTML = '';

    const headerAddress = `<h2 class="header">Адрес доставки</h2>`;
    const headerAddressBox = wrapperForHeader(headerAddress, 'boxInputsAddress');
    addressContainer.append(headerAddressBox);

    const boxInputsAddress = document.createElement('div');
    boxInputsAddress.id = 'boxInputsAddress';
    function renderInput(label, id) {
        const inputBox = document.createElement('div');
        inputBox.classList.add('address__input');
        inputBox.insertAdjacentHTML('afterbegin', `<label for=${id}>${label}</label><input id=${id}></input>`);
        boxInputsAddress.append(inputBox);
    }
    renderInput('Страна', 'country');
    renderInput('Город', 'sity');
    renderInput('Улица', 'street');
    renderInput('Дом', 'house');
    renderInput('Квартира', 'apartment');

    const btnAddressThen = createBtnFurther('commentBtn', openCommentBlock);
    addressContainer.append(boxInputsAddress);

    btnAddressThen.style.display = 'block';
    boxInputsAddress.append(btnAddressThen);
    function openCommentBlock(event) {
        event.preventDefault();
        commentContainer.style.display = 'block';
        closePreviousBlock("boxInputsAddress", 'address');
        createComment();
    }
}

function createComment() {
    commentContainer.style.display = 'block';
    commentContainer.innerHTML = '';
    const headerComment = `<h2 class="header">Комментарий</h2>`;
    const headerCommentBox = wrapperForHeader(headerComment, 'comment__textarea');
    commentContainer.append(headerCommentBox);

    commentContainer.insertAdjacentHTML('beforeend', '<textarea id="comment__textarea" rows="10" cols="45" name="text"></textarea>');
}

function createBtnFurther(id, listener) {
    const btnFurther = document.createElement('button');
    btnFurther.textContent = 'Далее';
    btnFurther.id = id;
    btnFurther.addEventListener('click', listener);
    btnFurther.style.display = 'none';
    return btnFurther;
}

function mainFunc() {
    baseWithCatalogProduct.setCatalogProduct(new CatalogProduct('Мыло', 15, "RUB", 1, 0));
    baseWithCatalogProduct.setCatalogProduct(new CatalogProduct('Хлеб', 32, "RUB", 1, 1));
    baseWithCatalogProduct.setCatalogProduct(new CatalogProduct('Диван', 40000, "RUB", 1, 2));
    baseWithCatalogProduct.setCatalogProduct(new CatalogProduct('Карандаш', 17, "RUB", 1, 3));
    let myCatalog = new Catalog(baseWithCatalogProduct, baseWithBasketProduct);
    myCatalog.createCatalog();
    let myBasket = new Basket();
    myBasket.createBasket();
}
mainFunc();