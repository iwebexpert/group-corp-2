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

    this.address = '';
    this.comment = '';

    this.basketAddress = false;
    this.basketComment = false;
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

  setAddress(value) {
    this.address = value;
  }

  setComment(value) {
    this.comment = value;
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

function createAccordion() { 
  const accordionContainer = document.querySelector('.accordion');

  accordionContainer.innerHTML = 
  `   <div class="card">
				<div class="card-header" id="headingOne">
				  <h5 class="mb-0">
				    <button class="btn btn-collapse" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Корзина
				    </button>
				  </h5>
				</div>

				<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
				  <div class="card-body">
				    <div id="basket">
            		<!-- Корзина -->
        		</div>
				  </div>
				</div>
			</div>
			<div class="card">
				<div class="card-header" id="headingTwo">
				  <h5 class="mb-0">
				    <button class="btn btn-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				      Адрес
				    </button>
				  </h5>
				</div>
				<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
				  <div class="card-body">
				    <div id="address">
            			<!-- Адрес -->
        		</div>
				  </div>
				</div>
			</div>
			<div class="card">
				<div class="card-header" id="headingThree">
				  <h5 class="mb-0">
				    <button class="btn btn-collapse collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
				      Комментарий
				    </button>
				  </h5>
				</div>
				<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
				  <div class="card-body">
				    <div id="comment">
        			</div>
				  </div>
				</div>`;

  // const cardContainer = createElement('div', 'card');
  // accordionContainer.append(cardContainer);

  // const cardHeader = createElement('div', 'card-header');
  // cardHeader.setAttribute('id', `heading${number}`);
  // cardContainer.append(cardHeader);

  // const h5 = createElement('h5', 'mb-0');
  // cardHeader.append(h5);

  // const button = createElement('button', 'btn btn-link');
  // button.setAttribute('type', `button`);
  // button.setAttribute('data-toggle', `collapse`);
  // button.setAttribute('data-target', `#collapse${number}`);
  // button.setAttribute('aria-expanded', `false`);  // true
  // button.setAttribute('aria-controls', `#collapse${number}`);
  // h5.append(button);


  // const collapse = createElement('div', 'collapse');  // show
  // collapse.setAttribute('id', `collapse${number}`);
  // collapse.setAttribute('aria-labelledby', `heading${number}`);
  // collapse.setAttribute('data-parent', `#accordionExample`);
  // cardContainer.append(collapse);
}

function createButton(type, text) {
  const button = createElement('button', `button-next btn btn-outline-${type}`);
  button.textContent =text;
  return button;
}

function showBasket() {
  const summary = document.getElementById('basket');
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
  summary.append(block);

  const button = createButton('info', 'Далее');
  button.onclick = function () {
    console.log("ДАЛЕЕ");

    switchBlock('One', 'Two');

    if(!basket.basketAddress){
      showAddress();
      basket.basketAddress = true;
  } 
  };

  summary.append(button);
}

function switchBlock(one, two) {
  const headingOne = document.querySelector(`#heading${one}`);
  headingOne.querySelector('button');
  headingOne.classList.toggle('collapsed');
  headingOne.setAttribute('aria-expanded', 'true');

  const collapseOne = document.querySelector(`#collapse${one}`);
  collapseOne.classList.toggle('show');

  const headingTwo = document.querySelector(`#heading${two}`);
  headingTwo.querySelector('button');
  headingTwo.classList.add('collapsed');
  headingTwo.setAttribute('aria-expanded', 'false');

  const collapseTwo = document.querySelector(`#collapse${two}`);
  collapseTwo.classList.toggle('show')
}

function showAddress() {
  const address = document.getElementById('address');

  const inputAddress = createElement('input', 'form-control form-control-lg');
  inputAddress.type = 'text';
  inputAddress.placeholder = 'Введите адрес доставки';
  address.append(inputAddress);

  const buttonContainer = createElement('div', 'button-container');

  const buttonBack = createButton('danger', 'Назад');
  buttonBack.onclick = function () {
    console.log("НАЗАД");
    switchBlock('Two', 'One');
  };
  buttonContainer.append(buttonBack);

  const buttonNext = createButton('info', 'Далее');
  buttonNext.onclick = function () {
    console.log("ДАЛЕЕ");
    if (inputAddress.value.length > 0) {
      basket.setAddress(inputAddress.value);
      switchBlock('Two', 'Three');
      if(!basket.basketComment){
        showComment();
        basket.basketComment = true;
    } 
    } else {
      alert('Заполните адрес');
    }
  };
  buttonContainer.append(buttonNext);

  address.append(buttonContainer);
}

function showComment() {
  const comment = document.getElementById('comment');

  const inputComment = createElement('input', 'form-control form-control-lg');
  inputComment.type = 'text';
  inputComment.placeholder = 'Введите комментарий к заказу';
  comment.append(inputComment);

  const buttonContainer = createElement('div', 'button-container');

  const buttonBack = createButton('danger', 'Назад');
  buttonBack.onclick = function () {
    console.log("НАЗАД");
    switchBlock('Three', 'Two');
  };
  buttonContainer.append(buttonBack);

  const buttonNext = createButton('info', 'Далее');
  buttonNext.onclick = function () {
    console.log("ДАЛЕЕ");
    if (inputComment.value.length > 0) {
      basket.setComment(inputComment.value);
    }

    alert("Спасибо за заказ");
    window.location.reload();
  };
  buttonContainer.append(buttonNext);

  comment.append(buttonContainer);
}

function createCatalog() {
  // const summary = createElement('div', 'summary');
  const accordionContainer = createElement('div', 'accordion');
  const catalogContainer = document.querySelector('.catalog');

  const productsContainer = createElement('div', 'products');
  catalogContainer.append(productsContainer);

  catalogContainer.append(accordionContainer);
  createAccordion();

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

      // createSummary();
      showBasket();
    }

    const addBtn = createElement('button', 'product__add-btn');
    addBtn.textContent = 'Добавить';
    addBtn.onclick = function() {
      basket.addProduct(product);
      productCount.textContent = product.count;
      // createSummary();
      showBasket();
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

      // createSummary();
      showBasket();
    }

    // catalogContainer.append(summary);
    // createSummary();
    showBasket();
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

document.addEventListener('click', function(e){
  if(e.target.id=== 'exampleModal'){
      const mod = document.getElementById('exampleModal');
      mod.remove(mod);
  }
});

createCatalog();

document.addEventListener('keydown', function(e){
  switch(e.key){
      case 'ArrowLeft':
          console.log('left');
          document.querySelector('.carousel-control-prev').click();
          break;
      case 'ArrowRight':
          console.log('right');
          document.querySelector('.carousel-control-next').click();
          break;
  }
});