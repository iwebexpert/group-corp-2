import { Board } from "./Board";
import { Settings } from "./Settings";

export class Food {
  private settings : Settings | null;
  private board : Board | null;
  public x : number;
  public y : number;
  constructor(settings : Settings, board : Board){
    this.x = 0;
    this.y = 0;
    this.settings = settings;
    this.board = board;
  }


  //Получение координат новой ячейки и отрисовка на поле
  setNewFood() {
    const food = this.randomCoords();
    if(this.board) {
      this.board.renderFood(food);
    }
  }

  //Возвращает случайные координаты
  randomCoords() {
    while (true) {
      this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
      this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
      let cell = this.board.getCell(this.x, this.y);

      if (cell.classList.contains("snake")) {
        continue;
      }
      return this;
    }
  }

  //Размещение еды на игровом поле
  setFood() {
    this.board.renderFood(this);
  }
}
