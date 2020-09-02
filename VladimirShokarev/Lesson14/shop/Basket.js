class Basket {
  constructor(name) {
    this.name = name;
    this.products = [];
  }

/*Берем массив из db.JSON*/
  sendRequest(url){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status !== 200){
                    reject(xhr.status);
                }
                arrItems = JSON.parse(xhr.responseText);
                resolve(arrItems);
            }
        };

    xhr.send();
    });
}


makeGETRequest(){
    this.sendRequest('/goods').then((arrItems) => {
        console.log(arrItems);
    },
    (status) => {
        console.log('Error', 'Status code:', status);
    }
);

};

  getInfo(item){
    console.log(item);
    console.log(this.products);
    let str = ``;
    for(let i = 0; i < this.products.length; i++){
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
    if(this.products.length > 1){
      for (let i = 0; i < this.products.length-1; i++){
        if(this.products[i][0].name == product.name){
          this.products.splice(i, 1);
          document.getElementsByClassName('productCatalog')[i].remove();
        }
      }
    }
  }

  addProductsInside(product, amount){
      for (let i = 0; i < this.products.length; i++){
        if(this.products[i][0].name == product.name){
          this.products[i][1] = amount;
        }
      }
  }

  /*Удаляем продукт*/
  deleteProducts(product){
    console.log(this.products);
    for (let i = 0; i < this.products.length; i++){
      if(this.products[i][0].name == product.name){
        document.getElementsByClassName('productCatalog')[i].remove();
        this.products.splice(i, 1);
      }
    }
  }

  sumFuncRub(){
    let sum = 0;
    for (let i = 0; i < this.products.length; i++) {
      sum += this.products[i][0].price * this.products[i][1];
    }
    if(sum == 0) return 'Пустая корзина';
    return 'Cумма: ' + sum + " RUB";
  }

  addItemsInTheBascket(i){
    let valueCount = document.getElementsByClassName('valueCount')[i].value;
    if(valueCount == '' || valueCount == 0) valueCount = 1;
    if(valueCount < 0) valueCount = valueCount.slice(1);

    myBasket.createBasket(valueCount, i);
  }

  createBasket(valueCount, i){
    myBasket.addProducts(arrItems[i], valueCount);
    let productCatalog = document.createElement('div');
    productCatalog.classList.add(`productCatalog`);
    info.appendChild(productCatalog);

    myBasket.checkAndWrite(productCatalog, i);

    myBasket.createBtns(productCatalog, valueCount, i);
  }

  checkAndWrite(productCatalog, i){
    productCatalog.innerHTML = myBasket.getInfo(arrItems[i]);
    document.getElementsByClassName('valueCount')[i].value = '';
    emptyBsk.innerHTML = myBasket.sumFuncRub();
  }

  createBtns(productCatalog, valueCount, i){
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
      myBasket.addProductsInside(arrItems[i], valueCount);
      productCatalog.innerHTML = myBasket.getInfo(arrItems[i]);
      emptyBsk.innerHTML = myBasket.sumFuncRub();
      myBasket.createBtns(productCatalog, valueCount, i);
    }
    minusBtn.onclick = function(){
      valueCount--;
      if(valueCount == 0){
        myBasket.deleteProducts(arrItems[i]);
        emptyBsk.innerHTML = myBasket.sumFuncRub();
        return;
      }
      myBasket.addProductsInside(arrItems[i], valueCount);
      productCatalog.innerHTML = myBasket.getInfo(arrItems[i]);
      emptyBsk.innerHTML = myBasket.sumFuncRub();
      myBasket.createBtns(productCatalog, valueCount, i);
    }
  }

  deleteItemsFromTheBascket(i){
    myBasket.deleteProducts(arrItems[i]);
    emptyBsk.innerHTML = myBasket.sumFuncRub();
  }

}
