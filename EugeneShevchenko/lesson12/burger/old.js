'use strict'
document.addEventListener('DOMContentLoaded', () => {
	class Hamburger {
		constructor(price, size, calories, filling, parentSelector) {
			this.price = price;
			this.size = size;
			this.calories = calories;
			this.filling = filling;
			this.parent = document.querySelector(parentSelector);
		}
		get burgerPrice() {
			return this.price = 200;
		}
		burgerSize() {
			const input = document.querySelectorAll('.radio-variant input')
			for( let i = 0; i < input.length; i++ ) {
				input[i].addEventListener('click', () => {
					return console.log(this.size = input[i].value);
				})
			}
		}
		render() {
			const element = document.createElement('div');
			element.innerHTML = `
				<div><b>Стоимость:</b> <span id="price">${this.price}</span> руб.</div>
				<div><b>Калорийность:</b> <span id="calories">${this.calories}</span>ккал.</div>
			`;
			this.parent.append(element);
		}
	}

	class Fillings extends Hamburger {
		constructor(price, size, calories, filling, parentSelector, topping = []) {
			super(filling)
			this.topping = topping
		}

		toppingsSelected() {
			const inputs = document.querySelectorAll('.checkbox-variant input');
			inputs.forEach(input => {
				input.addEventListener('click', () => {
					this.topping.push(input.value)
				})
			})
			console.log(topping)
		}
	}

	let hamburger = new Hamburger(100, this.size, 500, 'none', '#result');
	hamburger.burgerSize()
	// const fill = new Fillings();
	// fill.toppingsSelected()
	console.log(hamburger)
	hamburger.render()
	// class Menu {
	// 	constructor(size) {
	// 		this.size = {
	// 			s1: 'small',
	// 			s2: 'large',
	// 		}
	// 	}
	// }
	// class Hamburger extends Menu {
	// 	constructor(size, price, calories, myToppings) {
	// 		super();
	// 		this.size = size;
	// 		this.price = this.checkPrice()
	// 		this.calories = {};
	// 		this.myToppings = {};

	// 	}
	// 	checkPrice() {
	// 		if ( this.size == 'small' ) {
	// 			return this.price = 200
	// 		} else {
	// 			return this.price = 500
	// 		}
	// 	}
	// }
	// let hamburger1 = new Hamburger(new Menu().size.s1)
	// // console.log(hamburger1)

	// const menu1 = new Menu()
	// // console.log(menu1.size.s1)

	// class Fillings {
	// 	constructor(myToppings) {
	// 		this.toppings = {
	// 				'cheese':{
	// 					price: 50,
	// 					calories: 100,
	// 				},
	// 				'salad': {
	// 					price: 60,
	// 					calories: 30,
	// 				},
	// 				'potato': {
	// 					price: 70,
	// 					calories: 50,
	// 				},
	// 				'onion': {
	// 					price: 80,
	// 					calories: 150,
	// 				},
	// 				'ketchup': {
	// 					price: 90,
	// 					calories: 120,
	// 				},
	// 		},
	// 		this.myToppings = []
	// 	}
	// 	setChecked() {
	// 		const inputs = document.querySelectorAll('input[type="checkbox"]');
	// 		inputs.forEach((item) => {
	// 			console.log(item)
	// 			item.addEventListener('click', () => {
	// 				item.setAttribute('checked', 'true')
	// 				if (item.checked) {
	// 					// console.log(item.id) // 'cheese'
	// 					// console.log(filling.toppings) // obj
	// 					for(var current in filling.toppings) {
	// 						// console.log(filling.toppings[current]) // all current
	// 						if (item.id == current) {
	// 							console.log(filling.toppings[current].price) // 50
	// 							console.log(filling.toppings[current].calories) // 100
	// 							// console.log(current) //cheese
	// 							// console.log(this.myToppings = {
	// 							// 	current: {
	// 							// 		price: filling.toppings[current].price,
	// 							// 		calories: filling.toppings[current].calories,
	// 							// 	}
	// 							// })
	// 							Object.defineProperties(hamburger1.myToppings, {
	// 								price: {
	// 									set: function() {
											
	// 									}
	// 								},
	// 							})
	// 							console.log(hamburger1.myToppings)
	// 							// for(let elems in filling.toppings) {
	// 							// 	for(let i = 0; i < elems.length; i++) {
	// 							// 		if (elems == filling.toppings[current]) {
	// 							// 			hamburger1.myToppings.prototype = new Object({
	// 							// 					current: filling.toppings[current]
	// 							// 				})
	// 							// 		}
	// 							// 		console.log(hamburger1)
	// 							// 	}
	// 							// }
								
	// 							// console.log(hamburger1.myToppings)
	// 							// console.log(`id:${item.id}(added:${current})`)
	// 						}
	// 					}
	// 				}
	// 			})
	// 		})
	// 	}
	// }
	// const filling = new Fillings()
	// console.log(filling)
	// filling.setChecked()
	// // console.log(filling.toppings.t1['cheese'])
	// // console.log(filling.toppings)
	// // console.log(filling.myToppings)
	// // function activeFilling() {
	// // 	for(let elements in filling) {
	// // 		console.log(filling[elements])
	// // 	}
	// // }
	// // activeFilling()
	// // const hamburger2 = new Hamburger({
	// // 	m: {
	// // 		price: 200,
	// // 		calories: 1000,
	// // 		myToppings: [],
	// // 	}
	// // })

	// // const hamburger = {
	// // 	m: {
	// // 		size: 'small',
	// // 		price: 100,
	// // 		calories: 500,
	// // 		myToppings: [],
	// // 	},
	// // 	l: {
	// // 		size: 'large',
	// // 		price: 200,
	// // 		calories: 1000,
	// // 		myToppings: [],
	// // 	},
	// // }

	// // const toppings = {
	// // 	t1: 'сыр',
	// // 	t2: 'перец',
	// // 	t3: 'кортошечка',
	// // 	t4: 'майонез',
	// // 	t5: 'кутчуп',
	// // }
	// // console.log(hamburger)
	// // console.log(toppings)
});