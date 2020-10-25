interface Coordinates {
  x: number;
  y: number;
}
export class Snake {
  
  public possibleDirection: string[];
  public body: Coordinates[];
  public direction: string;

  public constructor() {

    this.possibleDirection = ["up", "down", "left", "right"];
    this.body = [
      {
        x: 1,
        y: 1,
      },
    ];

    this.direction = "down";

  };

  public changeDirection(newDirection: string): void {
    if (!this.possibleDirection.includes(newDirection)) {
      throw new Error(
        `Wrong direction!: ${newDirection}`
      );
    }

    if (this.oppositeDir(newDirection)) {
      return;
    }

    this.direction = newDirection;
  };

  public oppositeDir(newDirection: string): boolean {

    if (this.direction === "down" && newDirection === "up") {
      return true;
    }

    if (this.direction === "up" && newDirection === "down") {
      return true;
    }

    if (this.direction === "left" && newDirection === "right") {
      return true;
    }

    return this.direction === "right" && newDirection === "left";
  };
  public moveStep(): void {
    let currentHeadCoords: Coordinates = this.body[0];
    let newHeadCoords: Coordinates = {
      x: currentHeadCoords.x,
      y: currentHeadCoords.y,
    };
    switch (this.direction) {
      case "down":
        newHeadCoords.y++;
        break;
      case "up":
        newHeadCoords.y--;
        break;
      case "left":
        newHeadCoords.x--;
        break;
      case "right":
        newHeadCoords.x++;
        break;
    }

    this.body.unshift(newHeadCoords);
    this.body.pop();
  };

  public growBody() {
    let bodyLastCell: Coordinates = this.body[this.body.length - 1];
    let newBodyLastCell: Coordinates = {
      x: bodyLastCell.x,
      y: bodyLastCell.y,
    };

    this.body.push(newBodyLastCell);
  };
}
