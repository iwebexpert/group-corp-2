class Basket {
	constructor( view, api) {
		this.view = view;
		this.api = api;
		this.bag = {};
		this.isEmpty();
		this.ifReload();
	}
	async addItem(item) {
		let ID = item.id;
		if (this.bag[ID]){
			let response = await this.api.PATCH(this.bag[ID],this.bag[ID].quantity + 1);
			if (response.ok) {
				this.bag[ID].quantity++;
				this.countBasketPrice();
				this.isEmpty();
				this.updateShopList();
			}
		} else {
			let response =  await this.api.POST(item);
			console.log(response);
			if (response.ok) {
				let response = await this.api.GET();
				let data = await response.json();
				this.bag[ID] = data.find(item => item.id === ID);
			}
			this.countBasketPrice();
			this.isEmpty();
			this.updateShopList();
		}
	}
	ifReload(){
		this.api.GET()
			.then(response => response.json())
			.then(response => {
				if (Object.keys(response).length !== 0){
					this.bag = response;
					this.countBasketPrice();
					this.updateShopList();
					this.isEmpty();
				}
			})
	}
	countBasketPrice() {
		let sum = 0;
		for (let key in this.bag){
			sum += this.bag[key].price * this.bag[key].quantity;
		}
		this.finalPrice = sum;
	}
	isEmpty(){
		if (Object.keys(this.bag).length !== 0) {
			this.view.priceSum.textContent = `In bag ${Object.keys(this.bag).length} items, on price: ${this.finalPrice} RUB`;
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
		this.resetShopList();
		for (let key in this.bag) {
			const shopItem = document.createElement('li');
			shopItem.innerHTML =
				`<span>${this.bag[key].name}</span>
				 <span>${this.bag[key].price} RUB</span>
				 <span>${this.bag[key].quantity}</span>`;
			const closeBtn = document.createElement('i');
			closeBtn.classList.add('material-icons');
			closeBtn.textContent = 'close';
			closeBtn.addEventListener('click', async () => {
				await this.api.DELETE(this.bag[key]);
				delete this.bag[key];
				this.resetShopList();
				this.updateShopList();
				this.countBasketPrice();
				this.isEmpty();
			});
			this.view.shopList.appendChild(shopItem);
			this.view.shopList.appendChild(closeBtn);
		}
	}
	resetShopList(){
		this.view.shopList.innerHTML = '';
	}

	async clearShopList(){
		for (let key in this.bag){
			let response = await this.api.DELETE(this.bag[key]);
		}
		this.view.shopList.innerHTML = '';
		this.bag = {};
		this.isEmpty();
	}
}