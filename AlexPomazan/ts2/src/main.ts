import "./style.css";
import Board from "./classes/Board";
import Food from "./classes/Food";
import Game from "./classes/Game";
import Menu from "./classes/Menu";
import Settings from "./classes/Settings";
import Snake from "./classes/Snake";
import Status from "./classes/Status";

const settings = new Settings();
const status = new Status();
const snake = new Snake();
const menu = new Menu();
const board = new Board(settings, snake);
const food = new Food(settings, snake, board);
const game = new Game(settings, status, board, snake, menu, food);

export default interface SnakeCoordinates {
  x: number;
  y: number;
}

try {
  board.renderBoard();
  board.renderSnake();
  food.setNewFood();
  game.run();
} catch (error) {
  //Пользовательский вывод
  console.log(error.message);
}
