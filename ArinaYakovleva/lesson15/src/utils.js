//Функция создания форм при клике на кнопку next
const createForms = () => {
    const formsContainer = document.createElement('div');
    formsContainer.classList.add('forms-container');

    const nameHeader = document.createElement('h3');
    nameHeader.textContent = 'Name';
    nameHeader.classList.add('name-header');

    const nameForm = document.createElement('textarea');
    nameForm.setAttribute('type', 'name');
    nameForm.placeholder = 'Name';
    nameForm.classList.add('text-input');
    nameForm.id = 'name-form';


    const phoneHeader = document.createElement('h3');
    phoneHeader.textContent = 'Phone';
    phoneHeader.classList.add('phone-header');

    const phoneForm = document.createElement('textarea');
    phoneForm.setAttribute('type', 'phone');
    phoneForm.placeholder = '+7(000)000-0000';
    phoneForm.id = 'phone-form';
    phoneForm.classList.add('text-input');


    const emailHeader = document.createElement('h3');
    emailHeader.textContent = 'Email';
    emailHeader.classList.add('email-header');

    const emailForm = document.createElement('textarea');
    emailForm.setAttribute('type', 'email');
    emailForm.placeholder = 'test@mail.com';
    emailForm.classList.add('text-input');
    emailForm.id = 'email-form';

    const adressHeader = document.createElement('h3');
    adressHeader.textContent = 'Adress';
    adressHeader.classList.add('adress-header');

    const adressForm = document.createElement('textarea');
    adressForm.setAttribute('type', 'text');
    adressForm.cols = '30';
    adressForm.placeholder = 'Enter your adress';
    adressForm.classList.add('text-input');
    adressForm.id = 'adress-form';

    const commentHeader = document.createElement('h3');
    commentHeader.textContent = 'Comment';
    commentHeader.classList.add('comment-header');

    const commentForm = document.createElement('textarea');
    commentForm.setAttribute('type', 'text');
    commentForm.cols = '50';
    commentForm.placeholder = 'Enter a comment to your order';
    commentForm.classList.add('text-input');
    commentForm.id = 'comment-form';

    const warning = document.createElement('p');
    warning.classList.add('warning');


    const orderBtn = document.createElement('button');
    orderBtn.textContent = 'Continue';
    orderBtn.classList.add('order-btn');
    orderBtn.addEventListener('click', createOrderModal);

    let forms = [phoneForm, emailForm, adressForm, commentForm];

    forms.forEach((form) => {
        form.addEventListener('change', () => {
            let formValid = new Forms([form]);
            formValid.validateForm();
        });
    });

    let formsArr = [nameHeader, nameForm, phoneHeader, phoneForm, emailHeader,
        emailForm, adressHeader, adressForm, commentHeader, commentForm, warning, orderBtn];

    for (let i = 0; i < formsArr.length; i++) {
        formsContainer.appendChild(formsArr[i]);
    }

    document.querySelector('.container').appendChild(formsContainer);
}

//Функция, которая вызывается при клике на continue
const createOrderModal = () => {
    const nameValue = document.querySelector('#name-form'),
        phoneValue = document.querySelector('#phone-form'),
        mailValue = document.querySelector('#email-form'),
        adressValue = document.querySelector('#adress-form'),
        commentValue = document.querySelector('#comment-form'),
        formsArr = [nameValue, phoneValue, mailValue, adressValue, commentValue],
        warning = document.querySelector('.warning');

    let validForms = new Forms(formsArr);

    //Если есть хотя бы одна некорректно заполненная форма
    if (!validForms.isAnyIncorrectForm()) {
        validForms.validateForm();

        warning.textContent = 'O-ops...something is wrong, check your info';
        warning.style.color = 'red';

        if (validForms.getErrors().length < validForms.forms.length && validForms.getErrors().length > 0) {
            const errors = Array.from(document.querySelectorAll('.incorrect'));
            let newForms = new Forms(errors);
            newForms.validateForm();

        }

    }

    //Если все верно, то выводим окно заказа
    else {
        formsArr.forEach((form) => {
            form.classList.remove('incorret');
            form.style.border = '2px solid blue';
        });

        warning.textContent = '';

        modalOrder.style.display = 'block';
        const adressContent = document.querySelector('.adress-content'),
            nameContent = document.querySelector('.name-content'),
            phoneContent = document.querySelector('.phone-content'),
            mailContent = document.querySelector('.mail-content'),
            commentContent = document.querySelector('.comment-content'),
            orderContent = document.querySelector('.order-amount');

        nameContent.textContent = `Your name: ${nameValue.value}`;
        phoneContent.textContent = `Your phone: ${phoneValue.value}`;
        mailContent.textContent = `Your mail: ${mailValue.value}`;
        adressContent.textContent = `Your adress is: ${adressValue.value}`;
        commentContent.textContent = `Your comment is: ${commentValue.value}`;
        orderContent.textContent = amount.textContent;

    }
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
                productsBasket.renderBasket();
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

//Форматирование даты доставки 
const formatDate = (days) => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);
    let day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate(),
        month = currentDate.getMonth() < 10 ? `0${currentDate.getMonth()}` : currentDate.getMonth();

    return `${day}:${month}:${currentDate.getFullYear()}`;
}
