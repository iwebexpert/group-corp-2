class Cart {
	constructor() {
		this.items = [];
		this.renderCart();
	}

	pushItem(item) {
		let itemInCart = this.items.find(f => f.id === item.id);
		if (itemInCart) {
			itemInCart.amount += 1;
			this.patchItem(itemInCart).then(res => {
				if (res.status === 200) {
					itemInCart.render();
					this.checkout();
				} else {
					itemInCart.amount -= 1;
					console.log('Ошибка добавления предмета');
					return;
				}
			})
		} else {
			const newItem = new CartItem(item)
			this.sendItem(item).then(res => {
				if (res.status === 201) {
					this.items.push(newItem);
					newItem.render();
					this.checkout();
				} else {
					console.log('Ошибка добавления предмета');
					return;
				}
			})
		}
	}

	//методы для связи с сервером начинаются тут
	sendItem(item) {
		return fetch('/cart', {
			method: 'POST',
			body: JSON.stringify(item, item.amount = 1),
			headers: {
				'Content-type': 'application/json'
			}
		})
	}

	patchItem(item) {
		return fetch('/cart/' + item.id, {
			method: 'PATCH',
			body: JSON.stringify({ amount: item.amount }),
			headers: {
				'Content-type': 'application/json'
			}
		})
	}

	deleteItem(item) {
		fetch('/cart/' + item.id, {
			method: 'DELETE'
		}).then(res => {
			if (res.status === 200) {
				this.items.splice(this.items.findIndex(el => el.id === item.id), 1);
			} else {
				console.log('Ошибка удаления предметов');
			}
		})
	}

	renderCart() {
		fetch('/cart', { method: 'GET' })
			.then(res => {
				if (res.status === 200) {
					return res.json();
				} else {
					console.log('Ошибка получения корзины с сервера');
					return;
				}
			})
			.then(res => {
				res.forEach(el => {
					const item = new CartItem(el);
					this.items.push(item);
				})
				this.checkout();
			})
	}
	//методы для связи с сервером заканчиваются тут

	checkout() {
		const total = this.items.reduce(((a, c) => a + c.price * c.amount), 0);
		const itemsSum = this.items.reduce(((a, c) => a + c.amount), 0);
		document.getElementById('total').textContent = 'В корзине ' + itemsSum + ' товаров на сумму: ' + total + ' руб.';
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
		this.id = item.id;
		this.name = item.name;
		this.price = item.price;

		this.changeHandler = this.changeHandler.bind(this);

		this.entry = document.createElement('div');
		this.input = document.createElement('input');

		if (item.amount) {
			this.renderNew(item.amount);
		} else {
			this.amount = 0;
		}
	}

	changeHandler(e) {
		this.amount = e.target.valueAsNumber;
		if (this.amount === 0) {
			this.entry.remove();
			cart.deleteItem(this);
			cart.checkout();
		} else {
			cart.patchItem(this).then(res => {
				if (res.status != 200) {
					console.log('Ошибка добавления товара');
					this.render();
				}
				cart.checkout();
			});
		}
	}

	render() {
		if (this.amount != 0) {
			this.input.value = this.amount;
		} else {//добавляем элемент в корзину
			this.amount = 1;
			this.renderNew();
		}
		cart.checkout();
	}

	renderNew(amount = 1) {
		this.amount = amount;
		this.entry.classList.add('cart-entry');
		this.entry.setAttribute('id', this.id + 'cartEntry');
		this.entry.appendChild(document.createElement('div')).textContent = this.name;
		this.entry.appendChild(document.createElement('div')).textContent = this.price;
		this.input = this.entry.appendChild(document.createElement('input'));
		this.input.setAttribute('type', 'number');
		this.input.addEventListener('change', this.changeHandler);
		this.input.value = this.amount;
		document.getElementById('cart').appendChild(this.entry);
		cart.checkout();
	}
}