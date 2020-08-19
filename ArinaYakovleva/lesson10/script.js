//Создаем и получаем элементы для нашей корзины
const basket = document.querySelector('.basket'),
    basketText = document.createElement('p'),
    buyBtn = document.querySelector('.buy'),
    products = document.querySelector('.products'),
    list = document.createElement('ul'),
    amount = document.createElement('div'),
    modal = document.querySelector('.modal'),
    close = document.querySelector('.close'),
    nextBtn = document.createElement('button'),
    orderBtn = document.querySelector('.order-btn'),
    closeOrder = document.querySelector('.close-order'),
    modalOrder = document.querySelector('.modal-order');



amount.textContent = 'Basket is empty';
amount.classList.add('total_amount');

basketText.textContent = 'Basket';
basketText.classList.add('basket-header');

list.classList.add('basket-list');

nextBtn.textContent = 'Next';
nextBtn.classList.add('next-btn');

basket.appendChild(basketText);
basket.appendChild(list);
basket.appendChild(amount);
basket.appendChild(nextBtn);

//Функция создания корзины
function createBasket(products) {
    const basketList = document.querySelector('.basket-list');
    const listItems = document.querySelectorAll('.basket-item');

    listItems.forEach((item) => item.remove());

    let amount = document.querySelector('.total_amount');
    amount.textContent = 'Baket is empty';

    for (let i = 0; i < products.items.length; i++) {
        const liItem = document.createElement('li');
        liItem.classList.add('basket-item');

        const productName = document.createElement('div');
        productName.classList.add('item-name');
        productName.insertAdjacentHTML('afterbegin', products.getItem(i));

        const productQuantity = document.createElement('div');
        productQuantity.classList.add('quantity');
        productQuantity.setAttribute('data-product', `${products.getItem(i)}`)
        productQuantity.insertAdjacentHTML('afterbegin', products.getItemQuantity(i));

        const trashIcon = document.createElement('img');
        trashIcon.src = './img/itrash_icon.png';
        trashIcon.alt = 'Delete';
        trashIcon.setAttribute('data-counter', `${i}`);
        trashIcon.classList.add('trash-icon');
        trashIcon.addEventListener('click', () => {
            products.removeItem(i);
            createBasket(products);
            addButtonsListeners();
        })

        const productPrice = document.createElement('div');
        productPrice.classList.add('item-price');
        productPrice.insertAdjacentHTML('afterbegin', `${products.getQuantityPrice(i)} ${products.getCurrency()} `);
        productPrice.setAttribute('data-product', `${products.getItem(i)}`);


        liItem.insertAdjacentElement('beforeend', productName);
        liItem.insertAdjacentHTML('beforeend', `<button class="minus-btn" data-product=${products.getItem(i)}>-</button>`);
        liItem.insertAdjacentElement('beforeend', productQuantity);
        liItem.insertAdjacentHTML('beforeend', `<button class="plus-btn" data-product=${products.getItem(i)}>+</button>`);
        liItem.insertAdjacentElement('beforeend', productPrice);
        liItem.insertAdjacentElement('beforeend', trashIcon);
        basketList.insertAdjacentElement('beforeend', liItem);
        amount.textContent = `${products.countBasketPrice()}`;
    }
}

//Функция создания форм при клике на кнопку next
const createForms = () => {
    const formsContainer = document.createElement('div');
    formsContainer.classList.add('forms-container');

    const adressHeader = document.createElement('h3');
    adressHeader.textContent = 'Adress';
    adressHeader.classList.add('adress-header');

    const adressForm = document.createElement('textarea');
    adressForm.cols = '30';
    adressForm.placeholder = 'Enter your adress';
    adressForm.classList.add('adress-form');

    const commentHeader = document.createElement('h3');
    commentHeader.textContent = 'Comment';
    commentHeader.classList.add('comment-header');

    const commentForm = document.createElement('textarea');
    commentForm.cols = '50';
    commentForm.placeholder = 'Enter a comment to your order';
    commentForm.classList.add('comment-form');

    const orderBtn = document.createElement('button');
    orderBtn.textContent = 'Order';
    orderBtn.classList.add('order-btn');
    orderBtn.addEventListener('click', createOrderModal);

    formsContainer.appendChild(adressHeader);
    formsContainer.appendChild(adressForm);
    formsContainer.appendChild(commentHeader);
    formsContainer.appendChild(commentForm);
    formsContainer.appendChild(orderBtn);

    document.querySelector('.container').appendChild(formsContainer);
}

//Функция, которая вызывается при клике на order
const createOrderModal = () => {
    modalOrder.style.display = 'block';
    const adressContent = document.querySelector('.adress-content'),
        commentContent = document.querySelector('.comment-content'),
        orderContent = document.querySelector('.order-amount'),
        adressInput = document.querySelector('.adress-form'),
        commentInput = document.querySelector('.comment-form');

    adressContent.textContent = `Your adress is: ${adressInput.value}`;
    commentContent.textContent = `Your comment is: ${commentInput.value}`;
    orderContent.textContent = amount.textContent;


}

const isUnique = (products, name) => {
    let flag = true;
    [...products.getAllItems()].forEach(item => {
        if (item === name) {
            flag = false
        }
    });
    return flag;
}

const addNewQuantity = (newQuantity, name) => {
    const quantity = document.querySelectorAll('.quantity');
    quantity.forEach((item, i) => {
        if (item.dataset.product === name) {
            const editedQuantity = +item.textContent + +newQuantity;
            item.textContent = editedQuantity;
            productsBasket.changeQuantity(name, editedQuantity);
            if (editedQuantity < 1) {
                productsBasket.removeItem(i);
                createBasket(productsBasket);
                addButtonsListeners();
            }
        }
    });
}

const editBasketAmount = (products, name) => {
    const prices = document.querySelectorAll('.item-price');
    let index = 0;
    [...products.getAllItems()].forEach((item, i) => {
        if (item === name) {
            index = i;
        }
    });

    prices.forEach((price) => {
        if (price.dataset.product === name) {
            price.textContent = `${products.getQuantityPrice(index)} ${products.currency}`;
        }
    });

    amount.textContent = `${products.countBasketPrice()}`;
}

//Слушатели событий на кнопки +/-
const addButtonsListeners = () => {
    const plusBtns = document.querySelectorAll('.plus-btn'),
        minusBtns = document.querySelectorAll('.minus-btn');

    plusBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const target = e.target;
            addNewQuantity(1, target.dataset.product);
            editBasketAmount(productsBasket, target.dataset.product);
        });
    });

    minusBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const target = e.target;
            addNewQuantity(-1, target.dataset.product);
            editBasketAmount(productsBasket, target.dataset.product);

        });
    });
}

let productsBasket = new Basket([], 'RUB', [], []);


//Добавление и удаление товара из корзины по клику с использованием делегирования
products.addEventListener('click', (e) => {
    const target = event.target,
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
        if (isUnique(productsBasket, productObj.name)) {
            productsBasket.addItem(productObj);
        } else {
            addNewQuantity(quantity, productName);
        }

        createBasket(productsBasket);
        addButtonsListeners();
    }
    else if (target.classList.value === 'image-card') { //Создаем модальное окно
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


nextBtn.addEventListener('click', () => {
    basket.style.display = 'none';
    createForms();
});


//Закрытие модального окна с информацией о заказе и возврат к корзине
closeOrder.addEventListener('click', () => {
    const formsContainer = document.querySelector('.forms-container');
    modalOrder.style.display = 'none';
    formsContainer.style.display = 'none';
    basket.style.display = 'block';
});





