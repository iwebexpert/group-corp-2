export class Status {
    private condition: string;

    constructor() {
        this.condition = 'pause'
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