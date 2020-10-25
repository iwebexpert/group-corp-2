export class Settings {
  public constructor(

      readonly colsNum: number = 20,
      readonly rowsNum: number = 20,
      readonly toWin: number = 15,
      readonly speed: number = 5

  ) {

      this.colsNum = colsNum;
      this.rowsNum = rowsNum;
      this.speed = speed;
      this.toWin = toWin;

  };
}
