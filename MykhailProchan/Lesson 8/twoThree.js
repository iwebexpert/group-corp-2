const cart = {
	items: [],
	total: () => {
		return cart.items.reduce(((a, c) => a + c.price * c.amount), 0);
	},
	subtotal: (id) => {
		let item = cart.items.find(f => f.id === id);
		return item.price * item.amount;
	}
}

class Product {
	constructor(id, name, price) {
		this.id = id;
		this.name = name;
		this.price = price;
	}
}

const catalog = [new Product(0001, 'Мышка', 1000), new Product(0002, 'Клавиатура', 2000), new Product(0003, 'Ещё что-то', 300)];

function two(e) {
	let item = Object.assign({}, catalog.find(f => f.id === parseInt(e.currentTarget.id)));
	let itemInCart = cart.items.find(f => f.id === item.id);
	if (itemInCart) {
		itemInCart.amount += 1;
		document.getElementById(itemInCart.id + 'cartEntry').querySelectorAll('div')[2].innerText = itemInCart.amount;
	} else {
		item.amount = 1;
		cart.items.push(item);
		const cartEntry = document.getElementById('cart').appendChild(document.createElement("div"));
		cartEntry.classList.add('cart-entry');
		cartEntry.setAttribute("id", item.id + 'cartEntry');
		Object.entries(item).forEach((f, i) => {
			if (i != 0) {
				cartEntry.appendChild(document.createElement("div"))
					.innerText = f[1];
			}
		})
	}
	document.getElementById("total").innerText = "Сумма: " + cart.total() + " руб.";
}

function clearCart() {
	document.getElementById('cart').innerHTML =
		`<div class="cart-entry">
					<div>Название</div >
					<div>Цена</div>
					<div>Кол-во</div>
			 	</div>`
	document.getElementById('total').innerText = "Корзина пуста"
	cart.items = [];
}

function three() {
	const catalogTopRow = document.getElementById('catalog').innerHTML = `
					<div class="catalog-top-row">
						<div>ID</div>
						<div>Название Товара</div>
						<div>Цена</div>
					</div>`

	catalog.forEach(e => {
		const catalogEntry = document.getElementById('catalog').appendChild(document.createElement("div"));
		catalogEntry.classList.add("catalog-entry");
		catalogEntry.setAttribute("onclick", "two(event)")
		catalogEntry.setAttribute("id", e.id + 'catalogEntry')
		Object.entries(e).forEach(f => {
			catalogEntry.appendChild(document.createElement("div"))
				.innerText = f[1];
		})
	})
}