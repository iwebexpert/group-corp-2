import { Board } from "./Board"
import { Settings } from "./Settings"
import FoodItem from './FoodItem'

export class Food extends FoodItem {
  private settings: Settings | null
  private board: Board | null
  public x: number
  public y: number
  constructor(settings: Settings, board: Board) {
    super();
    this.x = 0
    this.y = 0
    this.settings = settings
    this.board = board
  }


  //Получение координат новой ячейки и отрисовка на поле
  public setNewFood(): void {
    const food = this.randomCoords()
    this.board && this.board.renderFood(food)
  }

  //Возвращает случайные координаты
  public randomCoords(): this {
    while (true) {
      if (this.settings && this.board) {
        this.x = Math.floor(Math.random() * this.settings.getParams().colsCount) + 1
        this.y = Math.floor(Math.random() * this.settings.getParams().rowsCount) + 1
        let cell: Element | null = this.board.getCell(this.x, this.y)
        if (cell && cell.classList.contains("snake")) {
          continue
        }
        return this
      }


    }
  }

  //Размещение еды на игровом поле
  public setFood(): void {
    this.board && this.board.renderFood(this)
  }
}
