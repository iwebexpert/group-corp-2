import {IProduct, Product} from "./Product";
import {IProductGroupItem, ProductGroupItem} from "./ProductGroupItem";

export interface IBasket {
    items: IProductGroupItem[];
    addItem(product: IProduct, amount: number, mode: basketAddItemsModes): boolean;
    countBasketPrice(): number | null;
    removeItem(product: IProduct): void;
    clearBasket(): void;
}

export enum basketAddItemsModes {
    ADD_OR_RESET= 'ADD_OR_RESET',
    MERGE= 'MERGE',
}
export class Basket implements IBasket{
    private _items: IProductGroupItem[] = [];

    addItem(product: IProduct, amount: number, mode: basketAddItemsModes): boolean { // true если добавили успешно
        try {
            const found: IProductGroupItem | undefined = this._items.find(val => val.product === product);
            switch (mode) {
                case basketAddItemsModes.ADD_OR_RESET: {
                    if (found) {
                        found.amount = amount;
                    } else {
                        this._items.push(new ProductGroupItem(product, amount));
                    }
                    break;
                }
                case basketAddItemsModes.MERGE: {
                    if (found) {
                        found.amount += amount;
                    } else if (amount > 0) {
                        this.addItem(product, amount, basketAddItemsModes.ADD_OR_RESET);
                    }
                    break;
                }
                default:
                    console.log('Видимо, все плохо');
            }
            return true;
        } catch (e) {
            console.log('Ошибка при добавлении');
            return false;
        }
    }

    removeItem(product: IProduct): void {
        this._items = this._items.filter(val => val.product !== product);
    }

    clearBasket(): void {
        this._items = [];
    }

    get items(): IProductGroupItem[] {
        return this._items;
    }

    countBasketPrice(): number | null {
        try {
            return this.items.reduce((acc, val) => acc + val.countItemTotalPriceWithSale(), 0);
        } catch (e) {
            console.log('Ошибка в countBasketPrice');
            return null;
        }
    };
}
