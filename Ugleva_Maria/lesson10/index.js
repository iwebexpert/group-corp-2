const root = document.getElementById('root');
const inputsWrapper = document.createElement('div');
inputsWrapper.classList.add('inputsWrapper');
const catalogContainer = document.getElementById('catalog');
const sumBasket = document.createElement('p');
const basketContainer = document.getElementById('basket');
const addressContainer = document.getElementById('address');
const commentContainer = document.getElementById('comment');
const catalogItems = document.createElement('div');
catalogItems.id = 'catalog__items';
// шаблон для контента продукта
function paintItem(product) {
    return `<div class="item__img"></div><p>Название: ${product.name}</p><p>Цена: ${product.price}</p><p>Валюта: ${product.currency}</p>`
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

function addMainBlocks() {
    // визуализация каталога
    function createCatalog() {
        const headerCatalog = `<h2 class="header">Каталог</h2>`;
        const headerCatalogBox = wrapperForHeader(headerCatalog, 'catalog__items');
        catalogContainer.append(headerCatalogBox);
        headerCatalogBox.insertAdjacentHTML("beforeend", '<p id="emptyCatalog">Каталог пуст</p>');
        basketObj.catalogBox.forEach((item) => addNewProduct(item));
        catalogContainer.append(catalogItems);
    }
    createCatalog();
    // обновить строчку с кол-вом товаров и суммой
    function updateQuantity() {
        let str = basketObj.buyProduct.length !== 0 ? `В корзине ${basketObj.countQuantity()} ${formWordProduct()} на сумму ${basketObj.countBasketPrice()} рублей` : "Корзина пуста";
        return str;
    }
    // добавление нового продукта на экран
    function addNewProduct(product) {
        const clearEmptyCatalog = document.getElementById('emptyCatalog');
        clearEmptyCatalog.classList.add('hide');

        const catalogItemBox = document.createElement('div');
        catalogItemBox.classList.add('itemBasket');
        function btnCatalogItem(event) {
            event.preventDefault();
            createBasketItem(event.target.id, +input.value);
        }
        const btnItem = document.createElement('button');
        btnItem.textContent = 'Купить';
        btnItem.id = product.id;
        btnItem.classList.add('btn__buy');
        btnItem.addEventListener('click', btnCatalogItem);
        catalogItemBox.insertAdjacentHTML("afterbegin", paintItem(product));

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

        addDelContainer.prepend(createButtonsCountItem('-', countBasketItemDel));
        addDelContainer.append(input);
        addDelContainer.append(createButtonsCountItem('+', countBasketItemAdd));
        catalogItemBox.append(addDelContainer);
        catalogItemBox.append(btnItem);
        catalogItems.append(catalogItemBox);
    }
    //шаблон для кнопок увеличения/уменьшения кол-ва товаров
    function createButtonsCountItem(content, listener) {
        const elem = document.createElement('button');
        elem.classList.add('btn__changeCount');
        elem.textContent = content;
        elem.addEventListener('click', listener);
        return elem;
    }

    // для правильной формы слова "товар"
    function formWordProduct() {
        let quantity = basketObj.countQuantity();
        quantity %= 100;
        if (quantity >= 5 && quantity <= 20) {
            return 'товаров';
        }
        quantity %= 10;
        if (quantity === 1) {
            return 'товар';
        }
        if (quantity >= 2 && quantity <= 4) {
            return 'товара';
        }
        return 'товаров';
    }

    // отображение корзины
    function createBasket() {
        const headerBasket = `<h2 class="header">Корзина</h2>`;
        const headerBasketBox = wrapperForHeader(headerBasket, 'basketBody');
        basketContainer.append(headerBasketBox);

        basketContainer.insertAdjacentHTML('beforeend', '<div id = "basketBody" class="basketBody"></div>');
        const basketBody = document.getElementById('basketBody');
        basketContainer.append(basketBody);
    }
    createBasket();
    // создаем или обновляем элемент корзины
    function createBasketItem(id, count) {
        const objToChange = basketObj.buyProduct.find(item => item.id === id);
        if (objToChange) {
            console.log('уже есть');
            objToChange.count = count;
            console.log(basketObj.buyProduct);
            renderBasketItem();
            return;
        }
        else {
            const newElemBasket = basketObj.catalogBox[id];
            console.log('new', newElemBasket);
            newElemBasket.id = id;
            newElemBasket.count = count;
            basketObj.buyProduct.push(newElemBasket);
            renderBasketItem();
        }
    }
    // рисуем элемент корзины
    function renderBasketItem() {
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
        basketInfo.textContent = updateQuantity();
        box.append(basketInfo);
        box.append(btnToAddress);

        basketObj.buyProduct.map((item) => {
            const basketItem = document.createElement('div');
            basketItem.classList.add('basketItem');
            basketItem.id = item.id;
            basketItem.insertAdjacentHTML("afterbegin", paintItem(item));
            const addDelContainer = document.createElement('div');
            const input = document.createElement('input');
            input.classList.add('basketItem__input');
            input.type = 'text';
            input.value = item.count;
            // увеличить кол-во товаров в корзине
            function countBasketItemAdd(event) {
                event.preventDefault();
                input.value++;
                basketObj.buyProduct.find(item => item.id === basketItem.id).count = input.value;
                basketInfo.textContent = updateQuantity();
            }
            // уменьшить кол-во товаров в корзине
            function countBasketItemDel(event) {
                event.preventDefault();
                if (input.value > 1)
                    input.value--;
                basketObj.buyProduct.find(item => item.id === basketItem.id).count = input.value;
                basketInfo.textContent = updateQuantity();
            }
            addDelContainer.prepend(createButtonsCountItem('-', countBasketItemDel));
            addDelContainer.append(input);
            addDelContainer.append(createButtonsCountItem('+', countBasketItemAdd));
            addDelContainer.classList.add('btns__changeCount');
            // удалить элемент корзины
            function deleteItemBasket(event) {
                basketObj.buyProduct.splice(basketObj.buyProduct.findIndex(item => item.id === event.target.id), 1);
                renderBasketItem();
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
        if (basketObj.buyProduct.length) {
            btnThen.style.display = 'block';
        }
        else {
            btnThen.style.display = 'none';
            addressContainer.style.display = 'none';
            commentContainer.style.display = 'none';
        }
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

const basketObj = {
    catalogBox: [
        {
            name: 'Мыло',
            price: 15,
            currency: "RUB",
            count: 1,
            id: 0
        },
        {
            name: 'Хлеб',
            price: 32,
            currency: "RUB",
            count: 1,
            id: 1
        },
        {
            name: 'Диван',
            price: 40000,
            currency: "RUB",
            count: 1,
            id: 2
        },
        {
            name: 'Карандаш',
            price: 17,
            currency: "RUB",
            count: 1,
            id: 3
        }
    ],
    buyProduct: [],
    countQuantity: function () {
        let res = this.buyProduct.reduce((quantity, item) => quantity + +item.count, 0);
        return res;
    },
    countBasketPrice: function () {
        let currency = {
            "RUB": 1,
            "USD": 72.95,
            "EUR": 86.61
        };
        let result = this.buyProduct.reduce((sum, item) => sum + item.price * currency[item.currency] * item.count, 0);
        return result;
    }

}
window.onload = addMainBlocks;