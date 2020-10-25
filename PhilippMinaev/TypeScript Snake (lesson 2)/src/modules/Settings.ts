export default class Settings {
  public readonly rowsCount: number = 20;
  public readonly colsCount: number = 20;
  public readonly speed: number = 4;
  public readonly winLength: number = 5;
  constructor(
    rowsCount?: number,
    colsCount?: number,
    speed?: number,
    winLength?: number
  ) {
    if (rowsCount) this.rowsCount = rowsCount;
    if (colsCount) this.colsCount = colsCount;
    if (speed) this.speed = speed;
    if (winLength) this.winLength = winLength;
  }
}
