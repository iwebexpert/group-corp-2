const root = document.getElementById('root');
const inputsWrapper = document.createElement('div');
inputsWrapper.classList.add('inputsWrapper');
const catalogContainer = document.getElementById('catalog');
const sumBasket = document.createElement('p');


function addMainBlocks() {
    // функция для добавления input на страницу 
    function createInputBlock(name, type) {
        const inputBox = document.createElement('div');
        const labelNameProduct = document.createElement('label');
        inputBox.append(labelNameProduct);
        labelNameProduct.innerText = name;
        const inputNameProduct = document.createElement('input');
        inputBox.append(inputNameProduct);
        inputNameProduct.id = name.toLowerCase();
        inputNameProduct.type = type;
        inputsWrapper.append(inputBox);
        root.prepend(inputsWrapper);
    }

    // добавление input
    createInputBlock('Name', 'text');
    createInputBlock('Price', 'text');
    createInputBlock('Currency', 'text');

    // кнопка добавления товара
    const btnSend = document.createElement('button');
    btnSend.innerText = 'Создать товар';
    inputsWrapper.append(btnSend);

    // проверка валидности
    function checkValid(item) {
        return item.name && !isNaN(item.price) && (item.currency === 'RUB' || item.currency === 'USD' || item.currency === 'EUR');
    }
    // обработчик клика создать товар
    btnSend.onclick = function () {
        let newElem = {
            name: document.getElementById('name').value,
            price: +document.getElementById('price').value,
            currency: document.getElementById('currency').value,
            count: 0
        };
        if (checkValid(newElem)) {
            addNewProduct(newElem, basketObj.catalogBox.length);
            sumBasket.innerHTML = updateQuantity();
            document.getElementById('name').value = '';
            document.getElementById('price').value = '';
            document.getElementById('currency').value = '';
        }
        else {
            alert('Что-то не так')
        }
        console.log(basketObj.catalogBox);
    }
    // визуализация каталога
    function createCatalog() {
        const headerBasket = document.createElement('h2');
        headerBasket.textContent = 'Каталог';
        catalogContainer.append(headerBasket);
        const emptyCatalog = document.createElement('p');
        emptyCatalog.id = 'emptyCatalog';
        emptyCatalog.textContent = 'Каталог пуст';
        basketObj.catalogBox.length === 0 ? catalogContainer.append(emptyCatalog) : null;
        basketObj.catalogBox.forEach((item, index) => addNewProduct(item, index));
    }
    // обновить строчку с кол-вом товаров и суммой
    function updateQuantity() {
        let str = `В корзине ${basketObj.countQuantity()} ${formWordProduct()} на сумму ${basketObj.countBasketPrice()} рублей`;
        return str;
    }
    // добавление нового продукта на экран
    function addNewProduct(product, index) {
        const clearEmptyCatalog = document.getElementById('emptyCatalog');
        clearEmptyCatalog.innerHTML = '';
        basketObj.catalogBox.push(product);
        catalogItemBox = document.createElement('div');
        catalogItemBox.classList.add('itemBasket');
        const btn = document.createElement('button');
        btn.id = index;

        btn.textContent = 'Купить';
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            createBasketItem(event.target.id);
        });
        Object.defineProperty(product, 'count', { 'enumerable': false });
        let str = '';
        for (let key in product) {
            str += `${key}: ${product[key]} <br>`;
        }
        catalogItemBox.innerHTML = str;
        catalogItemBox.append(btn);
        catalogContainer.append(catalogItemBox);
    }
    createCatalog();
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

    function createBasket() {
        const basketContainer = document.getElementById('basket');
        const basketHeader = document.createElement('h2');
        const basketInfo = document.createElement('p');
        basketInfo.id = 'basketInfo';
        const basketItemsBox = document.createElement('div');
        basketItemsBox.classList.add('basketItemsBox');
        basketHeader.textContent = 'Корзина';
        basketContainer.append(basketHeader);
        basketContainer.append(basketInfo);
        basketContainer.append(basketItemsBox);
    }
    createBasket();

    function createBasketItem(id) {
        const objToChange = basketObj.buyProduct.find(item => item.id === id);
        if (objToChange) {
            console.log('уже есть');
            objToChange.count++;
            console.log(basketObj.buyProduct);
            renderBasketItem();
            return;
        }
        else {
            const newElemBasket = basketObj.catalogBox[id];
            console.log('new', newElemBasket);
            newElemBasket.id = id;
            newElemBasket.count++;
            basketObj.buyProduct.push(newElemBasket);
            renderBasketItem();
        }
    }
    function renderBasketItem() {
        const basketContainer = document.getElementById('basket');
        const basketInfo = document.getElementById('basketInfo');
        basketInfo.textContent = updateQuantity();
        basketContainer.append(basketInfo);
        const box = document.querySelector('.basketItemsBox');
        box.innerHTML = '';
        basketObj.buyProduct.map((item) => {
            const basketItem = document.createElement('div');
            basketItem.classList.add('basketItem');
            let str = '';
            Object.defineProperty(item, 'count', { 'enumerable': true });
            Object.defineProperty(item, 'id', { 'enumerable': false });

            for (let key in item) {
                str += `${key}: ${item[key]} <br>`;
            }
            basketItem.innerHTML = str;
            box.append(basketItem);
        })

    }
}

const basketObj = {
    catalogBox: [],
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