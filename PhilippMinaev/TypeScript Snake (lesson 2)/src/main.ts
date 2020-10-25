import Settings from "./modules/Settings";
import Game from "./modules/Game";
import Status from "./modules/Status";
import Snake from "./modules/Snake";
import Board from "./modules/Board";
import Menu from "./modules/Menu";
import Food from "./modules/Food";

import "./style.css";

// const settings = new Settings();
// const snake = new Snake();
// const board = new Board(settings, snake);
// const food = new Food(settings, snake, board);
// const status = new Status();
// const menu = new Menu();
// const game = new Game(settings, status, board, snake, menu, food);

try {
  const settings = new Settings();
  const snake = new Snake();
  const board = new Board(settings, snake);
  const food = new Food(settings, snake, board);
  const status = new Status();
  const menu = new Menu();
  const game = new Game(settings, status, board, snake, menu, food);
  // settings({ speed: 7, winLength: 5 });
  // board.init(settings, snake);
  // food.init(settings, snake, board);
  // game.init(settings, status, board, snake, menu, food);
  board.renderBoard();
  board.renderSnake();
  food.setNewFood();
  game.run();
} catch (error) {
  //Пользовательский вывод
  console.log(error.message);
}
