class Product {
  constructor(id, name, quantity, valute, price, url) {
    (this.id = id),
      (this.name = name),
      (this.quantity = quantity),
      (this.valute = valute),
      (this.price = price),
      (this.url = url);
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

  quantityInCart() {
    const totalQuantity = this.basket.reduce((sum, element) => {
      sum++;
      return sum;
    }, 0);
    return `количество ${totalQuantity}`;
  }

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

  createGalery(e) {
    let productID = e.target.getAttribute("data-id");
    let next = document.querySelector(".arrow-next");
    let prev = document.querySelector(".arrow-prev");
    let inner = document.querySelector(".popup__inner");
    let product = this.basket.find(element => element.id == productID);

    if (product.url.length == 1) {
      return;
    }

    let slideNow = 1;
    let slideCount = product.url.length;
    let viewport = 750;
    inner.style.transform = "translate(0, 0)";

    next.addEventListener("click", e => {
      if (slideNow == slideCount) {
        inner.style.transform = " translate(0, 0)";
        slideNow = 1;
      } else {
        let widthCount = -viewport * slideNow;
        inner.style.transform = " translate(" + widthCount + "px, 0)";
        slideNow++;
      }
    });

    prev.addEventListener("click", e => {
      if (slideNow == 1) {
        let widthCount = -viewport * (slideCount - 1);
        inner.style.transform = " translate(" + widthCount + "px, 0)";
        slideNow = slideCount;
      } else {
        let widthCount = -viewport * (slideNow - 2);
        slideNow--;
        inner.style.transform = " translate(" + widthCount + "px, 0)";
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

  closePopup() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".popup").style.visibility = "hidden";
  }

  showPopup() {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".popup").style.visibility = "visible";
  }

  renderProductInCart() {
    let cart = document.querySelector("#cart");
    cart.innerHTML = "";

    this.basket.forEach(element => {
      let product = document.createElement("div");
      product.classList.add("cart__item");
      product.setAttribute("data-id", element.id);
      product.addEventListener("click", e => {
        this.createGalery(e);
      });

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

      product.append(name);
      product.append(quantity);
      product.append(cost);
      product.append(button);

      cart.append(product);
    });
  }

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

  addToCart(element) {
    this.basket.push(element);
    this.renderCart(`${this.countBasketPrice()} ${this.quantityInCart()}`);
    this.renderProductInCart();
  }

  clearCart() {
    this.basket = [];
    this.renderCart("Корзина пуста");
    document.querySelector("#cart").innerHTML = "";
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

function generationDOM(elements) {
  let cart = new Backet();

  if (cart.basket.length == 0) {
    cart.renderCart("Корзина пуста");
  }

  let cartBaket = document.querySelector("#catalog");
  document
    .querySelector(".btn--clear")
    .addEventListener("click", () => cart.clearCart());

  for (let i = 0; i < elements.length; i++) {
    let img = document.createElement("img");
    img.classList.add("img");
    img.setAttribute("src", `${elements[i].url[0]}`);

    let element = document.createElement("div");
    element.classList.add("catalog__item");

    let title = document.createElement("p");
    title.textContent = elements[i].name;

    let price = document.createElement("p");
    price.textContent = `${elements[i].price}  ${elements[i].valute}`;

    let buyBtn = document.createElement("button");
    buyBtn.classList.add("btn");
    buyBtn.textContent = "В корзину";
    buyBtn.addEventListener("click", e => cart.addToCart(elements[i]));

    element.append(img);
    element.append(title);
    element.append(price);
    element.append(buyBtn);

    cartBaket.append(element);
  }
}

generationDOM(products);
