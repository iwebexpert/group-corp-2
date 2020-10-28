interface DefaultSettings {
	 readonly rowsCount: number;
	 readonly colsCount: number;
	 readonly speed: number;
	 readonly winLength: number;
}

interface Params {
	rowsCount?: number;
	colsCount?: number;
	speed?: number;
	winLength?: number;
}

export class Settings {
	public readonly rowsCount: number;
	public readonly colsCount: number;
	public readonly speed: number;
	public readonly winLength: number;
	public readonly defaultParams:DefaultSettings = {
			rowsCount: 20,
			colsCount: 20,
			speed: 4,
			winLength: 5,
		}

	public constructor(params?:Params) {
		this.defaultParams;

		Object.assign(this.defaultParams, params);

        if(this.defaultParams.rowsCount < 10 || this.defaultParams.rowsCount > 50){
            throw new Error('Значение rowsCount должно быть от 10 до 50.');
        }
        this.rowsCount = this.defaultParams.rowsCount;

        if(this.defaultParams.colsCount < 10 || this.defaultParams.colsCount > 50){
            throw new Error('Значение colsCount должно быть от 10 до 50.');
        }
        this.colsCount = this.defaultParams.colsCount;

        if(this.defaultParams.speed < 1 || this.defaultParams.speed > 10){
            throw new Error('Значение speed должно быть от 1 до 10.');
        }
        this.speed = this.defaultParams.speed;

        if(this.defaultParams.winLength < 2 || this.defaultParams.winLength > 50){
            throw new Error('Значение winLength должно быть от 2 до 50.');
        }
        this.winLength = this.defaultParams.winLength;
	 }
}