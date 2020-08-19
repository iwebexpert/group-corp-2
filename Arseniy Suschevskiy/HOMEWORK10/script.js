// Для работы модального окна
document.addEventListener('DOMContentLoaded', function() {
	let elems = document.querySelectorAll('.materialboxed');
	let instances = M.Materialbox.init(elems);
});
// Создаем основной элемент
const app = document.querySelector('#app');
const productsList = document.createElement('div');
productsList.classList.add('products-list');
// Создаем корзину
const basket = document.createElement('div');
basket.classList.add('basket');
// Заголовок для корзины
const basketTitle = document.createElement('h2');
basketTitle.textContent = 'Shopping Bag';
// Создаем контейнер для состава корзины
const shoppingBag = document.createElement('div');
shoppingBag.classList.add('shopping-bag');
// Создаем меню корзины
const shopTabs = document.createElement('div');
shopTabs.classList.add('shop-tabs');
shopTabs.innerHTML =
	'<span class="waves-effect waves-orange lighten-1 btn-flat">Shopping Bag</span> ' +
	'> <span class="waves-effect waves-orange btn-flat">Delivery Address</span> ' +
	'> <span class="waves-effect waves-orange btn-flat">Order comment</span>';
shopTabs.addEventListener('click', (event) => {
	let targetTab = event.target.textContent;
	changeTab(targetTab);
})
// знаю что можно сделать красивее через циклы, но решил сделать так.
function changeTab(tab) {
	switch (tab) {
		case 'Shopping Bag':
			shoppingBag.classList.remove('hidden');
			deliveryAddress.classList.add('hidden');
			orderComment.classList.add('hidden');
			break;
		case 'Delivery Address':
			deliveryAddress.classList.remove('hidden');
			shoppingBag.classList.add('hidden');
			orderComment.classList.add('hidden');
			break;
		case 'Order comment':
			orderComment.classList.remove('hidden');
			shoppingBag.classList.add('hidden');
			deliveryAddress.classList.add('hidden');
			break;
	}
}


const shopList = document.createElement('ul');
shopList.className = 'shop-list';
const priceSum = document.createElement('p');
priceSum.classList.add('shop-message');
// Создаем вкладку deliveryAddress
const deliveryAddress = document.createElement('div');
deliveryAddress.className = 'address hidden';
deliveryAddress.innerHTML = '<label>Enter delivery address:<input type="text"></label>';

// Создаем вкладку order comment
const orderComment = document.createElement('div');
orderComment.innerHTML = '<label>Enter your comment for the order:<textarea class="comment"></textarea></label>';
orderComment.className = 'order-comment hidden';

const resetShopListBtn = document.createElement('button');
resetShopListBtn.className = 'waves-effect card-panel red darken-2 btn';
resetShopListBtn.textContent = 'Clear Shopping Bag';

resetShopListBtn.addEventListener('click', () => {
	makeBasket.clearShopList();
	makeBasket.isEmpty();
	makeBasket.hideBtn();
});
// Добавляем все элементы
basket.appendChild(basketTitle);
basket.appendChild(shopTabs);
basket.appendChild(shoppingBag);
basket.appendChild(orderComment);
basket.appendChild(deliveryAddress);
shoppingBag.appendChild(shopList);
shoppingBag.appendChild(priceSum);
app.appendChild(productsList);
app.appendChild(basket);

class Basket {
	constructor(items) {
		this.items = [];
		this.isEmpty();
	}
	addItem(item) {
		let include = false;
		//Проверить есть ли уже такой Item в массиве, и если есть добавить ему количество
		this.items.forEach((element, i) => {
			if (this.items[i].includes(item.name)){
				this.items[i][2] = ++this.items[i][2];
				console.log('include');
				include = true;
			}
		})
		// Если таких Item нет, то добавить
		if (!include) this.items[this.items.length] = [item.name, item.price, 1];
	}
	countBasketPrice() {
		let sum = 0;
		this.items.forEach((element, i) => {
			sum += this.items[i][1] * this.items[i][2];
		})
		this.finalPrice = sum;
	}
	isEmpty(){
		if (this.items.length !== 0) {
			priceSum.textContent = `In bag ${this.items.length} items, on price: ${this.finalPrice} RUB`;
			this.showBtn();
		} else {
			priceSum.textContent = 'Your shopping bag is empty. To add items, click "Add to bag" button while shopping.';
			this.hideBtn();
		}
	}
	hideBtn() {
		if (shoppingBag.contains(resetShopListBtn)){
			shoppingBag.removeChild(resetShopListBtn);
		}
	}
	showBtn(){
		if (!shoppingBag.contains(resetShopListBtn)) {
			shoppingBag.appendChild(resetShopListBtn);
		}
	}
	updateShopList(){
		this.items.forEach((elements, i) => {
			const shopItem = document.createElement('li');
			shopItem.innerHTML =
				`<span>${this.items[i][0]}</span>
				 <span>${this.items[i][1]} RUB</span>
				 <span>${this.items[i][2]}</span>`;
			const closeBtn = document.createElement('i');
			closeBtn.classList.add('material-icons');
			closeBtn.textContent = 'close';
			closeBtn.addEventListener('click', () => {
				this.items.splice(i, 1);
				// delete this.items[i];
				makeBasket.resetShopList();
				makeBasket.updateShopList();
				makeBasket.countBasketPrice();
				makeBasket.isEmpty();
			});
			shopList.appendChild(shopItem);
			shopList.appendChild(closeBtn);
		});

	}


	resetShopList(){
		shopList.innerHTML = '';
	}
	clearShopList(){
		shopList.innerHTML = '';
		this.items = [];
	}
}
class Product {
	constructor(name, price, imageUrl) {
		this.name = name;
		this.price = price;
		this.imageUrl = imageUrl;
		this.createProduct();
	}
	createProduct() {
		//Создаем карточку продукта
		const product = document.createElement('div');
		product.className = 'product card';
		//Создаем кнопку
		const productBtn = document.createElement('button');
		productBtn.className = 'waves-effect card-panel amber lighten-1 btn';
		productBtn.textContent = 'Add to bag';
		// productBtn.onclick = M.toast({html: 'Добавлено в корзину'});

		//Обертка для картинки и названия товара
		const productImageInner = document.createElement('div');
		productImageInner.className = 'card-image';
		product.appendChild(productImageInner);
		//Cоздаём картинку
		const productImage = document.createElement('img');
		productImage.src = this.imageUrl;
		productImage.width = '200';
		productImage.className = 'materialboxed';
		productImageInner.appendChild(productImage);
		//Создаем заголовок для товара
		const productTitle = document.createElement('span');
		productTitle.className = 'card-title';
		productTitle.textContent = `${this.name}`;
		productImageInner.appendChild(productTitle);
		//Создаем контент карточки
		const productContent = document.createElement('div');
		productContent.classList.add('card-content');
		productContent.innerHTML = `<p class="price">${this.price} RUB</p>`;
		product.appendChild(productContent);

		productBtn.addEventListener('click', () => {
			makeBasket.addItem(this);
			makeBasket.resetShopList();
			makeBasket.updateShopList();
			makeBasket.countBasketPrice();
			makeBasket.isEmpty();
		});

		productContent.appendChild(productBtn);
		productsList.appendChild(product);

	}
}
let apple = new Product('apples', 35,'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/apples-royalty-free-image-164084111-1537885595.jpg');
let banana = new Product('bananas', 64, 'https://cosmosmagazine.com/wp-content/uploads/2020/02/100118_Debunked_01.jpg');
let lemon = new Product(`lemon's`, 87, 'https://www.agriorbit.com/wp-content/uploads/2020/05/lemons-2039830_1280-1.jpg');
let cherry = new Product('cherry', 125, 'https://southmelbournemarket.com.au/wp-content/uploads/2014/11/cherries1.jpg');
let makeBasket = new Basket([]);
