const container = document.getElementsByClassName("container");
const catalogContainer = document.getElementById("catalog");
const basketContainer = document.getElementById("basket");

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

clearBtn.addEventListener("click", () => {
  newBasket.clearBasket();
  newBasket.isEmpty();
  newBasket.hideClearBtn();
  newBasket.hideToFormBtn();
  newBasket.hideForm();
});

// Форма для адреса

const addressForm = document.createElement("form");
addressForm.classList.add("address__form");

const addressBody = document.createElement("div");
addressBody.classList.add("address__body");

const formHeading = document.createElement("h2");
formHeading.textContent = "Place your order";

const country = document.createElement("div");
country.textContent = "Country";
const countryInput = document.createElement("input");
countryInput.setAttribute("type", "text");
country.appendChild(countryInput);

const city = document.createElement("div");
city.textContent = "City";
const cityInput = document.createElement("input");
cityInput.setAttribute("type", "text");
city.appendChild(cityInput);

const street = document.createElement("div");
street.textContent = "Street";
const streetInput = document.createElement("input");
streetInput.setAttribute("type", "text");
street.appendChild(streetInput);

const house = document.createElement("div");
house.textContent = "House";
const houseInput = document.createElement("input");
houseInput.setAttribute("type", "number");
house.appendChild(houseInput);

const flat = document.createElement("div");
flat.textContent = "Flat";
const flatInput = document.createElement("input");
flatInput.setAttribute("type", "number");
flat.appendChild(flatInput);

const backToBasketBtn = document.createElement("button");
backToBasketBtn.classList.add("toBasker__btn");
backToBasketBtn.setAttribute("type", "button");
backToBasketBtn.textContent = "Return to basket";
backToBasketBtn.addEventListener("click", () => {
  newBasket.backToBasket();
  newBasket.hideForm();
});

// Кнопка к комментарию
const toCommentsBtn = document.createElement("button");
toCommentsBtn.classList.add("comments__btn");
toCommentsBtn.setAttribute("type", "button");
toCommentsBtn.textContent = "Add comment";

toCommentsBtn.addEventListener("click", () => {
  newBasket.showCommentArea();
  newBasket.showConfirmBtn();
  newBasket.hideFormBody();
  newBasket.showBackToFormBtn();
});

const backToFormBtn = document.createElement("button");
backToFormBtn.classList.add("backToComment__btn");
backToFormBtn.setAttribute("type", "button");
backToFormBtn.textContent = "Return to address form";

backToFormBtn.addEventListener("click", () => {
  newBasket.showFormBody();
  newBasket.hideCommentArea();
  newBasket.hideBackToFormBtn();
  newBasket.hideConfirmBtn();
});

// Комментарий
const commentArea = document.createElement("textarea");
commentArea.classList.add("comment__area");
commentArea.setAttribute("placeholder", "Comment your order...");

//Подтвердить заказ

const confirmBtn = document.createElement("button");
confirmBtn.classList.add("confirm__btn");
confirmBtn.textContent = "Confirm";

confirmBtn.addEventListener("click", () => {});

//Создание тела формы

addressBody.appendChild(backToBasketBtn);
addressBody.appendChild(formHeading);
addressBody.appendChild(country);
addressBody.appendChild(city);
addressBody.appendChild(street);
addressBody.appendChild(house);
addressBody.appendChild(flat);
addressBody.appendChild(toCommentsBtn);

addressForm.appendChild(addressBody);
addressForm.appendChild(backToFormBtn);
addressForm.appendChild(commentArea);
addressForm.insertAdjacentElement("beforeend", confirmBtn);
basketContainer.insertAdjacentElement("afterend", addressForm);

// Кнопка к форме

const toFormBtn = document.createElement("button");
toFormBtn.classList.add("form__btn");
toFormBtn.textContent = "Order";

toFormBtn.addEventListener("click", () => {
  newBasket.showForm();
  newBasket.hideBasket();
  newBasket.hideConfirmBtn();
  newBasket.hideBackToFormBtn();
});

// Карточка продукта
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
    productName.classList.add("name");

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
      newBasket.resetBasket();
      newBasket.createBasketCard();
      newBasket.isEmpty();
      newBasket.showClearBtn();
      newBasket.showToFormBtn();
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

class Basket {
  constructor(items, prices) {
    this.items = [...items];
    this.prices = [...prices];
    this.isEmpty();
  }

  basketSum() {
    let totalSum = this.prices.reduce((sum, current) => sum + current, 0);
    this.totalPrice = totalSum;
  }

  isEmpty() {
    if (this.items.length !== 0) {
      sumBasketSpan.textContent = `Total price: ${this.totalPrice} RUB `;
      countBasketSpan.textContent = `Total count: ${this.prices.length}`;
    } else {
      sumBasketSpan.textContent = "";
      countBasketSpan.textContent = "Basket is empty...";
    }
  }

  addItem(item) {
    if (item instanceof Product && !this.items.includes(item.name)) {
      this.items.push(item.name);
      this.prices.push(item.price);
    } else {
      this.prices.push(item.price);
    }

    this.basketSum();
  }

  createBasketCard() {
    let prodCount = 0;
    let basketListItems = this.items.map((p) => {
      const inBasketProductCard = document.createElement("div");
      inBasketProductCard.classList.add("prod__card");
      const inBasketProductName = document.createElement("p");
      inBasketProductName.classList.add("basket__prod");
      inBasketProductName.textContent = `${p}`;
      inBasketProductName.setAttribute("id", `${p}`);

      const minusBtn = document.createElement("button");
      minusBtn.setAttribute("id", `${p}`);
      minusBtn.classList.add("minusBtn");
      minusBtn.textContent = "-";

      const plusBtn = document.createElement("button");
      plusBtn.setAttribute("id", `${p}`);
      plusBtn.classList.add("plusBtn");
      plusBtn.textContent = "+";

      inBasketProductCard.appendChild(minusBtn);
      inBasketProductCard.appendChild(inBasketProductName);
      inBasketProductCard.appendChild(plusBtn);

      basketListContainer.appendChild(inBasketProductCard);

      minusBtn.addEventListener("click", () => {
        if (e.target.id === p && prodCount > 0) {
          --prodCount;
        }
      });

      plusBtn.addEventListener("click", (e) => {
        if (e.target.id === p) {
          ++prodCount;
        }
      });
    });

    return basketListItems;
  }

  resetBasket() {
    basketListContainer.innerHTML = "";
  }

  clearBasket() {
    basketListContainer.innerHTML = "";
    this.items = [];
    this.prices = [];
  }
  // Методы скрытия и показа форм и кнопок

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
  // Форма
  showForm() {
    if ((addressForm.style.display = "none")) {
      addressForm.style.display = "flex";
    }
  }

  hideForm() {
    if (addressForm.style.display === "flex") {
      addressForm.style.display = "none";
    }
  }
  // Тело формы с инпутами
  showFormBody() {
    if ((addressBody.style.display = "none")) {
      addressBody.style.display = "flex";
    }
  }

  hideFormBody() {
    if ((addressBody.style.display = "flex")) {
      addressBody.style.display = "none";
    }
  }
  // Кнопка перехода к форме
  showToFormBtn() {
    if (!basketContainer.contains(toFormBtn)) {
      basketContainer.insertAdjacentElement("beforeend", toFormBtn);
    }
  }

  hideToFormBtn() {
    if (basketContainer.contains(toFormBtn)) {
      basketContainer.removeChild(toFormBtn);
    }
  }
  // Скрыть/показать корзину
  hideBasket() {
    if ((basketContainer.style.display = "flex")) {
      basketContainer.style.display = "none";
    }
  }

  backToBasket() {
    if ((basketContainer.style.display = "none")) {
      basketContainer.style.display = "flex";
    }
  }
  // Скрыть/показать комментарий
  showCommentArea() {
    if ((commentArea.style.display = "none")) {
      commentArea.style.display = "block";
    }
  }

  hideCommentArea() {
    if ((commentArea.style.display = "block")) {
      commentArea.style.display = "none";
    }
  }

  // Кнопка возврата к форме

  showBackToFormBtn() {
    if (!addressForm.contains(backToFormBtn)) {
      addressForm.insertAdjacentElement("afterbegin", backToFormBtn);
    }
  }

  hideBackToFormBtn() {
    if (addressForm.contains(backToFormBtn)) {
      addressForm.removeChild(backToFormBtn);
    }
  }

  //Кнопка подтверждения заказа
  showConfirmBtn() {
    if (!addressForm.contains(confirmBtn)) {
      addressForm.insertAdjacentElement("beforeend", confirmBtn);
    }
  }
  hideConfirmBtn() {
    if (addressForm.contains(confirmBtn)) {
      addressForm.removeChild(confirmBtn);
    }
  }
}

// Создание товаров, каталога, добавление товаров в каталог
let tshort = new Product(
  0,
  "T-short",
  700,
  "Rub",
  1,
  "https://it-shirts.com/wp-content/uploads/2018/04/tshirts_javascript_starwars_01.jpg"
);
let shoes = new Product(
  1,
  "Shoes",
  5000,
  "Rub",
  1,
  "https://images.ru.prom.st/574632908_botinki-muzhskie-kozhanye.jpg"
);
let dress = new Product(
  2,
  "Dress",
  3500,
  "Rub",
  1,
  "https://acoolakids.ru/static/images/acoola/styles/catalog/good/96237/20240200060_620_Back.jpg"
);
let socks = new Product(
  3,
  "Socks",
  350,
  "Rub",
  1,
  "https://go3.imgsmail.ru/imgpreview?key=5fe2e6d99ecffae5&mb=storage&w=540"
);

newBasket = new Basket([], []);
