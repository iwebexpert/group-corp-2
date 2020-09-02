class Catalog {
	constructor() {
		this.content = [];
		this.clickHandler = this.clickHandler.bind(this);
		this.catalogElement = document.querySelector('#catalog');
		this.loadHandler = this.loadHandler.bind(this);
	}

	getCatalogItems(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status !== 200) {
						reject(xhr.status);
					}
					const items = JSON.parse(xhr.responseText);

					resolve(items);
				}
			};

			xhr.send();
		});
	}

	loadHandler() {
		this.getCatalogItems('/items').then((items) => {
			items.forEach((item) => {
				this.content.push(new Product(item.id, item.name, item.price));
			});
			this.render();
		});
	}

	clickHandler(e) {
		let item = Object.assign({}, this.content.find(f => f.id === parseInt(e.currentTarget.id)));
		cart.pushItem(item);
	}

	render() {
		const catalogTopRow = document.getElementById('catalog').innerHTML = `
					<div class='catalog-top-row'>
						<div>ID</div>
						<div>Название Товара</div>
						<div>Цена</div>
					</div>`;
		window.addEventListener('load', this.loadHandler);

		this.content.forEach(e => {
			const catalogEntry = this.catalogElement.appendChild(document.createElement('div'));
			catalogEntry.classList.add('catalog-entry');
			catalogEntry.addEventListener('click', this.clickHandler);
			catalogEntry.setAttribute('id', e.id + 'catalogEntry');

			Object.entries(e).forEach(f => {
				catalogEntry.appendChild(document.createElement('div')).textContent = f[1];
			})
		})
	}
}