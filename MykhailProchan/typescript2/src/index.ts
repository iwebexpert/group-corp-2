import './style.css';
import { Settings } from 'classes/Settings';
import { Game } from 'classes/Game';
import { Status } from 'classes/Status';
import { Snake } from 'classes/Snake';
import { Board } from 'classes/Board';
import { Menu } from 'classes/Menu';
import { Food } from 'classes/Food';

const settings = new Settings({ speed: 5, winLength: 4 });
const status = new Status();
const snake = new Snake();
const board = new Board(settings, snake);
const menu = new Menu();
const food = new Food(settings, board);
const game = new Game(settings, status, board, snake, menu, food);

try {
    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
} catch (error) {
    //Пользовательский вывод
    console.log(error.message);
}
