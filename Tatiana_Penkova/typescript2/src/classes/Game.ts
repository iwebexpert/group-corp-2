import { Board } from "./Board";
import { Food } from "./Food";
import { Menu } from "./Menu";
import { Snake } from "./Snake";
import { Status } from "./Status";
import { AbstractClass } from "./Abstract";

export class Game extends AbstractClass {
    protected timer: NodeJS.Timeout | null;
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
        this.messageElement = document.getElementById("message");
        this.status = status;
        this.snake = snake;
        this.board = board;
        this.food = food;
        this.menu = menu;
    }

    //Старт игры
    private start(): void {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.timer = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    };

    //Остановка игры (пауза)
    private pause(): void {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    };

    //1 шаг игры
    private doTick(): void {
        this.snake.performStep();

        if (this.isGameWin()) {
            return;
        }
        if (this.isGameLose()) {
            return;
        }

        if (this.board.isHeadOnFoodSnake()) {
            this.snake.increaseBody();
            this.food.setNewFood();
        }

        this.board.clear();
        this.food.setFood();
        this.board.renderSnake();
    };

    //Проверка, окончена ли игра (победа)
    private isGameWin(): boolean {
        if (this.snake.body.length === this.settings.winLength) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.setMessage("Победа!");
            return true;
        }
        return false;
    };

    //Проверка, не зашла ли змейка за стенку
    private isGameLose(): boolean {
        if (this.board.isNextStepWall(this.snake.body[0])) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.setMessage("Поражение!");
            return true;
        }
        return false;
    };

    private setMessage(message: string): void {
        if (this.messageElement) {
            this.messageElement.textContent = message;
        }
    };

    //Смена направления движения змейки
    private pressKeyHandler(event: KeyboardEvent): void {
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

    //Запуск игры
    public run(): void {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener("keydown", this.pressKeyHandler.bind(this));
    };
}