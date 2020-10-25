import { BodyType } from './types/BodyType'
export class Snake {
  private possibleDirection: string[]
  public body: BodyType[]
  private direction: string
  constructor() {
    this.possibleDirection = ["up", "down", "left", "right"]
    this.body = [
      {
        x: 1,
        y: 1,
      },
    ]

    this.direction = "down"
  }

  public changeDirection(newDirection: string | null): void {
    if (newDirection && !this.possibleDirection.includes(newDirection)) {
      throw new Error(
        `Передано недопустимое направление движения: ${newDirection}`
      );
    }

    if (this.isOppositeDirection(newDirection)) {
      return;
    }
    if (newDirection) {
      this.direction = newDirection
    }
  }

  public isOppositeDirection(newDirection: string | null): boolean | undefined {
    if (newDirection) {
      if (this.direction === "down" && newDirection === "up") {
        return true
      }

      if (this.direction === "up" && newDirection === "down") {
        return true
      }

      if (this.direction === "left" && newDirection === "right") {
        return true
      }

      if (this.direction === "right" && newDirection === "left") {
        return true
      }

      return false
    }
  }

  //Следующий шаг змейки
  public performStep(): void {
    let currentHeadCoords: BodyType = this.body[0]; //Head
    let newHeadCoords: BodyType = {
      x: currentHeadCoords.x,
      y: currentHeadCoords.y,
    };

    switch (this.direction) {
      case "down":
        newHeadCoords.y++
        break
      case "up":
        newHeadCoords.y--
        break
      case "left":
        newHeadCoords.x--
        break
      case "right":
        newHeadCoords.x++
        break
    }

    this.body.unshift(newHeadCoords)
    this.body.pop()
  }

  //Увеличение тела змейки
  public increaseBody(): void {
    let bodyLastCell: BodyType = this.body[this.body.length - 1]
    let newBodyLastCell: BodyType = {
      x: bodyLastCell.x,
      y: bodyLastCell.y,
    };

    this.body.push(newBodyLastCell)
  }
}
