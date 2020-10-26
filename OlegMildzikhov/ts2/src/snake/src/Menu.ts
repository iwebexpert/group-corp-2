export class Menu {
    public startBtn: HTMLButtonElement | null;
    public pauseBtn: HTMLButtonElement | null;
    public constructor() {
        this.startBtn = document.querySelector("#start-btn");
        this.pauseBtn = document.querySelector("#pause-btn");
    };

    public addButtonsClickListeners(
        startsBtn: () => void,
        pausesBtn: () => void
    ): void {
        if (this.startBtn && this.pauseBtn) {
            this.startBtn.addEventListener("click", startsBtn);
            this.pauseBtn.addEventListener("click", pausesBtn);
        }
    };
}