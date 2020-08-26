class Basket {
	constructor(items, view) {
		this.view = view;
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
			this.view.priceSum.textContent = `In bag ${this.items.length} items, on price: ${this.finalPrice} RUB`;
			this.showBtn();
		} else {
			this.view.priceSum.textContent = 'Your shopping bag is empty. To add items, click "Add to bag" button while shopping.';
			this.hideBtn();
		}
	}
	hideBtn() {
		if (this.view.shoppingBag.contains(this.view.resetShopListBtn)){
			this.view.shoppingBag.removeChild(this.view.resetShopListBtn);
			this.view.shoppingBag.removeChild(this.view.nextTabBtn);
		}
	}
	showBtn(){
		if (!this.view.shoppingBag.contains(this.view.resetShopListBtn)) {
			this.view.shoppingBag.appendChild(this.view.resetShopListBtn);
			this.view.shoppingBag.appendChild(this.view.nextTabBtn);
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
			this.view.shopList.appendChild(shopItem);
			this.view.shopList.appendChild(closeBtn);
		});

	}
	resetShopList(){
		this.view.shopList.innerHTML = '';
	}

	clearShopList(){
		this.view.shopList.innerHTML = '';
		this.items = [];
	}
}