import { IPoint } from '../types/interfaces';
import { Base } from './Base';
import { Board } from './Board';

export class Food extends Base implements IPoint {
  public constructor(
    protected board: Board,
    public x: number | null,
    public y: number | null
  ) {
    super();
    this.x = null;
    this.y = null;
    if (board) this.board = board;
  }

  private randomCoords(): Food {
    while (true) {
      this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
      this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
      const point: IPoint = {
        x: this.x,
        y: this.y,
      };
      let cell: HTMLTableDataCellElement = this.board.getCell(point);

      if (cell.classList.contains('snake')) {
        continue;
      }
      return this;
    }
  }

  public setNewFood(): void {
    const food: Food = this.randomCoords();
    this.board.renderFood(food);
  }

  public setFood(): void {
    this.board.renderFood(this);
  }
}
