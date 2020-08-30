const makeBasket = new Basket([], new View());

// const apple = new Product('apples', 35,'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/apples-royalty-free-image-164084111-1537885595.jpg');
// const banana = new Product('bananas', 64, 'https://cosmosmagazine.com/wp-content/uploads/2020/02/100118_Debunked_01.jpg');
// const lemon = new Product(`lemons`, 87, 'https://www.agriorbit.com/wp-content/uploads/2020/05/lemons-2039830_1280-1.jpg');
// const cherry = new Product('cherries', 125, 'https://southmelbournemarket.com.au/wp-content/uploads/2014/11/cherries1.jpg');

//C помощью XMLHttpRequest (1)

function sendRequest(method, url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE){
				if (xhr.status !== 200){
					reject(xhr.status);
				}
				const goods = JSON.parse(xhr.responseText);
				resolve(goods);
			}
		}
		xhr.send();
	})
}
sendRequest('GET','/goods').then(goods => {
		goods.forEach(element =>{
			new Product(element.name, element.price, element.imgURL);
		});
	}
).catch(status => console.error(status));

//C помощью XMLHttpRequest (2)

// function sendRequest(method, url) {
// 	return new Promise((resolve, reject) => {
// 		const xhr = new XMLHttpRequest();
//
// 		xhr.open(method, url);
//
// 		xhr.responseType = 'json';
//
// 		xhr.onload = () => {
// 			if (xhr.status >= 400) {
// 				reject(xhr.response);
// 			} else {
// 				resolve(xhr.response);
// 			}
// 		}
// 		xhr.onerror = () => {
// 			reject(xhr.response);
// 		}
// 		xhr.send();
// 	})
// }
// sendRequest('GET','/goods').then(goods => {
// 	goods.forEach(element =>{
// 		new Product(element.name, element.price, element.imgURL);
// 	});
// }).catch(status => console.error(status));

//C помощью метода fetch

// fetch('/goods')
// 	.then(response => response.json())
// 	.then(
// 		goods => {
// 			goods.forEach(element =>{
// 				new Product(element.name, element.price, element.imgURL);
// 			});
// 		}
// 	).catch(status => {
// 		console.error(status);
// 	});