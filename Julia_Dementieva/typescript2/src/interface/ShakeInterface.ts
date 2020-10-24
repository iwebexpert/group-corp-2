export interface ICoordinates{
    x: number,
    y: number,
}

export interface ISnake{
    body: Array<ICoordinates>,
    readonly possibleDirection: [string, string, string, string],
    readonly direction: string,

    changeDirection(newdirection: string): void,
    isOppositeDirection(newdirection: string): boolean,
    performStep(): void,
    increaseBody(): void,
}