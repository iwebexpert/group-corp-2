class Product {
  constructor(id, name, price, currency, img) {
    this.id = id;
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

  addProduct(product, count) {
    if (!this.products.includes(product)) {
      this.products.push(product);
    }
    product.count += count;
    this.total = this.countBasketPrice();
  }

  deleteProduct(product) {
    // if (this.products.includes(product)) {
      product.count--;
      if (product.count === 0) {
        this.products.splice(this.products.indexOf(product), 1);
      }
      this.total = this.countBasketPrice();
    // }
  }

  setAddress(value) {
    this.address = value;
  }

  setComment(value) {
    this.comment = value;
  }

  countBasketPrice() {
    console.log(this.products);
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
    // console.log(products);
  }

  addProduct(product) {
    if (!this.products.includes(product) && product instanceof Product) {
      this.products.push(product);
    }
  }

  renderProduct(productsContainer, product, index, count) {
    const basketProduct = createElement('div', 'products__product');
    productsContainer.append(basketProduct);

    const imgContainer = createElement('div', 'imgs');
    basketProduct.append(imgContainer);

    for (let i = 0; i < product.img.length; i++) {
      const img = createElement('img');
      img.setAttribute('src', product.img[i]);
      img.className = `${index} product__img`;
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
    index++;

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

    console.log(count);
    basket.addProduct(product, count);
    

    const btnGroup = document.getElementsByName(product.name + '-btn')[0];
    const addBtn = createElement('button', 'product__add-btn');
    addBtn.setAttribute('id', product.id);
    addBtn.textContent = 'Добавить';
    addBtn.onclick = function(event) {
      basket.addProduct(product, 1);
      productCount.textContent = product.count;
      
      console.log(event.target.id);
      const newElement = catalog.products.find((item) => item.id == event.target.id);
      console.log(newElement);
      if (newElement.count == 0) {
        (async () => {
          const data = await fetch("./basket", {
            method: "POST",
            body: JSON.stringify(newElement),
            headers: {
              "Content-type": "application/json",
            },
          });
        })();
      } else {
        (async () => {
          const data = await fetch(`basket/${event.target.id}`, {
              method: 'PATCH',
              body: JSON.stringify({count: newElement.count}),
              headers: {
                  'Content-type': 'application/json',
              },
          });
      })();
      }

      showBasket();
    }

    const productCount = createElement('div', 'product__count');
    productCount.textContent = product.count;

    const deleteBtn = createElement('button', 'product__delete-btn');
    deleteBtn.setAttribute('id', product.id);
    deleteBtn.textContent = 'Удалить'
    deleteBtn.onclick = function(event) {
        basket.deleteProduct(product);
  
        if (product.count === 0)  {
          (async () => {
            const data = await fetch(`/basket/${event.target.id}`, {
              method: 'DELETE',
            });
          })();
  
          addBtn.remove();
          productCount.remove();
          deleteBtn.remove();
          
          const buyBtn = createElement('button', 'product__buy-btn');
          buyBtn.textContent = 'Купить';
          buyBtn.setAttribute('name', product.name);
          productBtn.append(buyBtn);
          productBtn.append(buyBtn);
        } else {
          console.log('ssssssss');
          (async () => {
            const data = await fetch(`basket/${event.target.id}`, {
                method: 'PATCH',
                body: JSON.stringify({count: product.count}),
                headers: {
                    'Content-type': 'application/json',
                },
            });
        })();
        }
  
        productCount.textContent = product.count;
        showBasket();
    }

    const buyBtn = createElement('button', 'product__buy-btn');
    buyBtn.setAttribute('id', product.id);
    buyBtn.textContent = 'Купить';
    buyBtn.setAttribute('name', product.name);
    buyBtn.onclick = function(event) {
      console.log('BUY');

      const newElement = catalog.products.find((item) => item.id == event.target.id);
      newElement.count = 1;
      console.log(newElement);
      (async () => {
        const data = await fetch("./basket", {
          method: "POST",
          body: JSON.stringify(newElement),
          headers: {
            "Content-type": "application/json",
          },
        });
      })();

      btnGroup.append(addBtn);
      // basket.addProduct(product, 1);
      btnGroup.append(productCount);
      productCount.textContent = product.count;
      btnGroup.append(deleteBtn);

      buyBtn.remove();
      updateBasket();

      showBasket();
    }

    if (count) {
      // basket.addProduct(product);
      console.log(basket);
      console.log(btnGroup);
      btnGroup.append(addBtn);
      btnGroup.append(productCount);
  
      btnGroup.append(deleteBtn);
    } else {
      productBtn.append(buyBtn);
    }
    showBasket();
  }

  makeGETRequest(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function(){
          if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status !== 200){
              reject(xhr.status);
            }
            const products = JSON.parse(xhr.responseText); 
            resolve(products);
          }
        };

      xhr.send();
    });
  }

  render() {
    const accordionContainer = createElement('div', 'accordion');
    const catalogContainer = document.querySelector('.catalog');

    const productsContainer = createElement('div', 'products');
    catalogContainer.append(productsContainer);

    catalogContainer.append(accordionContainer);
    createAccordion();

    this.makeGETRequest('/products')
      .then(products => {
        this.makeGETRequest('/basket')
        .then(res => {
          products.forEach((product, index) => {
            const newProduct = new Product(product.id, product.name, product.price, product.currency, product.img);
            this.addProduct(newProduct);
            let count = 0;
            for (let i = 0; i < res.length; i++) {
              if (res[i].id == product.id) {
                console.log(res[i].count);
                count = res[i].count;
              }
            }
            console.log(count);
            this.renderProduct(productsContainer, newProduct, index, count)
          });
        })
        
      }, (status) => {
        console.log('Error', 'Status code: ', status);
      }
    );
    
    

    // fetch('/products')
    //   .then(response => response.json())
    //   .then(
    //     (products) => {
    //       products.forEach((product) => {
    //         const newProduct = new Product(product.name, product.price, product.currency, product.img);
    //         this.addProduct(newProduct);
    //         this.renderProduct(productsContainer, newProduct, index);
    //       });
    //     }
    //   ).catch((error) => {
    //     console.log('Error', error);
    //   });

    document.body.append(catalogContainer);
  }
}

let catalog = new Catalog();

let basket = new Basket();

catalog.render();

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
				      Информация
				    </button>
				  </h5>
				</div>
				<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
				  <div class="card-body">
				    <div id="info">
            			<!-- Info -->
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
}

function createButton(type, text) {
  const button = createElement('button', `button-next btn btn-outline-${type}`);
  button.textContent =text;
  return button;
}

async function updateBasket()  {
  const data = await fetch("./basket");
  // console.log(basket.products);
  basket.products = await data.json();
  return basket.products;
  // return await data.json();
}

function showBasket() {
  const summary = document.getElementById('basket');

  updateBasket()
  .then(res => {
    let countSummary = 0;
    summary.innerHTML = '';
    if (res.length === 0) {
      summary.textContent = 'Корзина пуста';
      return;
    }

    for (let product of res) {
      const block = createElement('div', 'summary__product-info');
      block.setAttribute('id', product.id);
      const span = createElement('span', 'summary__product-info_span');
      span.textContent = `${product.price*product.count} ${product.currency}`;
  
      block.textContent = `${product.name} кол-во: ${product.count}, цена: `;
      block.append(span);
      summary.append(block);
      countSummary += product.count;
    }

    const block = createElement('div', 'summary__result');
    block.textContent = `Кол-во товаров: ${countSummary}, сумма: ${basket.total}`;
    summary.append(block);

    const button = createButton('info', 'Далее');
    button.onclick = function () {
      console.log("ДАЛЕЕ");

      switchBlock('One', 'Two');

      if(!basket.basketAddress){
        showInfo();
        basket.basketAddress = true;
      } 
    }
    summary.append(button);
  });
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

function showInfo() {
  const info = document.getElementById('info');

  // Имя отправителя
  const nameTitle = createElement('p', 'info__title');
  nameTitle.textContent = "Имя";
  info.append(nameTitle);

  const inputName = createElement('input', 'form-control form-control-lg');
  inputName.type = 'text';
  inputName.placeholder = 'Введите Ваше имя';
  info.append(inputName);

  // Телефон мобильный
  const phoneTitle = createElement('p', 'info__title');
  phoneTitle.textContent = "Телефон";
  info.append(phoneTitle);

  const inputPhone = createElement('input', 'form-control form-control-lg');
  inputPhone.type = 'tel';
  inputPhone.placeholder = '+7(000)000-0000';
  info.append(inputPhone);

  // E-mail
  const emailTitle = createElement('p', 'info__title');
  emailTitle.textContent = "E-mail";
  info.append(emailTitle);

  const inputEmail = createElement('input', 'form-control form-control-lg');
  inputEmail.type = 'email';
  inputEmail.placeholder = 'mymail@mail.ru';
  info.append(inputEmail);

  // Адрес
  const addressTitle = createElement('p', 'info__title');
  addressTitle.textContent = "Адрес";
  info.append(addressTitle);

  const inputAddress = createElement('input', 'form-control form-control-lg');
  inputAddress.type = 'text';
  inputAddress.placeholder = 'Введите адрес доставки';
  info.append(inputAddress);

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
    // const p = createElement('p', 'info__error');

    let error = 0;

    if (!/^[a-z]{2,15}$/i.test(inputName.value)) {
      inputName.style.borderColor = "red";
      error++;
    } else {
      inputName.style.borderColor = "#ced4da";
      error--;
    }

    if (!/\+7\(\d{3}\)\d{3}-\d{4}$/.test(inputPhone.value)) {
      inputPhone.style.borderColor = "red";
      error++;
    } else {
      inputPhone.style.borderColor = "#ced4da";
      error--;
    }

    if (!/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(inputEmail.value)) {
      inputEmail.style.borderColor = "red";
      error++;
    } else {
      inputEmail.style.borderColor = "#ced4da";
      error--;
    }

    if (!/./.test(inputAddress.value)) {
      console.log(true);
      inputAddress.style.borderColor = "red";
      error++;
    } else {
      console.log(false);
      inputAddress.style.borderColor = "#ced4da";
      error--;
    }

    // в случае успешной влидации
    if (error == -4) {
      basket.setAddress(inputAddress.value);
      switchBlock('Two', 'Three');
      if(!basket.basketComment){
        showComment();
        basket.basketComment = true;
      }
    } else {
      alert('Введены некорректные данные');
    }
  };
  buttonContainer.append(buttonNext);

  info.append(buttonContainer);
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