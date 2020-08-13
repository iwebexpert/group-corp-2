class Product {
  constructor(name, price, currency, count) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.count = 0;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getCurrency() {
    return this.currency;
  }

  getCount() {
    return this.count;
  }

  setName(value) {
    this.name = value;
  }

  setPrice(value) {
    this.price = value;
  }

  setCurrency(value) {
    this.currency = value;
  }

  setCount(value) {
    this.count = this.count++;
  }

  showProduct() {
    console.log(`Название: ${this.name}`);
    console.log(`Цена: ${this.price}`);
    console.log(`Валюта: ${this.currency}`);
    console.log(`Количество: ${this.count}`);
  }
}

class Basket {
  constructor(...products) {
    this.products = products;
    this.total = this.countBasketPrice();
  }

  addProduct(product) {
    if (!this.products.includes(product)) {
      this.products.push(product);
    }
    product.count++;
    this.total = this.countBasketPrice();
  }

  deleteProduct(product) {
    if (this.products.includes(product)) {
      product.count--;
      if (product.count === 0) {
        this.products.splice(this.products.indexOf(product), 1);
      }
      this.total = this.countBasketPrice();
    }
  }

  countBasketPrice() {
    let sum = 0;
    for(let i = 0; i < this.products.length; i++) {
      sum += this.products[i].price*this.products[i].count;
    }
  
    return sum;
  }

  showBasketInfo() {
    let res = this.products.map(item => {return [item.name, item.count]});
    return `Товары: ${res}; Cумма покупок: ${this.total}`;
  }
}

let keyboard = new Product('Клавиатура', 1000, 'rub');
let mouse = new Product('Мышь', 500, 'rub');
let usb = new Product('USB кабель', 800, 'rub');

let basket = new Basket();
basket.addProduct(usb);
basket.addProduct(mouse);
basket.addProduct(mouse);
console.log(basket.showBasketInfo());




///////////////////////////////////////////////////

function createSummary() {
  const summary = document.querySelector('.summary');

  let countSummary = 0;
  let priceSummary = 0;

  for (let product of basket.products) {
    countSummary += product.count;
    priceSummary += product.count*product.price;
  }

  if (countSummary === 0) {
    summary.textContent = 'Корзина пуста';
  } else {
    summary.textContent = `Кол-во товаров: ${countSummary}, сумма: ${priceSummary}`;
  }
}


function createCatalog() {
  const summary = createElement('div', 'summary');
  const catalog = document.querySelector('.catalog');

  const productsContainer = createElement('div', 'products');
  catalog.append(productsContainer);

  for (let product of basket.products) {
    const basketProduct = createElement('div', 'products__product');
    productsContainer.append(basketProduct);

    const productImage = createElement('img', 'products__img');
    productImage.setAttribute('src', 'img/product.png');
    basketProduct.append(productImage);

    const productName = createElement('div', 'product__name');
    productName.textContent = product.name;
    basketProduct.append(productName);

    const productPrice = createElement('div', 'product__price');
    productPrice.textContent = product.price*product.count;
    basketProduct.append(productPrice);

    const productContent = createElement('div', 'product__content');
    basketProduct.append(productContent);

    const addBtn = createElement('button', 'product__add-btn');
    addBtn.textContent = 'Добавить';
    productContent.append(addBtn);
    addBtn.onclick = function() {
      basket.addProduct(product);
      console.log(basket.showBasketInfo());

      productCount.textContent = product.count;
      productPrice.textContent = product.price*product.count;

      createSummary();
    }

    const productCount = createElement('div', 'product__count');
    productCount.textContent = product.count;
    productContent.append(productCount);

    const deleteBtn = createElement('button', 'product__delete-btn');
    deleteBtn.textContent = 'Удалить';
    productContent.append(deleteBtn);
    deleteBtn.onclick = function() {
      basket.deleteProduct(product);
      console.log(basket.showBasketInfo());

      if (product.count === 0) {
        basketProduct.remove();
      }

      productCount.textContent = product.count;
      productPrice.textContent = product.price*product.count;

      createSummary();
    }

    catalog.append(summary);
    createSummary();
  }

  document.body.append(catalog);
}

function createElement(elem, classElem) {
  const element = document.createElement(elem);
  if (classElem) {
    element.classList.add(classElem);
  }

  return element;
}

createCatalog();