interface T1 {
    (): void;
}

abstract class MenuAbstract {
    public startBtn: HTMLButtonElement | null;
    public pauseBtn: HTMLButtonElement | null;
    constructor() {
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    public addButtonsClickListeners(start: T1, pause: T1): void { }
}
export default MenuAbstract;