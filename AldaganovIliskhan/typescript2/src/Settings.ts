import { SettingsType } from './types/SettingsType'
export class Settings {
    private readonly defaultParams: SettingsType = {
        rowsCount: 20,
        colsCount: 20,
        speed: 4,
        winLength: 5,
    }

    private readonly gameParams: SettingsType

    constructor(params?: SettingsType) {
        this.gameParams = this.defaultParams;
        if (params) {
            this.gameParams = Object.assign(this.defaultParams, params)
        }

        if (params && params.rowsCount && (params.rowsCount < 10 || params.rowsCount > 50)) {
            throw new Error('Значение rowsCount должно быть от 10 до 50.')
        }
        this.gameParams.rowsCount = this.defaultParams.rowsCount

        if (params && params.colsCount && (params.colsCount < 10 || params.colsCount > 50)) {
            throw new Error('Значение colsCount должно быть от 10 до 50.')
        }
        this.gameParams.colsCount = this.defaultParams.colsCount

        if (params && params.speed && (params.speed < 1 || params.speed > 10)) {
            throw new Error('Значение speed должно быть от 1 до 10.')
        }
        this.gameParams.speed = this.defaultParams.speed

        if (params && params.winLength && (params.winLength < 2 || params.winLength > 50)) {
            throw new Error('Значение winLength должно быть от 2 до 50.')
        }
        this.gameParams.winLength = this.defaultParams.winLength
    }

    public getParams(): SettingsType {
        return this.gameParams
    }
} 