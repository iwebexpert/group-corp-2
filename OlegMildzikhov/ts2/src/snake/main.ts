import {Settings} from './src/Settings';
import {Game} from './src/Game';
import {Snake} from './src/Snake';
import {Board} from './src/Board';
import {Menu} from './src/Menu';
import {Food} from './src/Food';
import './style.css';

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
    console.log(error.message);
}