import "./style.css";

interface Items {
  article: string;
  name: string;
  price: number;
  image: string;
}
const fender: Items = {
  article: "fender",
  name: "FENDER Redondo Special MBK w/bag",
  price: 41000,
  image: "../src/assets/fender.jpg",
};
const yamaha: Items = {
  article: "yamaha",
  name: "YAMAHA FG820 SUNSET BLUE",
  price: 27300,
  image: "../src/assets/yamaha.jpg",
};
const gibson: Items = {
  article: "gibson",
  name: "GIBSON J-200 Standard Maple Vintage Sunburst",
  price: 16800,
  image: "../src/assets/gibson.jpg",
};

const container: HTMLDivElement = document.createElement("div");
container.className = "container-fluid";
document.body.append(container);

const welcome: HTMLDivElement = document.createElement("div");
welcome.className = "welcome";
welcome.textContent = "Добро пожаловать в интернет-магазин гитар!";

container.prepend(welcome);

const cards: HTMLDivElement = document.createElement("div");
cards.className = "cards";
container.append(cards);

const totalField: HTMLDivElement = document.createElement("div");
totalField.className = "total-field";
document.body.append(totalField);

const field: HTMLHeadingElement = document.createElement("h3");
field.className = "field";
field.textContent = "Общая стоимость: ";
totalField.append(field);

const total: HTMLSpanElement = document.createElement("span");
total.className = "total";
total.id = "total";
total.textContent = "0";
field.append(total);

const makeGuitar = (guitar: Items) => {
  const content: HTMLDivElement = document.createElement("div");
  content.className = "content";
  cards.append(content);

  content.innerHTML = `<div id="${guitar.article}">
        <h5 class="title">${guitar.name}</h5>
        <img class="img" src="${guitar.image}">
        <div>
          <div class="input-field">
            <button id="${guitar.article}-remove" class="btn btn-danger btn-lg">-</button>
            <input type="text" value="0" id="${guitar.article}-count" class="input"/>
            <button id="${guitar.article}-add" class="btn btn-success btn-lg">+</button>
          </div>
          <h5>
            <p>Цена: <span id="${guitar.article}-price">${guitar.price}</span> руб.</p>
            <p>Всего: <span id="${guitar.article}-total">0</span> руб.</p>
          </h5>
        </div>

    </div>`;
};

makeGuitar(fender);
makeGuitar(yamaha);
makeGuitar(gibson);

const fenderAdd: HTMLElement | null = document.getElementById("fender-add");
const fenderRemove: HTMLElement | null = document.getElementById(
  "fender-remove"
);
const yamahaAdd: HTMLElement | null = document.getElementById("yamaha-add");
const yamahaRemove: HTMLElement | null = document.getElementById(
  "yamaha-remove"
);
const gibsonAdd: HTMLElement | null = document.getElementById("gibson-add");
const gibsonRemove: HTMLElement | null = document.getElementById(
  "gibson-remove"
);

const addGuitar = (quantity: string): void => {
  const getQuantity = <HTMLInputElement>document.getElementById(quantity);
  const currentQuantity = (getQuantity as any).value++;
};

const removeGuitar = (quantity: string, item: string): void => {
  const getQuantity = <HTMLInputElement>document.getElementById(quantity);
  if ((getQuantity as any).value > 0) {
    const currentQuantity: number = (getQuantity as any).value--;
  }
};

const updatePrice = (): void => {
  const fenderPrice = <HTMLElement>document.getElementById("fender-price");
  const fenderValue: number = (fenderPrice as any).textContent;
  const fenderCount = document.getElementById(
    "fender-count"
  ) as HTMLInputElement;
  const fenderAmount = (fenderCount as HTMLInputElement).value;
  const fenderSum: number = fenderValue * +fenderAmount;
  const fenderTotal = <HTMLElement>document.getElementById("fender-total");
  fenderTotal.textContent = fenderSum.toString();

  const yamahaPrice = <HTMLElement>document.getElementById("yamaha-price");
  const yamahaValue: number = (yamahaPrice as any).textContent;
  const yamahaCount = document.getElementById(
    "yamaha-count"
  ) as HTMLInputElement;
  const yamahaAmount = (yamahaCount as HTMLInputElement).value;
  const yamahaSum: number = yamahaValue * +yamahaAmount;
  const yamahaTotal = <HTMLElement>document.getElementById("yamaha-total");
  yamahaTotal.textContent = yamahaSum.toString();

  const gibsonPrice = <HTMLElement>document.getElementById("gibson-price");
  const gibsonValue: number = (gibsonPrice as any).textContent;
  const gibsonCount = document.getElementById(
    "gibson-count"
  ) as HTMLInputElement;
  const gibsonAmount = (gibsonCount as HTMLInputElement).value;
  const gibsonSum: number = gibsonValue * +gibsonAmount;
  const gibsonTotal = <HTMLElement>document.getElementById("gibson-total");
  gibsonTotal.textContent = gibsonSum.toString();

  const checkSum = <HTMLElement>document.getElementById("total");
  checkSum.textContent = (fenderSum + yamahaSum + gibsonSum).toString();
};

const fenderAction = (): void => {
  if (fenderAdd && fenderRemove) {
    fenderAdd.addEventListener("click", (): void => {
      addGuitar("fender-count");
      updatePrice();
    });
    fenderRemove.addEventListener("click", (): void => {
      removeGuitar("fender-count", "fender");
      updatePrice();
    });
  }
};

const yamahaAction = (): void => {
  if (yamahaAdd && yamahaRemove) {
    yamahaAdd.addEventListener("click", (): void => {
      addGuitar("yamaha-count");
      updatePrice();
    });
    yamahaRemove.addEventListener("click", (): void => {
      removeGuitar("yamaha-count", "yamaha");
      updatePrice();
    });
  }
};
const gibsonAction = (): void => {
  if (gibsonAdd && gibsonRemove) {
    gibsonAdd.addEventListener("click", (): void => {
      addGuitar("gibson-count");
      updatePrice();
    });
    gibsonRemove.addEventListener("click", (): void => {
      removeGuitar("gibson-count", "gibson");
      updatePrice();
    });
  }
};

fenderAction();
yamahaAction();
gibsonAction();
