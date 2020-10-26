import Settings from "./Settings";
import Snake from "./Snake";
import Board from "./Board";
import SnakeCoordinates from "../main";

class Food {
  protected settings: Settings;
  protected snake: Snake;
  protected board: Board;
  public x: number;
  public y: number;

  constructor(settings: Settings, snake: Snake, board: Board) {
    this.settings = settings;
    this.snake = snake;
    this.board = board;
    this.x = 0;
    this.y = 0;
  }

  //Получение координат новой ячейки и отрисовка на поле
  public setNewFood(): void {
    const food: Food = this.randomCoords();
    this.board.renderFood(food);
  }

  //Возвращает случайные координаты
  public randomCoords(): Food {
    while (true) {
      this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
      this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
      let cell = this.board.getCell(this.x, this.y);
      if (
        cell &&
        cell.classList.contains("snake") &&
        cell.classList.contains("snake-head")
      ) {
        continue;
      }
      return this;
    }
  }

  //Размещение еды на игровом поле
  public setFood(): void {
    this.board.renderFood(this);
  }
}
export default Food;
