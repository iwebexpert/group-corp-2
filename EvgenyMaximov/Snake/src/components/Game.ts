import { Menu } from './Menu';
import { Snake } from './Snake';
import { Board } from './Board';
import { Status } from './Status';
import { Settings } from './Settings';
import { Food } from './Food';


export class Game{
 protected timer: null|NodeJS.Timeout;
 protected messageElement: HTMLElement|null;
 protected settings: Settings;
 protected status: Status;
 protected board: Board;
 protected snake:Snake;
 protected menu: Menu;
 protected food: Food;

 public constructor(settings: Settings, status:Status, board:Board, snake:Snake, menu:Menu, food:Food) {
    this.timer = null;
    this.messageElement = document.getElementById("message");
    this.settings = settings;
    this.status = status;
    this.board = board;
    this.snake = snake;
    this.menu = menu;
    this.food = food;
  }

  //Старт игры
  protected start(): void {
    if (this.status.isPaused()) {
      this.status.setPlaying();
      this.timer = setInterval(
        this.doTick.bind(this),
        1000 / this.settings.speed
      );
    }
  }

  //Остановка игры (пауза)
  protected pause():void {
    if (this.status.isPlaying()) {
		this.status.setPaused();
		if(this.timer){
			clearInterval(+this.timer);
		}
    }
  }

  //1 шаг игры
  protected doTick():void {
    this.snake.performStep();
    if (this.isGameLost()) return;
    if (this.isGameWin()) return;
    
    if (this.board.isHeadOnFoodSnake()) {
      this.snake.increaseBody();
      this.food.setNewFood();
    }

    this.board.clear();
    this.food.setFood();
    this.board.renderSnake();
  }

  //Проверка, окончена ли игра (победа)
  protected isGameWin():boolean {
    if (this.snake.body.length === this.settings.winLength) {
		if(this.timer){
			clearInterval(+this.timer);
		}
      this.setMessage("Победа!");
      return true;
    }
    return false;
  }

  //Проверка, окончена ли игра (проигрыш)
  protected isGameLost():boolean {
    if (this.board.isNextStepWall(this.snake.body[0])) {
		if(this.timer){
			clearInterval(+this.timer);
		}
      this.setMessage("Поражение!");
      return true;
    }
    return false;
  }

  protected setMessage(message:string):void {
	  if(this.messageElement)
    this.messageElement.textContent = message;
  }

  //Смена направления движения змейки
  protected pressKeyHandler(event:KeyboardEvent):void {
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
  public run():void {
    this.menu.addButtonsClickListeners(
      this.start.bind(this),
      this.pause.bind(this)
    );
    document.addEventListener("keydown", this.pressKeyHandler.bind(this));
  }
}
