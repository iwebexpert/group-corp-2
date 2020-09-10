class Api{
	GET(){
		return fetch('/basket', {method: 'GET'});
	}
	DELETE(element){
		return fetch(`/basket/${element['id']}`,{method:'DELETE'});
	}
	POST(element){
		return fetch('/basket',{
			method: 'POST',
			body: JSON.stringify(element),
			headers:{
				'Content-type': 'application/json',
			}
		});
	}
	PATCH(element, quantity){
		return fetch(`/basket/${element['id']}`,{
			method:'PATCH',
			body: JSON.stringify({ quantity: quantity}),
			headers: {
				'Content-type': 'application/json',
			}
		});
	}
}