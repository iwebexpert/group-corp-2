class Fillings {
	constructor(price, calories) {
		this.price = price;
		this.calories = calories;
	}
	isChecked(){
		const fillingsArray = [];
		this.fillingsNodeList = document.getElementsByName('fillings');
		this.fillingsNodeList.forEach((element) => {
			(element.checked) && (fillingsArray.push(element.className));
		});
		this.fillingsModel = [];
		fillingsArray.forEach((element) => {
			switch (element) {
				case 'cheese':
					this.fillingsModel.push(new Cheese);
					break;
				case 'salad':
					this.fillingsModel.push(new Salad);
					break;
				case 'potatoes':
					this.fillingsModel.push(new Potato);
					break;
			}
		});
		return this.fillingsModel;
	}
}
class Potato extends Fillings {
	constructor() {
		super(15, 10);
	}
}

class Salad extends Fillings {
	constructor() {
		super(20, 5);
	}
}

class Cheese extends Fillings {
	constructor() {
		super(10, 20);
	}
}