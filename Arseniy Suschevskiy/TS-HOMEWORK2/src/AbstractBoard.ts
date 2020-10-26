export abstract class AbstractBoard {
    protected boardElement: HTMLElement | null | undefined;

    protected constructor() {
        const element = document.getElementById('game');
        if(element){
            this.boardElement = element;
        } else {
            console.error('Error');
        }
    }

    public abstract renderBoard(): void;

    public abstract renderSnake(): void;

    public abstract getCell(coords: ICoordinates ): Element | null;

    public abstract getSnakeBodyElements(bodyCoords: Array<ICoordinates>): Array<Element> | null;

    public abstract isNextStepWall(nextSnakeCoords: ICoordinates): boolean;
}

export interface ICoordinates{
    x: number,
    y: number,
}

export interface ISnake{
    body: Array<ICoordinates>,
    readonly possibleDirection: [string, string, string, string],
    readonly direction: string,

    changeDirection(newDirection: string): void,
    isOppositeDirection(newDirection: string): boolean,
    performStep(): void,
    increaseBody(): void,
}

export default interface ISettings{
    rowsCount: number,
    colsCount: number,
    speed: number,
    winLength: number,
}