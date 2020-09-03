// Конструктор
  class Item {
    constructor(imgUrl, name, price, count) {
      this.imgUrl = imgUrl;
      this.name = name;
      this.price = price;
      this.count = count;
      this.createItem();
    }

    createItem () {
      //Создаем карточку продукта
		const item = document.createElement('div');
		item.className = 'card';
		//Создаем кнопку
		const itemBtn = document.createElement('button');
		itemBtn.className = 'waves-effect card-panel amber lighten-1 btn';
		itemBtn.textContent = 'Add to bag';
		// itemBtn.onclick = M.toast({html: 'Добавлено в корзину'});

		//Cоздаём картинку
		const itemImage = document.createElement('img');
		itemImage.src = this.imageUrl;
		itemImage.width = '250';
		itemImage.className = 'card-img-top';
    item.appendChild(itemImage);
    
    //Обертка товара
		const cardBlock = document.createElement('div');
		cardBlock.className = 'card-block';
		item.appendChild(cardBlock);
		// Заголовок для товара
		const itemTitle = document.createElement('h4');
		itemTitle.className = 'card-title';
    itemTitle.textContent = `${this.name}`;
		cardBlock.appendChild(itemTitle);
		// Цена
		const itemPrice = document.createElement('p');
		itemPrice.classList.add('card-text');
		itemPrice.innerHTML = `Цена: ₽ ${this.price}`;
    itemTitle.appendChild(itemPrice);
    // кнопка
    const buttonAdd = document.createElement('div');
    buttonAdd.className = 'add-to-cart btn btn-primary';
    buttonAdd.innerHTML = `<a href="#" data-name="${this.name}" data-price="${this.price}" class="add-to-cart btn btn-primary">Добавить в корзину</a>`;


    document.querySelector('.col').appendChild(item);

    }

    
  }

