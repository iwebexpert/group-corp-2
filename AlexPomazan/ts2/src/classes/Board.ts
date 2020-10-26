import Settings from "./Settings";
import Snake from "./Snake";
import SnakeCoordinates from "../main";

class Board {
  public boardElement: HTMLTableElement | null;
  public snake: Snake;
  public settings: Settings;

  constructor(settings: Settings, snake: Snake) {
    this.boardElement = document.querySelector("#game");
    this.settings = settings;
    this.snake = snake;
  }

  public renderBoard(): void {
    if (this.boardElement) {
      this.boardElement.innerHTML = "";
      for (let row = 0; row < this.settings.rowsCount; row++) {
        let tr = document.createElement("tr");
        this.boardElement.appendChild(tr);

        for (let col = 0; col < this.settings.colsCount; col++) {
          let td = document.createElement("td");
          tr.appendChild(td);
        }
      }
    }
  }

  public renderSnake(): void {
    const snakeElements:
      | HTMLTableDataCellElement[]
      | null = this.getSnakeBodyElements(this.snake.body);
    if (snakeElements) {
      snakeElements.forEach(function (td, i) {
        if (i === 0) {
          td.classList.add("snake-head");
        }
        td.classList.add("snake");
      });
    }
  }

  //Получение 1 ячейки по координатам
  public getCell(x: number, y: number): HTMLTableDataCellElement | null {
    if (this.boardElement) {
      return this.boardElement.querySelector(
        `tr:nth-child(${y}) td:nth-child(${x})`
      );
    }
    return null;
  }

  //Получение всех блоков тела змейки
  public getSnakeBodyElements(
    bodyCoords: Array<SnakeCoordinates> = []
  ): Array<HTMLTableDataCellElement> | null {
    let bodyElements: HTMLTableDataCellElement[] = [];
    if (bodyCoords.length > 0) {
      for (let value of bodyCoords) {
        let element: HTMLTableDataCellElement | null = this.getCell(
          value.x,
          value.y
        );
        if (element) {
          bodyElements.push(element);
        }
      }
      return bodyElements;
    }
    return null;
  }

  //Упирается ли змейка в стену
  public isNextStepWall(nextSnakeCoords: SnakeCoordinates): boolean {
    let nextCell: HTMLTableDataCellElement | null = this.getCell(
      nextSnakeCoords.x,
      nextSnakeCoords.y
    );
    return nextCell === null;
  }

  //Еда на игровом поле (добавление)
  public renderFood(coords: SnakeCoordinates) {
    let foodCell = this.getCell(coords.x, coords.y);
    if (foodCell) {
      foodCell.classList.add("food");
    }
  }

  public isHeadOnFoodSnake(): boolean {
    if (this.boardElement) {
      let cell: HTMLTableDataCellElement | null = this.boardElement.querySelector(
        ".food"
      );
      if (cell) {
        return cell.classList.contains("snake-head");
      }
    }
    return false;
  }
  //Очистка поля
  public clear(): void {
    const tdAll: NodeListOf<HTMLTableDataCellElement> = document.querySelectorAll(
      "td"
    );
    tdAll.forEach(function (td: HTMLTableDataCellElement): void {
      td.className = "";
    });
  }
}
export default Board;
