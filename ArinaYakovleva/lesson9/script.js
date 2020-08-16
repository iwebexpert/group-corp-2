//Наш класс корзина 
class Basket {
    constructor(items, currency, prices, quantities) {
        this.items = [...items]
        this.currency = currency;
        this.prices = [...prices];
        this.quantities = [...quantities];

    }

    getAllItems() {
        this.items.map((item) => item);
    }

    getItem(index) {
        return this.items[index];
    }

    getItemPrice(index) {
        return this.prices[index];
    }

    getQuantityPrice(index) {
        return this.prices[index] * this.quantities[index];
    }

    getItemQuantity(index) {
        return this.quantities[index];
    }

    getCurrency() {
        return this.currency;
    }

    addItem(obj) {
        this.items.push(obj.name);
        this.prices.push(obj.price);
        this.quantities.push(obj.quantity);

    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.prices.splice(index, 1);
        this.quantities.splice(index, 1);

    }
    changeItem(index, value) {
        this.items[index] = value;
    }

    changePrice(index, price) {
        this.prices[index] = price;
    }

    changeQuantity(index, quantity) {
        this.quantities[index] = quantity;

    }
    countBasketPrice() {
        let resArr = [];
        for (let i = 0; i < this.prices.length; i++) {
            resArr.push(this.prices[i] * this.quantities[i]);
        }

        return resArr.reduce((a, b) => a + b);
    }

}


//Создаем и получаем элементы для нашей корзины
const basket = document.querySelector('.basket'),
    basketText = document.createElement('p'),
    buyBtn = document.querySelector('.buy'),
    products = document.querySelector('.products'),
    list = document.createElement('ul'),
    amount = document.createElement('div'),
    btnMinus = document.querySelectorAll('.minus'),
    btnPlus = document.querySelectorAll('.plus'),
    close = document.querySelector('.close'),
    modal = document.querySelector('.modal');



amount.textContent = 'Basket is empty';
amount.classList.add('total_amount');
basketText.textContent = 'Basket';
basketText.classList.add('basket-header');
list.classList.add('basket-list');

basket.appendChild(basketText);
basket.appendChild(list);
basket.appendChild(amount);


//Функция создания корзины
function createBasket(products) {
    const basketList = document.querySelector('.basket-list');
    const listItems = document.querySelectorAll('.basket-item');

    listItems.forEach(item => item.remove());

    //Массив только уникальных товаров корзины
    const uniqueItems = Array.from(new Set(products.items));


    let amount = document.querySelector('.total_amount');
    amount.innerText = 'Baket is empty';


    let arrOfItems = [];
    //Циклом создаем массив объектов, где будем хранить информацию о продуктах 
    for (let i = 0; i < uniqueItems.length; i++) {
        arrOfItems.push({ name: uniqueItems[i], price: 0, quantity: 0 });
    }
    //Проверяем, есть ли еще такие же эл-ты в products
    for (let i = 0; i < uniqueItems.length; i++) {
        for (let j = 0; j < products.items.length; j++) {
            if (uniqueItems[i] === products.items[j]) {
                arrOfItems[i].price = products.prices[j];//Если есть, то в этом объекте ставим цену
                arrOfItems[i].quantity += Number(products.quantities[j]);//и увеличиваем количество;
            }
        }
    }

    //Циклом создаем все элементы для корзины
    for (let i = 0; i < arrOfItems.length; i++) {
        const liItem = document.createElement('li');
        liItem.classList.add('basket-item');

        const productName = document.createElement('div');
        productName.classList.add('item-name');
        productName.insertAdjacentHTML('afterbegin', arrOfItems[i].name);

        const productQuantity = document.createElement('div');
        productQuantity.classList.add('quantity');
        productQuantity.insertAdjacentHTML('afterbegin', arrOfItems[i].quantity);

        const productPrice = document.createElement('div');
        productPrice.classList.add('item-price');
        productPrice.insertAdjacentHTML('afterbegin', `${arrOfItems[i].quantity * arrOfItems[i].price}${products.getCurrency()} `);

        liItem.insertAdjacentElement('beforeend', productName);
        liItem.insertAdjacentElement('beforeend', productQuantity);
        liItem.insertAdjacentElement('beforeend', productPrice);

        //Вычислить всю сумму из массива объектов
        const totalAmount = (arr) => {
            let prices = [];
            let quantities = [];
            let res = [];
            for (let i = 0; i < arr.length; i++) {
                prices.push(arr[i].price);
                quantities.push(arr[i].quantity);
            }
            for (let i = 0; i < prices.length; i++) {
                res.push(prices[i] * quantities[i]);
            }

            return res.reduce((a, b) => a + b);

        }

        basketList.insertAdjacentElement('beforeend', liItem);
        amount.textContent = `Total amount of your basket is ${totalAmount(arrOfItems)} ${products.getCurrency()} `;


    }

}

let productsBasket = new Basket([], 'RUB', [], []);

//Добавление и удаление товара из корзины по клику с использованием делегирования
products.addEventListener('click', (e) => {
    const target = e.target,
        product = target.closest('.product-card'),
        number = product.dataset.number,
        productName = document.querySelectorAll('.name')[number].textContent,
        currentImg = document.querySelectorAll('.image-card')[number];

    if (target.classList.value === 'buy') {
        const price = document.querySelectorAll('.price')[number].textContent,
            quantity = document.querySelectorAll('.quantity-input')[number].value;

        const productObj = {
            name: productName,
            price: parseInt(price),
            currency: 'RUB',
            quantity: quantity,
        }

        productsBasket.addItem(productObj);
        createBasket(productsBasket);

    } else if (target.classList.value === 'delete') {
        for (let i = 0; i < productsBasket.items.length; i++) {
            if (productsBasket.items[i] == productName) {
                productsBasket.removeItem(i);
            }
        }

        createBasket(productsBasket);

    } else if (target.classList.value === 'image-card') { //Создаем модальное окно
        const modalImg = document.querySelector('.modal-img');

        modalImg.src = `${currentImg.src}`;
        modal.style.display = 'block';
    }

});

//Закрытие модального окна по клику на крестик
close.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
});


