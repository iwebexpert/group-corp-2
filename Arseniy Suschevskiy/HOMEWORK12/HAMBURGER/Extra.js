class Extra{
	constructor(price, calories) {
		this.price = price;
		this.calories = calories;
	}
	isChecked(){
		const extraArray = [];
		this.extraNodeList = document.getElementsByName('extra');
		this.extraNodeList.forEach((element) => {
			(element.checked) && (extraArray.push(element.className));
		});
		this.extraModel = [];
		extraArray.forEach((element) => {
			switch (element) {
				case 'flavor':
					this.extraModel.push(new Flavor);
					break;
				case 'mayo':
					this.extraModel.push(new Mayonnaise);
					break;
			}
		});
		return this.extraModel;
	}
}
class Flavor extends Extra {
	constructor() {
		super(15, 0);
	}
}
class Mayonnaise extends Extra{
	constructor() {
		super(20, 5);
	}
}