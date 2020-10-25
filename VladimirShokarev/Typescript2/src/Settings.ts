export class Settings {
  public constructor(
    readonly rowsCount: number = 20,
    readonly colsCount: number = 20,
    readonly speed: number = 4,
    readonly winLength: number = 5
  ) {
    this.rowsCount = rowsCount;
    this.colsCount = colsCount;
    this.speed = speed;
    this.winLength = winLength;
  };
};