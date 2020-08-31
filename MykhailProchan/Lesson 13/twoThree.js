class Product {
	constructor(id, name, price) {
		this.id = id;
		this.name = name;
		this.price = price;
	}
}

const cart = new Cart();
const catalog = new Catalog();

try {
	cart.clear();
	catalog.render();
} catch (error) {
	//Пользовательский вывод
	console.log(error.message);
}
