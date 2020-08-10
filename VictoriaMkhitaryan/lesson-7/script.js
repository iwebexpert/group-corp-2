function task1() {
  // функция преобразующая число в объект
  const n = parseInt(prompt('Введите положительное число меньше 999:', 451));

  const number = {
    _hundreds: 0,
    _dozens: 0,
    _units: 0,
    transformation: function(num) {
      if (num > 999 || num < 0) {
        console.log('Число должно быть в диапазоне от 0 до 999');
        return {};
      }

      let i = 0;
      while (num) {
        if (i === 0) {
          this._units = num%10;
        } else if (i === 1) {
          this._dozens = num%10;
        } else {
          this._hundreds = num%10;
        }

        num = Math.floor(num/10);
        i++;
      }

      ///////////////////////////
      // рабочий вариант, ессли изменить последовательнотсь свойств объекта и следовательно поменять условие с _units на _hundreds

      // for (name in this) {
      //   console.log(num%10);
      //   this[name] = num%10;
      //   num = Math.floor(num/10);

      //   if (name == '_units') {
      //     break;
      //   }
      // }

      return this;
    },
  };
  console.log(number.transformation(n));
}


class Product {
  constructor(name, price, currency, count) {
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.count = count;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getCurrency() {
    return this.currency;
  }

  getCount() {
    return this.count;
  }

  setName(value) {
    this.name = value;
  }

  setPrice(value) {
    this.price = value;
  }

  setCurrency(value) {
    this.currency = value;
  }

  setCount(value) {
    this.count = value;
  }

  showProduct() {
    console.log(`Название: ${this.name}`);
    console.log(`Цена: ${this.price}`);
    console.log(`Валюта: ${this.currency}`);
    console.log(`Количество: ${this.count}`);
  }
}

class Basket {
  constructor(...products) {
    this.products = products;
  }


  countBasketPrice() {
    let sum = 0;
    for(let i = 0; i < this.products.length; i++) {
      sum += this.products[i].price*this.products[i].count;
    }
  
    return sum;
  }
}

function task2() {
  let keyboard = new Product('Keyboard', 1000, 'rub', 2);
  let mouse = new Product('Mouse', 500, 'rub', 1);

  let basket = new Basket(keyboard, mouse);
  console.log(basket.countBasketPrice());
}

function task3() {
  // используется структура из 3го
  let keyboard = new Product('Keyboard', 1000, 'rub', 2);
  let mouse = new Product('Mouse', 500, 'rub', 1);

  let basket = new Basket(keyboard, mouse);
  console.log(basket.countBasketPrice());
}