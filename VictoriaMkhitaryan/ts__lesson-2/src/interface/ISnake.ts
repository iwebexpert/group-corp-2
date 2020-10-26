import { ICoordinates } from './ICoordinates';

export interface ISnake {
  possibleDirection: ReadonlyArray<string>,
  body: Array<ICoordinates>,
  readonly direction: string,

  changeDirection(newdirection: string): void,
  isOppositeDirection(newdirection: string): boolean,
  performStep(): void,
  increaseBody(): void,
} 