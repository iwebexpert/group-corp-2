let arrangeBtn = document.querySelector(".cart__arrange-btn");
let addressNext = document.createElement("button");
let commentNext = document.createElement("button");
let clearBtn = document.createElement("button");

class Product {
  constructor(name, price, currency, id) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.id = id;
  }
}
class Cart {
  constructor() {
    this.cartItems = [];
    this.address = document.createElement("input");
    this.cartArrange = document.querySelector(".cart__arrange");
    this.comment = document.createElement("input");
    this.sum = 0;
  }
  createCatalog() {
    const catalogBlocks = document.createElement("div");
    catalogBlocks.classList.add("catalog__blocks");
    fetch("/goods")
      .then((res) => res.json())
      .then((goods) => {
        goods.map((good) => {
          const catalog = document.querySelector(".catalog");
          const catalogBlock = document.createElement("div");
          catalogBlock.classList.add("catalog__block");
          const catalogBlockTitle = document.createElement("h3");
          catalogBlockTitle.classList.add("catalog__block-title");
          const catalogBlockImg = document.createElement("img");
          catalogBlockImg.classList.add("catalog__block-img");
          catalogBlockImg.setAttribute("src", good.img);
          const addButton = document.createElement('button');
          const catalogBlockPrice = document.createElement("p");
          catalogBlockPrice.classList.add("catalog__block-price");
          addButton.classList.add(`add-${good.class}`);
          const deleteButton = document.createElement("button");
          deleteButton.classList.add(`delete-${good.class}`);
          catalogBlockTitle.textContent = good.title;
          catalogBlockPrice.textContent = `Стоимость : ${good.price}`;
          addButton.textContent = "Добавить";
          deleteButton.textContent = "Удалить";
          catalog.appendChild(catalogBlocks);
          catalogBlocks.appendChild(catalogBlock);
          catalogBlock.appendChild(catalogBlockTitle);
          catalogBlock.appendChild(catalogBlockImg);
          catalogBlock.appendChild(catalogBlockPrice);
          catalogBlock.appendChild(addButton);
          catalogBlock.appendChild(deleteButton);
        });
      });
  }

  addProductToCart(e) {
    if(e.target.className === 'add-keyboard') {
      this.cartItems.push(new Product('keyboard',3000,'RUB',1));
    }
    else if (e.target.className === 'add-mouse') {
      this.cartItems.push(new Product('mouse',500,'RUB',2));
    }
    else if (e.target.className === 'add-monitor') {
      this.cartItems.push(new Product('monitor',2000,'RUB',3));
    }
    else {
      return;
    }
    this.countCartPrice();
  }
  deleteProductFromCart(e) {
    if(e.target.className === 'delete-keyboard' || e.target.className === 'delete-mouse' || e.target.className === 'delete-monitor') {
      let className = e.target.className.split('delete-')[1];
      this.cartItems.map((item,i) => {
        if(className === item.name) {
          this.cartItems.splice(i,1);
        }
      })
    }
    else {
      return;
    }
    this.countCartPrice();
  }
  showBasket(e) {
    if(e.target.className === 'cart__arrange-btn') {
      this.address.style.display = "block";
      addressNext.style.display = "block";
      addressNext.classList.add("address-next");
      this.address.classList.add("adress-input");
      this.address.placeholder = "Введите адрес";
      addressNext.textContent = "Далее";
      this.cartArrange.appendChild(this.address);
      this.cartArrange.appendChild(addressNext);
      arrangeBtn.style.display = "none";
      this.address.value = "";
      this.comment.value = "";
    }
    else {
      return;
    }
    
  }
  showComment(e) {
    if(e.target.className === 'address-next') {
      this.address.style.display = "none";
      addressNext.style.display = "none";
      this.comment.style.display = "block";
      commentNext.style.display = "block";
      commentNext.textContent = "Далее";
      commentNext.classList.add("comment-next");
      this.comment.placeholder = "Введите комментарий";
      this.cartArrange.appendChild(this.comment);
      this.cartArrange.appendChild(commentNext);
    }
    else {
      return;
    }
  }
  showTotal(e) {
    if(e.target.className === 'comment-next') {
      this.comment.style.display = "none";
      commentNext.style.display = "none";
      this.total = document.createElement("p");
      clearBtn.classList.add("clear-btn");
      clearBtn.textContent = "Заказать снова";
      clearBtn.style.display = "block";
      this.total.textContent = `Итоговая стоимость корзины ${this.sum}. Адрес : ${this.address.value}. Комментарий : ${this.comment.value}`;
      this.cartArrange.appendChild(this.total);
      this.cartArrange.appendChild(clearBtn);
      this.cartItems = [];
    }
    else {
      return;
    }
  }
  clearCart(e) {
    if(e.target.className === 'clear-btn') {
      arrangeBtn.style.display = "block";
      this.cartArrange.appendChild(arrangeBtn);
      this.total.style.display = "none";
      clearBtn.style.display = "none";
    }
    else {
      return;
    }
  }
  countCartPrice() {
    this.sum = this.cartItems.reduce(
      (amount, item) => (amount += item.price),
      0
    );
    let priceSum = document.querySelector(".price-sum");
    if (!this.cartItems.length) {
      priceSum.textContent = "В корзине пусто";
    } else {
      priceSum.textContent = `В корзине ${this.cartItems.length}  товаров на сумму ${this.sum}`;
    }
    ``;
  }
}

let cart = new Cart();
document.addEventListener("DOMContentLoaded", () => {
  cart.createCatalog();
  cart.countCartPrice();
});
document.addEventListener("click", (e) => {
  cart.addProductToCart(e);
  cart.deleteProductFromCart(e);
  cart.showBasket(e);
  cart.showComment(e);
  cart.clearCart(e);
  cart.showTotal(e);
});
