import { Status } from "./Status";
import { Settings } from "./Settings";
import { Snake } from "./Snake";
import { Board } from "./Board";
import { Menu } from "./Menu";
import { Food } from "./Food";
interface Coordinates {
  x: number;
  y: number;
}

export class Game extends Status {

  private settings: Settings;
  private board: Board;
  private snake: Snake;
  private menu: Menu;
  private food: Food;
  private timer: ReturnType<typeof setInterval> | null;
  private readonly messageElement: HTMLElement | null;

  public constructor(

      settings: Settings,
      board: Board,
      snake: Snake,
      menu: Menu,
      food: Food
  ) {
    super();
    this.messageElement = document.getElementById("message");
    this.settings = settings;
    this.board = board;
    this.snake = snake;
    this.menu = menu;
    this.food = food;
    this.timer = null;
  };
  public start(): void {

    if (this.isPaused()) {
      this.setPlaying();
      this.timer = setInterval(
          this.doTick.bind(this),
          1000 / this.settings.speed
      );
    }
  };

  public pause(): void {

    if (this.isPlaying()) {
      this.setPaused();
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  };

  public doTick(): void {

    this.snake.moveStep();
    if (this.isGameLost()) {
      return;
    }

    if (this.isGameWin()) {
      return;
    }

    if (this.board.inFood()) {
      this.snake.growBody();
      this.food.setNewFood();
    }

    this.board.clear();
    this.food.setFood();
    this.board.renderSnake();
  };

  public isGameWin(): boolean {
    if (this.snake.body.length === this.settings.toWin) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.setMessage("Congratulations!");
      return true;
    };
    return false;
  };

  public isGameLost(): boolean{
    if (this.board.inWall(this.snake.body[0])) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.setMessage("Lose!");
      return true;
    }
    return false;
  };

  public setMessage(message: string): void {
    if (this.messageElement) {
      this.messageElement.textContent = message;
    }
  };

  public pressKeyHandler(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowUp":
        this.snake.changeDirection("up");
        break;
      case "ArrowDown":
        this.snake.changeDirection("down");
        break;
      case "ArrowLeft":
        this.snake.changeDirection("left");
        break;
      case "ArrowRight":
        this.snake.changeDirection("right");
        break;
    }
  };

  public run(): void {
    this.menu.addButtonsClickListeners(
        this.start.bind(this),
        this.pause.bind(this)
    );
    document.addEventListener("keydown", this.pressKeyHandler.bind(this));
  };
}