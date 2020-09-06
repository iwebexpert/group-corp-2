import { makeGETRequest } from './services.js';

let counter = 0;
const shopList = document.querySelector('.shop__list');

const eventHandler = () => {
    const shopImages = document.querySelectorAll('.shop__img');
    shopImages.forEach(img => {
        img.addEventListener('click', (event) => {
            const target = event.target;
            const item = target.closest('.shop__item'),
                counter = item.dataset.counter,
                itemName = document.querySelectorAll('.shop__description')[counter].textContent,
                itemPrice = document.querySelectorAll('.shop__price')[counter].textContent;
    
            modalName.textContent = itemName;
            modalPrice.textContent = itemPrice;
            modal.style.display = 'block';
        });
    });
};

export default class ItemsList {
    fetchItems () {
        makeGETRequest('items')
            .then(items => {
                            items.forEach(item => this.renderShopItem(item.name, item.price, item.currency));
                            eventHandler();
                        })
            .catch(errMessage => console.log(errMessage));
    }

    renderShopItem(name, price, currency) {
        const shopItem = document.createElement('div');
        shopItem.classList.add('shop__item');
        shopItem.dataset['counter'] = counter;
        
        const dataShopItem = `
        <img src="https://placehold.it/200" alt="photo" class="shop__img">
        <hr>
        `;
    
        shopItem.insertAdjacentHTML('afterbegin', dataShopItem);
    
        const shopContent = document.createElement('div');
        shopContent.classList.add('shop__content');
        shopContent.dataset['counter'] = counter;
    
        const dataShopContent = `
        <div class="shop__description" data-counter="${counter}">${name}</div>
        <div class="shop__price" data-counter="${counter}">${price} ${currency}</div>
        <input type="text" class="shop__input" value="1" data-counter="${counter++}"><br>
        `;
    
        shopContent.insertAdjacentHTML('afterbegin', dataShopContent);
    
        const btns = document.createElement('div');
        btns.classList.add('btns');
    
        const dataBtns = `
        <button type="button" class="shop__btn">Buy</button>
        <button type="button" class="shop__btn btn-delete">Delete</button>
        `;
    
        btns.insertAdjacentHTML('afterbegin', dataBtns);
    
        shopContent.insertAdjacentElement('beforeend', btns);
    
        shopItem.insertAdjacentElement('beforeend', shopContent);
        
        shopList.insertAdjacentElement('beforeend', shopItem);
    }
}