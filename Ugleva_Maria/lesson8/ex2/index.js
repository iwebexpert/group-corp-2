const root = document.getElementById('root');
const inputsWrapper = document.createElement('div');
inputsWrapper.classList.add('inputsWrapper');
const basketContainer = document.getElementById('catalog');
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
    createInputBlock('Quantity', 'text');
    createInputBlock('Currency', 'text');

    // кнопка добавления товара
    const btnSend = document.createElement('button');
    btnSend.innerText = 'Add';
    inputsWrapper.append(btnSend);

    // проверка валидности
    function checkValid(item) {
        return item.name && !isNaN(item.price) && !isNaN(item.quantity) && (item.currency === 'RUB' || item.currency === 'USD' || item.currency === 'EUR');
    }
    // обработчик клика
    btnSend.onclick = function () {
        let newElem = {
            name: document.getElementById('name').value,
            price: +document.getElementById('price').value,
            quantity: +document.getElementById('quantity').value,
            currency: document.getElementById('currency').value
        };
        if (checkValid(newElem)) {
            addNewProduct(newElem);
            basketObj.basketBox.push(newElem);
            sumBasket.innerHTML = updateQuantity();
            document.getElementById('name').value = '';
            document.getElementById('price').value = '';
            document.getElementById('quantity').value = '';
            document.getElementById('currency').value = '';

        }
        else {
            alert('Что-то не так')
        }       
        console.log(basketObj.basketBox);
    }
    // визуализация корзины
    function createBasket() {
        const headerBasket = document.createElement('h2');
        headerBasket.innerText = 'Корзина';
        basketContainer.append(headerBasket);

        sumBasket.innerText = updateQuantity();
        basketContainer.append(sumBasket);
        basketObj.basketBox.forEach(item => addNewProduct(item));
    }
    // обновить строчку с кол-вом товаров и суммой
    function updateQuantity() {
        let str = `В корзине ${basketObj.countQuantity()} ${formWordProduct()} на сумму ${basketObj.countBasketPrice()} рублей`;
        return str;
    }
    // добавление нового продукта на экран
    function addNewProduct(product) {
        const basketItemBox = document.createElement('div');
        basketItemBox.classList.add('itemBasket');
        let str = ''
        for (let key in product) {
            str += `${key}: ${product[key]} <br>`;
        }
        basketItemBox.innerHTML = str;
        basketContainer.append(basketItemBox);
    }
    createBasket();
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




}

const basketObj = {
    basketBox: [
        {
            name: "Молоко",
            price: 56,
            quantity: 3,
            currency: "RUB"
        }
    ],
    countQuantity: function () {
        let res = this.basketBox.reduce((quantity, item) => quantity + +item.quantity, 0);
        return res;
    },
    countBasketPrice: function () {
        let currency = {
            "RUB": 1,
            "USD": 72.95,
            "EUR": 86.61
        };
        let result = this.basketBox.reduce((sum, item) => sum + item.price * item.quantity * currency[item.currency], 0);
        return result;
    }

}
window.onload = addMainBlocks;