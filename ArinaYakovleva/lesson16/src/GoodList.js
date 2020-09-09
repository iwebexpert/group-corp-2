//Класс каталога корзины
class GoodList {
    constructor() {
        this.images = [`./img/laptop.jpg`, `./img/monitor.jpg`,
            './img/phone.jpg', './img/mouse.jpg'];
    }

    //Рендеринг элементов каталога
    fetchGoods() {
        makeGETRequest('http://localhost:3000/goods').
            then(items => {
                this.createCatalog(items);
            }).catch(error => console.log(error));
    }

    //Создание элементов каталога
    createCatalog(productsObj) {
        productsObj.map((prod, index) => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.setAttribute('data-number', `${index}`);

            const image = document.createElement('img');
            image.src = this.images[index];
            image.alt = prod.name;
            image.classList.add('image-card');

            const name = document.createElement('div');
            name.classList.add('name');
            name.textContent = prod.name;

            const price = document.createElement('div');
            price.classList.add('price');
            price.textContent = `${prod.price} ${prod.currency}`;

            const numberInput = document.createElement('input');
            numberInput.type = 'number';
            numberInput.name = '';
            numberInput.placeholder = 'Enter the quantity';
            numberInput.classList.add('quantity-input');

            const btn = document.createElement('button');
            btn.classList.add('buy');
            btn.textContent = 'Buy';

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(numberInput);
            card.appendChild(btn);

            products.appendChild(card);
        });
    }
}