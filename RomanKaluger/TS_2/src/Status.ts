export interface IStatus {
    setPaused(): void;
    setPlaying(): void;
    isPlaying(): boolean;
    isPaused(): boolean;
}
enum Statuses {
    PAUSE, PLAY
}
abstract class AbstractStatus implements IStatus{
    public abstract isPaused(): boolean;
    public abstract isPlaying(): boolean;
    public abstract setPaused(): void;
    public abstract setPlaying(): void;
}
export class Status extends AbstractStatus{
    private condition: Statuses = Statuses.PAUSE;

    public setPaused(): void{
        this.condition = Statuses.PAUSE;
    }

    public setPlaying(): void{
        this.condition = Statuses.PLAY;
    }

    public isPlaying(): boolean{
        return this.condition === Statuses.PLAY;
    }

    public isPaused(): boolean{
        return this.condition === Statuses.PAUSE;
    }
}
