const basketObj = {
    basketBox: [
        {
            name: "Молоко",
            prime: 56,
            quantity: 3,
            currency: "RUB"
        },
        {
            name: "Мороженое",
            prime: 78.3,
            quantity: 9,
            currency: "RUB",
        },
        {
            name: "Нефть",
            prime: 0.7,
            quantity: 500,
            currency: "USD",
        },
        {
            name: "Полотенце",
            prime: 600,
            quantity: 5,
            currency: "RUB",
        }
    ],
    countBasketPrice: function () {
        let currency = {
            "RUB": 1,
            "USD": 72.95,
            "EUR": 86.61
        };
        let result = this.basketBox.reduce((sum, item) => sum + item.prime * item.quantity * currency[item.currency], 0);
        return result;
    }

}
console.log(basketObj.countBasketPrice());