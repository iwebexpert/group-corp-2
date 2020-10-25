import Settings from './Settings';
import Game from './Game';
import Snake from './Snake';
import Board from './Board';
import {Menu} from './Menu';
import Food from './Food';

const settings = new Settings({speed: 3, winLength: 4});
const snake = new Snake();
const board = new Board(settings, snake);
const food = new Food(settings, snake, board);
const menu = new Menu();
const game = new Game(settings, board, snake, menu, food);

try{
    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
} catch(error){
    //Пользовательский вывод
    console.log(error.message);
}
