export interface ISettings {
    readonly rowsCount: number;
    readonly colsCount: number;
    readonly speed: number;
    readonly winLength: number;
}
type IParams = {
    [P in keyof ISettings]?: number
};

export class Settings implements ISettings{
    public  readonly rowsCount: number = 20;
    public  readonly colsCount: number = 20;
    public  readonly speed: number = 4;
    public  readonly winLength: number = 5;

    public constructor(params?: IParams) {
        if (!params){
            return;
        }
        if (params.rowsCount){
            if(params.rowsCount < 10 || params.rowsCount > 50){
                throw new Error('Значение rowsCount должно быть от 10 до 50.');
            }
            this.rowsCount = params.rowsCount;
        }

        if (params.colsCount){
            if(params.colsCount < 10 || params.colsCount > 50){
                throw new Error('Значение colsCount должно быть от 10 до 50.');
            }
            this.colsCount = params.colsCount;
        }

        if (params.speed){
            if(params.speed < 1 || params.speed > 10){
                throw new Error('Значение speed должно быть от 1 до 10.');
            }
            this.speed = params.speed;
        }

        if (params.winLength){
            if(params.winLength < 2 || params.winLength > 50){
                throw new Error('Значение winLength должно быть от 2 до 50.');
            }
            this.winLength = params.winLength;
        }
    }
}
