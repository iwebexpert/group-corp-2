export default class Status {
  condition: string | undefined;
  constructor() {
    this.setPaused();
  }

  setPaused(): void {
    this.condition = "pause";
  }

  setPlaying(): void {
    this.condition = "play";
  }

  isPlaying(): boolean {
    return this.condition === "play";
  }

  isPaused(): boolean {
    return this.condition === "pause";
  }
}
