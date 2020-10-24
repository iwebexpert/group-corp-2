import {ISettings} from "./Settings";
import {IStatus} from "./Status";
import {IBoard} from "./Board";
import {Directions, ISnake} from "./Snake";
import {IMenu} from "./Menu";
import {IFood} from "./Food";

export interface IGame {
    run(): void;
}
export class Game implements IGame {
    private timer: NodeJS.Timeout | null = null;
    private readonly messageElement: HTMLElement | null;
    private readonly settings: ISettings;
    private readonly status: IStatus;
    private readonly board: IBoard;
    private readonly snake: ISnake;
    private readonly menu: IMenu;
    private readonly food: IFood;
    public constructor(settings: ISettings, status: IStatus, board: IBoard, snake: ISnake, menu: IMenu, food: IFood) {
        this.messageElement = document.getElementById('message');
        this.settings = settings;
        this.status = status;
        this.board = board;
        this.snake = snake;
        this.menu = menu;
        this.food = food;
    }

    //Старт игры
    public start(): void {
        if (this.status.isPaused()) {
            this.status.setPlaying();
            this.timer = setInterval(this.doTick.bind(this), 1000 / this.settings.speed);
        }
    }

    //Остановка игры (пауза)
    public pause(): void {
        if (this.status.isPlaying()) {
            this.status.setPaused();
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    }

    //1 шаг игры
    private doTick(): void {
        this.recalculateIfPartOfSnakeOnWall();
        this.snake.performStep();
        if (this.isGameLost() || this.isGameWin()) {
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
    private isGameWin(): boolean {
        if (this.snake.body.length === this.settings.winLength) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.setMessage('Победа!');
            return true;
        }
        return false;
    }

    //Проверка, окончена ли игра (проигрыш)
    private isGameLost(): boolean {
        if (this.board.isNextStepSnake(this.snake.body[0])) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.setMessage('Поражение!');
            return true;
        }
        return false;
    }

    private recalculateIfPartOfSnakeOnWall(): void {
        if (this.board.isNextStepWall(this.snake.body[0])) {
            if (this.snake.body[0].y >= this.settings.colsCount) {
                this.snake.body[0].y = 0;
            } else if (this.snake.body[0].y < 0) {
                this.snake.body[0].y = this.settings.colsCount+1;
            }
            if (this.snake.body[0].x >= this.settings.rowsCount) {
                this.snake.body[0].x = 0;

            } else if (this.snake.body[0].x < 0) {
                this.snake.body[0].x = this.settings.rowsCount+1;
            }
        }
    }

    private setMessage(message: string): void {
        if (this.messageElement) {
            this.messageElement.textContent = message;
        }
    }

    //Смена направления движения змейки
    private pressKeyHandler(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowUp':
                this.snake.changeDirection(Directions.UP);
                break;
            case 'ArrowDown':
                this.snake.changeDirection(Directions.DOWN);
                break;
            case 'ArrowLeft':
                this.snake.changeDirection(Directions.LEFT);
                break;
            case 'ArrowRight':
                this.snake.changeDirection(Directions.RIGHT);
                break;
        }
    }

    //Запуск игры
    public run(): void {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this));
        document.addEventListener('keydown', this.pressKeyHandler.bind(this));
    }
}
