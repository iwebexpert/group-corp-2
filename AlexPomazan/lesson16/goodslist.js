class GoodsList {
  fetchGoods() {
    makeGETRequest(`${API_URL}/items`)
      .then(items => {
        this.productRender(items);
      })
      .then(() => {
        const btnsAdd = document.querySelectorAll(".btn-add");
        const btnsDelete = document.querySelectorAll(".btn-delete");
        const images = document.querySelectorAll(".img-1");
        const id = document.querySelectorAll(".product-id");
        const names = document.querySelectorAll(".name");
        const prices = document.querySelectorAll(".price-value");

        //Добавление товара в корзину
        btnsAdd.forEach((btn, i) => {
          btn.addEventListener("click", (event) => {
            let product = new Product(+id[i].innerHTML, names[i].innerHTML, prices[i].innerHTML, 1);
            for (let j = 0; j < basket.items.length; j++) {
              if (basket.items[j].name === names[i].innerHTML) {
                basket.items[j].quantity++;
                basket.patchBasketOfGoods(basket.items[j], basket.items[j].quantity);
                basket.renderBasket();
                return;
              }
            }
            basket.items.push(product);
            basket.postBasketOfGoods(product);
            basket.renderBasket();



          });
        });

        //Удаление товара из корзины
        btnsDelete.forEach((btn, i) => {
          btn.addEventListener("click", (event) => {
            for (let j = 0; j < basket.items.length; j++) {
              if (basket.items[j].name === names[i].innerHTML) {
                if (basket.items[j].quantity > 1) {
                  basket.items[j].quantity--;
                  basket.patchBasketOfGoods(basket.items[j], basket.items[j].quantity);
                  basket.renderBasket();
                } else {
                  basket.deleteBasketOfGoods(basket.items[j]);
                  basket.items.splice(j, 1);
                  basket.renderBasket();
                }
              } else event.preventDefault();
            }
          });
        });
      })
      .catch(errMessage => console.log(errMessage));
  }

  productRender(items) {
    for (let i = 0; i < items.length; i++) {
      const modalImg = document.createElement("div");
      modalImg.className = "modal-img";
      modalImg.innerHTML = `
    <a type="button" class="a-${items[i].id}" data-toggle="modal" data-target="#exampleModal-${items[i].id}">
</a>
  <div class="modal fade" id="exampleModal-${items[i].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${items[i].name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <div id="carouselExampleControls-${items[i].id}" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${items[i].images[0]}" class=" img-1 d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${items[i].images[1]}" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="${items[i].images[2]}" class="d-block w-100" alt="...">
          </div>
        </div>
        <a class="carousel-control-prev prev" href="#carouselExampleControls-${items[i].id}" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next next" href="#carouselExampleControls-${items[i].id}" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
        </div>
      </div>
    </div>
  </div>`;
      const productCard = document.createElement("div");
      productCard.className = "card card-product";
      const catalogOfProduct = document.querySelector(".catalog");
      catalogOfProduct.append(productCard);
      productCard.style.margin = "20px";
      const productItem = document.createElement("div");
      productItem.className = `product product-${items[i].id}`;
      productCard.appendChild(productItem);

      const productId = document.createElement("div");
      productId.className = "product-id";
      productId.textContent = `${items[i].id}`
      productItem.appendChild(productId);
      productId.style.display = 'none'

      const infoProduct = document.createElement("div");
      infoProduct.className = "product-info";
      let imgProduct = document.createElement("img");
      imgProduct.src = items[i].images[0];
      imgProduct.height = 150;
      imgProduct.style.margin = "20px";
      imgProduct.className = "product-img";
      productItem.append(modalImg);
      let productName = document.createElement("div");
      let productPrice = document.createElement("div");
      let productPriceValue = document.createElement("div");
      const productInfo = document.createElement("div");
      productName.className = "name";
      productPrice.className = "price";
      productPriceValue.className = "price-value";
      productInfo.className = "product-info";
      productName.innerHTML = `${items[i].name}`;
      productPrice.innerHTML = "Цена:";
      productPriceValue.innerHTML = `${items[i].price}`;
      productItem.append(productInfo);
      productInfo.append(productName);
      productInfo.append(productPrice);
      productPrice.append(productPriceValue);

      let modalTarget = document.querySelector(`.a-${items[i].id}`);
      modalTarget.prepend(imgProduct);
      const btnsProduct = document.createElement("div");
      btnsProduct.className = "product-btns";
      productItem.append(btnsProduct);
      const btnAdd = document.createElement("button");
      const btnDelete = document.createElement("button");
      btnAdd.className = `btn btn-add btn-success`;
      btnDelete.className = `btn btn-delete btn-danger`;
      btnAdd.textContent = "Добавить";
      btnDelete.textContent = "Удалить";
      btnsProduct.append(btnAdd);
      btnsProduct.append(btnDelete);
    }
  }
}