class Cart {
  constructor() {
    this.items = [];
    this.changeHandler = this.changeHandler.bind(this);
  }

  checkout() {
    const itemsSum = this.items.reduce(((a, c) => a + c.amount), 0);
    const total = this.items.reduce(((a, c) => a + c.price * c.amount), 0);
    document.getElementById('total').textContent = 'В корзине ' + itemsSum + ' товаров на сумму: ' + total + ' руб.';
  }

  pushItem(item) {
    const itemInCart = this.items.find(f => f.id === item.id);
    if (itemInCart) {
      itemInCart.amount += 1;
      document.getElementById(itemInCart.id + 'cartEntry').querySelector('input').value = itemInCart.amount;
    } else {//добавляем элемент в корзину
      item.amount = 1;
      this.items.push(item);

      const cartEntry = document.getElementById('cart').appendChild(document.createElement('div'));
      cartEntry.classList.add('cart-entry');
      cartEntry.setAttribute('id', item.id + 'cartEntry');

      cartEntry.appendChild(document.createElement('div')).textContent = item.name;
      cartEntry.appendChild(document.createElement('div')).textContent = item.price;
      const input = cartEntry.appendChild(document.createElement('input'));
      input.setAttribute('type', 'number');
      input.addEventListener('change', this.changeHandler);
      input.value = item.amount;
    }
    this.checkout();
  }

  changeHandler(e) {
    const itemId = parseInt(e.path[1].id);
    const itemIndex = this.items.findIndex(f => f.id === itemId);
    const item = this.items[itemIndex];
    item.amount = e.target.valueAsNumber;

    if (item.amount === 0) {
      document.getElementById(item.id + 'cartEntry').remove();
      this.items.splice(itemIndex, 1);
    }
    this.checkout();
  }

  clear() {
    document.getElementById('cart').innerHTML =
      `<div class='cart-entry'>
					<div>Название</div >
					<div>Цена</div>
					<div>Кол-во</div>
			 	</div>`;
    document.getElementById('total').textContent = 'Корзина пуста';
    this.items = [];
  }
}