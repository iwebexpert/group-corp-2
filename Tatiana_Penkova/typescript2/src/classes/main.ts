import { Game } from "./Game";
import { Status } from "./Status";
import { Snake } from "./Snake";
import { Board } from "./Board";
import { Menu } from "./Menu";
import { Food } from "./Food";

const status: Status = new Status();
const menu: Menu = new Menu();
const snake: Snake = new Snake();
const board: Board = new Board("game", snake);
const food: Food = new Food(board);
const game: Game = new Game(status, snake, board, food, menu);

try {
    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
} catch (error) {
    //Пользовательский вывод
    console.log(error.message);
}
