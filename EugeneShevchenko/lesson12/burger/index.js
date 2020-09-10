'use strict'

document.addEventListener('DOMContentLoaded', () => {
  class Menu {
    constructor(size) {
      this.size = size
    }
  }
  let priceWithoutToppings = 0;
  class Hamburger extends Menu {
    constructor(size, price, calories, myToppings, parentSelector) {
      super()
      this.size = this.checkSize()
      this.price = price
      this.calories = calories
      this.myToppings = {}
      this.parent = document.querySelector('#result')
    }
    checkSize() {
      const size = document.querySelectorAll('input[type="radio"]')
      size.forEach(radio => {
        radio.addEventListener('click', () => {
          if (radio.value == 'small') {
                   this.calories = 200
                   this.price = 100
            return this.size = 'small'
          } else if (radio.value == 'large') {
                   this.calories = 450
                   this.price = 250
            return this.size = 'large'
          }
        })
      })
    }
  }

  let hamburger1 = new Hamburger()
  console.log(hamburger1)

  const menu1 = new Menu()
  console.log(menu1)

  let someObj = {}; // needed to collect object as property
  let someTempObj = {}; // needed to collect properties

  class Fillings extends Hamburger {
    constructor(myToppings) {
      super(myToppings)
      this.toppings = {
        'cheese': {
          price: 50,
          calories: 100,
        },
        'salad': {
          price: 60,
          calories: 30,
        },
        'potato': {
          price: 70,
          calories: 50,
        },
        'onion': {
          price: 80,
          calories: 150,
        },
        'ketchup': {
          price: 90,
          calories: 120,
        },
      }
    }

    setChecked(myToppings) {
      const inputs = document.querySelectorAll('input[type="checkbox"]');
      inputs.forEach((item) => {
        // console.log(item)
        item.addEventListener('click', () => {
          item.setAttribute('checked', 'true')
          if (item.checked) {
            // console.log(item.id) // 'cheese'
            // console.log(filling.toppings) // obj
            for (var current in filling.toppings) {
              // console.log(filling.toppings[current]) // all current
              if (item.id == current) {
                // console.log(filling.toppings[current].price) // 50
                // console.log(filling.toppings[current].calories) // 100
                // // console.log(hamburger1.myToppings.prototype = new Object({
                // // 	current: filling.toppings[current]
                // // }))

                someTempObj.price = filling.toppings[current].price;
                someTempObj.calories = filling.toppings[current].calories;
                someObj[current] = someTempObj;
                someTempObj = {};
                // console.log(someObj)
                hamburger1.myToppings = someObj;
                console.log(hamburger1.myToppings[current].price);
                console.log(hamburger1);

              }
            }
          } else {
            for (var current in filling.toppings) {
              // if unchecked box we need to delete this prop
              if (item.id == current) {
                delete hamburger1.myToppings[current];
                //console.log(hamburger1);
              }
            }
          }
        })
      })
    }
    render() {
      const btn = document.querySelector('#button'),
            element = document.createElement('div');

      btn.addEventListener('click', (event) => {
        event.preventDefault()
        let result = 0
        result += this.price + this.myToppings.price
        element.innerHTML = `
      			<div><b>Стоимость:</b> <span id="price">${this.price}</span> руб.</div>
      			<div><b>Калорийность:</b> <span id="calories">${result}</span>ккал.</div>
          `;
        this.parent.append(element)
      })
    }
  }
  const filling = new Fillings()
  filling.setChecked()
  filling.render()
  // hamburger1.checkSize()
  // hamburger1.checkPrice()
  // console.log(someObj)
  // console.log(someTempObj)
});