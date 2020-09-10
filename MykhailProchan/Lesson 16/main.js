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
	console.log(error.message);
}

function formAction(event) {
	console.log(event);
}
/*
function focusOutHandler(event) {
	if (event.target.validity)
		console.log(event.target.)
}*/