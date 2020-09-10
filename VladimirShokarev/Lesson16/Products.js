class Products{
    constructor(name, amount, price, currency){
      this.name = name;
      this.amount = amount;
      this.price = price;
      this.currency = currency;
    }

    getInfo(){
      return `Название: ${this.name}, стоимость: ${this.price} ${this.currency}`
    }
  }
