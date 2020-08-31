// Для работы модального окна
document.addEventListener('DOMContentLoaded', function() {
	let elems = document.querySelectorAll('.materialboxed');
	let instances = M.Materialbox.init(elems);
});

class View {
	constructor() {
		this.app = document.querySelector('#app');
		//Контейнер для продуктов
		this.productsList = this.createElement('div','products-list');

		// Создаем корзину
		this.basket = this.createElement('div', 'basket');

		// Заголовок для корзины
		this.basketTitle = this.createElement('h2','basket-title','Shopping Bag');

		// Создаем контейнер для состава корзины
		this.shoppingBag = this.createElement('div', 'shopping-bag');

		// Создаем табы, добавляем им обработчик событий
		this.shopTabs = this.createElement('div','shop-tabs');
		this.shopTabs.innerHTML =
			'<span class="waves-effect waves-orange lighten-1 btn-flat">Shopping Bag</span> ' +
			'> <span class="waves-effect waves-orange btn-flat del-address">Delivery Address</span> ' +
			'> <span class="waves-effect waves-orange btn-flat ord-comment">Order comment</span>';

		this.shopTabs.addEventListener('click', (event) => {
			let targetTab = event.target.textContent;
			this.changeTab(targetTab);
		})

		//Создаем список для товаров корзины
		this.shopList = this.createElement('ul', 'shop-list');

		//Создаем элемент корзины, показывающей общую сумму
		this.priceSum = this.createElement('p', 'shop-message');

		// Создаем вкладку deliveryAddress
		this.deliveryAddress = this.createElement('div','address hidden');
		this.deliveryAddress.innerHTML = '<label>Enter delivery address:<input type="text" class="delivery-input"></label>';

		// Создаем вкладку order comment
		this.orderComment = this.createElement('div','order-comment hidden');
		this.orderComment.innerHTML = '<label>Enter your comment for the order:<textarea class="comment"></textarea></label>';

		// Создаем кнопку для сброса списка корзины
		this.resetShopListBtn = this.createElement(
			'button',
			'card-panel red darken-2 btn',
			'Clear Shopping Bag'
		);

		this.resetShopListBtn.addEventListener('click', () => {
			makeBasket.clearShopList();
			makeBasket.isEmpty();
			makeBasket.hideBtn();
		});

		// Создаем кнопку next
		this.nextTabBtn = this.createElement('button', 'card-panel light-green btn next-btn');
		this.nextTabBtn.innerHTML = `<i class="tiny material-icons right">arrow_forward</i>Next`;
		this.nextTabBtn.addEventListener('click', this.nextTabBtnHandler.bind(this));

		// Создаем кнопку complete order
		this.completeOrderBtn = this.createElement(
			'button',
			'card-panel light-green btn-large complete-order',
			'Complete order'
		);
		this.completeOrderBtn.addEventListener('click', this.completeOrderHandler.bind(this));
		// Добавляем все элементы
		this.basket.appendChild(this.basketTitle);
		this.basket.appendChild(this.shopTabs);
		this.basket.appendChild(this.shoppingBag);
		this.basket.appendChild(this.orderComment);
		this.basket.appendChild(this.deliveryAddress);
		this.shoppingBag.appendChild(this.shopList);
		this.shoppingBag.appendChild(this.priceSum);
		this.app.appendChild(this.productsList);
		this.app.appendChild(this.basket);

		this.deliveryInput = document.querySelector('.delivery-input');
		this.deliveryInput.addEventListener('keypress',() => this.showSomeBtn(this.deliveryInput, this.nextTabBtn));

		this.commentTextarea = document.querySelector('.comment');
		this.commentTextarea.addEventListener('keypress',() => this.showSomeBtn(this.commentTextarea, this.completeOrderBtn));
	}
	// Функция для создания элементов
	createElement(elementName, className, textContent) {
		const element = document.createElement(elementName);
		// if (className) {
		// 		element.className += className;
		// }
		(className) && (element.className += className);
		(textContent) && (element.textContent = textContent);
		return element;
	}
	//обработчики событий
	nextTabBtnHandler(){
		if (!this.shoppingBag.classList.contains('hidden')){
			this.changeTab('Delivery Address');
		} else if (!this.deliveryAddress.classList.contains('hidden')){
			this.changeTab('Order comment');
		}
	}
	// inputHandler() {
	// 	if (this.deliveryInput.value){
	// 		this.deliveryAddress.contains(this.nextTabBtn) || this.deliveryAddress.appendChild(this.nextTabBtn);
	// 	}
	// }
	showSomeBtn(element, btn){
		if (element.value){
			element.parentNode.contains(btn) || element.parentNode.appendChild(btn);
		}
	}
	completeOrderHandler(){

	}
	//Функция, меняющая табы
	changeTab(tab) {
		switch (tab) {
			case 'Shopping Bag':
				this.shoppingBag.classList.remove('hidden');
				this.deliveryAddress.classList.add('hidden');
				this.orderComment.classList.add('hidden');
				break;
			case 'Delivery Address':
				this.deliveryAddress.classList.remove('hidden');
				this.shoppingBag.classList.add('hidden');
				this.orderComment.classList.add('hidden');
				break;
			case 'Order comment':
				this.orderComment.classList.remove('hidden');
				this.shoppingBag.classList.add('hidden');
				this.deliveryAddress.classList.add('hidden');
				break;
		}
	}
}
