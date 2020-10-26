export class Menu {
    private startBtn: HTMLElement | null;
    private pauseBtn: HTMLElement | null;

    constructor() {
        this.startBtn = document.querySelector('#start-btn');
        this.pauseBtn = document.querySelector('#pause-btn');
    }

    addButtonsClickListeners(startBtn: () => void, pauseBtn: () => void): void {
        if (!(this.startBtn && this.pauseBtn)) return;
        this.startBtn.addEventListener('click', startBtn);
        this.pauseBtn.addEventListener('click', pauseBtn);
    }
}