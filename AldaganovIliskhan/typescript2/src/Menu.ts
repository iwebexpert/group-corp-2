export class Menu {
  private startBtn: HTMLElement | null
  private pauseBtn: HTMLElement | null
  constructor() {
    this.startBtn = document.querySelector("#start-btn")
    this.pauseBtn = document.querySelector("#pause-btn")
  }
  public addButtonsClickListeners(startBtn: any, pauseBtn: any): void {
    if (this.startBtn && this.pauseBtn) {
      this.startBtn.addEventListener("click", startBtn)
      this.pauseBtn.addEventListener("click", pauseBtn)
    }
  }
}
