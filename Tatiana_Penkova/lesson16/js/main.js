const container = document.querySelector('.container');
const catalog = document.getElementById('catalog');
const nextBtn = document.querySelector('.next');
const backBtn = document.querySelector('.back');
const backBtnToAdress = document.querySelector('.back__adress');
const adress = document.querySelector('.adress');
const commentSection = document.querySelector('.comment-section');
const done = document.querySelector('.done');
const backToShop = document.querySelector('.back__catalog');
const emptyBasket = document.querySelector('.error-empty');
const basketContainer = document.querySelector('.basket');
const itemName = document.querySelector('.item-name');
const errorName = document.querySelector('.error-name');
const itemCount = document.querySelector('.item-count');
const errorCount = document.querySelector('.error-count');
const addBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const basket = document.querySelector('.basket');

const cardItems = [];
let product = [];

class GoodsList {
  constructor(rest) {
    this.rest = [];
  }

  getValue() {
    const selectValue = itemCount.value;
    return selectValue;
  }

  hideNextButton() {
    nextBtn.style.display = 'none';
  }

  showNextButton() {
    nextBtn.style.display = 'block';
  }

  hideBasketTotal() {
    const basketText = document.querySelector('.basket-text');
    basketText.style.display = 'none';
  }

  hideBlockEmptyBasket() {
    emptyBasket.style.display = 'none';
  }

  showBlockEmptyBasket() {
    emptyBasket.style.display = 'block';
  }

  checkBasketItems(arr) {
    for (let i = 0; i < product.length; i++) {
      if (arr.name === product[i].name) {
        this.patchBasketItems(product[i]);
        return;
      }
    }
    this.postBasketItems(arr);
  }

  async patchBasketItems(product) {
    const data = await fetch(`/basket/${product.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ count: +product.count + +itemCount.value }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    console.log(data);
  }

  async postBasketItems(arr) {
    const data = await fetch('/basket', {
      method: 'POST',
      body: JSON.stringify(arr),
      headers: {
        'Content-type': 'application/json',
      },
    });

    console.log(data);
  }

  changeImage(name) {
    const modalTitle = document.querySelector('#exampleModalLabel');
    const carouselItems = document.querySelector('.carousel-inner');

    if (name === 'Трусы') {
      modalTitle.textContent = 'Трусы';
      carouselItems.innerHTML = `<div class="carousel-item active">
      <img src="./css/img/pants-1.png" class="d-block w-100" alt="pants">
      </div>
      <div class="carousel-item">
      <img src="./css/img/pants-2.png" class="d-block w-100" alt="pants">
      </div>
      <div class="carousel-item">
      <img src="./css/img/pants-3.png" class="d-block w-100" alt="pants">
       </div>`;
    }
    if (name === 'Полотенце') {
      modalTitle.textContent = 'Полотенце';
      carouselItems.innerHTML = `<div class="carousel-item active">
      <img src="./css/img/towel-1.jpg" class="d-block w-100" alt="towel">
      </div>
      <div class="carousel-item">
      <img src="./css/img/towel-2.jpg" class="d-block w-100" alt="towel">
      </div>
      <div class="carousel-item">
      <img src="./css/img/towel-3.jpg" class="d-block w-100" alt="towel">
       </div>`;
    }
    if (name === 'Носки') {
      modalTitle.textContent = 'Носки';
      carouselItems.innerHTML = `<div class="carousel-inner">
      <div class="carousel-item active">
      <img src="./css/img/socks-1.png" class="d-block w-100" alt="socks">
      </div>
      <div class="carousel-item">
      <img src="./css/img/socks-2.png" class="d-block w-100" alt="socks">
      </div>
      <div class="carousel-item">
      <img src="./css/img/socks-3.png" class="d-block w-100" alt="socks">
       </div>`;
    }
  }

  makeGETRequest(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status !== 200) {
            reject(xhr.status);
          }
          const goods = JSON.parse(xhr.responseText);
          resolve(goods);
        }
      };
      xhr.send();
    });
  }

  renderOptions() {
    basketArray.makeGETRequest('/goods').then((goods) => {
      goods.forEach((goods) => {
        const cardOptoin = document.createElement('option');
        cardOptoin.textContent = `${goods.name}`;
        itemName.appendChild(cardOptoin);
        cardItems.push(goods);
      });
    },
      (status) => {
        console.log('Error', 'Status code:', status);
      });
  }

  async deleteFromData(product) {
    const data = await fetch(`/basket/${product.id}`, {
      method: 'DELETE',
    });

    console.log(data);
    this.getBasket();
  }

  async deleteAll() {
    for (let i = 0; i < product.length; i++) {
      const data = await fetch(`/basket/${product[i].id}`, {
        method: 'DELETE',
      });

      console.log(data);
    }
    this.getBasket();
  }

  deleteItem() {
    const deleteBtn = document.querySelectorAll('.delete-btn');
    const basketItems = document.querySelectorAll('.top-item');

    if (event.target.className != 'delete-btn') return;
    const toDelete = event.target.closest('.top-item');
    toDelete.remove();

    for (let i = 0; i < deleteBtn.length; i++) {
      if (event.target == deleteBtn[i]) {
        this.deleteFromData(product[i]);
      }
    }

    if (basketItems.length == 1) {
      this.showBlockEmptyBasket();
      this.hideNextButton();
      this.hideBasketTotal();
    }
  }

  clearBasket() {
    const items = document.querySelectorAll('.top-item');

    for (let i = 0; i < items.length; i++) {
      items[i].remove();
    }
  }

  async getBasket() {
    this.clearBasket();
    const response = await fetch('/basket');
    product = await response.json();
    this.showTotalBasket(product);
    this.showBasket(product);

  }

  showBasket(product) {
    if (product.length === 0) {
      this.showBlockEmptyBasket();
      this.hideNextButton();
      this.hideBasketTotal();
      return;
    }
    for (let i = 0; i < product.length; i++) {
      const item = document.createElement('div');
      item.classList.add('top-item');
      item.textContent = `Имя товара: ${product[i].name}, количество товара: ${product[i].count}, цена товара: ${product[i].price}`;
      catalog.appendChild(item);
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.textContent = 'Удалить товар';
      item.appendChild(deleteBtn);
    }
    emptyBasket.style.display = 'none';
    this.showNextButton();
    nextBtn.classList.add('btn');
  }

  showTotalBasket(arr) {
    let totalCount = 0;
    let totalPrice = 0;
    for (let i = 0; i < arr.length; i++) {
      totalPrice += arr[i].price * arr[i].count;
      totalCount += +arr[i].count;
    }

    const basketText = document.createElement('div');
    basketText.textContent = `В корзине ${totalCount} товаров на сумму ${totalPrice} рублей`;
    basketText.classList.add('basket-text');
    basket.insertAdjacentElement('afterend', basketText);
    this.deleteDouble();
  }

  deleteDouble() {
    const card = document.querySelectorAll('.basket-text');
    if (card.length > 1) {
      card[1].remove();
    }
  }
}

class Product extends GoodsList {
  constructor(name, price) {
    super();
    this.name = name;
    this.price = price;
    this.count = itemCount.value;
  }
}

const basketArray = new GoodsList();
const basketArr = basketArray.rest;

// Добавление слушателей

document.addEventListener('DOMContentLoaded', () => {
  basketArray.renderOptions();
  basketArray.getBasket();
});

catalog.addEventListener('click', (e) => {
  basketArray.deleteItem();
});

addBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  if (itemName.value === '') {
    errorName.textContent = 'Выберите товар';
  } else {
    errorName.textContent = '';
  }
  if (itemCount.value === '') {
    errorCount.textContent = 'Выберите количество товара';
  } else {
    errorCount.textContent = '';
  }

  basketArray.getValue(itemCount);
  const cardSelected = cardItems.find((item) => item.name == itemName.value);
  cardSelected.count = itemCount.value;

  basketArray.hideBlockEmptyBasket();

  basketArray.checkBasketItems(cardSelected);
  basketArray.getBasket();

  basketArray.showNextButton();
  nextBtn.classList.add('btn');
});

itemName.addEventListener('change', (e) => {
  basketArray.changeImage(itemName.value);
});

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  basketArray.showBlockEmptyBasket();
  basketArray.hideBasketTotal();
  itemName.value = 'Носки';
  itemCount.value = '1';

  basketArray.deleteAll();
});

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const basket = document.querySelector('.basket');
  const itemImage = document.querySelector('.item-image');
  basket.style.display = 'none';
  itemImage.style.display = 'none';
  catalog.style.display = 'none';
  adress.style.display = 'block';
  basketArray.hideNextButton();
  basketArray.hideBasketTotal();

  commentBtn.classList.add('btn');
});

const commentBtns = document.querySelectorAll('.btn-primary');
const commentBtn = commentBtns[0];

const form1 = document.getElementById('validationDefault01');
const form2 = document.getElementById('validationDefault02');
const form3 = document.getElementById('validationDefault03');
const form5 = document.getElementById('validationDefault05');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

commentBtn.addEventListener('click', (e) => {
  const regExpEmail = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2,6})$/i;
  const testEmail = regExpEmail.test(email.value);
  const regExpName = /^[A-Za-zА-Яа-яЁё]{3,}$/u;
  const testName = regExpName.test(form1.value);
  const testLastName = regExpName.test(form2.value);
  const regExpIndex = /^\d{6}$/;
  const testIndex = regExpIndex.test(form5.value);
  const regExpPhone = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{4})$/;
  const testPhone = regExpPhone.test(phone.value);
  const regExpAdress = /[А-Яа-я\-]{2,}[\,\s]*[ул|пер|пр|б-р]*[\.\s]*[А-Яа-я\-]{2,}[\,\s]*[д\.]*\s*\d{1,3}[\\\d{1,3}]*[\,\s\-]*[кв\.]*\s*\d{1,3}\s*/;
  const testAdress = regExpAdress.test(form3.value);

  if (!testIndex) {
    const errorIndex = document.createElement('div');
    errorIndex.textContent = 'Введите правильный индекс';
    errorIndex.classList.add('invalid-feedback', 'index');

    errorIndex.style.display = 'block';
    const errors = document.querySelectorAll('.index');

    if (errors.length < 1) {
      form5.insertAdjacentElement('afterend', errorIndex);
    }

    form5.value = '';
  }

  if (!testAdress) {
    const errorAdress = document.createElement('div');
    errorAdress.textContent = 'Введите Ваш адрес';
    errorAdress.classList.add('invalid-feedback', 'adress');

    errorAdress.style.display = 'block';
    const errors = document.querySelectorAll('.adress');

    if (errors.length < 2) {
      form3.insertAdjacentElement('afterend', errorAdress);
    }

    form3.value = '';
  }

  if (!testPhone) {
    const errorPhone = document.createElement('div');
    errorPhone.textContent = 'Введите Ваш телефон в формате +7(ХХХ)ХХХ-ХХХХ';
    errorPhone.classList.add('invalid-feedback', 'phone');

    errorPhone.style.display = 'block';
    const errors = document.querySelectorAll('.phone');

    if (errors.length < 1) {
      phone.insertAdjacentElement('afterend', errorPhone);
    }

    phone.value = '';
  }

  if (!testLastName) {
    const errorLastName = document.createElement('div');
    errorLastName.textContent = 'Введите Вашу фамилию';
    errorLastName.classList.add('invalid-feedback', 'last-name');

    errorLastName.style.display = 'block';
    const errors = document.querySelectorAll('.last-name');

    if (errors.length < 1) {
      form2.insertAdjacentElement('afterend', errorLastName);
    }

    form2.value = '';
  }

  if (!testName) {
    const errorName = document.createElement('div');
    errorName.textContent = 'Введите Ваше имя';
    errorName.classList.add('invalid-feedback', 'name');

    errorName.style.display = 'block';
    const errors = document.querySelectorAll('.name');

    if (errors.length < 1) {
      form1.insertAdjacentElement('afterend', errorName);
    }

    form1.value = '';
  }

  if (!testEmail) {
    const errorMail = document.createElement('div');
    errorMail.textContent = 'Введите правильный адрес почты';
    errorMail.classList.add('invalid-feedback', 'mail');

    errorMail.style.display = 'block';
    const errors = document.querySelectorAll('.mail');

    if (errors.length < 1) {
      email.insertAdjacentElement('afterend', errorMail);
    }

    email.value = '';
  }

  if (!form1.value == '' && !form2.value == '' && !form3.value == '' && !form5.value == '' && !phone.value == '' && !email.value == '') {
    e.preventDefault();
    adress.style.display = 'none';
    const basket = document.querySelector('.basket');
    const itemImage = document.querySelector('.item-image');
    basket.style.display = 'none';
    itemImage.style.display = 'none';
    commentSection.style.display = 'block';
    const errors = document.querySelectorAll('.invalid-feedback');

    for (let i = 0; i < errors.length; i++) {
      errors[i].style.display = 'none';
    }
  }
});

backBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const basket = document.querySelector('.basket');
  const itemImage = document.querySelector('.item-image');
  basket.style.display = 'block';
  itemImage.style.display = 'block';
  catalog.style.display = 'block';
  adress.style.display = 'none';
  basketArray.showNextButton();
  basketArray.showTotalBasket();
});

const textarea = document.getElementById('exampleFormControlTextarea1');
const sendBtn = commentBtns[1];

sendBtn.addEventListener('click', (e) => {
  const regExpComments = /^[A-Za-zА-Яа-яЁё]+$/u;
  const testComments = regExpComments.test(textarea.value);

  if (!testComments) {
    const errorComments = document.createElement('div');
    errorComments.textContent = 'Введите комментарий к заказу';
    errorComments.classList.add('invalid-feedback', 'comments');

    errorComments.style.display = 'block';
    const errors = document.querySelectorAll('.comments');

    if (errors.length < 1) {
      textarea.insertAdjacentElement('afterend', errorComments);
    }

    textarea.value = '';
  }
  if (!textarea.value == '') {
    commentSection.style.display = 'none';
    done.style.display = 'block';

    let totalCount = 0;
    let totalPrice = 0;
    for (let i = 0; i < product.length; i++) {
      totalPrice += product[i].price * product[i].count;
      totalCount += +product[i].count;
      const doneTitle = document.getElementById('done-title');
      doneTitle.textContent = `У вас: ${totalCount} товаров на сумму ${totalPrice} рублей. Будет доставлено по адресу: ${form3.value}. Комментарии к заказу: ${textarea.value}.`;
    }

    const errors = document.querySelectorAll('.invalid-feedback');

    for (let i = 0; i < errors.length; i++) {
      errors[i].style.display = 'none';
    }
  }
});

backBtnToAdress.addEventListener('click', (e) => {
  e.preventDefault;
  commentSection.style.display = 'none';
  adress.style.display = 'block';
});

backToShop.addEventListener('click', (e) => {
  basketArray.deleteAll();
  location.reload();
});
