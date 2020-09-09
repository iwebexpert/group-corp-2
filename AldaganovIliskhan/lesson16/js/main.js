let arrangeBtn = document.querySelector(".cart__arrange-btn");
let addressNext = document.createElement("button");
let commentNext = document.createElement("button");
let formNext = document.createElement("button");
let clearBtn = document.createElement("button");
let sendFormBtn = document.createElement("button");

class Product {
  constructor(name, price, currency, id) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.id = id;
  }
}
class Cart {
  constructor() {
    this.address = document.createElement("input");
    this.cartArrange = document.querySelector(".cart__arrange");
    this.comment = document.createElement("input");
    this.name = document.createElement("input");
    this.email = document.createElement("input");
    this.phone = document.createElement("input");
    this.sum = 0;
  }
  sendRequest() {
    axios.get("/goods").then(({ data }) => {
      this.renderProducts(data);
    });
  }
  renderProducts(data) {
    const catalogBlocks = document.createElement("div");
    catalogBlocks.classList.add("catalog__blocks");
    data.map((item) => {
      const catalog = document.querySelector(".catalog");
      const catalogBlock = document.createElement("div");
      catalogBlock.classList.add("catalog__block");
      const catalogBlockTitle = document.createElement("h3");
      catalogBlockTitle.classList.add("catalog__block-title");
      const catalogBlockImg = document.createElement("img");
      catalogBlockImg.classList.add("catalog__block-img");
      catalogBlockImg.setAttribute("src", item.img);
      const addButton = document.createElement("button");
      const catalogBlockPrice = document.createElement("p");
      catalogBlockPrice.classList.add("catalog__block-price");
      addButton.classList.add(`add-${item.class}`);
      const deleteButton = document.createElement("button");
      deleteButton.classList.add(`delete-${item.class}`);
      catalogBlockTitle.textContent = item.title;
      catalogBlockPrice.textContent = `Стоимость : ${item.price}`;
      addButton.textContent = "Добавить";
      deleteButton.textContent = "Удалить";
      catalog.appendChild(catalogBlocks);
      catalogBlocks.appendChild(catalogBlock);
      catalogBlock.appendChild(catalogBlockTitle);
      catalogBlock.appendChild(catalogBlockImg);
      catalogBlock.appendChild(catalogBlockPrice);
      catalogBlock.appendChild(addButton);
      catalogBlock.appendChild(deleteButton);
    });
  }
  addProductToCart(e) {
    if (e.target.className === "add-keyboard") {
      axios.post("http://localhost:3000/cart", {
        title: "Клавиатура",
        price: 3000,
        class: "keyboard",
      });
    } else if (e.target.className === "add-mouse") {
      axios.post("http://localhost:3000/cart", {
        title: "Мышка",
        price: 500,
        class: "mouse",
      });
    } else if (e.target.className === "add-monitor") {
      axios.post("http://localhost:3000/cart", {
        title: "Монитор",
        price: 2000,
        class: "monitor",
      });
    } else {
      return;
    }
    this.countCartPrice();
  }
  deleteProductFromCart(e) {
    if (
      e.target.className === "delete-keyboard" ||
      e.target.className === "delete-mouse" ||
      e.target.className === "delete-monitor"
    ) {
      axios.get("cart").then(({ data }) => {
        let className = e.target.className.split("delete-")[1];
        data.map((item, i) => {
          if (className === item.class) {
            data.splice(i, 1);
            axios.delete("http://localhost:3000/cart/" + item.id);
            this.countCartPrice();
          }
        });
      });
    } else {
      return;
    }
  }
  showBasket(e) {
    if (e.target.className === "cart__arrange-btn") {
      this.address.style.display = "block";
      addressNext.style.display = "block";
      addressNext.classList.add("address-next");
      this.address.classList.add("adress-input");
      this.address.placeholder = "Введите адрес";
      addressNext.textContent = "Далее";
      this.cartArrange.appendChild(this.address);
      this.cartArrange.appendChild(addressNext);
      arrangeBtn.style.display = "none";
      this.address.value = "";
      this.comment.value = "";
      this.name.value = "";
      this.phone.value = "";
      this.email.value = "";
      this.phone.style.border = "2px solid black";
      this.email.style.border = "2px solid black";
      this.name.style.border = "2px solid black";
    } else {
      return;
    }
  }
  showComment(e) {
    if (e.target.className === "address-next") {
      this.address.style.display = "none";
      addressNext.style.display = "none";
      this.comment.style.display = "block";
      commentNext.style.display = "block";
      commentNext.textContent = "Далее";
      commentNext.classList.add("comment-next");
      this.comment.placeholder = "Введите комментарий";
      this.cartArrange.appendChild(this.comment);
      this.cartArrange.appendChild(commentNext);
    } else {
      return;
    }
  }
  showForm(e) {
    if (e.target.className === "comment-next") {
      let formButtons = document.createElement("div");
      let formTitle = document.createElement("h3");
      formTitle.textContent =
        "Заполните форму и нажмите отправить или нажмите далее";
      formButtons.classList.add("form-buttons");
      this.comment.style.display = "none";
      commentNext.style.display = "none";
      formNext.textContent = "Далее";
      formNext.classList.add("form-next");
      sendFormBtn.textContent = "Отравить";
      this.name.placeholder = "Имя(на латинице от 3-16 символов)";
      this.phone.placeholder = "Номер телефона(в формате +7xxxxxxxxxx)";
      this.email.placeholder = "Почта(например example@mail.ru)";
      this.name.style.display = "block";
      this.email.style.display = "block";
      this.phone.style.display = "block";
      formButtons.style.display = "flex";
      sendFormBtn.style.display = "inline-block";
      formNext.style.display = "inline-block";
      this.cartArrange.appendChild(formTitle);
      this.cartArrange.appendChild(this.name);
      this.cartArrange.appendChild(this.phone);
      this.cartArrange.appendChild(this.email);
      this.cartArrange.appendChild(formButtons);
      sendFormBtn.classList.add("send-form");
      formButtons.appendChild(sendFormBtn);
      formButtons.appendChild(formNext);
    } else {
      return;
    }
  }
  formValidation(e) {
    if (e.target.className === "send-form") {
      let nameRegExp = /^[a-z]{3,16}$/i;
      let phoneRegExp = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
      let emailRegExp = /^([a-z0-9_.-]+)@([a-z0-9_.-]+)\.([a-z]{2})$/i;
      if (
        !nameRegExp.test(this.name.value) &&
        !phoneRegExp.test(this.phone.value) &&
        !emailRegExp.test(this.email.value)
      ) {
        this.email.style.border = "2px solid red";
        this.name.style.border = "2px solid red";
        this.phone.style.border = "2px solid red";
      }
      if (!nameRegExp.test(this.name.value)) {
        this.name.style.border = "2px solid red";
      } else {
        this.name.style.border = "2px solid black";
      }
      if (!phoneRegExp.test(this.phone.value)) {
        this.phone.style.border = "2px solid red";
      } else {
        this.phone.style.border = "2px solid black";
      }
      if (!emailRegExp.test(this.email.value)) {
        this.email.style.border = "2px solid red";
      } else {
        this.email.style.border = "2px solid black";
      }
      if (
        nameRegExp.test(this.name.value) &&
        phoneRegExp.test(this.phone.value) &&
        emailRegExp.test(this.email.value)
      ) {
        alert("Ваша форма отправлена!");
      }
    } else {
      return;
    }
  }
  showTotal(e) {
    if (e.target.className === "form-next") {
      this.phone.style.display = "none";
      this.name.style.display = "none";
      this.email.style.display = "none";
      formNext.style.display = "none";
      sendFormBtn.style.display = "none";
      this.total = document.createElement("p");
      clearBtn.classList.add("clear-btn");
      clearBtn.textContent = "Заказать снова";
      clearBtn.style.display = "block";
      this.total.textContent = `Итоговая стоимость корзины ${this.sum}. Адрес : ${this.address.value}. Комментарий : ${this.comment.value}`;
      this.cartArrange.appendChild(this.total);
      this.cartArrange.appendChild(clearBtn);
      this.cartItems = [];
    }
  }
  clearCart(e) {
    if (e.target.className === "clear-btn") {
      arrangeBtn.style.display = "block";
      this.cartArrange.appendChild(arrangeBtn);
      this.total.style.display = "none";
      clearBtn.style.display = "none";
    } else {
      return;
    }
  }
  countCartPrice() {
    axios.get("http://localhost:3000/cart").then(({ data }) => {
      this.sum = data.reduce((amount, item) => (amount += item.price), 0);
      let priceSum = document.querySelector(".price-sum");
      if (!data.length) {
        priceSum.textContent = "В корзине пусто";
      } else {
        priceSum.textContent = `В корзине товаров (${data.length})   на сумму ${this.sum}`;
      }
      ``;
    });
  }
}

let cart = new Cart();
document.addEventListener("DOMContentLoaded", () => {
  cart.sendRequest();
  cart.countCartPrice();
});
document.addEventListener("click", (e) => {
  cart.addProductToCart(e);
  cart.deleteProductFromCart(e);
  cart.showBasket(e);
  cart.showComment(e);
  cart.clearCart(e);
  cart.showForm(e);
  cart.showTotal(e);
  cart.formValidation(e);
});
