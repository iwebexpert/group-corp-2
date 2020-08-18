class Basket {
    constructor() {
        this.itemInBasket = [];
    }
    addToBasket(item) {
        if (first) {
            this.itemInBasket.push(item);
            this.drawBasketItem();
            first = false;
        } else {
            for (let i = 1; i <= this.itemInBasket.length; i++) {
                if (item.index == this.itemInBasket[i - 1].index) {
                    console.log('Привет я уже есть :)');
                    return;
                }
            }
            this.itemInBasket.push(item);
            this.drawBasketItem();
        }
    }
    drawBasketItem() {
        let item_block = document.createElement('div');
        item_block.classList.add('item_block');

        let basketSpan1 = document.createElement('span');
        basketSpan1.classList.add('lead');

        let basketSpan2 = document.createElement('span');
        basketSpan2.classList.add('lead');

        let basketBtnMinus = document.createElement('button');
        basketBtnMinus.classList.add('btn', 'btn-outline-secondary');
        basketBtnMinus.innerHTML = '-';

        let basketInput = document.createElement('input');
        basketInput.classList.add('basketForm');

        let basketBtnPlus = document.createElement('button');
        basketBtnPlus.classList.add('btn', 'btn-outline-secondary');
        basketBtnPlus.innerHTML = '+';

        let basketDeleteItem = document.createElement('button');
        basketDeleteItem.classList.add('btn', 'btn-outline-secondary');
        basketDeleteItem.innerHTML = 'Удалить из корзины';

        for (let i = 0; i <= this.itemInBasket.length; i++) {
            if (i == this.itemInBasket.length) {
                basketBtnMinus.classList.add(`basketBtnMinus${this.itemInBasket[i - 1].index}`);
                basketInput.classList.add(`basketInput${this.itemInBasket[i - 1].index}`);
                basketInput.value = this.itemInBasket[i - 1].amount;
                basketBtnPlus.classList.add(`basketBtnPlus${this.itemInBasket[i - 1].index}`);
                basketDeleteItem.classList.add(`basketDeleteItem${this.itemInBasket[i - 1].index}`);

                basketBlock.appendChild(item_block);

                basketSpan1.innerHTML = `${this.itemInBasket[i - 1].name} количество `;
                item_block.appendChild(basketSpan1);

                item_block.appendChild(basketBtnMinus);
                item_block.appendChild(basketInput);
                item_block.appendChild(basketBtnPlus);

                basketSpan2.innerHTML = ` Цена ${this.itemInBasket[i - 1].cost} `;
                item_block.appendChild(basketSpan2);

                item_block.appendChild(basketDeleteItem);
            }
        }
    }
}