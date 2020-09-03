let shoppingCart = (function() {
  cart = [];
  
  
  
  //Сохранить корзину
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  // 
  let obj = {};
  
  // Добавляем в корзину
  obj.addItemToCart = function(name, price, count) {
    for(let item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count,);
    cart.push(item);
    saveCart();
  }

  // Удалить товар из корзины один элемент
  obj.removeItemFromCart = function(name) {
      for(let item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Удалить все товары из корзины
  obj.removeItemFromCartAll = function(name) {
    for(let item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Очистить корзину
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Колличество товаров
  obj.totalCount = function() {
    let totalCount = 0;
    for(let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Общая стоимость
  obj.totalCart = function() {
    let totalCart = 0;
    for(let item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    let cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }
  return obj;
})();

function sendRequest(method, url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE){
				if (xhr.status !== 200){
					reject(xhr.status);
				}
				const item = JSON.parse(xhr.responseText);
				resolve(item);
			}
		}
		xhr.send();
	})
}
sendRequest('GET','/item').then(item => {
		item.forEach(element =>{
			new Product(element.imgURL, element.name, element.price, element.count);
		});
	}
).catch(status => console.error(status));

// Добавить товар
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  let name = $(this).data('name');
  let price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});


$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  let cartArray = shoppingCart.listCart();
  let output = "";
  for(let i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>" 
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = " 
      + "<td>" + cartArray[i].total + "</td>" 
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Кнопка удаления товара

$('.show-cart').on("click", ".delete-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// --
$('.show-cart').on("click", ".minus-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// ++
$('.show-cart').on("click", ".plus-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})


$('.show-cart').on("change", ".item-count", function(event) {
   let name = $(this).data('name');
   let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();
