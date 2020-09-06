//Создаем каталог товаров с помощью класса и рендерим его
let goods = new GoodList();
goods.fetchGoods();

const basket = document.querySelector('.basket'),
    basketText = document.createElement('p'),
    buyBtn = document.querySelector('.buy'),
    products = document.querySelector('.products'),
    list = document.createElement('ul'),
    amount = document.createElement('div'),
    modal = document.querySelector('.modal'),
    close = document.querySelector('.close'),
    orderBtn = document.querySelector('.order-btn'),
    closeOrder = document.querySelector('.close-order'),
    modalOrder = document.querySelector('.modal-order'),
    names = document.querySelectorAll('.name'),
    prices = document.querySelectorAll('.price'),
    confirmOrder = document.querySelector('.create-order'),
    nextBtn = document.createElement('button');

nextBtn.textContent = 'Next';
nextBtn.classList.add('next-btn');

amount.textContent = 'Basket is empty';
amount.classList.add('total_amount');

basketText.textContent = 'Basket';
basketText.classList.add('basket-header');

list.classList.add('basket-list');

basket.appendChild(basketText);
basket.appendChild(list);
basket.appendChild(amount);
basket.appendChild(nextBtn);


let productsBasket = new Basket([], 'RUB', [], []);

//СЛУШАТЕЛИ СОБЫТИЙ
//Добавление и удаление товара из корзины по клику с использованием делегирования
products.addEventListener('click', (e) => {
    const target = event.target,
        product = target.closest('.product-card'),
        number = product.dataset.number,
        productName = document.querySelectorAll('.name')[number].textContent,
        currentImg = document.querySelectorAll('.image-card')[number];

    if (target.classList.value === 'buy') {
        amount.style.color = 'blue';
        const price = document.querySelectorAll('.price')[number].textContent,
            quantity = document.querySelectorAll('.quantity-input')[number].value;

        const productObj = {
            name: productName,
            price: parseInt(price),
            currency: 'RUB',
            quantity: quantity,
        }
        if (isUnique(productsBasket, productObj.name)) {
            productsBasket.addItem(productObj);
        } else {
            addNewQuantity(quantity, productName);
        }

        productsBasket.renderBasket();
        addButtonsListeners();
    }
    else if (target.classList.value === 'image-card') { //Создаем модальное окно
        const modalImg = document.querySelector('.modal-img');

        modalImg.src = `${currentImg.src}`;
        modal.style.display = 'block';
    }


});

//Появление форм для заполнения информации о заказе
nextBtn.addEventListener('click', () => {
    const allItems = document.querySelectorAll('.basket-item');
    if (allItems.length === 0) {
        amount.textContent = 'Choose something to continue!';
        amount.style.color = 'red';
    }
    else {
        basket.style.display = 'none';
        createForms();
    }
});

//Закрытие модального окна по клику на крестик
close.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
});

//Закрытие модального окна с информацией о заказе и возврат к корзине
closeOrder.addEventListener('click', () => {
    const formsContainer = document.querySelector('.forms-container');
    modalOrder.style.display = 'none';
    formsContainer.style.display = 'none';
    basket.style.display = 'block';
});

//Функция, которая выполняется при подтверждении заказа
confirmOrder.addEventListener('click', () => {
    alert(`Your order is complete. It's scheduled to be delivered on  ${formatDate(3)}`);
});



