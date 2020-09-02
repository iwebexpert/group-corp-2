class Hamburger {
	constructor(price, calories, fillings, extra) {
		this.price = price;
		this.calories = calories;
		this.fillings = fillings;
		this.extra = extra;

	}
	createHamburger() {
		this.getFillings();
		this.getExtra();
		this.getCalculateAll();
	}
	getFillings() {
		this.allFillings =  this.fillings.isChecked();
	}
	// Получить список добавок
	getExtra() {
		let a = this.extra.isChecked();
		a.forEach((element) => {
			this.allFillings.push(element);
		});
	}
	// Узнать цену
	calculatePrice() {
		let totalPrice = this.price;
		this.allFillings.forEach((element) =>{
			totalPrice += element.price;
		});
		this.totalPrice = totalPrice;
	}
	// Узнать калорийность
	calculateCalories() {
		let totalCalories = this.calories;
		this.allFillings.forEach((element) =>{
			totalCalories += element.calories;
		});
		this.totalCalories = totalCalories;
	}
	getCalculateAll() {
		this.calculatePrice();
		this.calculateCalories();
	}
	showOutput() {
		output.textContent = `Your burger will cost ${this.totalPrice} and contain ${this.totalCalories} calories`;
	}

}

class BigHamburger extends Hamburger{
	constructor(fillings, extra) {
		super(100, 40, fillings, extra);
	}
}
class SmallHamburger extends Hamburger{
	constructor(fillings, extra) {
		super(50, 20, fillings, extra);
	}
}