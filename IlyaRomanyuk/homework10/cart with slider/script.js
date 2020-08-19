class Product {
  constructor(id, name, quantity, valute, price, url) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.valute = valute;
    this.price = price;
    this.url = url;
  }

  getPriceOfProduct() {
    return this.price * this.quantity;
  }
}

class Backet {
  constructor() {
    this.result = "";
    this.totalPrice = 0;
    this.quantity = 0;
    this.basket = [];
  }

  //количество товаров в корзине
  quantityInCart() {
    const totalQuantity = this.basket.length;
    return `количество ${totalQuantity}`;
  }

  //Стоимость корзины
  countBasketPrice() {
    const totalPrice = this.basket.reduce((sum, element) => {
      sum += element.price;
      return sum;
    }, 0);

    this.result = `сумма - ${totalPrice}`;
    return this.result;
  }

  renderCart(message) {
    let totalPrice = document.querySelector(".totalPrice");
    totalPrice.textContent = message;
  }

  //создание галереи для выбранного товара
  createGalery(e) {
    let productID = e.currentTarget.getAttribute("data-id");
    let next = document.querySelector(".arrow-next");
    let prev = document.querySelector(".arrow-prev");
    let inner = document.querySelector(".popup__inner");
    let product = products.find(element => element.id == productID);

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
    document.querySelector("body").addEventListener("keydown", e => {
      console.log(e);
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

    this.basket.forEach(element => {
      let product = document.createElement("div");
      product.classList.add("cart__item");

      let cost = document.createElement("p");
      cost.textContent = `${element.price} ${element.valute}`;

      let name = document.createElement("p");
      name.textContent = element.name;

      let quantity = document.createElement("p");
      quantity.textContent = element.quantity;

      let button = document.createElement("button");
      button.classList.add("btn--clear", "btn");
      button.addEventListener("click", e =>
        this.deleteProductInCart(e, element)
      );
      button.textContent = "Удалить";

      [name, quantity, cost, button].forEach(item => product.append(item));
      cart.append(product);
    });
  }

  //Удаление товара из корзины
  deleteProductInCart(e, element) {
    document.querySelector("#cart").removeChild(e.target.parentElement);
    let index = this.basket.indexOf(element);

    if (index > -1) {
      this.basket.splice(index, 1);
    }

    if (!this.basket.length) {
      this.clearCart();
    } else {
      this.renderCart(`${this.countBasketPrice()} ${this.quantityInCart()}`);
    }
  }

  //Добавление товара в корзину
  addToCart(element) {
    this.basket.push(element);
    this.renderCart(`${this.countBasketPrice()} ${this.quantityInCart()}`);
    this.renderProductInCart();
  }

  //Очистка корзины
  clearCart() {
    if (this.basket.length) {
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
    this.commentBlock = document.querySelector(".comment");
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
    this.hideInfo(this.addressBlock);
    this.showInfo(this.commentBlock);
  }
  // Проверка на нажатие по кнопке "Продолжить". Мы не можем продолжить, если в корзине нет товаров.
  checkCart() {
    this.cont.addEventListener("click", e => {
      if (!this.cart.basket.length) {
        Swal.fire({
          icon: "error",
          title: "Корзина пуста",
          text: "Для того, чтобы продолжить положите товар(ы) в корзину"
        });
        return;
      }
      this.showInfo(this.addressBlock);
      this.hideInfo(this.cont);
      this.hideInfo(this.productsBlock);
      this.next.addEventListener("click", e => {
        e.preventDefault();
        this.checkAddress();
      });

      this.sendBtn.addEventListener("click", e => {
        e.preventDefault();
        this.checkComment();
      });
    });
  }

  showOrderPopup() {
    this.orderPopup.style.transform = " translate(-50%, -50%)";
    this.owerlay.style.display = "block";
  }

  closeOrderPopup() {
    this.orderPopup.style.transform = " translate(-50%, -250%)";
    this.owerlay.style.display = "none";
  }
  // Оформление заказа
  onSuccess() {
    this.showOrderPopup();
    let closeBtn = document.querySelector(".order__btn");
    closeBtn.addEventListener("click", e => this.closeOrderPopup());

    let address = document.querySelector(".order__address");
    address.textContent = `Адрес: ${this.address}`;

    let comment = document.querySelector(".order__comments");
    comment.textContent = `Комментарий: ${this.comments}`;

    let cost = document.querySelector(".order__cost");
    cost.textContent = `Стоимость: ${this.cart.result} RUB`;
  }
}

function generationForm(cart) {
  let order = new Order(cart);
  order.checkCart();
}

//Генерация каталога
function generationDOM(elements) {
  let cart = new Backet();
  generationForm(cart);

  let cartBaket = document.querySelector("#catalog");
  let clearBtn = document.querySelector(".btn--clear");
  clearBtn.addEventListener("click", () => cart.clearCart());

  for (let i = 0; i < elements.length; i++) {
    let img = document.createElement("img");
    img.classList.add("img");
    img.setAttribute("src", `${elements[i].url[0]}`);

    let element = document.createElement("div");
    element.setAttribute("data-id", elements[i].id);
    element.addEventListener("click", e => {
      cart.createGalery(e);
    });
    element.classList.add("catalog__item");

    let title = document.createElement("p");
    title.textContent = elements[i].name;

    let price = document.createElement("p");
    price.textContent = `${elements[i].price}  ${elements[i].valute}`;

    let buyBtn = document.createElement("button");
    buyBtn.classList.add("btn");
    buyBtn.setAttribute("id", "add");
    buyBtn.textContent = "В корзину";
    buyBtn.addEventListener("click", e => {
      e.stopPropagation();
      cart.addToCart(elements[i]);
    });

    [img, title, price, buyBtn].forEach(item => element.append(item));
    cartBaket.append(element);
  }
}

const products = [
  new Product(1, "шорты", 1, "RUB", 1200, [
    "./assets/shorts1.jpg",
    "./assets/shorts2.jpg",
    "./assets/shorts3.jpg"
  ]),
  new Product(2, "майка", 1, "RUB", 800, [
    "./assets/shirt1.jpg",
    "./assets/shirt2.jpg",
    "./assets/shirt3.jpg"
  ]),
  new Product(3, "кроссовки", 1, "RUB", 3500, [
    "./assets/kross1.png",
    "./assets/kross2.png"
  ])
];

generationDOM(products);
