export class Settings {
  protected readonly settings: {
    rowsCount: number;
    colsCount: number;
    speed: number;
    winLength: number;
  } = {
    rowsCount: 20,
    colsCount: 20,
    speed: 7,
    winLength: 10,
  };

  public constructor(
    rowsCount?: number,
    colsCount?: number,
    speed?: number,
    winLength?: number
  ) {
    if (rowsCount && rowsCount >= 10 && rowsCount <= 50)
      this.settings.rowsCount = rowsCount;
    if (colsCount && colsCount >= 10 && colsCount <= 50)
      this.settings.colsCount = colsCount;
    if (speed && speed >= 1 && speed <= 10) this.settings.speed = speed;
    if (winLength && winLength >= 1 && winLength <= 10)
      this.settings.winLength = winLength;
  }
}
