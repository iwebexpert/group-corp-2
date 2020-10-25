export class Settings {
	public readonly rowsCount: number;
	public readonly colsCount: number;
	public readonly speed: number;
	public readonly winLength: number;

	public constructor() {
		 this.rowsCount = 20;
		 this.colsCount = 20;
		 this.speed = 9;
		 this.winLength = 12;
	}
}