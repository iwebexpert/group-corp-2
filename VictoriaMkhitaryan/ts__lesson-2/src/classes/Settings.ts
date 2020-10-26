import { timeStamp } from 'console';
import { ISettings } from '../interface/ISettings';

export class Settings {
    private readonly defaultParams: ISettings = {
                                                rowsCount: 20,
                                                colsCount:20,
                                                speed: 4,
                                                winLength: 5,
                                            };

    readonly currentParams: ISettings;

    constructor(settingsParam?: ISettings) {
        this.currentParams = settingsParam ? settingsParam : this.defaultParams;  // Object.assign(defaultParams, params);

        if(this.currentParams.rowsCount < 10 || this.currentParams.rowsCount > 50){
            this.currentParams.rowsCount = this.defaultParams.rowsCount;
        }

        if(this.currentParams.colsCount < 10 || this.currentParams.colsCount > 50){
            this.currentParams.colsCount = this.defaultParams.colsCount;
        }

        if(this.currentParams.speed < 1 || this.currentParams.speed > 10){
            this.currentParams.speed = this.defaultParams.speed;
        }

        if(this.currentParams.winLength < 2 || this.currentParams.winLength > 50){
            this.currentParams.winLength = this.defaultParams.winLength;
        }
    }
} 