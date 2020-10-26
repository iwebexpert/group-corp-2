abstract class AbstractStatus {
    protected condition: string

    constructor() {
        this.condition = 'pause';
    }

    abstract setPaused(): void

    abstract setPlaying(): void

    abstract isPlaying(): boolean

    abstract isPaused(): boolean
}

export class Status extends AbstractStatus {

    constructor() {
        super();
    }

    setPaused(): void {
        this.condition = 'pause';
    }

    setPlaying(): void {
        this.condition = 'play';
    }

    isPlaying(): boolean {
        return this.condition === 'play';
    }

    isPaused(): boolean {
        return this.condition === 'pause';
    }
}