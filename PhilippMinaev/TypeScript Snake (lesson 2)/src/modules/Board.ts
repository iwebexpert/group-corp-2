import Settings from "./Settings";
import Snake from "./Snake";

export default class Board {
  boardElement: HTMLElement | null;
  settings: Settings;
  snake: Snake;
  constructor(settings: Settings, snake: Snake) {
    this.boardElement = document.getElementById("game");
    this.settings = settings;
    this.snake = snake;
  }

  renderBoard() {
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

  renderSnake() {
    const snakeElements = this.getSnakeBodyElements(this.snake.body);
    if (snakeElements) {
      snakeElements.forEach(function (td) {
        if (td) td.classList.add("snake");
      });
    }
  }

  //Получение 1 ячейки по координатам
  getCell(x: number, y: number) {
    if (this.boardElement)
      return this.boardElement.querySelector(
        `tr:nth-child(${y}) td:nth-child(${x})`
      );
  }

  //Получение всех блоков тела змейки
  getSnakeBodyElements(bodyCoords: { x: number; y: number }[] = []) {
    let bodyElements = [];
    if (bodyCoords.length > 0) {
      for (let value of bodyCoords) {
        let element = this.getCell(value.x, value.y);
        bodyElements.push(element);
      }

      return bodyElements;
    }
    return null;
  }

  //Упирается ли змейка в стену
  isNextStepWall(nextSnakeCoords: { x: number; y: number }) {
    let nextCell = this.getCell(nextSnakeCoords.x, nextSnakeCoords.y);
    return nextCell === null;
  }

  //Еда на игровом поле (добавление)
  renderFood(coords: { x: number; y: number }) {
    let foodCell = this.getCell(coords.x, coords.y);
    if (foodCell) foodCell.classList.add("food");
  }

  isHeadOnFoodSnake() {
    /* Использования выражения post-fix ! возможно? Просто иначе я не знаю какое условие делать */
    return this.boardElement!.querySelector(".food")!.classList.contains(
      "snake"
    );
  }

  //Очистка поля
  clear() {
    const tdAll = document.querySelectorAll("td");
    tdAll.forEach(function (td) {
      td.className = "";
    });
  }
}
