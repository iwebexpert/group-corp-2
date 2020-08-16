const catalogContainer = document.getElementById("catalog");
const basketContainer = document.getElementById("basket");
const emptyBasket = document.createElement("div");
emptyBasket.textContent = "Basket is empty";
basketContainer.appendChild(emptyBasket);

// Офрмление корзины
const sumBasket = document.createElement("div");
const sumBasketSpan = document.createElement("span");
sumBasketSpan.textContent = "Total price:";
sumBasket.appendChild(sumBasketSpan);

const countBasket = document.createElement("div");
const countBasketSpan = document.createElement("span");
countBasketSpan.textContent = "Total count:";
countBasket.appendChild(countBasketSpan);

const totalSpan = document.createElement("span");
countBasket.appendChild(totalSpan);
let total = 0;

const totalBasketPrice = document.createElement("span");
sumBasket.appendChild(totalBasketPrice);
let totalPrice = 0;

basketContainer.appendChild(sumBasket);
basketContainer.appendChild(countBasket);

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
}

class Catalog {
  constructor() {
    this.items = [];
    this.catalogCount = 0;
  }

  addProduct(item) {
    if (item && item instanceof Product) {
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
    const addBtnText = document.createElement("span");
    addBtnText.textContent = "Add product";
    addBtn.classList.add("add__btn");
    addBtn.classList.add(`${name}`);
    addBtn.appendChild(addBtnText);

    productCard.appendChild(productName);
    productCard.appendChild(productPrice);
    productCard.appendChild(productImage);
    productCard.appendChild(productCount);
    productCard.appendChild(addBtn);

    addBtn.addEventListener("click", function (event) {
      let target = event.target;
      if (!(target.className === name)) {
        const inBasketProduct = document.createElement("div");
        inBasketProduct.classList.add("basket__card");

        const inBasketProductName = document.createElement("div");
        inBasketProductName.classList.add(`${name}`);

        inBasketProductName.textContent = `${name}`;

        const inBasketProductCount = document.createElement("div");
        inBasketProductName.classList.add(`${name}`);
        inBasketProductCount.setAttribute("id", `${id}`);
        inBasketProductCount.textContent = `${productCount.value}`;

        const inBasketProductTotal = document.createElement("div");
        inBasketProductTotal.setAttribute("id", `${name}`);

        let totalProdPrice = price * productCount.value;

        inBasketProductTotal.textContent = ` ${totalProdPrice} ${currency}`;

        inBasketProduct.appendChild(inBasketProductName);
        inBasketProduct.appendChild(inBasketProductCount);
        inBasketProduct.appendChild(inBasketProductTotal);
        basketContainer.appendChild(inBasketProduct);

        let prodCount = document.getElementById(`${id}`);

        total += +prodCount.innerHTML;
        totalSpan.textContent = `${total}`;

        let prodFullPrice = document.getElementById(`${name}`);
        totalPrice += parseInt(prodFullPrice.innerHTML);
        totalBasketPrice.textContent = `${totalPrice} ${currency}`;

        emptyBasket.remove();
      }
    });

    return productCard;
  }

  // Создание списка каталога
  createCatalog() {
    newCatalog.items.forEach((p) => {
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
newCatalog = new Catalog();
newCatalog.addProduct(tshort, 1);
newCatalog.addProduct(shoes, 1);
newCatalog.addProduct(dress, 1);
newCatalog.addProduct(socks, 1);
newCatalog.createCatalog();
