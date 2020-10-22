import './style.css';

const cart = {
	items: [] as itemInterface[],
	total: () => {
		return cart.items.reduce(((a, c) => a + c.price * c.amount), 0);
	},
	subtotal: (id: number) => {
		let item: itemInterface = cart.items.find((f: itemInterface) => f.id === id)!;
		return item.price * item.amount!;
	},
	itemsSum: () => {
		return cart.items.reduce(((a, c) => a + c.amount), 0);
	}
}

interface itemInterface {
	id: number;
	name: string;
	price: number;
	amount: number;
}

const catalog = [{ id: 1, name: 'Мышка', price: 1000, amount: 0 }, { id: 2, name: 'Клавиатура', price: 2000, amount: 0 }, { id: 3, name: 'Ещё что-то', price: 300, amount: 0 }];

const total: HTMLElement | null = document.querySelector('#total');
const clearButton: HTMLButtonElement | null = document.querySelector('#clearButton')
const cartElement = document.querySelector('#cart')
const catalogElement: HTMLElement | null = document.querySelector('#catalog')

three(); clearCart();

if (clearButton) clearButton.onclick = clearCart;

function two(id: number) {
	let item = Object.assign({}, catalog.find(f => f.id === id));
	let itemInCart = cart.items.find(f => f.id === item.id);
	if (itemInCart) {
		itemInCart.amount += 1;
		const el: HTMLElement | null = document.getElementById(itemInCart.id.toString() + 'cartEntry');
		if (el) el.querySelectorAll('div')[2].innerText = itemInCart.amount.toString();
	} else {
		item.amount = 1;
		cart.items.push(item);

		if (!cartElement) return

		const cartEntry = cartElement.appendChild(document.createElement("div"));
		cartEntry.classList.add('cart-entry');
		cartEntry.setAttribute("id", item.id + 'cartEntry');
		Object.entries(item).forEach((f, i) => {
			if (i != 0) {
				cartEntry.appendChild(document.createElement("div"))
					.innerText = f[1].toString();
			}
		})
	}
	if (total) total.innerText = "В корзине " + cart.itemsSum() + " товаров на сумму: " + cart.total() + " руб.";
}

function clearCart() {
	if (cartElement && total) {
		cartElement.innerHTML =
			`<div class="cart-entry">
					<div>Название</div >
					<div>Цена</div>
					<div>Кол-во</div>
			 	</div>`
		total.innerText = "Корзина пуста"
		cart.items = [];
	}
}

function three() {
	if (catalogElement) {
		catalogElement.innerHTML = `
					<div class="catalog-top-row">
						<div>ID</div>
						<div>Название Товара</div>
						<div>Цена</div>
					</div>`

		catalog.forEach(e => {
			const catalogEntry: HTMLDivElement = catalogElement.appendChild(document.createElement("div"));

			catalogEntry.classList.add("catalog-entry");
			catalogEntry.onclick = (): void => {
				two(+catalogEntry.id[0])
			}
			catalogEntry.setAttribute("id", e.id + 'catalogEntry')

			delete e.amount;

			Object.entries(e).forEach(f => {
				catalogEntry.appendChild(document.createElement("div"))
					.innerText = f[1].toString();
			})
		})
	}
}