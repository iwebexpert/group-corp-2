export class Settings {
    public constructor(
        readonly rowsCount: number = 25,
        readonly colsCount: number = 25,
        readonly speed: number = 8,
        readonly winLength: number = 7
    ) {
        this.rowsCount = rowsCount;
        this.colsCount = colsCount;
        this.speed = speed;
        this.winLength = winLength;
    };
}
