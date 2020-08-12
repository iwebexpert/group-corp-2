"use strict";
class Item {
  constructor(id, name, price, currency) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
  }

  itemInfo() {
    console.log(
      `Product name: ${this.name}, \n Price: ${this.price}, \n Currency: ${this.currency}, \n Vendor code: ${this.id}`
    );
  }

  changePrice(newPrice, newCurrency) {
    if (newPrice < 0 || newCurrency != ("rub" || "usd")) {
      console.log("Error: check price or currency");
    } else {
      this.price = newPrice;
      this.currency = newCurrency;
    }
  }
}

class ShoppingBucket {
  constructor(user) {
    this.user = user;
    this.items = [];
    this.total = 0;
  }

  addItem(item, count) {
    if (count > 0 && item instanceof Item && Number.isInteger(count)) {
      if (!this.items.includes(item)) this.items.push(item);
      item.count ? (item.count += count) : (item.count = count);
      this.total += item.price * count;
    } else {
      console.log("Error: check item and count");
    }
  }

  deleteItem(item, count) {
    if (
      count <= item.count &&
      count > 0 &&
      item instanceof Item &&
      this.items.includes(item) &&
      Number.isInteger(count)
    ) {
      item.count -= count;
      if (item.count == 0) {
        this.items.splice(this.items.indexOf(item), 1);
      }
      this.total -= item.price * count;
    } else {
      console.log("Error: check item and count");
    }
  }

  bucketInfo() {
    console.log("Items:");
    for (let item of this.items) {
      console.log(`${item.name} --- ${item.count}`);
    }
    console.log(`Total price: ${this.total}`);
  }
}
let cpu = new Item(1, "Intel Core i5-9600K", 12854, "rub");
let graphicCard = new Item(2, "Nvidia GTX 1660S (Super)", 15161, "rub");
let ram = new Item(3, "Corsair Vengeance LPX DDR4 3200 C16 2x8GB", 3626, "rub");
let myBucket = new ShoppingBucket("Philipp");

//Добавить начальные items
myBucket.addItem(cpu, 1);
myBucket.addItem(ram, 2);
myBucket.addItem(graphicCard, 1);

const catalog = document.querySelector("#catalog");
let bucket = document.createElement("div");
bucket.classList.add("bucket");
catalog.appendChild(bucket);

function createBucket(somebucket) {
  const total = document.createElement("div");
  function createTotal() {
    total.classList.add("total");
    bucket.appendChild(total);

    let bucketItemsCount = 0;
    let bucketItemsCoast = 0;
    for (let item of somebucket.items) {
      bucketItemsCoast += item.price * item.count;
      bucketItemsCount += item.count;
    }

    if (bucketItemsCount == 0) {
      total.innerHTML = `В корзине пусто`;
    } else {
      total.innerHTML = `В кокрзине: кол-во товаров - ${bucketItemsCount}, итоговая сумма - ${bucketItemsCoast} руб.`;
    }
  }
  for (let item of somebucket.items) {
    const bucketItem = document.createElement("div");
    const bucketItemCount = document.createElement("div");
    const name = document.createElement("div");
    const btns = document.createElement("div");
    const coast = document.createElement("div");
    const addBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    bucket.appendChild(bucketItem);
    bucketItem.classList.add("item");

    name.innerHTML = item.name;
    name.classList.add("itemName");
    bucketItem.appendChild(name);

    btns.classList.add("itemBtns");
    bucketItem.appendChild(btns);

    coast.classList.add("itemCoast");
    coast.innerHTML = item.price * item.count;
    btns.appendChild(coast);

    bucketItemCount.innerHTML = item.count;
    bucketItemCount.classList.add("itemCount");
    btns.appendChild(bucketItemCount);

    addBtn.innerHTML = "Add";
    addBtn.classList.add("btn");
    btns.appendChild(addBtn);
    addBtn.onclick = function () {
      item.count++;
      coast.innerHTML = item.price * item.count;
      bucketItemCount.innerHTML = item.count;
      createTotal();
    };

    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add("btn");
    btns.appendChild(deleteBtn);
    deleteBtn.onclick = function () {
      item.count--;
      if (item.count == 0) {
        bucketItem.remove();
      }
      coast.innerHTML = item.price * item.count;
      bucketItemCount.innerHTML = item.count;
      total.remove();
      createTotal();
    };
  }
  createTotal();
}

createBucket(myBucket);
