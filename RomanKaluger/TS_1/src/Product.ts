export interface IProduct {
    imgURLsArr: string[];
    price: number;
    name: string;
    features: string;
    description: string;
}

export class Product implements IProduct {
    private _name: string;
    private _price: number;
    private _description: string;
    private _features: string;
    private _imgURLsArr: string[];

    constructor(name: string, price: number, description: string, features: string, imgURLsArr: string[]) {
        this._name = name;
        this._price = price;
        this._description = description;
        this._features = features;
        this._imgURLsArr = imgURLsArr.length ? imgURLsArr : ['img/lorem1.jpg'];
    }

    set imgURLsArr(val: string[]) {
        this._imgURLsArr = val;
    }

    get imgURLsArr(): string[] {
        return ([] as string[]).concat(this._imgURLsArr);
    }

    set price(val: number) {
        this._price = val;
    }

    get price(): number{
        return this._price;
    }

    set name(val: string) {
        this._name = val;
    }

    get name(): string {
        return this._name;
    }

    set description(val: string) {
        this._description = val;
    }

    get description(): string {
        return this._description;
    }

    set features(val: string) {
        this._features = val;
    }

    get features(): string {
        return this._features;
    }
}
