import './style.css';

interface IProduct {
  name: string;
  price: number;
  currency: string;
  count: number;
}


class Product implements IProduct {
  name: string;
  price: number;
  currency: string;
  count: number;

  constructor(name: string, price: number, currency: string) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.count = 0;
  }

  get getName(): string {
    return this.name;
  }

  get getPrice(): number {
    return this.price;
  }

  get getCurrency(): string {
    return this.currency;
  }

  set setName(value: string) {
    this.name = value;
  }

  set setPrice(value: number) {
    this.price = value;
  }

  set setCurrency(value: string) {
    this.currency = value;
  }
}

interface IBasket {
  products: IProduct[];
  total: number;
  addProduct(product: IProduct): void;
  deleteProduct(product: IProduct): void;
  countBasketPrice(): number;
  showBasketInfo(): string;
}

class Basket implements IBasket {
  products: IProduct[];
  total: number;

  constructor(...products: IProduct[]) {
    this.products = products;
    this.total = this.countBasketPrice();
  }

  addProduct(product: IProduct) {
    if (!this.products.includes(product)) {
      this.products.push(product);
    }
    product.count++;
    this.total = this.countBasketPrice();
  }

  deleteProduct(product: IProduct) {
    if (this.products.includes(product)) {
      product.count--;
      if (product.count === 0) {
        this.products.splice(this.products.indexOf(product), 1);
      }
      this.total = this.countBasketPrice();
    }
  }

  countBasketPrice(): number {
    let sum: number = 0;
    // нужно для для i указывать тип?
    for(let i = 0; i < this.products.length; i++) {
      sum += this.products[i].price*this.products[i].count;
    }
  
    return sum;
  }

  showBasketInfo(): string {
    let res = this.products.map(item => {return [item.name, item.count]});
    return `Товары: ${res}; Cумма покупок: ${this.total}`;
  }
}

// let keyboard: IProduct = new Product('Клавиатура', 1000, 'rub');
let mouse: IProduct = new Product('Мышь', 500, 'rub');
let usb: IProduct = new Product('USB кабель', 800, 'rub');

let basket: IBasket = new Basket();
basket.addProduct(usb);
basket.addProduct(mouse);
basket.addProduct(mouse);
console.log(basket.showBasketInfo());




///////////////////////////////////////////////////

function createSummary() {
  const summary: HTMLDivElement | null = document.querySelector('.summary');

  if (summary) {
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
}


function createCatalog() {
  const summary = createElement('div', 'summary');
  const catalog: HTMLDivElement | null = document.querySelector('.catalog');

  if(catalog) {
    const productsContainer = createElement('div', 'products');
    catalog.append(productsContainer);

    // поолучается что пооисходит неявное преобазование к типу IProduct
    // так как сазу пооисходит присваивание?
    for (let product of basket.products) {
      const basketProduct = createElement('div', 'products__product');
      productsContainer.append(basketProduct);

      const productImage = createElement('img', 'products__img');
      productImage.setAttribute('src', 'src/img/product.png');
      basketProduct.append(productImage);

      const productName = createElement('div', 'product__name');
      productName.textContent = product.name;
      basketProduct.append(productName);

      const productPrice = createElement('div', 'product__price');
      productPrice.textContent = (product.price*product.count).toString();
      basketProduct.append(productPrice);

      const productContent = createElement('div', 'product__content');
      basketProduct.append(productContent);

      const addBtn = createElement('button', 'product__add-btn');
      addBtn.textContent = 'Добавить';
      productContent.append(addBtn);
      addBtn.onclick = function() {
        basket.addProduct(product);
        console.log(basket.showBasketInfo());

        productCount.textContent = product.count.toString();
        productPrice.textContent = (product.price*product.count).toString();

        createSummary();
      }

      const productCount = createElement('div', 'product__count');
      productCount.textContent = product.count.toString();
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

        productCount.textContent = product.count.toString();
        productPrice.textContent = (product.price*product.count).toString();

        createSummary();
      }

      catalog.append(summary);
      createSummary();
    }

    document.body.append(catalog);
  }
}

function createElement(elem: string, classElem: string): HTMLElement {
  // так как может быть не только div
  // то посто HTMLElement
  // можно добавить интефейс тип<T> и пеедавать нужный тип
  // но не уверена что так лучше
  const element: HTMLElement = document.createElement(elem);
  if (classElem) {
    element.classList.add(classElem);
  }

  return element;
}

createCatalog();