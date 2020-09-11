class Items {
  //При добавлении товара берем товары из db
  async translateItem(name) {
    const responseGoods = await fetch('/goods');
    const goods = await responseGoods.json();

    for (let i = 1; i <= goods.length; i++) {
      //Цикл для нахождения товара для добавления
      //а так же для поиска количества добовляемых товаров
      if (goods[i - 1].index == name) {
        newItem = goods[i - 1];
        if (i == 1) { //Если это стул
          newItem.amount = +input1.value;
          this.postToServer(newItem); //То добавляем его в db.json
        }
        if (i == 2) {
          newItem.amount = +input2.value;
          this.postToServer(newItem);
        }
        if (i == 3) {
          newItem.amount = +input3.value;
          this.postToServer(newItem);
        }

        this.renderBasket(newItem);
        return;
      }
    }
  }
  //Проверка корзины на наличие в ней данных
  async translateCart() {
    const responseCart = await fetch('/cart');
    const cart = await responseCart.json();

    if (cart != '') { //Если есть, то рендерим корзину
      let basketEmpty = document.querySelector(".basketEpty");
      basketEmpty.remove();
      for (let i = 0; i < cart.length; i++) {
        this.renderBasket(cart[i]);
      }
    }
  }

  //добавляем в db.json
  async postToServer(item) {
    const responseCart = await fetch('/cart');
    const cart = await responseCart.json();

    if (cart.length !== 0) {
      for (let i = 0; i < cart.length; i++) {
        if (item.index === cart[i].index) {
          await fetch(`/cart/${i + 1}`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(item)
          });
          return;
        };
      };
    };

    await fetch('/cart', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(item)
    });
  }
  //Рендер корзины (Отрисовка и все такое)
  renderBasket(newItem) {
    mainBasket.addToBasket(newItem);
    mainBasket.FullPrice();
    basketBlock.after(totalPriceBasket);
    mainBasket.basketAdressBtn();
  }
  //Удаление из json db
  async deleteFromServer() {
    const responseCart = await fetch('/cart');
    const cart = await responseCart.json();

    //Чтобы обновить id удаляю всё из json и добавляю снова оставшиеся в корзине товары
    for (let i in cart) {
      await fetch(`/cart/${+i + 1}`, {
        method: 'DELETE'
      })
    }
    for (let i = 0; i < mainBasket.itemInBasket.length; i++) {
      await fetch('/cart/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(mainBasket.itemInBasket[i])
      })
    }
  }
}