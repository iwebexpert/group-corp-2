import { Settings } from "./components/Settings";
import { Snake } from "./components/Snake";
import { Board } from "./components/Board";
import { Food } from "./components/Food";
import { Menu } from "./components/Menu";
import { Game } from "./components/Game";
import "./style.css";

try {

  const settings = new Settings();
  const snake = new Snake();
  const board = new Board(settings, snake);
  const food = new Food(settings, snake, board);
  const menu = new Menu();
  const game = new Game(settings, board, snake, menu, food);

  board.renderBoard();
  board.renderSnake();
  food.setNewFood();

  game.run();

} catch (e) {

  console.log(e.message);

}
