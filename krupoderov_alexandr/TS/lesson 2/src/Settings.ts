
export interface ISettings {
    readonly rowsCount: number;
    readonly colsCount: number;
    readonly speed: number;
    readonly winLength: number;
}

export default class Settings implements ISettings{
    readonly rowsCount: number
    readonly colsCount: number
    readonly speed: number
    readonly winLength: number

    constructor({rowsCount = 20, colsCount = 20, speed = 4, winLength = 5}) {

        if(rowsCount < 10 || rowsCount > 50){
            throw new Error('Значение rowsCount должно быть от 10 до 50.');
        }
        this.rowsCount = rowsCount;

        if(colsCount < 10 || colsCount > 50){
            throw new Error('Значение colsCount должно быть от 10 до 50.');
        }
        this.colsCount = colsCount;

        if(speed < 1 || speed > 10){
            throw new Error('Значение speed должно быть от 1 до 10.');
        }
        this.speed = speed;

        if(winLength < 2 || winLength > 50){
            throw new Error('Значение winLength должно быть от 2 до 50.');
        }
        this.winLength = winLength;
    }
}