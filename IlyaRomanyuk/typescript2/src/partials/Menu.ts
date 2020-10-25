import MenuAbstact from './MenuAbstact';

interface T1 {
    (): void;
}

class Menu extends MenuAbstact {
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