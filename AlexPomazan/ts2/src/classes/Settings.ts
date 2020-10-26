class Settings {
  public readonly rowsCount: number;
  public readonly colsCount: number;
  public readonly speed: number;
  public readonly winLength: number;

  public constructor(
    rowsCount?: number,
    colsCount?: number,
    speed?: number,
    winLength?: number
  ) {
    this.rowsCount = rowsCount ? rowsCount : 20;
    this.colsCount = colsCount ? colsCount : 20;
    this.speed = speed ? speed : 4;
    this.winLength = winLength ? winLength : 5;
  }
}

export default Settings;
