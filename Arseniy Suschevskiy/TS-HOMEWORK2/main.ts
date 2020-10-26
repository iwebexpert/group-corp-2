import { Status } from './src/Status';
import { Settings } from './src/Settings';
import { Snake } from './src/Snake';
import { Menu } from './src/Menu';
import { Game } from './src/Game';
import { Food } from './src/Food';
import { Board } from './src/Board';
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
    console.error(error.message);
}
