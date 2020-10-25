export default class Menu {
  startBtn: HTMLButtonElement | null;
  pauseBtn: HTMLButtonElement | null;
  constructor() {
    this.startBtn = document.querySelector("#start-btn");
    this.pauseBtn = document.querySelector("#pause-btn");
  }

  addButtonsClickListeners(
    startBtn: (this: HTMLButtonElement, ev: MouseEvent) => any,
    pauseBtn: (this: HTMLButtonElement, ev: MouseEvent) => any
  ): void {
    if (this.startBtn && this.pauseBtn) {
      this.startBtn.addEventListener("click", startBtn);
      this.pauseBtn.addEventListener("click", pauseBtn);
    }
  }
}
