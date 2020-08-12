class Product {
  constructor (name, price, createDate, validUntilDate) {
    this.catalog = document.getElementById("catalog");
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

  ShowAsCatalog() {
    this.productNameH2 = this.createElement("h2", "productName");
    this.catalog.append(this.productNameH2);
    this.productNameH2.textContent = `${this.name}`;

    this.priceP = this.createElement('p');
    this.catalog.append(this.priceP);
    this.priceP.textContent = `цена: ${this.price}`;

    this.dates = this.createElement("p");
    this.catalog.append(this.dates);
    this.dates.textContent = `упакован: ${this.createDate}, годен до: ${this.validUntilDate}`;
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    } 
    return element;
  }
}

let cheese = new Product("cheese", 2000, "12.11.1999", "23.11.1999");
let tomato = new Product("tomato", 200, "19.11.1999", "23.11.1999");

let productArray = [cheese, tomato];

window.onload = function () {
  productArray.forEach( function(element, index) {
    element.ShowAsCatalog();
  });
}
