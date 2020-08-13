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

const shopList = document.createElement('div');
const priceSum = document.createElement('p');

const resetShopListBtn = document.createElement('button');
resetShopListBtn.className = 'waves-effect card-panel orange btn';
resetShopListBtn.textContent = 'Clear Shopping Bag';

resetShopListBtn.addEventListener('click', () => {
	makeBasket.clearShopList();
	makeBasket.isEmpty();
	makeBasket.hideBtn();
});

basket.appendChild(basketTitle);
basket.appendChild(shopList);
basket.appendChild(priceSum);
app.appendChild(productsList);
app.appendChild(basket);

class Basket {
	constructor(items, prices) {
		this.items = [...items];
		this.prices = [...prices];
		this.isEmpty();
	}
	addItem(item) {
		this.items.push(item.name);
		this.prices.push(item.price);
		console.log(this.items);
		console.log(this.prices);
	}
	countBasketPrice() {
		let sum = 0;
		for (let i = 0; i < this.prices.length; i++) {
			sum += this.prices[i];
		}
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
		if (basket.contains(resetShopListBtn)){
			basket.removeChild(resetShopListBtn);
		}
	}
	showBtn(){
		if (!basket.contains(resetShopListBtn)) {
			basket.appendChild(resetShopListBtn);
		}
	}
	updateShopList(){
		for (let i = 0; i < this.items.length; i++){
			let shopItem = document.createElement('p');
			shopItem.innerHTML = `${this.items[i]}  price:${this.prices[i]} RUB`;
			shopList.appendChild(shopItem);
		}
	}
	resetShopList(){
		shopList.innerHTML = '';
	}
	clearShopList(){
		shopList.innerHTML = '';
		this.items = [];
		this.prices = [];
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
let makeBasket = new Basket([],[]);
