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
                    if (item.index == 'chair') {
                        let val = +input1.value;
                        document.querySelector('.basketInputchair').value = val;
                        let searchName = 'chair';
                        let idx = this.itemInBasket.findIndex(el => el.index === searchName);
                        this.itemInBasket[idx].amount = val;
                        this.allAmount();
                        let basketSpanChair = document.querySelector('.spanchair');
                        let basketInputChair = document.querySelector('.basketInputchair');
                        basketSpanChair.innerHTML = ` Цена ${this.itemInBasket[i - 1].cost * +basketInputChair.value} `;
                        return;
                    } else if (item.index == 'table') {
                        let val = +input2.value;
                        document.querySelector('.basketInputtable').value = val;
                        let searchName = 'table';
                        let idx = this.itemInBasket.findIndex(el => el.index === searchName);
                        this.itemInBasket[idx].amount = val;
                        this.allAmount();
                        let basketSpanTable = document.querySelector('.spantable');
                        let basketInputTable = document.querySelector('.basketInputtable');
                        basketSpanTable.innerHTML = ` Цена ${this.itemInBasket[i - 1].cost * +basketInputTable.value} `;
                        return;
                    } else if (item.index == 'lamp') {
                        let val = +input3.value;
                        document.querySelector('.basketInputlamp').value = val;
                        let searchName = 'lamp';
                        let idx = this.itemInBasket.findIndex(el => el.index === searchName);
                        this.itemInBasket[idx].amount = val;
                        this.allAmount();
                        let basketSpanLamp = document.querySelector('.spanlamp');
                        let basketInputLamp = document.querySelector('.basketInputlamp');
                        basketSpanLamp.innerHTML = ` Цена ${this.itemInBasket[i - 1].cost * +basketInputLamp.value} `;
                        return;
                    }
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
                item_block.classList.add(`item_block${this.itemInBasket[i - 1].index}`);

                basketBtnMinus.classList.add(`basketBtnMinus${this.itemInBasket[i - 1].index}`);
                basketBtnMinus.setAttribute('onclick', `mainBasket.minusBtn(${this.itemInBasket[i - 1].delindex});`);

                basketInput.classList.add(`basketInput${this.itemInBasket[i - 1].index}`);
                basketInput.value = this.itemInBasket[i - 1].amount;

                basketBtnPlus.classList.add(`basketBtnPlus${this.itemInBasket[i - 1].index}`);
                basketBtnPlus.setAttribute('onclick', `mainBasket.plusBtn(${this.itemInBasket[i - 1].delindex});`);

                basketDeleteItem.classList.add(`basketDeleteItem${this.itemInBasket[i - 1].index}`);
                basketDeleteItem.setAttribute('onclick', `mainBasket.deleteFromBasket(${this.itemInBasket[i - 1].delindex});`);

                basketBlock.appendChild(item_block);

                basketSpan1.innerHTML = `${this.itemInBasket[i - 1].name} количество `;
                item_block.appendChild(basketSpan1);

                item_block.appendChild(basketBtnMinus);
                item_block.appendChild(basketInput);
                item_block.appendChild(basketBtnPlus);

                basketSpan2.classList.add(`span${this.itemInBasket[i - 1].index}`);
                basketSpan2.innerHTML = ` Цена ${this.itemInBasket[i - 1].cost * +basketInput.value} `;
                item_block.appendChild(basketSpan2);

                item_block.appendChild(basketDeleteItem);
            }
        }
        //
        this.allAmount();

    }
    allAmount() {
        allamount = 0;
        for (let i = 0; i < this.itemInBasket.length; i++) {
            allamount += this.itemInBasket[i].amount;
        }
    }
    deleteFromBasket(inx) {
        if (inx == 1) {
            let searchName = 'chair';
            let idx = this.itemInBasket.findIndex(el => el.index === searchName);
            this.itemInBasket.splice(idx, 1);
            document.querySelector('.item_blockchair').remove();
            this.allAmount();
            this.FullPrice();
            this.basketAdressBtn();
            if (this.itemInBasket.length == 0) {
                document.querySelector('.totalPriceBlock').remove();
                let basketEmpt = document.createElement('h2');
                basketEmpt.classList.add('basketEpty');
                basketEmpt.innerHTML = 'Корзина пуста';
                basketBlock.appendChild(basketEmpt);
                first = true;
                return;
            }
            return;
        }
        else if (inx == 2) {
            let searchName = 'table';
            let idx = this.itemInBasket.findIndex(el => el.index === searchName);
            this.itemInBasket.splice(idx, 1);
            document.querySelector('.item_blocktable').remove();
            this.allAmount();
            this.FullPrice();
            this.basketAdressBtn();
            if (this.itemInBasket.length == 0) {
                document.querySelector('.totalPriceBlock').remove();
                let basketEmpt = document.createElement('h2');
                basketEmpt.classList.add('basketEpty');
                basketEmpt.innerHTML = 'Корзина пуста';
                basketBlock.appendChild(basketEmpt);
                first = true;
                return;
            }
            return;

        } else if (inx == 3) {
            let searchName = 'lamp';
            let idx = this.itemInBasket.findIndex(el => el.index === searchName);
            this.itemInBasket.splice(idx, 1);
            document.querySelector('.item_blocklamp').remove();
            this.allAmount();
            this.FullPrice();
            this.basketAdressBtn();
            if (this.itemInBasket.length == 0) {
                document.querySelector('.totalPriceBlock').remove();
                let basketEmpt = document.createElement('h2');
                basketEmpt.classList.add('basketEpty');
                basketEmpt.innerHTML = 'Корзина пуста';
                basketBlock.appendChild(basketEmpt);
                first = true;
                return;
            }
            return;
        }
    }
    plusBtn(inx) {
        if (inx == 1) {
            let input = document.querySelector('.basketInputchair');
            let val = +input.value;
            val += 1;
            input.value = val;
            let basketSpanChair = document.querySelector('.spanchair');
            let basketInputChair = document.querySelector('.basketInputchair');
            basketSpanChair.innerHTML = ` Цена ${3420 * +basketInputChair.value} `;

            let searchName = 'chair';
            let idx = this.itemInBasket.findIndex(el => el.index === searchName);
            this.itemInBasket[idx].amount = val;
            this.allAmount();
            this.FullPrice();
            this.basketAdressBtn();
            basketBlock.after(totalPriceBasket);

        } else if (inx == 2) {
            let input = document.querySelector('.basketInputtable');
            let val = +input.value;
            val += 1;
            input.value = val;
            let basketSpanTable = document.querySelector('.spantable');
            let basketInputTable = document.querySelector('.basketInputtable');
            basketSpanTable.innerHTML = ` Цена ${7990 * +basketInputTable.value} `;

            let searchName = 'table';
            let idx = this.itemInBasket.findIndex(el => el.index === searchName);
            this.itemInBasket[idx].amount = val;
            this.allAmount();
            this.FullPrice();
            this.basketAdressBtn();
            basketBlock.after(totalPriceBasket);
        } else if (inx == 3) {
            let input = document.querySelector('.basketInputlamp');
            let val = +input.value;
            val += 1;
            input.value = val;
            let basketSpanLamp = document.querySelector('.spanlamp');
            let basketInputLamp = document.querySelector('.basketInputlamp');
            basketSpanLamp.innerHTML = ` Цена ${1070 * +basketInputLamp.value} `;

            let searchName = 'lamp';
            let idx = this.itemInBasket.findIndex(el => el.index === searchName);
            this.itemInBasket[idx].amount = val;
            this.allAmount();
            this.FullPrice();
            this.basketAdressBtn();
            basketBlock.after(totalPriceBasket);
        }
    }
    minusBtn(inx) {
        if (inx == 1) {
            let input = document.querySelector('.basketInputchair');
            if (+input.value > 1) {
                let val = +input.value;
                val -= 1;
                input.value = val;
                let basketSpanChair = document.querySelector('.spanchair');
                let basketInputChair = document.querySelector('.basketInputchair');
                basketSpanChair.innerHTML = ` Цена ${3420 * +basketInputChair.value} `;

                let searchName = 'chair';
                let idx = this.itemInBasket.findIndex(el => el.index === searchName);
                this.itemInBasket[idx].amount = val;
                this.allAmount();
                this.FullPrice();
                basketBlock.after(totalPriceBasket);
            }
        } else if (inx == 2) {
            let input = document.querySelector('.basketInputtable');
            if (+input.value > 1) {
                let val = +input.value;
                val -= 1;
                input.value = val;
                let basketSpanTable = document.querySelector('.spantable');
                let basketInputTable = document.querySelector('.basketInputtable');
                basketSpanTable.innerHTML = ` Цена ${7990 * +basketInputTable.value} `;

                let searchName = 'table';
                let idx = this.itemInBasket.findIndex(el => el.index === searchName);
                this.itemInBasket[idx].amount = val;
                this.allAmount();
                this.FullPrice();
                basketBlock.after(totalPriceBasket);
            }
        } else if (inx == 3) {
            let input = document.querySelector('.basketInputlamp');
            if (+input.value > 1) {
                let val = +input.value;
                val -= 1;
                input.value = val;
                let basketSpanLamp = document.querySelector('.spanlamp');
                let basketInputLamp = document.querySelector('.basketInputlamp');
                basketSpanLamp.innerHTML = ` Цена ${1070 * +basketInputLamp.value} `;

                let searchName = 'lamp';
                let idx = this.itemInBasket.findIndex(el => el.index === searchName);
                this.itemInBasket[idx].amount = val;
                this.allAmount();
                this.FullPrice();
                basketBlock.after(totalPriceBasket);
            }
        }
    }
    //
    FullPrice() {
        price = 0;
        for (let i = 0; i < this.itemInBasket.length; i++) {
            price += this.itemInBasket[i].cost * this.itemInBasket[i].amount;
        }
        totalPriceBasket.innerHTML = `В корзине ${allamount} товар(а/ов) на сумму ${price} рублей`;
    }
    basketAdressBtn() {
        let continueBtn = document.createElement('button');
        continueBtn.classList.add('continueBtn', 'btn', 'btn-outline-secondary');
        continueBtn.innerHTML = 'Оформить заказ';
        continueBtn.setAttribute('onclick', `mainBasket.basketAdress();`);
        totalPriceBasket.appendChild(continueBtn);
    }
    basketAdress() {
        basketBlock.setAttribute('style', 'display: none;');
        document.querySelector('.totalPriceBlock').setAttribute('style', 'display: none;');
        document.querySelector('.basketWord').innerHTML = 'Адрес доставки';
        for (let i = 1; i <= 3; i++) {
            document.querySelector(`.goodsBuy${i}`).disabled = true;
            document.querySelector(`.btnminus${i}`).disabled = true;
            document.querySelector(`.btnplus${i}`).disabled = true;
            document.querySelector(`.form${i}`).disabled = true;
        }

        //Отрисую блок адреса доставки
        let adressBlock = document.createElement('div');
        adressBlock.classList.add('adressBlock');

        let adressWrapper1 = document.createElement('div');
        adressWrapper1.classList.add('adressWrapper1');
        let adressWrapper2 = document.createElement('div');
        adressWrapper2.classList.add('adressWrapper2');
        let adressWrapper3 = document.createElement('div');
        adressWrapper3.classList.add('adressWrapper3');

        let adressSpan1 = document.createElement('span');
        adressSpan1.classList.add('lead', 'adresSpan1');

        let adressSpan2 = document.createElement('span');
        adressSpan2.classList.add('lead', 'adresSpan2');

        let adressSpan3 = document.createElement('span');
        adressSpan3.classList.add('lead', 'adresSpan3');

        let adressForm1 = document.createElement('input');
        adressForm1.classList.add('adressForm1');

        let adressForm2 = document.createElement('input');
        adressForm2.classList.add('adressForm2');

        let adressForm3 = document.createElement('input');
        adressForm3.classList.add('adressForm3');

        let adressbtn = document.createElement('button');
        adressbtn.classList.add('adressBtn', 'btn', 'btn-outline-secondary');
        adressbtn.innerHTML = 'Продолжить оформление';
        adressbtn.setAttribute('onclick', 'mainBasket.basketComment();');

        document.querySelector('.basketWord').after(adressBlock);

        adressBlock.appendChild(adressWrapper1);
        adressSpan1.innerHTML = 'Введите имя';
        adressWrapper1.appendChild(adressSpan1);
        adressWrapper1.appendChild(adressForm1);

        adressBlock.appendChild(adressWrapper2);
        adressSpan2.innerHTML = 'Введите фамилию';
        adressWrapper2.appendChild(adressSpan2);
        adressWrapper2.appendChild(adressForm2);

        adressBlock.appendChild(adressWrapper3);
        adressSpan3.innerHTML = 'Введите адрес доставки';
        adressWrapper3.appendChild(adressSpan3);
        adressWrapper3.appendChild(adressForm3);
        adressWrapper3.appendChild(adressbtn);
    }
    basketComment() {
        if (document.querySelector('.adressForm1').value == '' || document.querySelector('.adressForm2').value == '' || document.querySelector('.adressForm3').value == '') {
            alert('Вы оставили пустое поле');
            return;
        }
        userName = document.querySelector('.adressForm1').value;
        userSecName = document.querySelector('.adressForm2').value;
        userAdress = document.querySelector('.adressForm3').value;

        document.querySelector('.adressBlock').remove();
        document.querySelector('.basketWord').innerHTML = 'Дополнительный комментарий (Необязательно)';

        let commentBlock = document.createElement('div');
        commentBlock.classList.add('commentBlock');

        let commentForm = document.createElement('textarea');
        commentForm.classList.add('form-control', 'commentForm');
        commentForm.setAttribute('rows', '4');

        let commentBtn = document.createElement('button');
        commentBtn.classList.add('btn', 'btn-outline-secondary', 'commentBtn');
        commentBtn.setAttribute('onclick', 'mainBasket.basketResult();');
        commentBtn.innerHTML = 'Закончить оформление заказа';

        document.querySelector('.basketWord').after(commentBlock);
        commentBlock.appendChild(commentForm);
        commentBlock.appendChild(commentBtn);
    }
    basketResult() {
        userComment = document.querySelector('.commentForm').value;

        document.querySelector('.commentBlock').remove();
        document.querySelector('.basketWord').innerHTML = 'Ваш заказ';

        basketBlock.setAttribute('style', 'display: flex;');
        document.querySelector('.totalPriceBlock').setAttribute('style', 'display: block;');

        if (document.querySelector('.basketDeleteItemchair') != null) {
            document.querySelector('.basketDeleteItemchair').setAttribute('style', 'display: none;');
            document.querySelector('.basketBtnPluschair').setAttribute('style', 'display: none;');
            document.querySelector('.basketBtnMinuschair').setAttribute('style', 'display: none;');
            document.querySelector('.basketInputchair').disabled = true;
        }
        if (document.querySelector('.basketDeleteItemtable') != null) {
            document.querySelector('.basketDeleteItemtable').setAttribute('style', 'display: none;');
            document.querySelector('.basketBtnPlustable').setAttribute('style', 'display: none;');
            document.querySelector('.basketBtnMinustable').setAttribute('style', 'display: none;');
            document.querySelector('.basketInputtable').disabled = true;
        }
        if (document.querySelector('.basketDeleteItemlamp') != null) {
            document.querySelector('.basketDeleteItemlamp').setAttribute('style', 'display: none;');
            document.querySelector('.basketBtnPluslamp').setAttribute('style', 'display: none;');
            document.querySelector('.basketBtnMinuslamp').setAttribute('style', 'display: none;');
            document.querySelector('.basketInputlamp').disabled = true;
        }
        document.querySelector('.continueBtn').remove();

        let endBlock = document.createElement('div');
        endBlock.classList.add('endBlock');

        let endSpan1 = document.createElement('span');
        endSpan1.classList.add('lead', 'endSpan1');
        let endSpan2 = document.createElement('span');
        endSpan2.classList.add('lead', 'endSpan2');
        let endSpan3 = document.createElement('span');
        endSpan3.classList.add('lead', 'endSpan3');
        let endSpan4 = document.createElement('span');
        endSpan4.classList.add('lead', 'endSpan4');

        document.querySelector('.totalPriceBlock').after(endBlock);
        endSpan1.innerHTML = `Имя: ${userName}`;
        endBlock.appendChild(endSpan1);
        endBlock.appendChild(document.createElement('br'));

        endSpan2.innerHTML = `Фамилия: ${userSecName}`;
        endBlock.appendChild(endSpan2);
        endBlock.appendChild(document.createElement('br'));

        endSpan3.innerHTML = `Адрес доставки: ${userAdress}`;
        endBlock.appendChild(endSpan3);
        endBlock.appendChild(document.createElement('br'));

        if (userComment != '') {
            endSpan4.innerHTML = `Ваш комментарий: ${userComment}`;
            endBlock.appendChild(endSpan4);
        }
    }
}