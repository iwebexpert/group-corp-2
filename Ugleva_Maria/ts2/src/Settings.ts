abstract class BaseSettings {
    rowsCount: number;
	colsCount: number;
	speed: number;
	winLength: number;
    constructor() {
        this.rowsCount = 20;
        this.colsCount = 20;
        this.speed = 4;
        this.winLength = 5;
    }
}
class Settings extends BaseSettings{
	init({
		speed,
		winLength,
		rowsCount,
		colsCount,
	}: {
		speed?: number;
		winLength?: number;
		rowsCount?: number;
		colsCount?: number;
	}) : void{
		if (rowsCount) {
			if (rowsCount < 10 || rowsCount > 50) {
				throw new Error('Значение rowsCount должно быть от 10 до 50.');
			}
			this.rowsCount = rowsCount;
		}
		if (colsCount) {
			if (colsCount < 10 || colsCount > 50) {
				throw new Error('Значение colsCount должно быть от 10 до 50.');
			}
			this.colsCount = colsCount;
		}
		if (speed) {
			if (speed < 1 || speed > 10) {
				throw new Error('Значение speed должно быть от 1 до 10.');
			}
			this.speed = speed;
		}
		if (winLength) {
			if (winLength < 2 || winLength > 50) {
				throw new Error('Значение winLength должно быть от 2 до 50.');
			}
			this.winLength = winLength;
		}
	}
}

export default Settings;
