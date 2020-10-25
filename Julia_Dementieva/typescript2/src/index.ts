import { Status } from './classes/Status';
import { Settings } from './classes/Settings';
import { Snake } from './classes/Snake';
import { Menu } from './classes/Menu';
import { Game } from './classes/Game';
import { Food } from './classes/Food';
import { Board } from './classes/Board';
import './style.css';

try{
    const settings = new Settings();
    const snake = new Snake();
    const board = new Board(settings, snake);
    const food = new Food(settings, board);
    const status = new Status();
    const menu = new Menu();
    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    const game = new Game(snake, settings, status, board, menu, food);
    game.run();

} catch(error){
    //Пользовательский вывод
    console.log(error.message);
}
