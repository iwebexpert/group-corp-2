import "./styles.css";

const container: HTMLElement | null = document.getElementById("root");

const itemsList: HTMLDivElement| null = document.createElement("div");
itemsList.classList.add("items-list");

if(container){
	container.appendChild(itemsList);
}

const totalResult: HTMLParagraphElement|null = document.createElement("p");
totalResult.classList.add("result-string") 

interface ItemType {
	name: string;
	price: number;
	currency: string;
	count: number
}

const basket: Array<ItemType> = [
  {
    name: "t-short",
    price: 700,
    currency: "Rub",
    count: 2,
  },
  {
    name: "shoes",
    price: 5000,
    currency: "Rub",
    count: 1,
  },
  {
    name: "dress",
    price: 3500,
    currency: "Rub",
    count: 1,
  },
  {
    name: "socks",
    price: 350,
    currency: "Rub",
    count: 7,
  },
];

basket.map((el):void=> {
  const card: HTMLDivElement|null = document.createElement("div");
  card.textContent = `Name: ${el.name}, Price: ${el.price} ${el.currency}, Count: ${el.count}`;
  card.classList.add("item-card")
  itemsList.appendChild(card);
});

const btn: HTMLButtonElement|null = document.querySelector(".btn")
const clearBtn: HTMLButtonElement|null = document.querySelector(".clear-btn")
const resultArea: Element|null = document.querySelector('.result')

let totalPrice:number = 0;
let totalCount:number = 0;

const countBasketPrice = (arr:Array<ItemType>):number[] => {
  for (let i = 0; i < arr.length; i++) {
    totalPrice += arr[i].price * arr[i].count;
    totalCount += arr[i].count;
  }
  return [totalCount, totalPrice];
};

if(btn){
	btn.addEventListener("click", () => {
		const elem: Element|null = document.querySelector(".result-string");
		if (!elem) {
		  countBasketPrice(basket);
		  totalResult.textContent = `В корзине ${totalCount} товаров на сумму ${totalPrice} ${basket[0].currency}`;
		  if (resultArea){
			resultArea.appendChild(totalResult);
		  }
		}
	 });
}

if(clearBtn){
	clearBtn.addEventListener("click", () => {
		const elem: Element|null = document.querySelector(".result-string");
		if (elem) {
		  totalPrice = 0;
		  totalCount = 0;
		  if(resultArea){
			resultArea.removeChild(totalResult);
		  } 
		}
	 });
}

