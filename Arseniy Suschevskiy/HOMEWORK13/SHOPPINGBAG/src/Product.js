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
		document.querySelector('.products-list').appendChild(product);

	}
}