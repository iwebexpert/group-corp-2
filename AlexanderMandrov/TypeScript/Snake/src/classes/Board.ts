import { IPoint } from '../types/interfaces';
import { Base } from './Base';
import { Snake } from './Snake';

export class Board extends Base {
  protected snake: Snake;
  public constructor(divId: string, snake: Snake) {
    super(divId);
    this.snake = snake;
  }

  public renderBoard(): void {
    this.boardElement.innerHTML = '';
    for (let row = 0; row < this.settings.rowsCount; row++) {
      let tr: HTMLTableRowElement = document.createElement('tr');
      this.boardElement.appendChild(tr);

      for (let col = 0; col < this.settings.colsCount; col++) {
        let td: HTMLTableDataCellElement = document.createElement('td');
        tr.appendChild(td);
      }
    }
  }

  public renderSnake(): void {
    const snakeElements = this.getSnakeBodyElements(this.snake.body);
    if (snakeElements) {
      snakeElements.forEach((td: HTMLTableDataCellElement): void => {
        td.classList.add('snake');
      });
    }
  }

  public getCell({ x, y }: IPoint): HTMLTableDataCellElement {
    return this.boardElement.querySelector(
      `tr:nth-child(${y}) td:nth-child(${x})`
    );
  }

  protected getSnakeBodyElements(
    bodyCoords: Array<IPoint> = []
  ): HTMLTableDataCellElement[] | null {
    let bodyElements: HTMLTableDataCellElement[] = [];
    if (bodyCoords.length > 0) {
      bodyCoords.forEach((point: IPoint): void => {
        let element: HTMLTableDataCellElement = this.getCell(point);
        bodyElements.push(element);
      });
      return bodyElements;
    }
    return null;
  }

  public isNextStepWall(nextSnakeCoords: IPoint): boolean {
    let nextCell: HTMLTableDataCellElement = this.getCell(nextSnakeCoords);
    return nextCell === null;
  }

  public renderFood(point: IPoint): void {
    let foodCell: HTMLTableDataCellElement = this.getCell(point);
    foodCell.classList.add('food');
  }

  public isHeadOnFoodSnake(): boolean {
    return this.boardElement.querySelector('.food').classList.contains('snake');
  }

  public clear(): void {
    const tdAll: NodeListOf<HTMLTableDataCellElement> = document.querySelectorAll(
      'td'
    );
    tdAll.forEach((td: HTMLTableDataCellElement): void => {
      td.className = '';
    });
  }
}
