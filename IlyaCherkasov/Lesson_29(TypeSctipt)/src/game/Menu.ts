interface T1 {
    (): void;
}

abstract class AMenu {
    public startBtn: HTMLButtonElement | null;
    public pauseBtn: HTMLButtonElement | null;
    constructor() {
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    public addButtonsClickListeners(start: T1, pause: T1): void { }
}

class Menu extends AMenu {
    constructor() {
        super()
    }

    public addButtonsClickListeners(start: T1, pause: T1): void {
        if (this.startBtn && this.pauseBtn) {
            this.startBtn.addEventListener('click', start);
            this.pauseBtn.addEventListener('click', pause);
        }
    }
}

export default Menu; 