import { Snake } from "./Snake";
import { Board } from "./Board";
import { Settings } from "./Settings";
interface Coordinates {

  x: number;
  y: number;

}

export class Food {

  public settings: Settings;
  public snake: Snake;
  public board: Board;
  public x = 0;
  public y = 0;

  public constructor(settings: Settings, snake: Snake, board: Board) {

    this.settings = settings;
    this.snake = snake;
    this.board = board;

  };

  public setNewFood(): void {

    this.board.renderFood(this.randomCoords());

  };

  public randomCoords(): Coordinates {
    while (true) {
      this.x = Math.floor(Math.random() * this.settings.colsNum) + 1;
      this.y = Math.floor(Math.random() * this.settings.rowsNum) + 1;
      const coordinates: Coordinates = {
        x: this.x,
        y: this.y,
      };
      let cell: Element | null | undefined = this.board.getCell(coordinates);
      if (cell) {
        if (cell.classList.contains("snake")) {
          continue;
        }
      }
      return coordinates;
    }
  };

  public setFood(): void {

    this.board.renderFood(this);

  };
}
