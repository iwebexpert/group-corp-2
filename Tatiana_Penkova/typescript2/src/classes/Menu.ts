export class Menu {
    private startBtn: HTMLButtonElement | null;
    private pauseBtn: HTMLButtonElement | null;
    public constructor() {
        this.startBtn = document.querySelector("#start-btn");
        this.pauseBtn = document.querySelector("#pause-btn");
    }
    public addButtonsClickListeners(startBtnHandler: () => void, pauseBtnHandler: () => void): void {
        if (this.startBtn && this.pauseBtn) {
            this.startBtn.addEventListener("click", startBtnHandler);
            this.pauseBtn.addEventListener("click", pauseBtnHandler);
        }
    };
};