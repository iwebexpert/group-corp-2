import './style.css';
import Settings from './partials/Settings';
import Game from './partials/Game';
import Status from './partials/Status';
import Snake from './partials/Snake';
import Board from './partials/Board';
import Menu from './partials/Menu';
import Food from './partials/Food';

const settings = new Settings(20, 20, 5, 4);
const snake = new Snake();
const board = new Board(settings, snake);
const food = new Food(settings, snake, board);
const status = new Status();
const menu = new Menu();
const game = new Game(settings, status, board, snake, menu, food);

console.log(menu)

try {
    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
} catch (error) {
    //Пользовательский вывод
    console.log(error.message);
}
