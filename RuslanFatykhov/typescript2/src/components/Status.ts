export abstract class Status {
  public condition?: string;
  public constructor() {
    this.setPaused();
  };

  public setPaused(): void {
    this.condition = "pause";
  };

  public setPlaying(): void {
    this.condition = "play";
  };

  public isPlaying(): boolean {
    return this.condition === "play";
  };

  public isPaused(): boolean {
    return this.condition === "pause";
  };
};
