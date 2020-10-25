import { Board } from './classes/Board';
import { Food } from './classes/Food';
import { Game } from './classes/Game';
import { Menu } from './classes/Menu';
import { Snake } from './classes/Snake';
import { Status } from './classes/Status';
import './index.scss';

const status: Status = new Status();
const menu: Menu = new Menu();
const snake: Snake = new Snake();
const board: Board = new Board('game', snake);
const food: Food = new Food(board);
const game: Game = new Game(status, snake, board, food, menu);

try {
  board.renderBoard();
  board.renderSnake();
  food.setNewFood();
  game.run();
} catch (error) {
  console.log(error);
}
