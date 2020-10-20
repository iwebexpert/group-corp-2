import './index.scss';

interface Additive {
  type: string;
  price: number;
  calorificValue: number;
}

interface Topping {
  type: string;
  price: number;
  calorificValue: number;
}

interface Hamburger {
  size: string;
  stuffings: string[];
  toppings: string[];
}

class Additive {
  constructor(type: string, price: number, calorificValue: number) {
    this.type = type;
    this.price = price;
    this.calorificValue = calorificValue;
  }

  render(): void {
    let additiveText: string = '';
    switch (this.type) {
      case 'cheese':
        additiveText = 'C сыром';
        break;
      case 'potato':
        additiveText = 'C картофелем';
        break;
      case 'salad':
        additiveText = 'C салатом';
        break;
    }
    const dataAdditive: string = `
      <label>
        <input type="checkbox" class="check-custom" data-additive="${this.type}">
        <span class="check-toggle"></span>
        <span class="checkbox-text">${additiveText} (+${this.price} рублей, +${this.calorificValue} калорий)</span>
      </label>
      `;
    document
      .querySelector('.additive-wrapper')
      .insertAdjacentHTML('beforeend', dataAdditive);
  }
}

class Topping {
  constructor(type: string, price: number, calorificValue: number) {
    this.type = type;
    this.price = price;
    this.calorificValue = calorificValue;
  }

  render(): void {
    let toppingText: string = '';
    switch (this.type) {
      case 'species':
        toppingText = 'Посыпать преправой';
        break;
      case 'mayonese':
        toppingText = 'Полить майонезом';
        break;
    }
    const dataTopping: string = `
      <label>
        <input type="checkbox" class="check-custom" data-topping="${this.type}">
        <span class="check-toggle"></span>
        <span class="checkbox-text">${toppingText} (+${this.price} рублей, +${this.calorificValue} калорий)</span>
      </label>
      `;
    document
      .querySelector('.topping-wrapper')
      .insertAdjacentHTML('beforeend', dataTopping);
  }
}

class Hamburger {
  constructor(size: string, stuffings: string[], toppings: string[]) {
    this.size = size;
    this.stuffings = [...stuffings];
    this.toppings = [...toppings];
  }

  addTopping(topping: Topping) {
    //create and render topping on website
    const tempTopping = new Topping(
      topping.type,
      topping.price,
      topping.calorificValue
    );
    tempTopping.render();
  }

  addAdditive(additive: Additive) {
    //create and render additive on website
    const tempAdditive = new Additive(
      additive.type,
      additive.price,
      additive.calorificValue
    );
    tempAdditive.render();
  }

  init(): void {
    const toppingList: {
      type: string;
      price: number;
      calorificValue: number;
    }[] = [
      {
        type: 'species',
        price: 15,
        calorificValue: 0,
      },
      {
        type: 'mayonese',
        price: 20,
        calorificValue: 5,
      },
    ];
    toppingList.forEach((topping: Topping): void => this.addTopping(topping));

    const additiveList: {
      type: string;
      price: number;
      calorificValue: number;
    }[] = [
      {
        type: 'cheese',
        price: 10,
        calorificValue: 20,
      },
      {
        type: 'salad',
        price: 20,
        calorificValue: 5,
      },
      {
        type: 'potato',
        price: 15,
        calorificValue: 10,
      },
    ];
    additiveList.forEach((additive: Additive): void =>
      this.addAdditive(additive)
    );
  }

  getToppings(): string[] {
    // Получить список добавок
    return this.toppings;
  }

  getSize(): string {
    // Узнать размер гамбургера
    return this.size;
  }

  getStuffing(): string[] {
    // Узнать начинку гамбургера
    return this.stuffings;
  }

  calculatePrice(): number {
    // Узнать цену
    let price: number = 0;
    switch (this.size) {
      case 'small':
        price += 50;
        break;
      case 'large':
        price += 100;
        break;
    }
    [...this.stuffings].forEach((stuffingType: string): void => {
      switch (stuffingType) {
        case 'cheese':
          price += 10;
          break;
        case 'salad':
          price += 20;
          break;
        case 'potato':
          price += 15;
          break;
      }
    });
    [...this.toppings].forEach((toppingType: string): void => {
      switch (toppingType) {
        case 'species':
          price += 15;
          break;
        case 'mayonese':
          price += 20;
          break;
      }
    });
    return price;
  }

  calculateCalories(): number {
    // Узнать калорийность
    let calorificValue = 0;
    switch (this.size) {
      case 'small':
        calorificValue += 20;
        break;
      case 'large':
        calorificValue += 40;
        break;
    }
    [...this.stuffings].forEach((stuffingType: string): void => {
      switch (stuffingType) {
        case 'cheese':
          calorificValue += 20;
          break;
        case 'salad':
          calorificValue += 5;
          break;
        case 'potato':
          calorificValue += 10;
          break;
      }
    });
    [...this.toppings].forEach((toppingType: string): void => {
      switch (toppingType) {
        case 'mayonese':
          calorificValue += 5;
          break;
      }
    });
    return calorificValue;
  }
}

//render additives and toppings
const hamburger: Hamburger = new Hamburger('small', [], []);
hamburger.init();

let size: string = 'small',
  snuffings: string[] = [],
  toppings: string[] = [];

const sizeElement: HTMLInputElement = document.querySelector(
    '.check-custom-toggle'
  ),
  checkboxElements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    '.check-custom'
  );

const getIndex = (smth: string, arr: string[]): number => {
  let j: number = -1;
  [...arr].forEach((item, i) => {
    if (item === smth) j = i;
  });
  return j;
};

sizeElement.addEventListener('change', () => {
  if (sizeElement.checked) {
    size = 'large';
  } else {
    size = 'small';
  }
});

checkboxElements.forEach((elem: HTMLInputElement): void => {
  elem.addEventListener('change', () => {
    const snuffingType = elem.dataset.additive,
      toppingType = elem.dataset.topping;
    if (elem.checked) {
      if (snuffingType) {
        snuffings.push(snuffingType);
      }
      if (toppingType) {
        toppings.push(toppingType);
      }
    } else {
      snuffings.splice(getIndex(snuffingType, snuffings), 1);
      toppings.splice(getIndex(toppingType, toppings), 1);
    }
  });
});

const btnSubmit: HTMLButtonElement = document.querySelector('.submit');

btnSubmit.addEventListener('click', () => {
  const hamburger: Hamburger = new Hamburger(size, snuffings, toppings);
  const amountTitle: HTMLDivElement = document.querySelector('.title-amount');
  amountTitle.textContent = `Ваш гамбургер содержит ${hamburger.calculateCalories()} калорий и стоит ${hamburger.calculatePrice()} RUB`;
});
