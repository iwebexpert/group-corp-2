import {IProduct} from "./Product";

enum saleModes {
    PERCENTAGE='PERCENTAGE',
    RUBLES= 'RUBLES',
}
interface ISale {
    percentage: number;
    roubles: number;
}
export interface IProductGroupItem {
    product: IProduct;
    amount: number;
    convertSalePercentageToRubles(salePercentage: number): number;
    convertSaleRublesToPercentage(saleRubles: number): number;
    setSale(sale: number, saleMode: saleModes): void;
    countItemTotalPriceWithSale(): number;
    countItemTotalPriceWithoutSale(): number;
}
export class ProductGroupItem implements IProductGroupItem{
    private _product: IProduct;
    private _amount: number;
    private _sale!: ISale;

    constructor(product: IProduct, initialAmount: number, sale?: number, saleMode?:saleModes) {
            this._product = product;
            this._amount = initialAmount;
            if (sale && saleMode) {
                this.setSale(sale, saleMode);
            } else {
                this._sale = {
                    percentage: 0,
                    roubles: 0,
                }
            }
    }

    get product(): IProduct {
        return this._product;
    }

    set product(val: IProduct) {
            this._product = val;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(val:number) {
            this._amount = val;
    }

    convertSalePercentageToRubles(salePercentage: number): number {
        return this.product.price * this.amount * salePercentage / 100;
    }

    convertSaleRublesToPercentage(saleRubles: number): number {
        return saleRubles / (this.product.price * this.amount) * 100;
    }

    setSale(sale: number, saleMode: saleModes): void {
        if ( sale > 0 && !(saleMode === saleModes.PERCENTAGE && sale > 100
                || saleMode === saleModes.RUBLES && sale > this.product.price * this.amount)) {
            this._sale = {
                percentage: saleMode === saleModes.PERCENTAGE ? sale : this.convertSaleRublesToPercentage(sale),
                roubles: saleMode === saleModes.RUBLES ? sale : this.convertSalePercentageToRubles(sale),
            }
        } else {
            this._sale = {
                percentage: 0,
                roubles: 0,
            };
            throw new Error('некорректные данные');
        }
    }

    getSale(): ISale {
        return this._sale;
    }

    countItemTotalPriceWithSale(): number {
        return this.product.price * this.amount * (this._sale.percentage ? (1 - this._sale.percentage / 100) : 1);
    }

    countItemTotalPriceWithoutSale(): number {
        return this.product.price * this.amount;
    }
}
