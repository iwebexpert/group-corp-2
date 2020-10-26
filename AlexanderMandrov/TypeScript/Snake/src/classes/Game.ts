import { Board } from './Board';
import { Food } from './Food';
import { Menu } from './Menu';
import { Snake } from './Snake';
import { Status } from './Status';
import { Base } from './Base';

export class Game extends Base {
  private timer: null | NodeJS.Timeout;
  protected messageElement: null | HTMLElement;
  protected status: Status;
  protected snake: Snake;
  protected board: Board;
  protected food: Food;
  protected menu: Menu;
  public constructor(
    status: Status,
    snake: Snake,
    board: Board,
    food: Food,
    menu: Menu
  ) {
    super();
    this.timer = null;
    this.messageElement = document.getElementById('message');
    this.status = status;
    this.snake = snake;
    this.board = board;
    this.food = food;
    this.menu = menu;
  }

  private start(): void {
    if (this.status.isPaused()) {
      this.status.setPlaying();
      this.timer = setInterval(
        this.doTick.bind(this),
        1000 / this.settings.speed
      );
    }
  }

  private pause(): void {
    if (this.status.isPlaying()) {
      this.status.setPaused();
      clearInterval(this.timer);
    }
  }

  private doTick(): void {
    this.snake.performStep();
    if (this.isGameLose()) return;
    if (this.isGameWin()) return;

    if (this.board.isHeadOnFoodSnake()) {
      this.snake.increaseBody();
      this.food.setNewFood();
    }

    this.board.clear();
    this.food.setFood();
    this.board.renderSnake();
  }

  private isGameWin(): boolean {
    if (this.snake.body.length === this.settings.winLength) {
      clearInterval(this.timer);
      this.setMessage('Win');
      return true;
    }
    return false;
  }

  private isGameLose(): boolean {
    if (this.board.isNextStepWall(this.snake.body[0])) {
      clearInterval(this.timer);
      this.setMessage('Lose');
      return true;
    }
    return false;
  }

  private setMessage(message: string): void {
    this.messageElement.textContent = message;
  }

  private pressKeyHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this.snake.changeDirection('up');
        break;
      case 'ArrowDown':
        this.snake.changeDirection('down');
        break;
      case 'ArrowRight':
        this.snake.changeDirection('right');
        break;
      case 'ArrowLeft':
        this.snake.changeDirection('left');
        break;
    }
  }

  public run(): void {
    this.menu.addButtonsClickListeners(
      this.start.bind(this),
      this.pause.bind(this)
    );
    document.addEventListener('keydown', this.pressKeyHandler.bind(this));
  }
}
