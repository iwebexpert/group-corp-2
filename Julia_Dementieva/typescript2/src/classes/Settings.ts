import ISettings from '../interface/SettingsInterface';

export class Settings {

    private readonly _defaultParams: any = {
        rowsCount: 20,
        colsCount:20,
        speed: 4,
        winLength: 5,
    }

    public readonly currentParams: ISettings;

    constructor(settings?:ISettings ){
        this.currentParams = (settings)? Object.assign(this._defaultParams, settings) : this._defaultParams;

        if(this.currentParams.rowsCount < 10 || this.currentParams.rowsCount > 50){
            this.currentParams.rowsCount = this._defaultParams.rowsCount;
        }

        if(this.currentParams.colsCount < 10 || this.currentParams.colsCount > 50){
            this.currentParams.colsCount = this._defaultParams.colsCount;
        }

        if(this.currentParams.speed < 1 || this.currentParams.speed > 10){
            this.currentParams.speed = this._defaultParams.speed;
        }

        if(this.currentParams.winLength < 2 || this.currentParams.winLength > 50){
            this.currentParams.winLength = this._defaultParams.winLength;
        }
    }
}