class Product {
  constructor(name, price, currency, img) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.count = 0;
    this.img = img;
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

class Catalog {
  constructor(...products) {
    this.products = products;
    console.log(products);
  }
}

let mac = new Product('MacBook Pro', 120000, '₽', ['img/macbookpro.jpeg']);
let ipad = new Product('Ipad Pro', 69000, '₽', ['img/ipadpro.png']);
let watch = new Product('Apple Watch', 33000, '₽', ['img/applewatch.jpeg']);
let iphone = new Product('Iphone 11', 60000, '₽', ['img/iphone.png', 'img/iphone_white.png']);

let catalog = new Catalog(mac, ipad, watch, iphone);

let basket = new Basket();

///////////////////////////////////////////////////

function createSummary() {
  const summary = document.querySelector('.summary');
  summary.innerHTML = '';

  let countSummary = 0;
  let priceSummary = 0;

  if (basket.products.length === 0) {
    summary.textContent = 'Корзина пуста';
    return;
  }   

  for (let product of basket.products) {
    const block = createElement('div', 'summary__product-info');
    const span = createElement('span', 'summary__product-info_span');
    span.textContent = `${product.price*product.count} ${product.currency}`;

    block.textContent = `${product.name} кол-во: ${product.count}, цена: `;
    block.append(span);
    summary.append(block);
    countSummary += product.count;
    priceSummary += product.count*product.price;
  }

  const block = createElement('div', 'summary__result');
  block.textContent = `Кол-во товаров: ${countSummary}, сумма: ${priceSummary}`;
  summary.append(block)
}

function createCatalog() {
  const summary = createElement('div', 'summary');
  const catalogContainer = document.querySelector('.catalog');

  const productsContainer = createElement('div', 'products');
  catalogContainer.append(productsContainer);

  let j = 0;
  for (let product of catalog.products) {
    const basketProduct = createElement('div', 'products__product');
    productsContainer.append(basketProduct);

    const imgContainer = createElement('div', 'imgs');
    basketProduct.append(imgContainer);

    for (let i = 0; i < product.img.length; i++) {
      const img = createElement('img');
      img.setAttribute('src', product.img[i]);
      img.className = `${j} product__img`;
      img.setAttribute('id', `${i}`);

      img.addEventListener('click', function(event){
        $(document).ready(function(){
            $("#exampleModal").modal('show');
        });

        console.log(event.target.className.slice()[0], +event.target.id);

        showModal(event.target.className.slice()[0], +event.target.id);
      });
      if (i == 0)
        imgContainer.append(img);
    }
    j++;

    




    const productContent = createElement('div', 'product__content');
    basketProduct.append(productContent);

    const productName = createElement('div', 'product__name');
    productName.textContent = product.name;
    productContent.append(productName);

    const productPrice = createElement('div', 'product__price');
    productPrice.textContent = product.price;
    productContent.append(productPrice);

    const productBtn = createElement('div', 'product__btn');
    productBtn.setAttribute('name', product.name + '-btn');
    productContent.append(productBtn);

    const buyBtn = createElement('button', 'product__buy-btn');
    buyBtn.textContent = 'Купить';
    buyBtn.setAttribute('name', product.name);
    productBtn.append(buyBtn);

    buyBtn.onclick = function(e) {
      console.log('BUY', e.target);

      const btnGroup = document.getElementsByName(e.target.name + '-btn')[0];
      btnGroup.append(addBtn);
      basket.addProduct(product);
      btnGroup.append(productCount);
      productCount.textContent = product.count;
      btnGroup.append(deleteBtn);

      buyBtn.remove();

      createSummary();
    }

    const addBtn = createElement('button', 'product__add-btn');
    addBtn.textContent = 'Добавить';
    addBtn.onclick = function() {
      basket.addProduct(product);
      productCount.textContent = product.count;
      createSummary();
    }



    const productCount = createElement('div', 'product__count');
    productCount.textContent = product.count;

    const deleteBtn = createElement('button', 'product__delete-btn');
    deleteBtn.textContent = 'Удалить'
    deleteBtn.onclick = function() {
      basket.deleteProduct(product);
      console.log(basket.showBasketInfo());

      if (product.count === 0) {
        addBtn.remove();
        productCount.remove();
        deleteBtn.remove();

        productBtn.append(buyBtn);
      }

      productCount.textContent = product.count;

      createSummary();
    }

    catalogContainer.append(summary);
    createSummary();
  }

  document.body.append(catalogContainer);
}

function createElement(elem, classElem) {
  const element = document.createElement(elem);
  if (classElem) {
    element.className = classElem;
  }

  return element;
}

function showModal(index, id) {
  const cont = document.querySelector('.catalog');
  const modFad = createElement('div', 'modal fade');
  modFad.setAttribute('id', 'exampleModal');
  cont.append(modFad);

  const modalDialog = createElement('div', 'modal-dialog modal-dialog-centered');
  modFad.append(modalDialog);

  const modalContent = createElement('div', 'modal-content');
  modalDialog.append(modalContent);

  const carouselSlide = createElement('div', 'carousel slide');
  carouselSlide.setAttribute('id', 'carouselExampleControls');
  carouselSlide.setAttribute('data-ride', 'carousel');
  modalContent.append(carouselSlide);

  const carouselInner = createElement('div', 'carousel-inner');
  carouselSlide.append(carouselInner);

  const aPref = createElement('a', 'carousel-control-prev');
  aPref.setAttribute('href', '#carouselExampleControls');
  aPref.setAttribute('role', 'button');
  aPref.setAttribute('data-slide', 'prev');
  carouselSlide.append(aPref);

  const prevIcon = createElement('span', 'carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  aPref.append(prevIcon);

  console.log(catalog.products, index);

  for (let photo = 0; photo < catalog.products[index].img.length; photo++) {
      const act = createElement('div', (photo===id) ? 'carousel-item active' : 'carousel-item');
      carouselInner.append(act);

      const img = createElement('img', 'd-block w-100');

      img.setAttribute('src', catalog.products[index].img[photo]);
      act.append(img);
  }


  const aNext = createElement('a', 'carousel-control-next');
  aNext.setAttribute('href', '#carouselExampleControls');
  aNext.setAttribute('role', 'button');
  aNext.setAttribute('data-slide', 'next');
  carouselSlide.append(aNext);

  const nextIcon = createElement('span', 'carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  aNext.append(nextIcon);
}

document.addEventListener('click', function(event){
  if(event.target.id=== 'exampleModal'){
      const mod = document.getElementById('exampleModal');
      mod.remove(mod);
  }
});

createCatalog();