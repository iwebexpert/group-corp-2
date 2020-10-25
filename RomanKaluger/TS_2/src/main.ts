import {ISettings, Settings} from "./Settings";
import {Game, IGame} from "./Game";
import {IStatus, Status} from "./Status";
import {ISnake, Snake} from "./Snake";
import {Board, IBoard} from "./Board";
import {IMenu, Menu} from "./Menu";
import {Food, IFood} from "./Food";
import './style.css';

const settings: ISettings = new Settings({speed: 5, winLength: 9});
const status:IStatus = new Status();
const snake: ISnake = new Snake();
const board: IBoard = new Board(settings, snake);
const menu: IMenu = new Menu();
const food: IFood = new Food(settings, snake, board);
const game: IGame = new Game(settings, status, board, snake, menu, food);

try{
    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
} catch(error: any){
    //Пользовательский вывод
    console.log(error.message);
}
