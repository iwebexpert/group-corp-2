class RenderForm{
  constructor(activeBasket, activeAddress, activeComment ){
    this.activeBasket = activeBasket || true;
    this.activeAddress = activeAddress || false;
    this.activeComment = activeComment || false;
    // Все окна ранее были открыты и при возвращении к корзине, 
    // кнопки Адрес и Комментарии не будут заблокированы
    this.allOpen = false;
    this.err = ''; //ошибки ввода
  }

  init(basket){
    this.basket  = basket;
  }


  switchForm(activeBasket,activeAddress,activeComment){
    if(activeBasket  && !activeAddress  && !activeComment  ){
      if(!this.allOpen){
        // Кнопки Адрес, Комментарии заблокированы
        document.querySelector('[data-target="#collapseTwo"]').disabled = true;
        document.querySelector('[data-target="#collapseThree"]').disabled = true;

      }
      
      
    } else if(activeBasket  && activeAddress  && !activeComment ){
      
      document.querySelector('[data-target="#collapseTwo"]').disabled = false;
      const headingOne = document.querySelector('#headingOne');
      headingOne.querySelector('button');
      headingOne.classList.add('collapsed');
      headingOne.setAttribute('aria-expanded', 'false');

      const collapseOne = document.querySelector('#collapseOne');
      collapseOne.classList.toggle('show');

      const headingTwo = document.querySelector('#headingTwo');
      headingTwo.querySelector('button');
      headingTwo.classList.toggle('collapsed');
      headingTwo.setAttribute('aria-expanded', 'true');

      const collapseTwo = document.querySelector('#collapseTwo');
      collapseTwo.classList.toggle('show');

    } else if(activeBasket  && activeAddress  && activeComment ){
      this.allOpen = true;
      // Активируем кнопку Комментарий
      document.querySelector('[data-target="#collapseThree"]').disabled = false;
      const headingTwo = document.querySelector('#headingTwo');
      headingTwo.querySelector('button');
      headingTwo.classList.add('collapsed');
      headingTwo.setAttribute('aria-expanded', 'false');

      const collapseTwo = document.querySelector('#collapseTwo');
      collapseTwo.classList.toggle('show');

      const headingThree = document.querySelector('#headingThree');
      headingThree.querySelector('button');
      headingThree.classList.toggle('collapsed');
      headingThree.setAttribute('aria-expanded', 'true');

      const collapseThree = document.querySelector('#collapseThree');
      collapseThree.classList.toggle('show');
    }
  } 

  renderAddressComment(){
    // Отрисовка блока - Корзина
    document.querySelector('#basket').appendChild(this.basket.render());

    // Отрисовка блока - Контакты
    const address = document.getElementById('address');

    const inputName = document.createElement('input');
    // bootstrap
    inputName.className = 'form-control form-control-lg inputName ';

    inputName.type = 'text';
    inputName.placeholder = 'Введите свое имя';
    address.appendChild(inputName);

    const inputPhone = document.createElement('input');
    // bootstrap
    inputPhone.className = 'form-control form-control-lg inputPhone';
    inputPhone.type = 'text';
    inputPhone.placeholder = 'Введите телефон ';
    address.appendChild(inputPhone);

    const inputEmail = document.createElement('input');
    // bootstrap
    inputEmail.className = 'form-control form-control-lg inputEmail';
    inputEmail.type = 'text';
    inputEmail.placeholder = 'Введите email';
    address.appendChild(inputEmail);


    
    const input = document.createElement('input');
    // bootstrap
    input.className = 'form-control form-control-lg inputAddress';
    input.type = 'text';
    input.placeholder = 'Введите адрес доставки (Город Улица Дом)';
    address.appendChild(input);

    const addressBtn = document.createElement('button');
    addressBtn.className='btn btn-warning nextAddress';
    addressBtn.innerHTML='Далее';
    address.appendChild(addressBtn);

    // Отрисовка блока - Комментарий
    const comment = document.getElementById('comment');
    const textarea = document.createElement('textarea');
    // bootstrap
    textarea.className = 'form-control';
    textarea.placeholder = 'Ваш комментарий';
    comment.appendChild(textarea);

    const commentBtn = document.createElement('button');
    commentBtn.className='btn btn-success orderExec';
    commentBtn.innerHTML='Оформить заказ';
    comment.appendChild(commentBtn);

  }

  clear(){
    this.basket.clear();

    document.querySelector('.basket-items').innerHTML = '';
    document.querySelector('#basket').appendChild(this.basket.render());
    console.log(document.querySelectorAll('input'));
    document.querySelectorAll('input').forEach( (element) => {
      element.value = '';
    });
    document.querySelector('textarea').value = '';

  }

  openBasket(){
    const headingThree = document.querySelector('#headingThree');
    headingThree.querySelector('button');
    headingThree.classList.add('collapsed');
    headingThree.setAttribute('aria-expanded', 'false');

    const collapseThree = document.querySelector('#collapseThree');
    collapseThree.classList.toggle('show');

    const headingOne = document.querySelector('#headingOne');
    headingOne.querySelector('button');
    headingOne.classList.toggle('collapsed');
    headingOne.setAttribute('aria-expanded', 'true');

    const collapseOne = document.querySelector('#collapseOne');
    collapseOne.classList.toggle('show');

    document.querySelector('input').value = '';
    document.querySelector('textarea').value = '';

    console.log(document.querySelector('input'));

    document.querySelector('[data-target="#collapseTwo"]').disabled = true;
    document.querySelector('[data-target="#collapseThree"]').disabled = true;
  }

  showConfirm(){
    const dialog = document.querySelector('.shadowDialog');
    dialog.style.display ='block';

    const detailInfoStyle = document.querySelector('.detailInfoStyle');

    for(let i = 0; i < this.basket.length(); i++){
        const p = document.createElement('p');
        p.innerHTML = this.basket.showProduct(i);
        detailInfoStyle.appendChild(p);
    }

    const sumBasket = document.querySelector('.sumBasketInfo');
    sumBasket.innerHTML = `В корзине: ${this.basket.allQuantity()} товара на сумму 
        ${this.basket.countBasketPrice()} рублей`;


    const name = document.querySelector('.name');
    name.innerHTML = `${this.basket.name}`;

    const phone = document.querySelector('.phone');
    phone.innerHTML = `${this.basket.phone}`;

    const email = document.querySelector('.email');
    email.innerHTML = `${this.basket.email}`;

    const address = document.querySelector('.address');
    address.innerHTML = `${this.basket.address}`;
    
    const comment = document.querySelector('.commentDetailInfo');
    comment.innerHTML = `${this.basket.comment}`;
  }

  closeConfirm(){
    document.querySelector('.shadowDialog').style.display ='none';
    document.querySelector('.detailInfoStyle').innerHTML = '';
    document.querySelector('.sumBasketInfo').innerHTML = '';
    document.querySelector('.commentDetailInfo').innerHTML = '';
  }


  validContact(name, phone,email, address){
    if (!this.basket.expCheck('name', name.value)){
      name.classList.add('input-error');
      this.err += 'Поле "Имя" заполнено неверно \n';
    } else {
      name.classList.remove('input-error');
    }

    if (!this.basket.expCheck('phone', phone.value)){
      phone.classList.add('input-error');
      this.err += 'Поле "Номер телефона" заполнено неверно \n';
    } else {
      phone.classList.remove('input-error');
    } 

    if (!this.basket.expCheck('email', email.value)){
      email.classList.add('input-error');
      this.err += 'Поле "Email" заполнено неверно \n';
    } else {
      email.classList.remove('input-error');
    } 

    if (!this.basket.expCheck('address', address.value)){
      address.classList.add('input-error');
      this.err += 'Поле "Address" заполнено неверно \n';
    } else {
      address.classList.remove('input-error');
    } 

    return this.err ? false : true;
  }

  getErr(){
    return this.err;
  }

  clearErr(){
    this.err = '';
  }


}