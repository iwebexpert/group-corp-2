import { Snake } from './Snake'
import { Menu } from './Menu'
import { Settings } from './Settings'
import { Status } from './Status'
import { Board } from './Board'
import { Food } from './Food'
import { Game } from './Game'

try {
    const settings = new Settings({ rowsCount: 25, colsCount: 25, speed: 5, winLength: 5 })
    const status = new Status()
    const snake = new Snake()
    const menu = new Menu()
    const board = new Board(settings, snake)
    const food = new Food(settings, board)
    const game = new Game(settings, status, board, snake, menu, food)
    board.renderBoard()
    board.renderSnake()
    food.setNewFood()
    game.run()
} catch (error) {
    //Пользовательский вывод
    console.log(error.message)
}