abstract class AbstractMenu {
  public startBtn: HTMLButtonElement | null;
  public pauseBtn: HTMLButtonElement | null;

  protected constructor() {
    this.startBtn = document.querySelector("#start-btn");
    this.pauseBtn = document.querySelector("#pause-btn");
  }

  public addButtonsClickListeners(start: () => void, pause: () => void): void {}
}
class Menu extends AbstractMenu {
  constructor() {
    super();
  }

  public addButtonsClickListeners(
    startBtnHandler: () => void,
    pauseBtnHandler: () => void
  ): void {
    if (this.startBtn && this.pauseBtn) {
      this.startBtn.addEventListener("click", startBtnHandler);
      this.pauseBtn.addEventListener("click", pauseBtnHandler);
    }
  }
}
export default Menu;
