class Items {
  getItem(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status !== 200) {
            reject(xhr.status);
          }
          const mainGoods = JSON.parse(xhr.responseText);
          resolve(mainGoods);
        }
      };

      xhr.send();
    });
  }
  translateItem(name) {
    this.getItem("/goods").then(
      (mainGoods) => {
        for (let i = 1; i <= mainGoods.length; i++) {
          if (mainGoods[i - 1].index == name) {
            newItem = mainGoods[i - 1];
            if (i == 1) {
              newItem.amount = +input1.value;
            }
            if (i == 2) {
              newItem.amount = +input2.value;
            }
            if (i == 3) {
              newItem.amount = +input3.value;
            }
            mainBasket.addToBasket(newItem);
            mainBasket.FullPrice();
            basketBlock.after(totalPriceBasket);
            mainBasket.basketAdressBtn();
            return;
          }
        }
      },
      (status) => {
        console.log("Error", "Status code: ", status);
      }
    );
  }
}
