import './style.css';

import Status from "./classes/Status";
import Snake from "./classes/Snake";
import Settings from "./classes/Settings";
import Menu from "./classes/Menu";
import Game from "./classes/Game";
import Food from "./classes/Food";
import Board from "./classes/Board";

try{
    const settings = new Settings({rowsCount: 15, colsCount: 15, speed: 5, winLength: 5});
    const snake = new Snake();
    const board = new Board(settings.getParams(), snake);
    const status = new Status();
    const menu = new Menu();
    const food = new Food(settings.getParams(), snake, board);
    board.renderBoard();
    board.renderSnake();
    food.setNewItem();
    const game = new Game(settings, status, board, snake, menu, food);
    game.run();
} catch(error){
    console.log(error.message);
}
