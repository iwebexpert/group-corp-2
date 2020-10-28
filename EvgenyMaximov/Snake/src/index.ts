import { Board } from "./components/Board";
import { Settings } from "./components/Settings";
import { Status } from "./components/Status";
import { Snake } from "./components/Snake";
import { Menu } from "./components/Menu";
import { Food } from "./components/Food";
import { Game } from "./components/Game";

const settings = new Settings({speed: 10, winLength: 12});
const gameStatus = new Status();
const snake = new Snake();
const board = new Board(settings, snake);
const menu = new Menu();
const food = new Food(settings, snake, board);
const game = new Game(settings, gameStatus, board, snake, menu, food);

try {
  board.renderBoard();
  board.renderSnake();
  food.setNewFood();
  game.run();
} catch (error) {
  console.log(error.message);
}
