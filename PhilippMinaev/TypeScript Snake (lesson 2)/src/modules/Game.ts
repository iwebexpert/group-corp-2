import Board from "./Board";
import Food from "./Food";
import Menu from "./Menu";
import Settings from "./Settings";
import Snake from "./Snake";
import Status from "./Status";

export default class Game {
  timer: any; /* Не знаю как правильно обработать таймер, по этому поставил any */
  messageElement: HTMLElement | null;
  settings: Settings;
  status: Status;
  board: Board;
  snake: Snake;
  menu: Menu;
  food: Food;
  constructor(
    settings: Settings,
    status: Status,
    board: Board,
    snake: Snake,
    menu: Menu,
    food: Food
  ) {
    this.timer = 0;
    this.messageElement = document.getElementById("message");
    this.settings = settings;
    this.status = status;
    this.board = board;
    this.snake = snake;
    this.menu = menu;
    this.food = food;
  }

  //Старт игры
  start() {
    if (this.status.isPaused()) {
      this.status.setPlaying();
      this.timer = setInterval(
        this.doTick.bind(this),
        1000 / this.settings.speed
      );
    }
  }

  //Остановка игры (пауза)
  pause() {
    if (this.status.isPlaying()) {
      this.status.setPaused();
      clearInterval(this.timer);
    }
  }

  //1 шаг игры
  doTick() {
    this.snake.performStep();
    if (this.isGameLost()) {
      return;
    }

    if (this.isGameWin()) {
      return;
    }

    if (this.board.isHeadOnFoodSnake()) {
      this.snake.increaseBody();
      this.food.setNewFood();
    }

    this.board.clear();
    this.food.setFood();
    this.board.renderSnake();
  }

  //Проверка, окончена ли игра (победа)
  isGameWin() {
    if (this.snake.body.length === this.settings.winLength) {
      clearInterval(this.timer);
      this.setMessage("Победа!");
      return true;
    }
    return false;
  }

  //Проверка, окончена ли игра (проигрыш)
  isGameLost() {
    if (this.board.isNextStepWall(this.snake.body[0])) {
      clearInterval(this.timer);
      this.setMessage("Поражение!");
      return true;
    }
    return false;
  }

  setMessage(message: string | null) {
    if (this.messageElement) this.messageElement.textContent = message;
  }

  //Смена направления движения змейки
  pressKeyHandler(event: { key: any }) {
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
  }

  //Запуск игры
  run() {
    this.menu.addButtonsClickListeners(
      this.start.bind(this),
      this.pause.bind(this)
    );
    document.addEventListener("keydown", this.pressKeyHandler.bind(this));
  }
}
