class Product {
  constructor(pictureURL, name, count, price) {
    this.pictureURL = pictureURL;
    this.name = name;
    this.count = count;
    this.price = price;
  }

  createMarking() {
    const cards = document.getElementById("shop_cards");
    const card = this.createElement("div", "card");
    cards.append(card);
    const picture = this.createElement("img", "card_picture");
    picture.src = this.pictureURL;
    card.append(picture);
    const card_info = this.createElement("div", "card_info");
    const card_name = this.createElement("h3", "card_header");
    card_name.textContent = `${this.name}`;
    const card_count = this.createElement("p", "card_count");
    card_count.textContent = `${this.count}`;
    const card_price = this.createElement("p", "card_price");
    card_price.textContent = `${this.price}`;
    card_info.append(card_name);
    card_info.append(card_count);
    card_info.append(card_price);
    card.append(card_info);
    const card_button = this.createElement("button", "card_button");
    card_button.textContent = "Добавить в корзину";
    card.append(card_button);
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    } 
    return element;
  }
}

class Bin {
  constructor(...binItems) {
    this.binItems = binItems;
  }

  uniqueProduct(obj) {
    let boolFlag = false;
    for (let i = 0; i < this.binItems.length; i++) {
      if (this.binItems[i].name == obj.name) {
        boolFlag = true;
      } 
    }
    obj.counter++;
    return boolFlag;
  }

  addToBin(obj) {
    if (!this.uniqueProduct(obj)) {
      const bin = document.getElementById("bin");
      const binCards = this.createElement("div", "bin_cards");
      const binCard = this.createElement("div", "bin_card");
      const binCardName = this.createElement("h4", "bin_card_name");
      binCardName.textContent = `Наименование товара: ${obj.name}`;
      const binCardPrice = this.createElement("p", "bin_card_price");
      binCardPrice.textContent = `Цена: ${obj.price}`;
      binCard.append(binCardName);
      binCard.append(binCardPrice);
      binCards.append(binCard);
      bin.append(binCards);
    }
    this.binItems.push(obj);
  }

  countBinPrice() {
    const sumElement = document.getElementById("bin_sum");
    let sum = 0;
    for (let i = 0; i < this.binItems.length; i++) {
      sum += +this.binItems[i].price;
    }
    sumElement.textContent = "";
    sumElement.textContent = sum;
    return sum;
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    } 
    return element;
  }
}

let macbook = new Product("https://main-cdn.goods.ru/big1/hlr-system/1576243/100002458138b0.jpg", "mac", 5, 2000);
let macbookPro = new Product("https://fainaidea.com/wp-content/uploads/2019/11/net-6-2-silver-45-2048_2048x2048.jpg", "macPro", 6, 7000);
macbook.createMarking();
macbookPro.createMarking();

let bin = new Bin(); //создание корзины

for (let i = 0; i < document.getElementsByClassName("card_button").length; i++) {
  document.getElementsByClassName("card_button")[i].addEventListener("click", clickHandler);
}

function clickHandler(e) {
  const card = e.target.parentElement;
  const sumElement = document.getElementById("bin_sum");
  const pushToBinProduct = new Product(card.getElementsByClassName("card_picture")[0].src, 
                                      card.getElementsByClassName("card_header")[0].innerHTML,
                                      card.getElementsByClassName("card_count")[0].innerHTML,
                                      card.getElementsByClassName("card_price")[0].innerHTML);
  bin.addToBin(pushToBinProduct);
  sumElement.textContent = bin.countBinPrice();
  card.getElementsByClassName("card_count")[0].innerHTML = --pushToBinProduct.count;
  if (pushToBinProduct.count == 0) {
    card.getElementsByClassName("card_button")[0].disabled = 'true';
    card.getElementsByClassName("card_button")[0].textContent = "Товара нет на складе";
  }
}
