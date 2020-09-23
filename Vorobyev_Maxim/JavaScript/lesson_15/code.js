class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

function makeGETRequest(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status !== 200) {
          reject(xhr.status);
        }
        const products = JSON.parse(xhr.responseText);
        resolve(products);
      }
    };
    xhr.send();
  });
}

class ProductList {
  GetDataFromDB() {
    makeGETRequest("http://localhost:3000/goods").
    then(items => {
      this.renderList(items);
    }).catch(error => console.log(error));
  }

  renderList(items) {
    const cards = document.getElementsByClassName("cards")[0];
    for (let i = 0; i < items.length; i++) {
      let card = this.createElement("div", "card");
      let cardPicture = this.createElement("div", "card__picture");
      let img = this.createElement("img");
      img.src = items[i].picture;
      if (i > 1) {
        img.style.width = "250px";
      }
      cardPicture.append(img);
      card.append(cardPicture);

      let cardInfo = this.createElement("div", "card__info");
      let cardName = this.createElement("h3", "name");
      cardName.textContent = items[i].title;
      cardInfo.append(cardName);
      card.append(cardInfo);

      let cardBuy = this.createElement("div", "card__buy");
      let buyPrice = this.createElement("div", "buy__price");
      let price = this.createElement("span", "price");
      price.textContent = items[i].price + "$";
      let buyNow = this.createElement("span", "buy__now");
      buyNow.textContent = "Buy Now";
      buyPrice.append(price);
      cardBuy.append(buyPrice);
      cardBuy.append(buyNow);
      card.append(cardBuy);
      cards.append(card);
    }
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }
}

//json-server --watch ./db.json --static ./

let productList = new ProductList();
productList.GetDataFromDB();

let productsArray = []; //массив товаров
window.onload = function() {
  for (let i = 0; i < document.getElementsByClassName("card").length; i++) {
    productsArray[i] = new Product(document.getElementsByClassName("name")[i].textContent, document.getElementsByClassName("price")[i].textContent.replace("$", ""));
    document.getElementsByClassName("card__buy")[i].addEventListener("click", eventHandler);
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

const basket = new Basket();
function eventHandler(event) {
  const cards = document.getElementsByClassName("card");
  for (i = 0; i < cards.length; i++) {
    cards[i].onclick = indexFunc(i);
  }
}


function indexFunc(i) {
  return async function() {
    basket.addToBasket(productsArray[i]);
    console.log(productsArray[i]);
    const data = await fetch('/basket', {
      method: 'POST',
      body: JSON.stringify({"name": "hhh"}),
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log(i + 1);
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