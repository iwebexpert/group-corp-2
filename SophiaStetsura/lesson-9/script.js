 document.addEventListener('DOMContentLoaded', () => {
  let main = document.querySelector('.main');
  let hd = document.createElement('h1');
  hd.className = 'header';
  hd.innerHTML = 'This is your basket';
  hd.style.textAlign = 'center';
  main.appendChild(hd);
  let basketWrap = document.createElement('div');
  basketWrap.className = 'basket__wrap';
  main.appendChild(basketWrap);
  let newProd;
  
  class Basket {
    constructor(prod, price) {
      this.prod = prod;
      this.price = price;
      this.sum={
        'Общая сумма': 0,
        'Количество товара': 0,
        Товар: this.prod
      }
    }
    getSum(prod, sum, amount) {
        this.sum={
        'Общая сумма': sum,
        'Количество товара': amount,
        Товар: prod
      };
    }
    returnSum(){
      return this.sum;
    }
    getItemName() {
      return this.prod;
    }
  }
  function createProdItem(item) {
    newProd = document.createElement('div');
    newProd.className = 'prod__wrap';
    newProd.innerHTML = `
   <div class="prod__header">${item.prod}</div>
   
   <div class="count">
   <div class="prod__price">${item.price}</div>
   <button class="minus">-</button>
   <div class="number">0</div>
   <button class="plus">+</button>
  </div>`;
    basketWrap.appendChild(newProd);
  }
  let addBasket = document.createElement('button');
  addBasket.className = 'add__btn';
  addBasket.innerHTML = 'Купить';
  main.appendChild(addBasket);
  
  // ------------------------------------------
  let basketInfo = document.createElement('div');
  basketInfo.className = 'basket__info';
  basketInfo.innerHTML =
    `<div class="sum__wrap">Корзина пуста</div>
     <div class="sum__price"></div>`;
  main.appendChild(basketInfo);
  
  let newFood1 = new Basket("pizza", 1500);
  let newFood2 = new Basket("sandwich", 120);
  let newFood3 = new Basket("ice", 100);
  let arrFood = [newFood1, newFood2, newFood3];
  createProdItem(newFood1);
  createProdItem(newFood2);
  createProdItem(newFood3);
  // -------------------------------------------------------
  let del = document.createElement('button');
  del.className = 'delete';
  del.innerHTML = 'Очистить';
  main.appendChild(del);
  // -----------------------------------------------
  
  // -----------------------------------------------------
  var infoWrap = document.querySelector('.sum__wrap');
  //  ----------------------plus and minus--------------------
  function addHandlers(count) {
    var minus = count.querySelector(".minus");
    var number = count.querySelector(".number");
    var plus = count.querySelector(".plus");
    let price = count.querySelector('.prod__price');

    plus.addEventListener("click", function () {
     number.innerText++;
      sum = number.innerText * price.innerText; 
      for (let i=0; i<arrFood.length; i++)
        {
          if (arrFood[i].getItemName() === count.previousElementSibling.textContent)
            {
              arrFood[i].getSum(arrFood[i].getItemName(), sum, parseInt(number.innerText));
            }
        }
    });
    minus.addEventListener("click", function () {
      if (number.textContent == 0) {
        number.textContent = 0;
      }
      else {
        number.innerText--;
      }
      sum = number.innerText * price.innerText; 
      for (let i=0; i<arrFood.length; i++)
        {
          if (arrFood[i].getItemName() === count.previousElementSibling.textContent)
            {
              arrFood[i].getSum(arrFood[i].getItemName(), sum, parseInt(number.innerText));
            }
        }
    });
  }
  
  var counts = document.querySelectorAll(".count");
  counts.forEach(addHandlers);

  // -------------------clear--------------------------------
  let dele = document.querySelector('.delete');
  
  dele.addEventListener("click", function () {
    var number = document.querySelectorAll(".number");
    for (let i=0; i<arrFood.length; i++)
    {
      arrFood[i].getSum(arrFood[i].getItemName(), 0, 0);
    }
    infoWrap.textContent = 'Корзина пуста';
    for (let i = 0; i < number.length; i++) {
      number[i].innerText = 0;
    }
  })
  
  let price = document.querySelectorAll('.prod__price');
  var number = document.querySelectorAll(".number");
  addBasket.addEventListener("click", function () {
    let infoPrice=0;
    let infoAmount='';
    for (let i=0; i<arrFood.length; i++)
      {
        if (arrFood[i].returnSum()['Количество товара'] !== 0)
        {
            infoAmount+=`${arrFood[i].returnSum()['Товар']} в количестве ${arrFood[i].returnSum()['Количество товара']} штук `;
            infoPrice+=arrFood[i].returnSum()['Общая сумма'];
        }
      }
    if (infoPrice === 0)
      {
        infoWrap.innerText = `В корзине ничего нет`;
      }
    else {
        infoWrap.innerText = `В корзине выбрано ${infoAmount} на общую сумму в ${infoPrice} рублей`;
    }
      infoAmount='';
  })

let hb = document.createElement('h2');
  hb.className = 'header';
  hb.innerHTML = 'Хочешь кушать, но нет денег? Посмотри на фото еды!';
  hb.style.textAlign = 'center';
  main.appendChild(hb);
  let modalBtn = document.createElement('button');
  modalBtn.className = 'modal__btn';
  modalBtn.innerHTML = 'ЖМАКНИ';
  main.appendChild(modalBtn);
  let modal = document.createElement('div');
  modal.className = 'modal';
  let modalContent = document.createElement('div');
  modalContent.className = 'modal__content';
  let closeModal = document.createElement('span');
  closeModal.className = 'close__modal';
  closeModal.innerHTML = '&times';
  let img = document.createElement('img');
  img.src = 'https://eda.ru/img/eda/1200x-i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg';
//   let img = `<div class="mySlideshow">
//   <img src="https://eda.ru/img/eda/1200x-i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg">
//   <img src="https://cdnimg.rg.ru/img/content/173/66/14/variety-of-ice-cream-cones-picture-id685816670_d_850.jpg">
//   <img src="https://vilkin.pro/wp-content/uploads/2018/11/sendvich-s-vetchinoi-i-syrom-770x513.jpg">
// </div>`
  main.appendChild(modal);
  modal.appendChild(modalContent);
  modalContent.appendChild(closeModal);
  modalContent.appendChild(img);

  modalBtn.onclick = function () {
    // modal.style.display = 'block';
    modal.classList.toggle('block');
  }
  closeModal.onclick = function () {
    modal.classList.add('none');
  }
  window.onclick = function (e) {
    if (e.target == modal) {
      modal.classList.add('none');
    } 
  }

});