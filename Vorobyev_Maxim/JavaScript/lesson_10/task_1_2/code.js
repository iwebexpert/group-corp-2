class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class Basket {
  constructor(...items) {
    this.items = items;
  }

  addToBasket(item) {
    this.items.push(item);
  }

  getCountAllBasketProducts() {
    return this.items.length;
  }

  countSumBasket() {
    let sum = 0;
    for (let i = 0; i < this.items.length; i++) {
      sum += +this.items[i].price;
    }
    return sum;
  }
}

// заполнение массива товаров + событие нажатия на кнопку
let productsArray = []; //массив товаров
for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
  productsArray[i] = new Product(document.getElementsByClassName("name")[i].textContent, document.getElementsByClassName("price")[i].textContent.replace("$", ""));
  document.getElementsByClassName("card__buy")[i].addEventListener("click", eventHandler);
}


const basket = new Basket();
//добавление в корзину по клику + пересчет
function eventHandler(event) {
  const cards = document.getElementsByClassName("card");
  for (i = 0; i < cards.length; i++) {
    cards[i].onclick = indexFunc(i);
  } 
}
function indexFunc(i) {
  return function () {
    basket.addToBasket(productsArray[i]);
    document.getElementsByClassName("basket__counter")[0].textContent = basket.getCountAllBasketProducts();
    document.getElementsByClassName("basket__price")[0].textContent = basket.countSumBasket() + "$";
  }
}

document.getElementsByClassName("basket")[0].addEventListener("click", setData);
function setData() {
  if (basket.countSumBasket() == 0) {
    alert("Basket Is Empty");
    return false;
  } else {
    open("basket.html");
  }

  basketNames = [];
  basketPrices = []
  for (let i = 0; i < basket.items.length; i++) {
    basketNames[i] = basket.items[i].name;
    basketPrices[i] = basket.items[i].price;
  }
  localStorage.setItem("flag", true);
  for (let i = 0; i < basket.items.length; i++) {
    localStorage.setItem("getName", basketNames);
    localStorage.setItem("getPrice", basketPrices);
  }
}
