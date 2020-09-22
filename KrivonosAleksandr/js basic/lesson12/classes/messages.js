class Messages {
    constructor() {
        this.messages = {
            noItemInBasket: 'В корзине нет этого товара',
            deletedFromBasket: 'Из корзины удален этот товар',
            noItemInCatalog: 'Этого товара не осталось в наличии',
        }
        this.messageBlock = document.createElement('div');
    }

    init(){
        this.messageBlock.classList.add('message');
        document.body.appendChild(this.messageBlock);
    }

    //отображение сообщения
    showMessage(message){
        this.messageBlock.textContent = message;
        this.messageBlock.style.left = "0";
        setTimeout(() => {
            this.messageBlock.style.left = "-100%";
        }, 3000);
    }
}