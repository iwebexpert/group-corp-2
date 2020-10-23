export class Status {
  public status: string;
  public constructor() {
    this.setPaused();
  }

  public setPaused(): void {
    this.status = 'pause';
  }

  public setPlaying(): void {
    this.status = 'play';
  }

  public isPlaying(): boolean {
    return this.status === 'play';
  }

  public isPaused(): boolean {
    return this.status === 'pause';
  }
}
