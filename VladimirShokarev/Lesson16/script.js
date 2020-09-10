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
  let arrItemsInside;
  let checkArrItems;
  let emptyBsk = document.querySelector(".emptyBsk");

  myBasket.makeGETRequest();
  myBasket.checkGETRequest();

  emptyBsk.innerHTML = 'Пустая корзина';


  /*Добавляем продукт в корзину*/
  for (let i in addItems) {
    if (addItems.hasOwnProperty(i) && addItems[i].dataset) {
        addItems[i].dataset.counter = i;
        addItems[i].addEventListener('click', async () => {
                const data = await fetch('/basket', {
                    method: 'POST',
                    body: JSON.stringify(arrItems[i]),
                    headers: {
                        'Content-type': 'application/json',
                    },
                });
                let valueCount = document.getElementsByClassName('valueCount')[i].value;
                console.log(valueCount + 'right here');
                if(valueCount > 1){
                  addPI();
                  async function addPI() {
                    console.log('here');
                        const data = await fetch(`/basket/${arrItemsInside[i].id}`, {
                            method: 'PATCH',
                            body: JSON.stringify({amount: +valueCount}),
                            headers: {
                                'Content-type': 'application/json',
                            },
                        });

                        console.log(data);
                    };
                }
                myBasket.makeGETRequestInside(i);
            });
            // addItems[i].onclick = function() {
            //   myBasket.addItemsInTheBascket(i);
            // }
      }
    }

    /*Удаляем продукт */
    for (let i in removeItems) {
      if (removeItems.hasOwnProperty(i) && removeItems[i].dataset) {
          removeItems[i].dataset.counter = i;
          removeItems[i].onclick = function() {
            myBasket.deleteItemsFromTheBascket(i);
          }
          removeItems[i].addEventListener('click', async () => {
                const data = await fetch(`/basket/${arrItems[i].id}`, {
                    method: 'DELETE',
                });

                console.log(data);
            });
        }
      }
