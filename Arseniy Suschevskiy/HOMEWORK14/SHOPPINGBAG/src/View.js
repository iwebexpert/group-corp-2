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
		this.deliveryAddress.innerHTML = '<label>Enter delivery address:<input id="address" type="text" class="delivery-input"></label>';

		// Создаем вкладку order comment
		this.orderComment = this.createElement('div','order-comment hidden');
		this.orderComment.innerHTML =
			'<form class="form col s12">' +
			'<div class="row">' +
			'    <div class="input-field col s12">' +
			'        <input id="name" type="text" class="validate" required pattern="^[a-zA-Z]+$">' +
			'        <label for="name">Your Name</label>' +
			'		 <span class="helper-text" data-error="Wrong" data-success="Right">Use only English words</span>' +
			'    </div>' +
			'</div>' +
			'<div class="row">' +
			'    <div class="input-field col s12">' +
			'        <input id="tel" type="tel" class="validate" required pattern="^\\+7\\(\\d{3}\\)\\d{3}-\\d{2}-\\d{2}$" required>' +
			'        <label for="tel">Phone</label>' +
			'		 <span class="helper-text" data-error="Wrong" data-success="Right">Enter your phone like : +7(999)999-99-99</span>' +
			'    </div>' +
			'</div>' +
			'<div class="row">' +
			'    <div class="input-field col s12">' +
			'        <input id="email" type="email" class="validate" required>' +
			'        <label for="email">Email</label>' +
			'		 <span class="helper-text" data-error="Wrong" data-success="Right">Enter your email like : example@domain.com</span>' +
			'    </div>' +
			'</div>' +
			'<div class="row">' +
			'    <div class="input-field col s12">' +
			'        <textarea id="comment" class="comment materialize-textarea"></textarea>' +
			'        <label for="comment">Comment</label>' +
			'    </div>' +
			'</div>'+
			'</form>';

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
		this.completeOrderBtn.type = 'submit';
		this.completeOrderBtn.href = '#modal1';
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

		this.commentTextarea = document.getElementById('comment');
		this.orderForm = document.querySelector('.form');
		this.orderForm.addEventListener('submit', (event) => this.completeOrderHandler(event));
		this.orderForm.appendChild(this.completeOrderBtn);

		this.finalModalBox = this.createElement('div','modal');
		this.finalModalBox.id = 'modal1';

		this.app.appendChild(this.finalModalBox);
	}
	// Функция для создания элементов
	createElement(elementName, className, textContent) {
		const element = document.createElement(elementName);

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
	generateModalText(){
		this.finalModalBox.innerHTML =
			`    <div class="modal-content">` +
			`      <h4>Your order is ready!</h4>` +
			`      <p></p>` +
			`    </div>` +
			`    <div class="modal-footer">` +
			`      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>` +
			`    </div>`;
		const modalContent = document.querySelector('.modal-content');
		modalContent.insertAdjacentElement('beforeend',this.shopList);
		const yourInfo = this.createElement('ul','info');
		yourInfo.innerHTML =
			`<li>Your name ${document.getElementById('name').value}</li>`+
			`<li>Address: ${document.getElementById('address').value}</li>`+
			`<li>Phone number: ${document.getElementById('tel').value}</li>`+
			`<li>Email: ${document.getElementById('email').value}</li>`+
			`<li>Coment for order: ${this.commentTextarea.value}</li>`;
		modalContent.insertAdjacentElement('beforeend', yourInfo);
	}

	showSomeBtn(element, btn){
		if (element.value){
			element.parentNode.contains(btn) || element.parentNode.appendChild(btn);
		}
	}
	completeOrderHandler(event){
		event.preventDefault();
		var elem = document.querySelector('.modal');
		var instances = M.Modal.init(elem);
		var instance = M.Modal.getInstance(elem);
		this.generateModalText();
		instance.open();
		let modalCloseBtn = document.querySelector('.modal-close');
		modalCloseBtn.addEventListener('click', () =>  window.location.reload())
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
