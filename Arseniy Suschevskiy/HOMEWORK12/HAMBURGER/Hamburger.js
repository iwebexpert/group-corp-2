class Hamburger {
	constructor(fillings, extra) {
		this.fillings = fillings;
		this.extra = extra;

		this.sizeLarge = {
			price: 100,
			calories: 40
		}
		this.sizeSmall = {
			price: 50,
			calories: 20
		}
		this.form = document.querySelector('form');
		this.form.addEventListener('submit', (event) => this.formHandler(event));
	}
	formHandler(event) {
		event.preventDefault();
		this.getSize();
		this.getToppings();
	}
	// Добавить добавку
	addTopping(topping) {

	}
	// Убрать добавку
	removeTopping(topping) {

	}
	// Получить список добавок
	getToppings() {
		this.fillings.checkBoxes();
	}
	// Узнать размер гамбургера
	getSize() {
		const burgers = document.getElementsByName('burger');
		burgers[0].checked ? this.size = this.sizeLarge : this.size = this.sizeSmall;
	}
	// Узнать начинку гамбургера
	getStuffing() {

	}
	// Узнать цену
	calculatePrice() {

	}
	// Узнать калорийность
	calculateCalories() {

	}
	getCalculateAll() {
		this.calculatePrice()
		this.calculateCalories()
	}

}