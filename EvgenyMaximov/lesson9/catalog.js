const container = document.querySelector(".container");
const catalogContainer = document.getElementById("catalog");
const basketContainer = document.getElementById("basket");
const addressContainer = document.querySelector(".address__body");
const commentArea = document.querySelector(".comment__area");

document.addEventListener("DOMContentLoaded", () => {
  catalog.init();
  newBasket.init();
  newBasket.createBasketList();
  container.addEventListener("click", async (e) => {
    if (e.target.classList.contains("clear__btn")) {
      await newBasket.clearBasket();
      await newBasket.isEmpty();
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
      if (formValidation() === true) {
        formBtns.hideForm();
        formBtns.showComment();
        formBtns.showBackToFormBtn();
        formBtns.showConfirmBtn();
      }
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
        `Your order is ${newBasket.totalCount} items for ${newBasket.totalPrice} RUB`,
        `Wait for delivery`,
        "success"
      );

      setTimeout(async () => {
        await newBasket.clearBasket();
        await newBasket.isEmpty();
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
  }

  getInfo() {
    const info = document.createElement("div");
    info.textContent = `Name: ${this.name}, price: ${this.price} ${this.currency}, count: ${this.count}`;
    catalogContainer.appendChild(info);
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

    addBtn.addEventListener("click", async () => {
      await fetch("/basket", {
        method: "POST",
        body: JSON.stringify(
          new Product(id, name, price, currency, count, url)
        ),
        headers: {
          "Content-type": "application/json",
        },
      });
      newBasket.resetBasket();
      newBasket.createBasketList();
      newBasket.basketSum();
      newBasket.isEmpty();
    });

    return productCard;
  }
}

//----------------------Каталог--------------------------
class Catalog {
  constructor() {
    this.items = [];
    this.newProduct = null;
  }

  init() {
    this.receiveCatalog();
  }

  sendRequest(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
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

  receiveCatalog() {
    this.sendRequest("./goods")
      .then(
        (goods) => {
          goods.forEach((p) => {
            this.items.push(
              new Product(p.id, p.name, p.price, p.currency, p.count, p.url)
            );
          });
        },
        (status) => {
          console.log("Error", "Status code:", status);
        }
      )
      .then(() => {
        this.items.forEach((p) => {
          this.newProduct = Product.prototype.createProductCard(
            p.id,
            p.name,
            p.price,
            p.currency,
            p.count,
            p.url
          );
          catalogContainer.appendChild(this.newProduct);
        });
      });
  }
}

//-------------------Корзина-----------------------------
class Basket {
  constructor() {
    this.totalPrice = 0;
    this.totalCount = 0;
  }

  async init() {
    await this.basketSum();
    await this.isEmpty();
  }

  async basketSum() {
    this.totalPrice = 0;
    this.totalCount = 0;
    await fetch("/basket")
      .then((responce) => responce.json())
      .then((basket) => {
        basket.forEach((el) => {
          this.totalPrice += el.price * el.count;
          this.totalCount += el.count;
        });
      });
  }

  async createBasketList() {
    await fetch("/basket")
      .then((responce) => responce.json())
      .then((basket) => {
        basket.forEach((p) => {
          this.createBasketCard(p.name, p.id, p.count);
        });
      });
  }

  async isEmpty() {
    await fetch("/basket")
      .then((responce) => responce.json())
      .then((basket) => {
        if (basket.length) {
          sumBasketSpan.textContent = `Total price: ${this.totalPrice} RUB `;
          countBasketSpan.textContent = `Total count: ${this.totalCount}`;
          this.showClearBtn();
          this.showOrderBtn();
        } else {
          sumBasketSpan.textContent = "";
          countBasketSpan.textContent = "Basket is empty...";
          this.hideClearBtn();
          this.hideOrderBtn();
        }
      });
  }

  createBasketCard(name, id, count) {
    const inBasketProductCard = document.createElement("div");
    inBasketProductCard.classList.add("prod__card");
    const inBasketProductName = document.createElement("p");
    inBasketProductName.classList.add("basket__prod");
    inBasketProductName.textContent = `${name}`;
    inBasketProductName.setAttribute("id", `${id}`);

    const inBasketProductCount = document.createElement("span");
    inBasketProductCount.textContent = `${count}`;

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.classList.add("minus__btn");
    minusBtn.setAttribute("id", `${id}`);

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.classList.add("plus__btn");
    plusBtn.setAttribute("id", `${id}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete__btn");
    deleteBtn.setAttribute("id", `${id}`);

    inBasketProductName.appendChild(inBasketProductCount);
    inBasketProductCard.appendChild(minusBtn);
    inBasketProductCard.appendChild(inBasketProductName);
    inBasketProductCard.appendChild(plusBtn);
    inBasketProductCard.appendChild(deleteBtn);
    basketListContainer.appendChild(inBasketProductCard);

    minusBtn.addEventListener("click", async (e) => {
      if (count > 1) {
        await fetch(`/basket/${e.target.id}`, {
          method: "PATCH",
          body: JSON.stringify({ count: count - 1 }),
          headers: {
            "Content-type": "application/json",
          },
        });
        await this.basketSum();
        await this.isEmpty();
        this.resetBasket();
        await this.createBasketList();

        sumBasketSpan.textContent = `Total price: ${this.totalPrice} RUB `;
      }
    });

    plusBtn.addEventListener("click", async (e) => {
      await fetch(`/basket/${e.target.id}`, {
        method: "PATCH",
        body: JSON.stringify({ count: count + 1 }),
        headers: {
          "Content-type": "application/json",
        },
      });
      await this.basketSum();
      await this.isEmpty();
      this.resetBasket();
      await this.createBasketList();
      sumBasketSpan.textContent = `Total price: ${this.totalPrice} RUB `;
    });

    deleteBtn.addEventListener("click", async (e) => {
      await fetch(`/basket/${e.target.id}`, {
        method: "DELETE",
      });
      sumBasketSpan.textContent = `Total price: ${this.totalPrice} RUB `;
      await this.basketSum();
      await this.isEmpty();
      this.resetBasket();
      await this.createBasketList();
    });
  }

  resetBasket() {
    basketListContainer.innerHTML = "";
  }

  async clearBasket() {
    await fetch("/basket")
      .then((responce) => responce.json())
      .then((basket) => {
        basket.forEach((el) => {
          fetch(`basket/${el.id}`, {
            method: "DELETE",
          });
        });
      });
    basketListContainer.innerHTML = "";
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

catalog = new Catalog();
newBasket = new Basket();
formBtns = new FormBtns();

//--------------Валидация форм----------------------------------

const name = document.querySelector(".name");
const number = document.querySelector(".number");
const email = document.querySelector(".email");
const nameInput = document.querySelector("#name");
const numberInput = document.querySelector("#number");
const emailInput = document.querySelector("#email");

const repeatName = document.createElement("p");
repeatName.textContent =
  "Имя может содержать только латинские буквы(3-16 символов)";
repeatName.style.color = "red";

const repeatNumber = document.createElement("p");
repeatNumber.textContent = "Введите номер в формате +7(ххх)ххх-хххх";
repeatNumber.style.color = "red";

const repeatMail = document.createElement("p");
repeatMail.textContent =
  "mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.";
repeatMail.style.color = "red";

const formValidation = () => {
  let nameRegExp = /^[a-z]{3,16}$/i;

  if (!nameRegExp.test(nameInput.value)) {
    nameInput.style.borderColor = "red";
    name.appendChild(repeatName);
    return false;
  } else {
    nameInput.style.borderColor = "green";
    repeatName.textContent = "Вы можете использовать это имя";
    repeatName.style.color = "green";
  }

  let numberRegExp = /^\+7\(\d{3}\)\d{3}-\d{4}$/;

  if (!numberRegExp.test(numberInput.value)) {
    numberInput.style.borderColor = "red";
    number.appendChild(repeatNumber);
    return false;
  } else {
    numberInput.style.borderColor = "green";
    repeatNumber.textContent = "Корректный формат номера";
    repeatNumber.style.color = "green";
  }

  let emailRegExp = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2})$/i;

  if (!emailRegExp.test(emailInput.value)) {
    emailInput.style.borderColor = "red";
    email.appendChild(repeatMail);
    return false;
  } else {
    emailInput.style.borderColor = "green";
    repeatMail.textContent = "Вы можете использовать эту почту";
    repeatMail.style.color = "green";
  }
  return true;
};
