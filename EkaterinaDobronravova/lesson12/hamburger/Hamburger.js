class Hamburger {
    constructor(size, stuffing) {
    this.size = size;
        this.stuffing = [];
    }

    addSauces(value){
      if (value instanceof Sauces) {
        this.stuffing.push(value);
      }
    }

    addToppings(value){
      if (value instanceof Toppings) {
        this.stuffing.push(value);
      }
    }

    countPrice() {
      let totalPrice = this.price;
      for (let i = 0; i < this.stuffing.length; i++) {
        totalPrice += this.stuffing[i].price;
      }
      return totalPrice;
    }

    countCalories() {
      let totalCalories = this.caloric;
      for (let i = 0; i < this.stuffing.length; i++) {
        totalCalories += this.stuffing[i].caloric;
      }
      return totalCalories;
    }

    showTotal() {
      let totalCalories = this.caloric;
      let totalPrice = this.price;
      for (let i = 0; i < this.stuffing.length; i++) {
        totalPrice += this.stuffing[i].price;
        totalCalories += this.stuffing[i].caloric;
      }
      calc.innerHTML = `Стоимость: ${totalPrice} рублей. <br> Калорийность: ${totalCalories} калорий.`
    }

}
