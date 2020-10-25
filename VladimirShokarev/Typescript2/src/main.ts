import { Settings } from "./Settings";
import { Snake } from "./Snake";
import { Board } from "./Board";
import { Food } from "./Food";
import { Menu } from "./Menu";
import { Game } from "./Game";

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
} catch (error) {
    //Пользовательский вывод
  console.log(error.message);
}
