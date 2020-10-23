import {Snake} from './Snake';
import {Menu} from './Menu';
import {Settings} from './Settings';
import {Status} from './Status';
import {Board} from './Board';
import {Food} from './Food..ts';
import {Game} from './Game';
const settings = new Settings();

const status = new Status();
const snake = new Snake();
const menu = new Menu();

try{
    settings.init({speed: 5, winLength: 4});
    const board = new Board(settings, snake);
    const food = new Food(settings, board);
    const game = new Game(settings, status, board, snake, menu, food);

    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
} catch(error){
    //Пользовательский вывод
    console.log(error.message);
}