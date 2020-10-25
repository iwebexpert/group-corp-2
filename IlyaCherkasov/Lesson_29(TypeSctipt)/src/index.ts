import Settings from './game/Settings';
import Game from './game/Game';
import Status from './game/Status';
import Snake from './game/Snake';
import Board from './game/Board';
import Menu from './game/Menu';
import Food from './game/Food';
import './style.css';

try {
    const settings = new Settings(20, 20, 5, 4);
    const snake = new Snake();
    const board = new Board(settings, snake);
    const food = new Food(settings, snake, board);
    const status = new Status();
    const menu = new Menu();
    const game = new Game(settings, status, board, snake, menu, food);

    console.log(menu);

    board.renderBoard();
    board.renderSnake();
    food.setNewFood();
    game.run();
} catch (error) {
    //Пользовательский вывод
    console.log(error.message);
}