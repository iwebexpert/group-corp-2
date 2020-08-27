class Messages {
    constructor() {
        this.thanksDiv = document.querySelector('.thanks');
        this.price = this.thanksDiv.querySelector('.thanks-sum--value');
        this.calories = this.thanksDiv.querySelector('.thanks-cal--value');
        this.pay = this.thanksDiv.querySelector('.btn-thanks');
    }

    showModalThanks(hamburger){
        this.price.textContent = hamburger.getPrice();
        this.calories.textContent = hamburger.getCalories();

        this.thanksDiv.style.left = "0";
        this.pay.addEventListener('click', e => {
            this.thanksDiv.style.left = "-100%";
            setTimeout(() => {
                window.location.reload(true);
            }, 3000);
        });
    }
}