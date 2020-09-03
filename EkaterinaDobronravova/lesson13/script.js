'use strict'

function sendRequest(url){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status !== 200){
                    reject(xhr.status);
                }
                const goods = JSON.parse(xhr.responseText);
                resolve(goods);
            }
        };
    xhr.send();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  class Product {
      constructor(id, name, price, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
  }

  createCatalog(){
    let body = document.querySelector('body');
    let product = document.createElement('div');
    let name = document.createElement('div');
    let img = document.createElement('img');
    let price = document.createElement('div');
    let buttonAdd = document.createElement('button');
    name.classList.add('name');
    name.textContent = this.name;
    product.appendChild(name);
    img.src = this.img;
    product.appendChild(img);
    price.classList.add('price');
    price.innerHTML = '<b>' + this.price +'</b>'+ ' руб.';
    product.appendChild(price);
    product.classList.add('product');
    buttonAdd.textContent = 'Добавить в корзину';
    buttonAdd.classList.add('btn-add');
    buttonAdd.addEventListener('click', (event) => {
      newBasket.addProduct(this, 1);
      newBasket.goodsList();
      newBasket.createBasket();
    });
    product.appendChild(buttonAdd);
    return product;
    }
  }

  class Basket {
    constructor(cart) {
      this.products = [];
      this.totalPrice = 0;
    }

    addProduct(product, count){
      if (product && product instanceof Product && count > 0){
        let newProduct = {...product};
        newProduct.count = count;
        for (let i = 0; i < this.products.length; i++){
          if (newProduct.name === this.products[i].name) {
            ++this.products[i].count;
            this.createBasket();
            return this;
          }
        }
        this.products.push(newProduct);
        this.createBasket();
        return this;
    }
  }
  deleteProduct(product){
    let newProduct = {...product};
    for (let i = 0; i < this.products.length; i++){
      if (newProduct.name === this.products[i].name) {
        if (this.products[i].count < 1){
          return null;
        } else if (this.products[i].count === 1){
          this.products.splice(i, 1);
          this.createBasket();
          return this;
        } else
        --this.products[i].count;
        this.createBasket();
        return this;
      }
    }
  }

    goodsList(){
      this.totalPrice = 0;
      this.products.forEach(item => {
        this.totalPrice += item.price * item.count;
      })
    return `${this.totalPrice} рублей`;
  }

    createBasket(){
      let basket = document.createElement('div');
      basket.classList.add('basket_result');
      let basketNext = document.createElement('button');
      basketNext.classList.add('basket_next');
      basketNext.textContent = 'Продолжить';
      let basketContainer = document.getElementById('basket');
      basketContainer.classList.add('basket_container')
        if (this.products.length === 0){
          basket.innerHTML = 'Корзина пуста';
          basketContainer.innerHTML = '';
          basketContainer.appendChild(basket);
        }
        else {
          basket.innerHTML = '';
          basketContainer.innerHTML = '';
          this.products.forEach(product => {
            let prod = document.createElement('div');
            prod.classList.add("basket_item");
            prod.innerHTML = `<div class="basket_item_name">${product.name}</div> <div class="basket_item_count">кол-во: ${product.count}</div> <div class="basket_item_price">цена: ${product.price} руб.</div> `;
            let deleteProd = document.createElement('button');
            deleteProd.textContent = 'Удалить';
            deleteProd.classList.add('btn-del');
            deleteProd.addEventListener('click', (event) => {
              newBasket.deleteProduct(product);
              newBasket.goodsList();
              newBasket.createBasket();
            });
            basketContainer.appendChild(prod);
            prod.appendChild(deleteProd);
          })
          basket.innerHTML = `В корзине <b>${this.products.length}</b> товаров на сумму <b>${this.goodsList()}</b>`;
          basketContainer.appendChild(basket);
          basketContainer.appendChild(basketNext);
        }

        let address = document.createElement('div');
        address.classList.add('address');
        address.textContent = 'Адрес';
        let addressTextarea = document.createElement('textarea');
        addressTextarea.placeholder = "Адрес";
        address.appendChild(addressTextarea);
        let addressNext = document.createElement('button');
        addressNext.textContent = '>';
        let addressPrev = document.createElement('button');
        addressPrev.textContent = '<';
        address.appendChild(addressPrev);
        address.appendChild(addressNext);
        basketContainer.appendChild(address);

        let comment = document.createElement('div');
        comment.classList.add('comment');
        comment.textContent = 'Комментарий';
        let commentTextarea = document.createElement('textarea');
        commentTextarea.placeholder = "Комментарий";
        comment.appendChild(commentTextarea);
        let commentNext = document.createElement('button');
        commentNext.textContent = '>';
        let commentPrev = document.createElement('button');
        commentPrev.textContent = '<';
        comment.appendChild(commentPrev);
        comment.appendChild(commentNext);
        basketContainer.appendChild(comment);

        basketNext.addEventListener('click', () => {
          basketNext.classList.add('hide');
          basket.classList.add('hide');
          address.classList.add('show');
        });

        addressPrev.addEventListener('click', () => {
          basket.classList.remove('hide');
          address.classList.remove('show');
        });

        addressNext.addEventListener('click', () => {
          comment.classList.add('show');
          address.classList.remove('show');
        });

          commentPrev.addEventListener('click', () => {
            comment.classList.remove('show');
            address.classList.add('show');
        });

        commentNext.addEventListener('click', () => {
          comment.classList.remove('show');
          address.classList.remove('show');
          let resultForm = document.createElement('div');
          resultForm.classList.add('result_form');
          let addressValue = addressTextarea.value;
          let commentValue = commentTextarea.value;
          resultForm.innerHTML = `<b>Адрес:</b> ${addressValue}<br><b>Комментарий:</b> ${commentValue}`;
          basketContainer.appendChild(resultForm);
        });
      }
    }

    let productArray = [];
    let newBasket = new Basket();
    newBasket.createBasket();

    sendRequest('/goods').then((goods) => {
        goods.forEach(good => {
            let newGood = new Product(good.id, good.name, good.price, good.img);
            productArray.push(newGood);
        })
        productArray.forEach(product => {
            console.log(product)
            let newProduct = product.createCatalog();
            catalog.appendChild(newProduct);
        });
    },
        (status) => console.error(status)
    )
});
