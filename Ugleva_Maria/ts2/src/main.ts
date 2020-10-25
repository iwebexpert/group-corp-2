import Menu from './Menu';
import Game from './Game';
import Snake from './Snake';
import Settings from './Settings';
import Status from './Status';
import Board from './Board';
import Food from './Food';
import './style.css';


const settings = new Settings();
const game = new Game();
const status = new Status();
const snake = new Snake();
const board = new Board();
const menu = new Menu();
const food = new Food();

try{
    settings.init({speed: 5, winLength: 4});
    board.init(settings, snake);
    food.init(settings, snake, board);
    game.init(settings, status, board, snake, menu, food);

    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
} catch(error){
    //Пользовательский вывод
    console.log(error.message);
}
