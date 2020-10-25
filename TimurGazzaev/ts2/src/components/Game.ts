import Settings from './Settings'
import Snake from './Snake'
import Board from './Board'
import Menu from './Menu'
import Food from './Food'
import Status from './Status'

class Game {
    public messageElement: HTMLElement | null
    public settings: Settings
    public status: Status
    public board: Board
    public snake: Snake
    public menu: Menu
    public food: Food
    public timer: number

    constructor(settings: Settings, status: Status, board: Board, snake: Snake, menu: Menu, food: Food) {
        this.timer = 0
        this.messageElement = document.querySelector('#message')
        this.settings = settings
        this.status = status
        this.board = board
        this.snake = snake
        this.menu = menu
        this.food = food
    }

    //Старт игры
    public start(): void {
        if (this.status.isPaused()) {
            this.status.setPlaying()
            this.timer = window.setInterval(this.doTick.bind(this), 1000 / this.settings.speed)
        }
    }

    //Остановка игры (пауза)
    public pause(): void {
        if (this.status.isPlaying()) {
            this.status.setPaused()
            clearInterval(this.timer)
        }
    }

    //1 шаг игры
    public doTick(): void {
        this.snake.performStep()
        if (this.isGameLost()) {
            return
        }

        if (this.isGameWin()) {
            return
        }

        if (this.board.isHeadOnFoodSnake()) {
            this.snake.increaseBody()
            this.food.setNewFood()
        }

        this.board.clear()
        this.food.setFood()
        this.board.renderSnake()
    }

    //Проверка, окончена ли игра (победа)
    public isGameWin(): boolean {
        if (this.snake.body.length === this.settings.winLength) {
            clearInterval(this.timer)
            this.setMessage('Победа!')
            return true
        }
        return false
    }

    //Проверка, окончена ли игра (проигрыш)
    public isGameLost(): boolean {
        if (this.board.isNextStepWall(this.snake.body[0])) {
            clearInterval(this.timer)
            this.setMessage('Поражение!')
            return true
        }
        return false
    }

    public setMessage(message: string): void {
        if (this.messageElement) {
            this.messageElement.textContent = message
        }
    }

    //Смена направления движения змейки
    public pressKeyHandler(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowUp':
                this.snake.changeDirection('up')
                break
            case 'ArrowDown':
                this.snake.changeDirection('down')
                break
            case 'ArrowLeft':
                this.snake.changeDirection('left')
                break
            case 'ArrowRight':
                this.snake.changeDirection('right')
                break
        }
    }

    //Запуск игры
    public run(): void {
        this.menu.addButtonsClickListeners(this.start.bind(this), this.pause.bind(this))
        document.addEventListener('keydown', this.pressKeyHandler.bind(this))
    }
}

export default Game
