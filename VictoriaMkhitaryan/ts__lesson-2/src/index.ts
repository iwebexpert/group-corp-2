import { Settings } from './classes/Settings';
import { Game } from './classes/Game';
import { Status } from './classes/Status';
import { Snake } from './classes/Snake';
import { Board } from './classes/Board';
import { Menu } from './classes/Menu';
import { Food } from './classes/Food';
import './style.css';

try {
    const settings = new Settings();
    const snake = new Snake();
    const board = new Board(snake, settings);
    const food = new Food(settings, board);
    const status = new Status();
    const menu = new Menu();
    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    const game = new Game(snake, settings, status, board, menu, food);
    game.run();
} catch (error) {
    //Пользовательский вывод
    console.log(error.message);
}