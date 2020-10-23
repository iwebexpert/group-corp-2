import Board from "./Board";
import Settings from "./Settings";
import Snake from "./Snake";

export default class Food {
  settings: Settings;
  snake: Snake;
  board: Board;
  x: number;
  y: number;
  constructor(settings: Settings, snake: Snake, board: Board) {
    this.settings = settings;
    this.snake = snake;
    this.board = board;
    this.x = 0;
    this.y = 0;
  }

  //Получение координат новой ячейки и отрисовка на поле
  setNewFood(): void {
    const food = this.randomCoords();
    this.board.renderFood(food);
  }

  //Возвращает случайные координаты
  randomCoords(): this {
    while (true) {
      this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
      this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
      let cell = this.board.getCell(this.x, this.y);

      if (cell && cell.classList.contains("snake")) {
        continue;
      }
      return this;
    }
  }

  //Размещение еды на игровом поле
  setFood(): void {
    this.board.renderFood(this);
  }
}
