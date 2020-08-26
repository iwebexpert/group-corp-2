class Fillings {
	constructor() {
		this.cheeseParam = {
			price: 10,
			calories: 20
		}
		this.saladParam = {
			price: 20,
			calories: 5
		}
		this.potatoesParam = {
			price: 15,
			calories: 10
		}
	}
	checkBoxes(){
		const fillingsArray = [];
		this.fillingsNodeList = document.getElementsByName('fillings');
		this.fillingsNodeList.forEach((element) => {
			(element.checked) && (fillingsArray.push(element.className));
		})
		this.fillingsModel = [];
		fillingsArray.forEach((element) => {
			switch (element) {
				case 'cheese':
					this.fillingsModel.push(this.cheeseParam);
					break;
				case 'salad':
					this.fillingsModel.push(this.saladParam);
					break;
				case 'potatoes':
					this.fillingsModel.push(this.potatoesParam);
					break;
			}
		})
	}
}
