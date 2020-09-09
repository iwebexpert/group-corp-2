const makeBasket = new Basket( new View(), new Api());
//C помощью метода fetch

fetch('/goods')
	.then(response => response.json())
	.then(
		goods => {
			goods.forEach(element =>{
				new Product(element.name, element.price, element.imgURL, element.id);
			});
		}
	).catch(status => {
		console.error(status);
	});