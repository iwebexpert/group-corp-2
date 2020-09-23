class Product {
  constructor (name, price, createDate, validUntilDate) {
    this.name = name;
    this.price = price;
    this.createDate = createDate;
    this.validUntilDate = validUntilDate;
  }

  GetName() {
    return this.name;
  }

  GetPrice() {
    return this.price;
  }

  GetCreateData() {
    return this.createDate;
  }

  GetValidUntilDate() {
    return this.validUntilDate;
  }

  SetName(name) {
    this.name = name;
  }

  SetPrice(price) {
    this.price = price;
  }

  SetCreateData(createDate) {
    this.createDate = createDate;
  }

  SetValidUntilDate(validUntilDate) {
    this.validUntilDate = validUntilDate;
  }

  ShowProduct() {
    console.log(`Название товара: ${this.name}`);
    console.log(`Цена товара: ${this.price}`);
    console.log(`Дата упаковки товара: ${this.createDate}`);
    console.log(`Товар годен до: ${this.validUntilDate}`);
  }
}

class Bin {
  constructor(...binItems) {
    this.binItems = binItems;
    this.mainBin = document.getElementById("bin");

    this.messageElement = this.createElement("div", "msg");
    this.mainBin.append(this.messageElement);

    if (binItems.length == 0) {
      this.messageElement.textContent = "корзина пуста";
    } else {
      this.messageElement.textContent = `В корзине ${binItems.length} товара, на сумму ${this.CountBinPrice()}`;
    }
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    } 
    return element;
  }

  CountBinPrice() {
    let sum = 0;
    for (let i = 0; i < this.binItems.length; i++) {
      sum += this.binItems[i].price;
    }
    return sum;
  }
}


let cheese = new Product("cheese", 2000, "12.11.1999", "23.11.1999");
let tomato = new Product("tomato", 200, "19.11.1999", "23.11.1999");

let bin = new Bin(cheese, tomato);
console.log(bin.CountBinPrice());
