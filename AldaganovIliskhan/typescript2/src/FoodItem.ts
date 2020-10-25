export default abstract class Food {
    x: number
    y: number

    protected constructor() {
        this.x = 1
        this.y = 1
    }

    //Получение координат новой ячейки и отрисовка на поле
    protected setNewItem(): void { }

    //Возвращает случайные координаты
    protected randomCoords(): void { }

    //Размещение на игровом поле
    protected setItem(): void { }
} 