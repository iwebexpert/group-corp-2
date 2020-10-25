import { Settings } from './Settings'
import { Snake } from './Snake'
import { CoordsType } from './types/CoordsType'
export class Board {
  private boardElement: HTMLElement | null;
  private settings: Settings;
  private snake: Snake;
  constructor(settings: Settings, snake: Snake) {
    this.boardElement = document.getElementById("game")
    this.settings = settings
    this.snake = snake
  }

  public renderBoard(): void {
    if (this.boardElement && this.settings.getParams().rowsCount && this.settings.getParams().colsCount) {
      this.boardElement.innerHTML = ""
      for (let row = 0; row < this.settings.getParams().rowsCount; row++) {
        let tr: HTMLTableRowElement = document.createElement("tr")
        this.boardElement.appendChild(tr)

        for (let col = 0; col < this.settings.getParams().colsCount; col++) {
          let td: HTMLTableDataCellElement = document.createElement("td")
          tr.appendChild(td)
        }
      }
    }

  }

  public renderSnake(): void {
    if (this.snake.body) {
      const snakeElements = this.getSnakeBodyElements(this.snake.body)
      snakeElements && snakeElements.forEach(function (td: Element | null) {
        td && td.classList.add("snake")
      })
    }
  }

  //Получение 1 ячейки по координатам
  public getCell(x: number, y: number): Element | null {
    return this.boardElement && this.boardElement.querySelector(
      `tr:nth-child(${y}) td:nth-child(${x})`)
  }

  //Получение всех блоков тела змейки
  public getSnakeBodyElements(bodyCoords: CoordsType[] = []): Element[] | null {
    let bodyElements: Element[] = []
    if (bodyCoords.length > 0) {
      for (let value of bodyCoords) {
        let element: Element | null = this.getCell(value.x, value.y)
        element && bodyElements.push(element);
      }

      return bodyElements
    }
    return null
  }

  //Упирается ли змейка в стену
  public isNextStepWall(nextSnakeCoords: CoordsType) {
    let nextCell: Element | null = this.getCell(nextSnakeCoords.x, nextSnakeCoords.y)
    return nextCell === null
  }

  //Еда на игровом поле (добавление)
  public renderFood(coords: CoordsType): void {
    let foodCell: Element | null = this.getCell(coords.x, coords.y)
    foodCell && foodCell.classList.add("food")
  }

  public isHeadOnFoodSnake(): boolean | null {
    let boardElement: Element | null
    if (this.boardElement) {
      boardElement = this.boardElement.querySelector('.food')
    } else {
      boardElement = document.createElement('div')
    }
    return boardElement && boardElement.classList.contains('snake')
  }

  //Очистка поля
  public clear(): void {
    const tdAll: NodeListOf<HTMLTableDataCellElement> = document.querySelectorAll("td")
    tdAll.forEach(function (td) {
      td.className = ""
    })
  }
}
