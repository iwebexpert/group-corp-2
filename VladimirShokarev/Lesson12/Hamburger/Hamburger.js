class Hamburger{
  constructor(size, stuffing){
    this.size = size;
    this.stuffing = [];
  };

  addStuffing(){
    if(cheese.checked) this.stuffing.push(new Cheese);
    else if(salad.checked) this.stuffing.push(new Salad);
    else this.stuffing.push(new Potato);
  }

  addAdditionally(){
    if(seasoning.checked) this.stuffing.push(new Seasoning);
    else this.stuffing.push(new Mayonnaise);
  }

  getSize(){
    return `Размерчик бургера: ${this.size}`;
  };

  getToppings(){
    let str = `Вы добавили: `;
    for(let i = 0; i < this.stuffing.length; i++) str += `${this.stuffing[i].name} `;
    return str;
  }

  calculatePrice(){
    let sumArr = this.price;
    for(let i = 0; i < this.stuffing.length; i++) sumArr += this.stuffing[i].price;
    return `Цена: ${sumArr}`;
  };

  calculateCalories(){
    let sumArr = this.calories;
    for(let i = 0; i < this.stuffing.length; i++) sumArr += this.stuffing[i].calories;
    return `Калории: ${sumArr}`;
  };

};

class BigBurger extends Hamburger{
  constructor(size){
    super('big');
    this.price = 100;
    this.calories = 40;
  };
};

class MiniBurger extends Hamburger{
  constructor(size){
    super('mini');
    this.price = 50;
    this.calories = 20;
  };
};
