class Cart {
	constructor() {
		this.items = [];
	}

	checkout() {
		const total = this.items.reduce(((a, c) => a + c.price * c.amount), 0);
		const itemsSum = this.items.reduce(((a, c) => a + c.amount), 0);
		document.getElementById('total').textContent = 'В корзине ' + itemsSum + ' товаров на сумму: ' + total + ' руб.';
	}

	pushItem(item) {
		let itemInCart = this.items.find(f => f.id === item.id);

		if (itemInCart) {
			itemInCart.render();
			this.patchItem(itemInCart);
			console.log(this.items)
		} else {
			const newItem = new CartItem(item)
			this.items.push(newItem);
			this.sendItem(item);
			newItem.render();
		}
		this.checkout();
	}

	async sendItem(item) {
		const data = await fetch('/cart', {
			method: 'POST',
			body: JSON.stringify(item, item.amount = 1),
			headers: {
				'Content-type': 'application/json'
			}
		})
	}

	async patchItem(item) {
		const data = await fetch('/cart/' + item.id, {
			method: 'PATCH',
			body: JSON.stringify({ amount: item.amount }),
			headers: {
				'Content-type': 'application/json'
			}
		})
	}

	async deleteItem(item) {
		const data = await fetch('/cart/' + item.id, {
			method: 'DELETE'
		});
		this.items.splice(this.items.findIndex(el => el.id === item.id), 1);
	}

	clear() {
		document.getElementById('cart').innerHTML =
			`<div class='cart-entry'>
					<div>Название</div >
					<div>Цена</div>
					<div>Кол-во</div>
			 	</div>`;
		document.getElementById('total').textContent = 'Корзина пуста';
		this.items.forEach((el) => this.deleteItem(el));
	}
}

class CartItem {
	constructor(item) {
		this.amount = 0;
		this.id = item.id;
		this.name = item.name;
		this.price = item.price;

		this.changeHandler = this.changeHandler.bind(this);

		this.entry = document.createElement('div');
		this.input = document.createElement('input');
	}

	changeHandler(e) {
		this.amount = e.target.valueAsNumber;
		if (this.amount === 0) {
			this.entry.remove();
			cart.deleteItem(this)
		} else {
			cart.patchItem(this);
		}
		cart.checkout();
	}

	render() {
		if (this.amount != 0) {
			this.amount += 1;
			this.input.value = this.amount;
		} else {//добавляем элемент в корзину
			this.amount = 1;
			this.entry.classList.add('cart-entry');
			this.entry.setAttribute('id', this.id + 'cartEntry');
			this.entry.appendChild(document.createElement('div')).textContent = this.name;
			this.entry.appendChild(document.createElement('div')).textContent = this.price;
			this.input = this.entry.appendChild(document.createElement('input'));
			this.input.setAttribute('type', 'number');
			this.input.addEventListener('change', this.changeHandler);
			this.input.value = this.amount;

			document.getElementById('cart').appendChild(this.entry);
		}
		cart.checkout();
	}
}