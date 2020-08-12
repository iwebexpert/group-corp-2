const basketContainer = document.querySelector("#root");

class Product {
  constructor(name, price, currency, count) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.count = count;
  }

  getInfo() {
    console.log(
      `Name: ${this.name}, Price: ${this.price} ${this.currency}, Count: ${this.count}`
    );
  }

  setName(value) {
    if (value && value.length > 2 && value.length <= 15) {
      this._name = value;
    }
  }

  calcDiscount(percent) {
    if (this.price) {
      this.price *= 1 - percent / 100;
    }
  }

  increaseCount() {
    this.count++;
  }

  decreaseCount() {
    if (this.count > 0) {
      this.count--;
    }
  }

  deletePurchase() {
    this.count = 0;
  }

  priceToDollar() {
    this.price = Math.round((this.price / 73.4) * 100) / 100;
    this.currency = "Dollars";
  }

  priceToEuro() {
    this.price = Math.round((this.price / 86.5) * 100) / 100;
    this.currency = "Euro";
  }
}

let tshort = new Product("T-short", 700, "Rub", 1);
let shoes = new Product("Shoes", 5000, "Rub", 1);
let dress = new Product("Dress", 3500, "Rub", 1);
let socks = new Product("Socks", 350, "Rub", 1);

class Basket {
  constructor(user) {
    this.user = user;
    this.purchases = [];
    this.total = 0;
    this.basketCount = 0;
  }

  addPurchase(item, count) {
    if (item && item instanceof Product && count > 0) {
      this.purchases.push(item);
      return this;
    } else {
      console.log("Нет в наличии");
    }
  }

  getSum() {
    let totalPrice = 0;
    this.purchases.forEach((p) => {
      this.total += p.price * p.count;
      return (totalPrice = `${this.total} ${p.currency}`);
    });
    `Total price: ${totalPrice}`;
  }

  getBasketCount() {
    let totalCount = 0;
    this.purchases.forEach((p) => {
      this.basketCount += p.count;
      return (totalCount = this.basketCount);
    });
  }
}
let newBasket = new Basket("Evgeny");
newBasket.addPurchase(tshort, 1);
newBasket.addPurchase(shoes, 1);
newBasket.addPurchase(dress, 1);
newBasket.addPurchase(socks, 1);

newBasket.getSum();
newBasket.getBasketCount();

// Создание карточки товара

function createPurchase(name, price, currency, count) {
  const purchase = document.createElement("div");
  purchase.setAttribute("class", "purchase");

  const purchaseName = document.createElement("div");
  purchaseName.textContent = `Name: ${name}`;
  purchaseName.setAttribute("class", "name");

  const purchasePrice = document.createElement("span");
  purchasePrice.textContent = `Price: ${price}`;
  purchasePrice.setAttribute("class", "price");

  const purchaseCurrency = document.createElement("span");
  purchaseCurrency.textContent = `${currency}`;
  purchaseCurrency.setAttribute("class", "currency");

  const purchaseCount = document.createElement("div");
  purchaseCount.textContent = `Count: ${count}`;

  purchase.appendChild(purchaseName);
  purchase.appendChild(purchasePrice);
  purchase.appendChild(purchaseCurrency);
  purchase.appendChild(purchaseCount);

  return purchase;
}

// Генерация списка товаров

window.onload = function () {
  newBasket.purchases.forEach((p) => {
    newPurchase = createPurchase(p.name, p.price, p.currency, p.count);
    basketContainer.appendChild(newPurchase);
  });

  if (newBasket.basketCount > 0) {
    const notEmptyBasketMassage = document.createElement("div");
    notEmptyBasketMassage.setAttribute("class", "totalMassage");
    notEmptyBasketMassage.textContent = `В корзине ${newBasket.basketCount} товаров, на сумму ${newBasket.total} ${tshort.currency}`;

    basketContainer.appendChild(notEmptyBasketMassage);
  } else {
    const emptyBasketMassage = document.createElement("div");
    emptyBasketMassage.setAttribute("class", "totalMassage");
    emptyBasketMassage.textContent = "Корзина пуста";

    basketContainer.appendChild(emptyBasketMassage);
  }
};
