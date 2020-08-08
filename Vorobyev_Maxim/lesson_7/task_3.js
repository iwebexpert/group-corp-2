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

let cheese = new Product("cheese", 2000, "12.11.1999", "23.11.1999");

cheese.ShowProduct();