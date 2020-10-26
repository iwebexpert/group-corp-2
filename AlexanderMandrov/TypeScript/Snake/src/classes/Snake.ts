import { IPoint } from '../types/interfaces';

export class Snake {
  protected possibleDirection: [string, string, string, string];
  public body: IPoint[]; //protected
  protected direction: string;

  public constructor() {
    this.possibleDirection = ['up', 'down', 'left', 'right'];

    this.body = [
      {
        x: 1,
        y: 1,
      },
    ];

    this.direction = 'down';
  }

  public changeDirection(newDirection: string): void | never {
    if (!this.possibleDirection.includes(newDirection)) {
      throw new Error(`impossible direction: ${newDirection}`);
    }
    if (this.isOppositeDirection(newDirection)) return;

    this.direction = newDirection;
  }

  private isOppositeDirection(newDirection: string): boolean {
    if (this.direction === 'down' && newDirection === 'up') return true;
    if (this.direction === 'up' && newDirection === 'down') return true;
    if (this.direction === 'left' && newDirection === 'right') return true;
    if (this.direction === 'right' && newDirection === 'left') return true;
    return false;
  }

  public performStep(): void {
    let currentHeadCoords: IPoint = this.body[0];
    let newHeadCoords: IPoint = {
      x: currentHeadCoords.x,
      y: currentHeadCoords.y,
    };

    switch (this.direction) {
      case 'down':
        newHeadCoords.y++;
        break;
      case 'up':
        newHeadCoords.y--;
        break;
      case 'left':
        newHeadCoords.x--;
        break;
      case 'right':
        newHeadCoords.x++;
        break;
    }

    this.body.unshift(newHeadCoords);
    this.body.pop();
  }

  public increaseBody(): void {
    let bodyLastCell: IPoint = this.body[this.body.length - 1];
    let newBodyLastCell: IPoint = {
      x: bodyLastCell.x,
      y: bodyLastCell.y,
    };

    this.body.push(newBodyLastCell);
  }
}
