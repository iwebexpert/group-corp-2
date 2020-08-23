const container = document.querySelector(".container");
const catalogContainer = document.getElementById("catalog");
const basketContainer = document.getElementById("basket");
const addressContainer = document.querySelector(".address__body");
const commentArea = document.querySelector(".comment__area");

document.addEventListener("DOMContentLoaded", () => {
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("clear__btn")) {
      newBasket.clearBasket();
      newBasket.isEmpty();
      newBasket.hideClearBtn();
      newBasket.hideOrderBtn();
    }

    if (e.target.classList.contains("order__btn")) {
      newBasket.hideBasket();
      formBtns.showForm();
      formBtns.showToBasketBtn();
      formBtns.showToCommentBtn();
      newBasket.hideOrderBtn();
    }

    if (e.target.classList.contains("comments__btn")) {
      formBtns.hideForm();
      formBtns.showComment();
      formBtns.showBackToFormBtn();
      formBtns.showConfirmBtn();
    }

    if (e.target.classList.contains("toBasket__btn")) {
      formBtns.hideToBasketBtn();
      formBtns.hideForm();
      newBasket.showBasket();
      newBasket.showOrderBtn();
    }

    if (e.target.classList.contains("backToComment__btn")) {
      formBtns.hideComment();
      formBtns.showForm();
    }

    if (e.target.classList.contains("confirm__btn")) {
      swal(
        `Your order is ${newBasket.items.length} items for ${newBasket.totalPrice} RUB`,
        `Wait for delivery`,
        "success"
      );

      window.setTimeout(() => {
        location.reload();
      }, 3500);
    }
  });
});

// Оформление корзины

const basketListContainer = document.createElement("div");
basketListContainer.classList.add("basket__list");

const sumBasket = document.createElement("div");
const sumBasketSpan = document.createElement("span");
sumBasket.appendChild(sumBasketSpan);

const countBasket = document.createElement("div");
const countBasketSpan = document.createElement("span");
countBasket.appendChild(countBasketSpan);

const totalSpan = document.createElement("span");
countBasket.appendChild(totalSpan);

const totalBasketPrice = document.createElement("span");
sumBasket.appendChild(totalBasketPrice);

// Кнопка очистки корзины
const clearBtn = document.createElement("button");
clearBtn.classList.add("clear__btn");
clearBtn.textContent = "Clear basket";

basketContainer.appendChild(sumBasket);
basketContainer.appendChild(countBasket);
basketContainer.appendChild(basketListContainer);

// Кнопка подтверждения заказа

const orderBtn = document.createElement("button");
orderBtn.textContent = "Order";
orderBtn.classList.add("order__btn");

// -----------------------Кнопки формы---------------

// Кнопка Return to basket
const toBasketBtn = document.createElement("button");
toBasketBtn.classList.add("toBasket__btn");
toBasketBtn.setAttribute("type", "button");
toBasketBtn.textContent = "Return to basket";

// Кнопка Add comment
const toCommentBtn = document.createElement("button");
toCommentBtn.classList.add("comments__btn");
toCommentBtn.setAttribute("type", "button");
toCommentBtn.textContent = "Add comment";

// Кнопка Return to form
const backToFormBtn = document.createElement("button");
backToFormBtn.classList.add("backToComment__btn");
backToFormBtn.setAttribute("type", "button");
backToFormBtn.textContent = "Return to form";

// Кнопка подтверждения
const confirmBtn = document.createElement("button");
confirmBtn.classList.add("confirm__btn");
confirmBtn.setAttribute("type", "button");
confirmBtn.textContent = "Confirm";

// ------------------Карточка продукта----------------------
class Product {
  constructor(id, name, price, currency, count, url) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.count = count;
    this.url = url;
    this.items = [];
    this.addProduct(this);
    this.createCatalog();
  }

  getInfo() {
    const info = document.createElement("div");
    info.textContent = `Name: ${this.name}, price: ${this.price} ${this.currency}, count: ${this.count}`;
    catalogContainer.appendChild(info);
  }

  addProduct(item) {
    if (item instanceof Product) {
      this.items.push(item);
    }
  }

  // Создание карточки товара
  createProductCard(id, name, price, currency, count, url) {
    const productCard = document.createElement("div");
    productCard.classList.add("product__card");

    const productName = document.createElement("div");
    productName.textContent = `Name: ${name}`;
    productName.classList.add(`${name}`);

    const productPrice = document.createElement("span");
    productPrice.textContent = `Price: ${price} ${currency}`;
    productPrice.classList.add("price");

    const productImage = document.createElement("img");
    productImage.setAttribute("src", url);
    productImage.classList.add("product__image");

    const productCount = document.createElement("input");
    productCount.classList.add("product__count");
    productCount.setAttribute("value", "1");

    const addBtn = document.createElement("button");

    addBtn.textContent = "Add product";
    addBtn.classList.add("add__btn");
    addBtn.setAttribute("id", `${name}`);

    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productImage);
    productCard.appendChild(productCount);
    productCard.appendChild(addBtn);

    addBtn.addEventListener("click", () => {
      newBasket.addItem(this);
      newBasket.createBasketList(this);
      newBasket.resetBasket();
      newBasket.isEmpty();
      newBasket.createBasketCard();
      newBasket.showClearBtn();
      newBasket.showOrderBtn();
    });

    return productCard;
  }

  // Создание списка каталога
  createCatalog() {
    this.items.forEach((p) => {
      let newProduct = this.createProductCard(
        p.id,
        p.name,
        p.price,
        p.currency,
        p.count,
        p.url
      );
      catalogContainer.appendChild(newProduct);
    });
  }
}

//-------------------Корзина-----------------------------
class Basket {
  constructor(items) {
    this.items = [...items];
    this.basketList = new Set(this.items);
    this.totalPrice = 0;
    this.isEmpty();
  }

  basketSum() {
    this.totalPrice = 0;
    this.basketList.forEach((i) => {
      this.totalPrice += i.price * i.count;
    });
  }

  isEmpty() {
    if (this.items.length) {
      sumBasketSpan.textContent = `Total price: ${this.totalPrice} RUB `;
      countBasketSpan.textContent = `Total count: ${this.items.length}`;
    } else {
      sumBasketSpan.textContent = "";
      countBasketSpan.textContent = "Basket is empty...";
    }
  }

  addItem(item) {
    if (item instanceof Product) {
      this.items.push(item);
    }
  }

  createBasketList(item) {
    if (item instanceof Product) {
      this.basketList.add(item);
      item.count++;
    }

    this.basketSum();
  }

  createBasketCard() {
    this.basketList.forEach((p) => {
      const inBasketProductCard = document.createElement("div");
      inBasketProductCard.classList.add("prod__card");
      const inBasketProductName = document.createElement("p");
      inBasketProductName.classList.add("basket__prod");
      inBasketProductName.textContent = `${p.name}`;
      inBasketProductName.setAttribute("id", `${p.id}`);

      const inBasketProductCount = document.createElement("span");
      inBasketProductCount.textContent = `${p.count}`;

      const minusBtn = document.createElement("button");
      minusBtn.textContent = "-";
      minusBtn.classList.add("minus__btn");
      minusBtn.setAttribute("id", `${p.name}`);

      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.classList.add("plus__btn");
      plusBtn.setAttribute("id", `${p.name}`);

      inBasketProductName.appendChild(inBasketProductCount);
      inBasketProductCard.appendChild(minusBtn);
      inBasketProductCard.appendChild(inBasketProductName);
      inBasketProductCard.appendChild(plusBtn);
      basketListContainer.appendChild(inBasketProductCard);

      minusBtn.addEventListener("click", (e) => {
        if (e.target.id === p.name && p.count > 1) {
          p.count--;
          inBasketProductCount.textContent = `${p.count}`;
          countBasketSpan.textContent = `Total count: ${--this.items.length}`;
        }
        this.basketSum();
        sumBasketSpan.textContent = `Total price: ${this.totalPrice} RUB `;
      });

      plusBtn.addEventListener("click", (e) => {
        if (e.target.id === p.name) {
          p.count++;
          inBasketProductCount.textContent = `${p.count}`;
          countBasketSpan.textContent = `Total count: ${++this.items.length}`;
        }
        this.basketSum();
        sumBasketSpan.textContent = `Total price: ${this.totalPrice} RUB `;
      });
    });
  }

  resetBasket() {
    basketListContainer.innerHTML = "";
  }

  clearBasket() {
    basketListContainer.innerHTML = "";
    this.items = [];
    this.basketList.forEach((p) => {
      p.count = 0;
    });
    this.basketList.clear();
  }

  // Кнопка очистки
  hideClearBtn() {
    if (basketContainer.contains(clearBtn)) {
      basketContainer.removeChild(clearBtn);
    }
  }

  showClearBtn() {
    if (!basketContainer.contains(clearBtn))
      basketContainer.insertAdjacentElement("beforeend", clearBtn);
  }

  // Кнопка подтверждения заказа
  showOrderBtn() {
    if (!basketContainer.contains(orderBtn)) {
      basketContainer.insertAdjacentElement("beforeend", orderBtn);
    }
  }

  hideOrderBtn() {
    if (basketContainer.contains(orderBtn)) {
      basketContainer.removeChild(orderBtn);
    }
  }

  hideBasket() {
    if ((basketContainer.style.display = "flex")) {
      basketContainer.style.display = "none";
    }
  }

  showBasket() {
    if ((basketContainer.style.display = "none")) {
      basketContainer.style.display = "flex";
    }
  }
}

//-------------------Форма-------------------------------
class FormBtns {
  constructor() {}

  // Показать/скрыть форму
  showForm() {
    if ((addressContainer.style.display = "none")) {
      addressContainer.style.display = "flex";
    }
  }

  hideForm() {
    if ((addressContainer.style.display = "flex")) {
      addressContainer.style.display = "none";
    }
  }

  // Показать/скрыть кнопку 'обратно в корзину'
  showToBasketBtn() {
    if (!addressContainer.contains(toBasketBtn)) {
      addressContainer.insertAdjacentElement("afterbegin", toBasketBtn);
    }
  }

  hideToBasketBtn() {
    if (addressContainer.contains(toBasketBtn)) {
      addressContainer.removeChild(toBasketBtn);
    }
  }

  // Показать/скрыть кнопку 'к комментарию'

  showToCommentBtn() {
    if (!addressContainer.contains(toCommentBtn)) {
      addressContainer.insertAdjacentElement("beforeend", toCommentBtn);
    }
  }

  hideToCommentBtn() {
    if (addressContainer.contains(toCommentBtn)) {
      addressContainer.removeChild(toCommentBtn);
    }
  }

  // Показать/скрыть комментарий
  showComment() {
    if ((commentArea.style.display = "none")) {
      commentArea.style.display = "block";
    }
  }

  hideComment() {
    if ((commentArea.style.display = "block")) {
      commentArea.style.display = "none";
    }
  }

  // Показать/скрыть кнопку возвращения к форме
  showBackToFormBtn() {
    if (!commentArea.contains(backToFormBtn)) {
      commentArea.insertAdjacentElement("afterbegin", backToFormBtn);
    }
  }

  hideBackToFormBtn() {
    if (commentArea.contains(backToFormBtn)) {
      commentArea.removeChild(backToFormBtn);
    }
  }

  //Показать/скрыть кнопку подтверждения
  showConfirmBtn() {
    if (!commentArea.contains(confirmBtn)) {
      commentArea.insertAdjacentElement("beforeend", confirmBtn);
    }
  }
  hideConfirmBtn() {
    if (commentArea.contains(confirmBtn)) {
      commentArea.removeChild(confirmBtn);
    }
  }
}

// ------------Создание товаров, каталога, добавление товаров в каталог-------------
let tshort = new Product(
  0,
  "T-short",
  700,
  "Rub",
  0,
  "https://it-shirts.com/wp-content/uploads/2018/04/tshirts_javascript_starwars_01.jpg"
);
let shoes = new Product(
  1,
  "Shoes",
  5000,
  "Rub",
  0,
  "https://images.ru.prom.st/574632908_botinki-muzhskie-kozhanye.jpg"
);
let dress = new Product(
  2,
  "Dress",
  3500,
  "Rub",
  0,
  "https://acoolakids.ru/static/images/acoola/styles/catalog/good/96237/20240200060_620_Back.jpg"
);
let socks = new Product(
  3,
  "Socks",
  350,
  "Rub",
  0,
  "https://go3.imgsmail.ru/imgpreview?key=5fe2e6d99ecffae5&mb=storage&w=540"
);

newBasket = new Basket([]);
formBtns = new FormBtns();
