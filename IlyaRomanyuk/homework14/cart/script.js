class Backet {
  constructor() {
    this.result = "";
    this.totalPrice = 0;
    this.quantity = 0;
    this.basket = {};
  }

  //количество товаров в корзине
  quantityInCart() {
    let totalQuantity = 0;
    for (let key in this.basket) {
      totalQuantity += this.basket[key]['quantity'];
    }
    return `количество ${totalQuantity}`;
  }

  //Стоимость корзины
  countBasketPrice() {
    let totalPrice = 0;
    for (let key in this.basket) {
      totalPrice += this.basket[key]['price'] * this.basket[key]['quantity'];
    }
    this.result = totalPrice;
    return `сумма - ${totalPrice}`;
  }

  renderCart(message) {
    let totalPrice = document.querySelector(".totalPrice");
    totalPrice.textContent = message;
  }

  //создание галереи для выбранного товара
  createGalery(e, elements) {
    let productID = e.currentTarget.getAttribute("data-id");
    let next = document.querySelector(".arrow-next");
    let prev = document.querySelector(".arrow-prev");
    let inner = document.querySelector(".popup__inner");
    let product = elements.find(element => element.id == productID);

    if (product.url.length == 1) return;

    let slideNow = 1;
    let slideCount = product.url.length;
    let viewport = 750;
    inner.style.transform = "translate(0, 0)";

    // Ф-ии перелистывания слайдов
    let nextSlide = () => {
      if (slideNow == slideCount) {
        inner.style.transform = " translate(0, 0)";
        slideNow = 1;
      } else {
        let widthCount = -viewport * slideNow;
        inner.style.transform = " translate(" + widthCount + "px, 0)";
        slideNow++;
      }
    };

    let prevSlide = () => {
      if (slideNow == 1) {
        let widthCount = -viewport * (slideCount - 1);
        inner.style.transform = " translate(" + widthCount + "px, 0)";
        slideNow = slideCount;
      } else {
        let widthCount = -viewport * (slideNow - 2);
        slideNow--;
        inner.style.transform = " translate(" + widthCount + "px, 0)";
      }
    };

    // Переключение по стрелкам
    next.addEventListener("click", () => nextSlide());
    prev.addEventListener("click", () => prevSlide());

    //Переключение по кнопкам
    document.addEventListener("keydown", e => {
      if (e.keyCode == 39) {
        nextSlide();
      } else if (e.keyCode == 37) {
        prevSlide();
      }
    });

    if (product.url.length > 1) {
      inner.innerHTML = "";
      inner.style.width = `${product.url.length * 750}px`;
      product.url.forEach(url => {
        let product = document.createElement("div");
        product.classList.add("popup__item");

        let img = document.createElement("img");
        img.setAttribute("src", url);

        product.append(img);

        inner.append(product);
      });
    }

    let close = document.querySelector(".close");
    close.addEventListener("click", e => this.closePopup(e));
    this.showPopup();
  }

  //Убрать попап со слайдером
  closePopup() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".popup").style.visibility = "hidden";
  }

  //Показать попап со слайдером
  showPopup() {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".popup").style.visibility = "visible";
  }

  //Рендеринг товаров, которые уже добавлены в корзину
  renderProductInCart() {
    let cart = document.querySelector("#cart");
    cart.innerHTML = "";

    for (let element in this.basket) {
      let product = document.createElement("div");
      product.classList.add("cart__item");

      let cost = document.createElement("p");
      cost.textContent = `${this.basket[element].price} ${this.basket[element].valute}`;

      let name = document.createElement("p");
      name.textContent = this.basket[element].name;

      let increment = document.createElement('button');
      increment.addEventListener('click', (e) => {
        this.increment(element, e)
      })
      increment.textContent = '+';

      let quantity = document.createElement("p");
      quantity.classList.add('quantity');
      quantity.textContent = this.basket[element].quantity;

      let decrement = document.createElement('button');
      decrement.addEventListener('click', (e) => {
        this.decrement(element, e)
      })
      decrement.textContent = '-';

      let button = document.createElement("button");
      button.classList.add("btn--clear", "btn");
      button.addEventListener("click", e =>
        this.deleteProductInCart(e, element)
      );
      button.textContent = "Удалить";

      [name, increment, quantity, decrement, cost, button].forEach(item => product.append(item));
      cart.append(product);
    }
  }

  // Увеличение товара на единицу
  increment(index, event) {
    this.basket[index].quantity++;
    event.target.nextElementSibling.textContent = this.basket[index].quantity;
    this.renderCart(`${this.countBasketPrice()} ${this.quantityInCart()}`);
  }

  //Уменьшение товара на единицу
  decrement(index, event) {
    if (this.basket[index].quantity - 1 > 0) {
      this.basket[index].quantity--;
      event.target.previousElementSibling.textContent = this.basket[index].quantity;
      this.renderCart(`${this.countBasketPrice()} ${this.quantityInCart()}`);
    } else {
      this.deleteProductInCart(event, index)
    }
  }

  //Удаление товара из корзины
  deleteProductInCart(e, element) {
    document.querySelector("#cart").removeChild(e.target.parentElement);
    this.basket[element].quantity = 1;
    delete this.basket[element]

    if (!Object.keys(this.basket).length) {
      this.clearCart();
    } else {
      this.renderCart(`${this.countBasketPrice()} ${this.quantityInCart()}`);
    }
  }

  //Добавление товара в корзину
  addToCart(element) {
    let goodsId = element.id;
    if (this.basket[goodsId]) {
      this.basket[goodsId].quantity++;

    } else {
      this.basket[goodsId] = element;
    }
    this.renderCart(`${this.countBasketPrice()} ${this.quantityInCart()}`);
    this.renderProductInCart();
  }

  //Очистка корзины
  clearCart() {
    if (Object.keys(this.basket).length) {
      Swal.fire({
        icon: "error",
        title: "Внимательно",
        text: "Вы действительно хотите очистить корзину"
      }).then(obj => {
        if (obj.isConfirmed) {
          this.basket = [];
          this.renderCart("Корзина пуста");
          document.querySelector("#cart").innerHTML = "";
        } else {
          return;
        }
      });
    } else {
      this.basket = [];
      this.renderCart("Корзина пуста");
      document.querySelector("#cart").innerHTML = "";
    }
  }
  /*Генерация формы*/
  generationForm(cart) {
    const order = new Order(cart);
    order.checkCart();
  }

  /*Генерация каталога, запрос за товарами NEW PROMISE*/
  generationDOM() {
    this.getProducts().
      then(elements => this.setProductsFromServer(elements),
        error => {
          Swal.fire({
            icon: "error",
            title: "Неверный запрос",
            text: `${error}`
          });
        })
    this.generationForm(this);
  }

  /*Асинхронный запрос за товарами (Тело запроса, возвращаем зарезолвленный промис) NEW PROMISE*/
  getProducts() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/goods');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status !== 200) {
            reject(xhr.status);
          }
          const users = JSON.parse(xhr.responseText);
          resolve(users);
        }
      };

      xhr.send();
    });
  }

  /*Создание каталога за счет полученных данных*/
  setProductsFromServer(elements) {
    let cartBaket = document.querySelector("#catalog");
    let clearBtn = document.querySelector(".btn--clear");
    clearBtn.addEventListener("click", () => this.clearCart());

    for (let i = 0; i < elements.length; i++) {
      let img = document.createElement("img");
      img.classList.add("img");
      img.setAttribute("src", `${elements[i].url[0]}`);

      let element = document.createElement("div");
      element.setAttribute("data-id", elements[i].id);
      element.addEventListener("click", e => {
        this.createGalery(e, elements);
      });
      element.classList.add("catalog__item");

      let title = document.createElement("p");
      title.textContent = elements[i].name;

      let price = document.createElement("p");
      price.textContent = `${elements[i].price}  ${elements[i].valute}`;

      let buyBtn = document.createElement("button");
      buyBtn.classList.add("btn");
      buyBtn.setAttribute("id", `${elements[i].id}`);
      buyBtn.textContent = "В корзину";
      buyBtn.addEventListener("click", e => {
        e.stopPropagation();
        this.addToCart(elements[i]);
      });

      [img, title, price, buyBtn].forEach(item => element.append(item));
      cartBaket.append(element);
    }
  }
}

class Order {
  constructor(cart) {
    this.address = "";
    this.comments = "";
    this.cart = cart;

    this.cont = document.querySelector(".continue");
    this.next = document.querySelector(".next");
    this.addressBlock = document.querySelector(".address");
    this.commentBlock = document.querySelector(".all");
    this.addressInput = document.querySelector("#address");
    this.commentInput = document.querySelector("#comment");
    this.productsBlock = document.querySelector(".catalog");
    this.sendBtn = document.querySelector("#btn");
    this.orderPopup = document.querySelector(".order");
    this.owerlay = document.querySelector(".overlay");
  }
  // helpers
  showInfo(element) {
    element.style.display = "block";
  }
  // helpers
  hideInfo(element) {
    element.style.display = "none";
  }

  checkComment() {
    this.comments = this.commentInput.value;
    this.onSuccess();
  }

  checkAddress() {
    this.address = this.addressInput.value;
    if (!this.address) {
      this.popupIfCartIsEmpty('Для того, чтобы продолжить задайте адрес');
      return
    }
    this.hideInfo(this.addressBlock);
    this.showInfo(this.commentBlock);
  }

  popupIfCartIsEmpty(info) {
    Swal.fire({
      icon: "error",
      text: `${info}`
    });
  }
  // Проверка на нажатие по кнопке "Продолжить". Мы не можем продолжить, если в корзине нет товаров.
  checkCart() {
    this.cont.addEventListener("click", e => {
      if (!Object.keys(this.cart.basket).length) {
        this.popupIfCartIsEmpty('Для того, чтобы продолжить положите товар(ы) в корзину');
        return;
      }
      this.showInfo(this.addressBlock);
      this.hideInfo(this.cont);
      this.hideInfo(this.productsBlock);
      this.next.addEventListener("click", e => {
        e.preventDefault();
        if (!Object.keys(this.cart.basket).length) {
          this.popupIfCartIsEmpty('Для того, чтобы продолжить положите товар(ы) в корзину');
          return;
        }
        this.checkAddress();
      });

      this.sendBtn.addEventListener("click", e => {
        e.preventDefault();
        if (!Object.keys(this.cart.basket).length) {
          this.popupIfCartIsEmpty('Для того, чтобы продолжить положите товар(ы) в корзину');
          return;
        }
        this.checkComment();
      });
    });
  }

  showOrderPopup() {
    this.orderPopup.style.transform = " translate(-50%, -50%)";
    this.owerlay.style.display = "block";
  }

  // Оформление заказа
  onSuccess() {
    let validator = new Validator();
    if (!validator.validate()) return;
    this.showOrderPopup();
    let closeBtn = document.querySelector(".order__btn");
    closeBtn.addEventListener("click", e => location.reload());

    let address = document.querySelector(".order__address");
    address.textContent = `Адрес: ${this.address}`;

    let comment = document.querySelector(".order__comments");
    if (this.comments.length) {
      comment.textContent = `Комментарий: ${this.comments}`;
    } else {
      comment.textContent = `Комментарий: Клиент не оставил никаких комментариев.`;
    }

    let cost = document.querySelector(".order__cost");
    cost.textContent = `Стоимость: ${this.cart.result} RUB`;
  }
}

class Validator {
  constructor() {
    this.errors = [];
    this.name = document.querySelector('#name');
    this.number = document.querySelector('#number');
    this.email = document.querySelector('#email');
    this.errorBlock = document.querySelectorAll('.error');
  }

  /*Проверка на валидность имени*/
  nameValidation = (name) => {
    let regexp = /^[A-Za-zА-Яа-я ]+$/;

    if (!name) {
      this.errorInput('Заполните поле!', 0);
    } else if (!name.match(regexp)) {
      this.errorInput('Имя состоит только из букв', 0);
    }
  }

  /*Проверка на валидность почты*/
  mailValidation = (email) => {
    let regexp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

    if (!email) {
      this.errorInput('Заполните поле!', 2);
    } else if (!email.match(regexp)) {
      this.errorInput('Нужный формат записи: example@something.com', 2);
    }
  }

  /*Проверка на валидность телфона*/
  telephoneValidation = (telephone) => {
    let regexp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

    if (!telephone) {
      this.errorInput('Заполните поле!', 1);
    } else if (!telephone.match(regexp)) {
      this.errorInput('Нужный формат запиcи: +7(000)000-0000', 1);
    }
  }

  /*Установка красной гнаницы у ошибочных полей*/
  errorInput(error, el) {
    this.errorBlock[el].textContent = error;
    this.errorBlock[el].previousElementSibling.style.border = '2px solid red';
    this.errors.push(error);
  }

  /*Очиста имеющихся ошибок*/
  clearErrors() {
    this.errors = [];
    this.errorBlock.forEach(element => {
      element.textContent = '';
      element.previousElementSibling.style.border = 'none';
    })
  }

  /*Валидация*/
  validate() {
    this.clearErrors();

    let name = this.name.value;
    let number = this.number.value;
    let email = this.email.value;
    this.nameValidation(name);
    this.mailValidation(email);
    this.telephoneValidation(number);

    if (!this.errors.length) return true
  }
}

//Генерация каталога
let cart = new Backet();
cart.generationDOM();

