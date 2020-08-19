class Products{
    constructor(name, amount, price, currency){
      this.name = name;
      this.amount = amount;
      this.price = price;
      this.currency = currency;
    }

    getInfo(){
      return `Название: ${this.name}, стоимость: ${this.price} ${this.currency}`
    }
  }

  const bread = new Products('Bread', 0, 50, 'RUB');
  const milk = new Products('Milk', 0, 100, 'RUB');
  const apple = new Products('Apple', 0, 10, 'RUB');
  const water = new Products('Water', 0, 70, 'RUB');

  class Basket {
    constructor(name) {
      this.name = name;
      this.products = [];
    }

    /*Выводим все продукты*/
    // getInfo(){
    //   let str = ``;
    //   for (let i = 0; i < this.products.length; i++) {
    //     str += `Название: ${this.products[i][0].name}, Стоимость: ${this.products[i][0].price} ${this.products[i][0].currency}, Количество: ${this.products[i][1]} <br />`;
    //   }
    //    return str;
    // }

    getInfo(item){
      console.log(item);
      console.log(this.products);
      let str = ``;
      for(let i = 0; i < this.products.length; i++){
        // let j = this.products[i][0].name.indexOf(item.name);
        if(this.products[i][0].name == item.name){
        console.log(i);
        str += `Название: ${this.products[i][0].name}, Стоимость: ${this.products[i][0].price} ${this.products[i][0].currency}, Количество: ${this.products[i][1]} <br />`;
      }
      }
       return str;
    }

    /*Добавляем продукт, если он уже был, то перезаписываем*/
    addProducts(product, amount){
      this.products.push([product, amount]);
      console.log(`Добавлено в корзину`);
      if(this.products.length > 1){
        for (let i = 0; i < this.products.length-1; i++){
          if(this.products[i][0].name == product.name){
            this.products.splice(i, 1);
          }
        }
      }
    }

    /*Удаляем продукт*/
    deleteProducts(product){
      for (let i = 0; i < this.products.length; i++){
        if(this.products[i][0].name == product.name){
          this.products.splice(i, 1);
          console.log(`Удалено из корзины`);
        }
      }
    }

    /*Суммируем продукты*/
    sumFunc(){
      let sum = 0;
      for (let i = 0; i < this.products.length; i++) {
        sum += this.products[i][0].price * this.products[i][1];
      }
      return sum;
    }

    sumFuncRub(){
      let sum = 0;
      for (let i = 0; i < this.products.length; i++) {
        sum += this.products[i][0].price * this.products[i][1];
      }
      if(sum == 0) return 'Пустая корзина';
      return 'Cумма: ' + sum + " RUB";
    }

    sumFuncEur(){
      let sum = 0;
      for (let i = 0; i < this.products.length; i++) {
        sum += this.products[i][0].price * this.products[i][1];
      }
      return (sum/87.17).toFixed(2) + " EUR";
    }

    sumFuncUsd(){
      let sum = 0;
      for (let i = 0; i < this.products.length; i++) {
        sum += this.products[i][0].price * this.products[i][1];
      }
      return (sum/73.43).toFixed(2) + " USD";
    }

    // checkBascket(){
    //   if(this.sumFuncRub() == '0 RUB'){
    //     return 'Пустая корзина';
    //   } return `${myBasket.getInfo()} <br /> Сумма: ${myBasket.sumFuncRub()}`;
    // }

    checkBascket(product){
      if(this.products.length > 0){
        for (let i = 0; i < this.products.length; i++){
          if(this.products[i][0].name == product.name){
            return false;
          }
        } return true;
      }
    }
  }

  const myBasket = new Basket('Vladimir');

  const info = document.querySelector("#catalog");
  let addItems = document.getElementsByClassName('btn btn-lg btn-block btn-primary');
  let removeItems = document.getElementsByClassName('btn btn-lg btn-block btn-danger');
  let arrItems = [apple, bread, milk, water];
  let emptyBsk = document.querySelector(".emptyBsk");

  emptyBsk.innerHTML = 'Пустая корзина';

  /*Добавляем продукт в корзину*/
  for (let i in addItems) {
    if (addItems.hasOwnProperty(i) && addItems[i].dataset) {
        addItems[i].dataset.counter = i;
        addItems[i].onclick = function() {
          // info.innerHTML = '';
          // emptyBsk.style = 'display: none';
          let valueCount = document.getElementsByClassName('valueCount')[i].value;
          if(valueCount == '' || valueCount == 0) valueCount = 1;
          if(valueCount < 0) valueCount = valueCount.slice(1);

          createBasket(valueCount);
          function createBasket(valueCount){
            if(myBasket.checkBascket(arrItems[i]) == false) return;
            myBasket.addProducts(arrItems[i], valueCount);
            let productCatalog = document.createElement('div');
            productCatalog.classList.add(`productCatalog`);
            info.appendChild(productCatalog);

            checkAndWrite();
            function checkAndWrite(){
              productCatalog.innerHTML = myBasket.getInfo(arrItems[i]);
              document.getElementsByClassName('valueCount')[i].value = '';
              emptyBsk.innerHTML = myBasket.sumFuncRub();
            }

            createBtns(productCatalog);
            /*Создание кнопок*/
            function createBtns(productCatalog){
              let plusBtn = document.createElement('button');
              plusBtn.classList.add('plusBtn');
              plusBtn.className += ' btn btn-success'
              let textInBtn = document.createTextNode('+');
              plusBtn.appendChild(textInBtn);
              productCatalog.appendChild(plusBtn);
              let minusBtn = document.createElement('button');
              minusBtn.classList.add('minusBtn');
              minusBtn.className += ' btn btn-danger'
              textInBtn = document.createTextNode('-');
              minusBtn.appendChild(textInBtn);
              productCatalog.appendChild(minusBtn);

              plusBtn.onclick = function(){
                valueCount++;
                myBasket.addProducts(arrItems[i], valueCount);
                productCatalog.innerHTML = myBasket.getInfo(arrItems[i]);
                emptyBsk.innerHTML = myBasket.sumFuncRub();
                createBtns(productCatalog);
              }
              minusBtn.onclick = function(){
                valueCount--;
                if(valueCount == 0){
                  myBasket.deleteProducts(arrItems[i]);
                  document.querySelector('.productCatalog').remove();
                  emptyBsk.innerHTML = myBasket.sumFuncRub();
                  return;
                }
                myBasket.addProducts(arrItems[i], valueCount);
                productCatalog.innerHTML = myBasket.getInfo(arrItems[i]);
                emptyBsk.innerHTML = myBasket.sumFuncRub();
                createBtns(productCatalog);
              }
            }
          }
        }
      }
    }

    /*Удаляем продукт */
    for (let i in removeItems) {
      if (removeItems.hasOwnProperty(i) && removeItems[i].dataset) {
          removeItems[i].dataset.counter = i;
          removeItems[i].onclick = function() {
            myBasket.deleteProducts(arrItems[i]);
            if(document.querySelector('.productCatalog')) document.getElementsByClassName('productCatalog')[i].remove();
            emptyBsk.innerHTML = myBasket.sumFuncRub();
            // info.innerHTML = myBasket.checkBascket();
          }
        }
      }

      document.querySelector('#mainBtr').onclick = function(){
        document.querySelector('#cards').style = 'display: flex';
        document.querySelector('#catalog').style = 'display: none';
        document.querySelector('#nextProducts').style = 'display: none';
        document.querySelector('#form').style = 'display: none';
      }

      let basketPts = document.getElementById('basketPts');
      basketPts.onclick = function(){
        document.querySelector('#cards').style = 'display: none';
        document.querySelector('#catalog').style = 'display: block';
        document.querySelector('#nextProducts').style = 'display: block';
        document.querySelector('#form').style = 'display: none';
      }

      document.querySelector('#nextProducts').onclick = function(){
          document.querySelector('#form').style = 'display: block';
          document.querySelector('#catalog').style = 'display: none';
          document.querySelector('#nextProducts').style = 'display: none';
      }

      document.querySelector('#buyAll').onclick = function(){
        alert('Спасибо за покупу');
        location.reload()
      }

      document.querySelector('#backBtr').onclick = function(){
        document.querySelector('#cards').style = 'display: none';
        document.querySelector('#catalog').style = 'display: block';
        document.querySelector('#nextProducts').style = 'display: block';
        document.querySelector('#form').style = 'display: none';
      }

    let imgFunc = document.getElementsByClassName('productImg');
    let carousel = document.getElementsByClassName('carousel-item active')[0];
    let carouselInner = document.getElementsByClassName('carousel-inner')[0];
    let carousel1 = document.createElement('div');
    carousel1.classList.add('carousel-item');

    /*Для всех картинок*/
    for (let i in imgFunc) {
      if (imgFunc.hasOwnProperty(i) && imgFunc[i].dataset) {
          imgFunc[i].dataset.counter = i;
          imgFunc[i].onclick = function() {
            while(carousel.firstChild) {
              carousel.removeChild(carousel.firstChild);
            }
            let src = imgFunc[i].src;
            let imgInCour = document.createElement("img");
            imgInCour.setAttribute('src', src);
            imgInCour.setAttribute('class', 'imgInCour');
            carousel.appendChild(imgInCour);
            if(i == 0){
              let apple = 'apple';
              addMorePhoto(apple)
            }
            if(i == 1){
              let bread = 'bread';
              addMorePhoto(bread)
            }
            if(i == 2){
              let milk = 'milk';
              addMorePhoto(milk)
            }
            if(i == 3){
              let water = 'water';
              addMorePhoto(water)
            }
          }
      }
  }

  /*Добавляем еще картинки*/
  function addMorePhoto(item){
    while(carousel1.firstChild) {
      carousel1.removeChild(carousel1.firstChild);
    }
    let imgInCour = document.createElement("img");
    imgInCour.setAttribute('src', `img/${item}1.jpg`);
    imgInCour.setAttribute('class', 'imgInCour');
    carouselInner.appendChild(carousel1);
    carousel1.appendChild(imgInCour);
  }
