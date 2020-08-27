class Catalog {
  constructor() {
    this.content = [new Product(1, 'Мышка', 1000), new Product(2, 'Клавиатура', 2000), new Product(3, 'Ещё что-то', 300)];
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    const item = Object.assign({}, this.content.find(f => f.id === parseInt(e.currentTarget.id)));
    cart.pushItem(item);
  }

  render() {
    const catalogTopRow = document.getElementById('catalog').innerHTML = `
					<div class='catalog-top-row'>
						<div>ID</div>
						<div>Название Товара</div>
						<div>Цена</div>
					</div>`;

    this.content.forEach(e => {
      const catalogEntry = document.getElementById('catalog').appendChild(document.createElement('div'));
      catalogEntry.classList.add('catalog-entry');
      catalogEntry.addEventListener('click', this.clickHandler);
      catalogEntry.setAttribute('id', e.id + 'catalogEntry');

      Object.entries(e).forEach(f => {
        catalogEntry.appendChild(document.createElement('div')).textContent = f[1];
      })
    })
  }
}