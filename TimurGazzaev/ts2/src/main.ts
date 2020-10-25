import './style.css'
import Settings from './components/Settings'
import Game from './components/Game'
import Status from './components/Status'
import Snake from './components/Snake'
import Board from './components/Board'
import Menu from './components/Menu'
import Food from './components/Food'

const settings = new Settings(20, 20, 5, 7);
const snake = new Snake()
const board = new Board(settings, snake)
const food = new Food(settings, snake, board)
const status = new Status()
const menu = new Menu()
const game = new Game(settings, status, board, snake, menu, food)

export default interface coordinates {
    x: number;
    y: number;
}

try {
    board.renderBoard()
    board.renderSnake()
    food.setNewFood()
    game.run()
} catch (error) {
    console.log(error.message)
}
