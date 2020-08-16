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
    getInfo(){
      let str = ``;
      for (let i = 0; i < this.products.length; i++) {
        str += `Название: ${this.products[i][0].name}, Стоимость: ${this.products[i][0].price} ${this.products[i][0].currency}, Количество: ${this.products[i][1]} <br />`;
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
      return sum + " RUB";
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

    checkBascket(){
      if(this.sumFuncRub() == '0 RUB'){
        return 'Пустая корзина';
      } return `${myBasket.getInfo()} <br /> Сумма: ${myBasket.sumFuncRub()}`;
    }
  }

  const myBasket = new Basket('Vladimir');

  const info = document.querySelector("#catalog");
  let addItems = document.getElementsByClassName('btn btn-lg btn-block btn-primary');
  let removeItems = document.getElementsByClassName('btn btn-lg btn-block btn-danger');
  let arrItems = [apple, bread, milk, water];

  info.innerHTML = 'Пустая корзина';

  /*Добавляем продукт в корзину*/
  for (let i in addItems) {
    if (addItems.hasOwnProperty(i) && addItems[i].dataset) {
        addItems[i].dataset.counter = i;
        addItems[i].onclick = function() {
          let valueCount = document.getElementsByClassName('valueCount')[i].value;
          console.log(valueCount);
          if(valueCount == '' || valueCount == 0) valueCount = 1;
          if(valueCount < 0) valueCount = valueCount.slice(1);
          myBasket.addProducts(arrItems[i], valueCount);
          info.innerHTML = myBasket.checkBascket();
          document.getElementsByClassName('valueCount')[i].value = '';
        }
      }
    }

    /*Удаляем продукт */
    for (let i in removeItems) {
      if (removeItems.hasOwnProperty(i) && removeItems[i].dataset) {
          removeItems[i].dataset.counter = i;
          removeItems[i].onclick = function() {
            myBasket.deleteProducts(arrItems[i]);
            info.innerHTML = myBasket.checkBascket();
          }
        }
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
