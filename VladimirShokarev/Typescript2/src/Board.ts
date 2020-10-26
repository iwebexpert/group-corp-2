import { Snake } from "./Snake";
import { Settings } from "./Settings";
interface Coordinates {
  x: number;
  y: number;
}

export class Board {
  public boardElement: Element | null;
  public settings: Settings;
  public snake: Snake;

  public constructor(settings: Settings, snake: Snake) {
    this.boardElement = document.getElementById("game");
    this.settings = settings;
    this.snake = snake;
  };
  
  public renderBoard(): void {
    if (this.boardElement) {
      this.boardElement.innerHTML = "";
      for (let row = 0; row < this.settings.rowsCount; row++) {
        let tr: Element | null | undefined = document.createElement("tr");
        this.boardElement.appendChild(tr);
  
        for (let col = 0; col < this.settings.colsCount; col++) {
          let td: Element | null | undefined = document.createElement("td");
          tr.appendChild(td);
        };
      };
    };
  };
  
  public renderSnake(): void {
    const snakeElements = this.getSnakeBodyElements(this.snake.body);
    if (snakeElements) {
      snakeElements.forEach(function (td: Element | null | undefined): void {
        if (td) td.classList.add("snake");
      });
    };
  };
  
  //Получение 1 ячейки по координатам
  public getCell({ x, y }: Coordinates): Element | null | undefined {
    if (this.boardElement) return this.boardElement.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
  };
  
  //Получение всех блоков тела змейки
  public getSnakeBodyElements(
    bodyCoords: Coordinates[]
  ): Element[] | null {
    let bodyElements: Element[] | null = [];
    if (bodyCoords.length > 0) {
      for (let value of bodyCoords) {
        let coordinates: Coordinates = {x: value.x, y: value.y};
        let element: Element | null | undefined = this.getCell(coordinates);
        if (element != undefined) bodyElements.push(element);
      };
      return bodyElements;
    };
    return null;
  };
  
  //Упирается ли змейка в стену
  public isNextStepWall(nextSnakeCoords: Coordinates): boolean | undefined {
    let nextCell: Element | null | undefined = this.getCell({x: nextSnakeCoords.x, y: nextSnakeCoords.y});
    if(nextCell) return nextCell === null;
  };
  
  //Еда на игровом поле (добавление)
  public renderFood(coordinates: Coordinates): void {
    let foodCell: Element | null | undefined = this.getCell({x: coordinates.x, y: coordinates.y,});
    if (foodCell) foodCell.classList.add("food");
  };
  
  public isHeadOnFoodSnake(): boolean | void {
    if (this.boardElement) {
      const food = this.boardElement.querySelector(".food");
      if (food) return food.classList.contains("snake");
    };
  };
  
  //Очистка поля
  public clear(): void {
    const tdAll: NodeListOf<HTMLTableDataCellElement> = document.querySelectorAll("td");
    tdAll.forEach((td: HTMLElement): void => {
      td.className = "";
    });
  };
};