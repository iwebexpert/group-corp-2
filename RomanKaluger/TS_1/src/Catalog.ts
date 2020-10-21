import {IProductGroupItem, ProductGroupItem} from "./ProductGroupItem";

export interface ICatalog {
    productList: IProductGroupItem[];
    addProductToCatalog(productItem: IProductGroupItem): void;
    removeProductFromCatalog(productItem: IProductGroupItem): void;
}
export class Catalog implements ICatalog{
    public productList: IProductGroupItem[] = [];

    addProductToCatalog(productItem: IProductGroupItem): void {
        if (this.productList.map(x => x.product.name).includes(productItem.product.name)) {
            throw new Error('Некорректные данные');
        }
        this.productList.push(productItem);
    }

    removeProductFromCatalog(productItem: IProductGroupItem): void {
        if (!this.productList.map(x => x.product.name).includes(productItem.product.name)) {
            throw new Error('Некорректные данные');
        }
        this.productList.push(productItem);
    }
}
