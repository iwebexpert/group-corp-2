class Basket {
    constructor(){
        this.basketItems = [];                                              //инициализация массива товаров
        this.sum = 0;
        this.bask =  document.querySelector('.basket');
        this.validatedInputs = 0;
    }

    //добавление товара в корзину
    addToBasket(product){
        let isInBasket = true;

        for(let i = 0; i < this.basketItems.length; i++) {
            if(product.name === this.basketItems[i].name && i !== this.basketItems.length){
                isInBasket = false;
                break;
            }
        }

        if(!isInBasket) {
            for(let k = 0; k < this.basketItems.length; k++){
                if(this.basketItems[k].name === product.name){
                    let nums = document.querySelectorAll('.basket-product--num--value');
                    nums[k].innerHTML++;
                    this.basketItems[k].num++;
                }
            }
        }
        else{
            this.basketItems.push(product);
            this.drawBasket(product);
        }
    }

    //удаление товара из корзины
    deleteFromBasket(productName, num){
        let nums = document.querySelectorAll('.basket-product--num--value');
        for(let i = 0; i < this.basketItems.length; i++){                   //проходимся по всему массиву товаров
            if(this.basketItems[i].name === productName){                  //если название товара совпадает с нпереданным названием

                this.basketItems[i].num -= num;                             //уменьшаем количество товаров в корзине

                nums[i].innerHTML--;
                if(this.basketItems[i].num <= 0){                           //если кол-во товаров в корзине <= 0
                    //this.sum = 0;
                    let productsOnPage = document.querySelectorAll('.basket-product');
                    for(let u = 0; u < this.basketItems.length; u++){
                        if(u===i){
                            productsOnPage[u].remove();
                        }
                    }
                    this.basketItems.splice(i, 1);                          //удаляем товар из массива
                    break;
                }
                break;
            }
        }
    }

    //подсчет стоимости всех товаров в корзине
    countBasketPrice() {
        let total = document.querySelector('.basket-total');
        this.sum = 0;
        if(this.basketItems.length > 0){
            for( let product in this.basketItems ){
                this.sum += this.basketItems[product].price * this.basketItems[product].num;
            }
            total.textContent = `Всего в корзине товаров на сумму: ${this.sum}`;
        }
        else{
            total.textContent = `В корзине пока нет товаров...`;
        }
    }

    //отрисовка шапки корзины
    drawHead(){
        const baskTitle = document.createElement('h2');
        baskTitle.classList.add('basket-title');
        baskTitle.textContent = 'Корзина';
        this.bask.append(baskTitle);

        const wrapper = document.createElement('div');
        wrapper.classList.add('basket-products');
        this.bask.append(wrapper);

        const total = document.createElement('div');
        total.classList.add('basket-total');
        total.textContent = 'В корзине пока нет товаров...';
        this.bask.append(total);
    }

    //отрисовка содержимого корзины
    drawBasket(product){
        let wrapper = document.querySelector('.basket-products');
        const item = document.createElement('div');
        item.classList.add('basket-product');
        wrapper.append(item);

        const image = document.createElement('img');
        image.classList.add('basket-product--img');
        image.setAttribute("alt", "product image");
        image.setAttribute("src", `${product.img.src}`);
        item.append(image);

        const content = document.createElement('div');
        content.classList.add('basket-product--content');
        item.append(content);

        const title = document.createElement('div');
        title.classList.add('basket-product--title');
        title.textContent = `${product.name}`;
        content.append(title);

        const price = document.createElement('div');
        price.classList.add('basket-product--price');
        price.innerHTML = `Цена: <span class="basket-product--price--value">${product.price}</span>`;
        content.append(price);

        const number = document.createElement('div');
        number.classList.add('basket-product--num');
        number.innerHTML = `Кол-во: <span class="basket-product--num--value">${product.num}</span>`;
        content.append(number);
    }

    //отрисовка формы заказа
    drawAdditionalBlocks(){
        const form = document.createElement('form');
        this.bask.append(form);

        const addressDiv = document.createElement('div');
        addressDiv.classList.add('address-div');
        form.appendChild(addressDiv);

        const labelForName = document.createElement('label');
        labelForName.setAttribute('for', 'name');
        labelForName.textContent = 'Введите Ваше имя:';
        addressDiv.appendChild(labelForName);

        const name = document.createElement('input');
        name.setAttribute('name', 'name');
        name.setAttribute('id', 'name');
        name.setAttribute('type', 'text');
        name.setAttribute('placeholder', 'Ваше имя');
        name.classList.add('name');
        addressDiv.appendChild(name);

        const labelForPhone = document.createElement('label');
        labelForPhone.setAttribute('for', 'phone');
        labelForPhone.textContent = 'Введите Ваш телефон:';
        addressDiv.appendChild(labelForPhone);

        const phone = document.createElement('input');
        phone.setAttribute('name', 'phone');
        phone.setAttribute('id', 'phone');
        phone.setAttribute('type', 'text');
        phone.setAttribute('placeholder', 'Ваш телефон');
        phone.classList.add('phone');
        addressDiv.appendChild(phone);

        const labelForEmail = document.createElement('label');
        labelForEmail.setAttribute('for', 'email');
        labelForEmail.textContent = 'Введите Вашу почту:';
        addressDiv.appendChild(labelForEmail);

        const email = document.createElement('input');
        email.setAttribute('name', 'email');
        email.setAttribute('id', 'email');
        email.setAttribute('type', 'text');
        email.setAttribute('placeholder', 'Ваша почта');
        email.classList.add('email');
        addressDiv.appendChild(email);

        const labelForAddress = document.createElement('label');
        labelForAddress.setAttribute('for', 'address');
        labelForAddress.textContent = 'Введите адрес доставки:';
        addressDiv.appendChild(labelForAddress);

        const address = document.createElement('input');
        address.setAttribute('name', 'address');
        address.setAttribute('id', 'address');
        address.setAttribute('type', 'text');
        address.setAttribute('placeholder', 'Ваш адрес');
        address.classList.add('address');
        addressDiv.appendChild(address);

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-div');
        form.appendChild(commentDiv);

        const labelForComment = document.createElement('label');
        labelForComment.setAttribute('for', 'comment');
        labelForComment.textContent = 'Оставьте комментарий к заказу:';
        commentDiv.appendChild(labelForComment);

        const comment = document.createElement('textarea');
        comment.setAttribute('name', 'comment');
        comment.setAttribute('id', 'comment');
        comment.setAttribute('placeholder', 'Ваш комментарий...');
        commentDiv.appendChild(comment);

        const next = document.createElement('button');
        next.classList.add('next');
        next.textContent = 'Далее';
        next.setAttribute('disabled', 'disabled');
        form.appendChild(next);

        const submit = document.createElement('button');
        submit.classList.add('submit');
        submit.textContent = 'Оформить заказ';
        form.appendChild(submit);
    }

    //***поочередно разворачивающиеся поля***
    //отображение шапки формы и поля для ввода адреса
    showAddress(){
        let form = document.querySelector('form');
        let addDiv = document.querySelector('.address-div');
        let nextBtn = document.querySelector('.next');

        if(this.basketItems.length > 0){
            form.style.display = 'block';
            addDiv.style.display = 'flex';
            nextBtn.style.display = 'inline-block'
        }
        else{
            form.style.display = 'none';
            addDiv.style.display = 'none';
            nextBtn.style.display = 'none'
        }
    }

    createMask = (e, txtInput) => {
        let matrix ='+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = txtInput.value.replace(/\D/g, '');

        if(def.length >= val.length){
            val = def;
        }

        txtInput.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if(e.type === 'blur'){
            if(txtInput.value.length === 2){
                txtInput.value = '';
            }
        }
    }

    validateInputs(selector) {
        const txtInput = document.querySelector(selector);
        let validated = false;

        let changeInputsBorders = () => {
            if(!validated){
                txtInput.style.border = '1px solid darkred';
                txtInput.setAttribute('data-valid', 'false');
            } else {
                txtInput.style.border = '1px solid blue';
                txtInput.setAttribute('data-valid', 'true');
            }
        }

        if (txtInput.name === 'name' || txtInput.name === 'address') {
            txtInput.addEventListener('keypress', function (e) {
                if (e.key.match(/[^а-яё 0-9]/ig)) {
                    e.preventDefault();
                }
            });

            (txtInput.value.length > 1) ? validated = true : validated = false;

            changeInputsBorders();
            return validated;
        }

        if (txtInput.name === 'phone'){
            txtInput.addEventListener('input', this.createMask('input', txtInput));
            txtInput.addEventListener('focus', this.createMask('focus', txtInput));
            txtInput.addEventListener('blur', this.createMask('blur', txtInput));

            (txtInput.value.length === 18) ? validated = true : validated = false;
            changeInputsBorders();
            return validated;
        }

        if(txtInput.name === 'email'){
            if(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i.test(txtInput.value)){
                validated = true;
            } else{
                validated = false;
            }

            changeInputsBorders();
            return validated;
        }
    }

    //отображение поля для комментария и кнопки оформления заказа
    showComment() {
        let addDiv = document.querySelector('.address-div');
        let inputsInAddDiv = addDiv.querySelectorAll('input');
        let commDiv = document.querySelector('.comment-div');
        let nextBtn = document.querySelector('.next');
        let submitBtn = document.querySelector('.submit');

        inputsInAddDiv.forEach((input, i) => {
            inputsInAddDiv[i].addEventListener('input', () => {
                this.validateInputs(`.${inputsInAddDiv[i].className}`);

                if (this.validateInputs('.name') &&
                    this.validateInputs('.address') &&
                    this.validateInputs('.phone') &&
                    this.validateInputs('.email')) {
                    nextBtn.removeAttribute('disabled');
                    nextBtn.addEventListener('click', (e) => {
                        e.preventDefault();

                        commDiv.style.display = 'flex';
                        submitBtn.style.display = 'inline-block';
                        nextBtn.style.display = 'none';
                    }, {once: true});
                } else {
                    nextBtn.setAttribute('disabled', 'disabled');
                    commDiv.style.display = 'none';
                    submitBtn.style.display = 'none';
                    nextBtn.style.display = 'block';
                }
            });
        });
    }
}