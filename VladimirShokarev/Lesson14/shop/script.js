  // const bread = new Products('Bread', 0, 50, 'RUB');
  // const milk = new Products('Milk', 0, 100, 'RUB');
  // const apple = new Products('Apple', 0, 10, 'RUB');
  // const water = new Products('Water', 0, 70, 'RUB');

  const myBasket = new Basket('Vladimir');

  const myForm = new Form();

  const info = document.querySelector("#catalog");
  let addItems = document.getElementsByClassName('btn btn-lg btn-block btn-primary');
  let removeItems = document.getElementsByClassName('btn btn-lg btn-block btn-danger');
  // let arrItems = [apple, bread, milk, water]; ///////////////////
  let arrItems;
  let emptyBsk = document.querySelector(".emptyBsk");

  myBasket.makeGETRequest();

  emptyBsk.innerHTML = 'Пустая корзина';


  /*Добавляем продукт в корзину*/
  for (let i in addItems) {
    if (addItems.hasOwnProperty(i) && addItems[i].dataset) {
        addItems[i].dataset.counter = i;
        addItems[i].onclick = function() {
          myBasket.addItemsInTheBascket(i);
        }
      }
    }

    /*Удаляем продукт */
    for (let i in removeItems) {
      if (removeItems.hasOwnProperty(i) && removeItems[i].dataset) {
          removeItems[i].dataset.counter = i;
          removeItems[i].onclick = function() {
            myBasket.deleteItemsFromTheBascket(i);
          }
        }
      }
