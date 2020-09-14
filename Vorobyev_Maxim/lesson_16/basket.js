class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class Basket {
  constructor(items) {
    this.items = items;
  }

  addToBasket(item) {
    this.items.push(item);
  }

  getCountAllBasketProducts() {
    return this.items.length;
  }

  countEachItem(arr) {
    let result = arr.reduce(function(acc, el) {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});
    return result;
  }

  countSumBasket() {
    let sum = 0;
    for (let i = 0; i < this.items.length; i++) {
      sum += +this.items[i].price;
    }
    return sum;
  }

  deleteFromBasket(i) {
    this.items.splice(i, 1);
  }

  createBasketMarking(name, count, price) {
    let basketCard = document.getElementById("basket__products");
    let card = this.createElement("div", "basket__card");
    let basketCardName = this.createElement("h3", "basket__products__name");
    basketCardName.textContent = name;
    card.append(basketCardName);
    let basketCardCount = this.createElement("p", "basket__products__count");
    basketCardCount.textContent = count;
    card.append(basketCardCount);
    let buttonsBlock = this.createElement("div", "basket__buttons__block");
    let minusButton = this.createElement("button", "basket__item__minus");
    minusButton.textContent = "-";
    let plusButton = this.createElement("button", "basket__item__plus");
    plusButton.textContent = "+";
    buttonsBlock.append(minusButton);
    buttonsBlock.append(plusButton);
    card.append(buttonsBlock);
    let basketCardPrice = this.createElement("p", "basket__products__price");
    basketCardPrice.textContent = price;
    card.append(basketCardPrice);
    let basketItemTotalPrice = this.createElement("p", "basket__item__total");
    basketItemTotalPrice.textContent = count * price;
    card.append(basketItemTotalPrice);
    basketCard.append(card);
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }
}

let namesArr = [];
let pricesArr = [];
let productsArr = [];
let boolflag = false;
window.onload = function() {
  if (localStorage.getItem("flag")) {
    namesArr = localStorage.getItem("getName").split(",");
    pricesArr = localStorage.getItem("getPrice").split(",");
  }

  for (let i = 0; i < namesArr.length; i++) {
    productsArr[i] = new Product(namesArr[i], pricesArr[i]);
  }

  document.getElementById("order__sum").textContent = basket.countSumBasket();
  let pr = 0;
  if (!boolflag) {
    for (let key in basket.countEachItem(namesArr)) {
      switch (key) {
        case "Playstation 5 DE":
          pr = 500;
          break;
        case "Playstation 5":
          pr = 600;
          break;
        case "DualSense":
          pr = 70;
          break;
        case "Wireless Headset":
          pr = 100;
          break;
        case "DualSense Bl":
          pr = 70;
          break;
        case "VR":
          pr = 300;
          break;
        case "Spider Man":
          pr = 160;
          break;
        case "Game Set":
          pr = 250;
          break;
      }
      basket.createBasketMarking(key, basket.countEachItem(namesArr)[key], pr);
      for (let i = 0; i < document.getElementsByClassName("basket__item__plus").length; i++) {
        document.getElementsByClassName("basket__item__plus")[i].addEventListener("click", eventHandler);
        document.getElementsByClassName("basket__item__minus")[i].addEventListener("click", eventHandler);
      }
    }
    boolflag = true;
  }
}

const basket = new Basket(productsArr);
for (let i = 0; i < document.getElementsByClassName("basket__show").length; i++) {
  document.getElementsByClassName("basket__show")[i].addEventListener("click", showBlock);
}

let flag = true;

function showBlock() {
  if (!flag) {
    document.getElementById("basket__products").style.display = "block";
    document.getElementsByClassName("show")[0].textContent = "Hide Basket";
    flag = true;
    flagAddress = true;
    showAddress();
    flagComment = true;
    showComment();
  } else {
    document.getElementById("basket__products").style.display = "none";
    document.getElementsByClassName("show")[0].textContent = "Show Basket";
    flag = false;
  }
}

let flagAddress = false;
document.getElementsByClassName("address__show")[0].addEventListener("click", showAddress);

function showAddress() {
  if (!flagAddress) {
    document.getElementById("address__input").style.display = "block";
    document.getElementsByClassName("show")[1].textContent = "Hide Address";
    flagAddress = true;
    flag = true;
    showBlock();
    flagComment = true;
    showComment();
  } else {
    document.getElementById("address__input").style.display = "none";
    document.getElementsByClassName("show")[1].textContent = "Show Address";
    flagAddress = false;
  }
}

let flagComment = false;
document.getElementsByClassName("comment__show")[0].addEventListener("click", showComment);

function showComment() {
  if (!flagComment) {
    document.getElementById("comment__input").style.display = "block";
    document.getElementsByClassName("show")[2].textContent = "Hide Comment";
    flagAddress = true;
    showAddress();
    flag = true;
    showBlock();
    flagComment = true;
  } else {
    document.getElementById("comment__input").style.display = "none";
    document.getElementsByClassName("show")[2].textContent = "Show Comment";
    flagComment = false;
  }
}


function eventHandler(event) {
  const cards = document.getElementsByClassName("basket__card");
  for (i = 0; i < cards.length; i++) {
    if (event.target.className == "basket__item__plus") {
      cards[i].onclick = indexFuncPlus(i);
    } else {
      cards[i].onclick = indexFuncMinus(i);
    }
  }
}

for (let i = 0; i < document.getElementsByClassName("basket__item__plus").length; i++) {
  document.getElementsByClassName("basket__item__plus")[i].addEventListener('click', async () => {
    const data = await fetch('/basket', {
      method: 'POST',
      body: JSON.stringify(productsArr[0]),
      headers: {
        'Content-type': 'application/json',
      },
    });

    console.log(data);
  });
}

function indexFuncPlus(i) {
  return function() {
    basket.addToBasket(productsArr[i]);
    document.getElementsByClassName("basket__products__count")[i].textContent++;
    document.getElementsByClassName("basket__item__total")[i].textContent = document.getElementsByClassName("basket__products__count")[i].textContent *
      document.getElementsByClassName("basket__products__price")[i].textContent;
    document.getElementById("order__sum").textContent = basket.countSumBasket();
  }
}

function indexFuncMinus(i) {
  return function() {
    basket.deleteFromBasket(i);
    document.getElementsByClassName("basket__products__count")[i].textContent--;
    document.getElementsByClassName("basket__item__total")[i].textContent = document.getElementsByClassName("basket__products__count")[i].textContent *
      document.getElementsByClassName("basket__products__price")[i].textContent;
    if (document.getElementsByClassName("basket__products__count")[i].textContent == 0) {
      document.getElementsByClassName("basket__card")[i].remove();
    }
    document.getElementById("order__sum").textContent = basket.countSumBasket();
    if (!basket.countSumBasket()) {
      alert("Basket is empty");
    }
  }
}