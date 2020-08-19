class Settings {
    init(params){
        let defaultParams = {
            rowsCount: 20,
            colsCount:20,
            speed: 4,
            winLength: 5,
        };

        Object.assign(defaultParams, params);

        if(defaultParams.rowsCount < 10 || defaultParams.rowsCount > 50){
            throw new Error('Значение rowsCount должно быть от 10 до 50.');
        }
        this.rowsCount = defaultParams.rowsCount;

        if(defaultParams.colsCount < 10 || defaultParams.colsCount > 50){
            throw new Error('Значение colsCount должно быть от 10 до 50.');
        }
        this.colsCount = defaultParams.colsCount;

        if(defaultParams.speed < 1 || defaultParams.speed > 10){
            throw new Error('Значение speed должно быть от 1 до 10.');
        }
        this.speed = defaultParams.speed;

        if(defaultParams.winLength < 2 || defaultParams.winLength > 50){
            throw new Error('Значение winLength должно быть от 2 до 50.');
        }
        this.winLength = defaultParams.winLength;
    }
} 