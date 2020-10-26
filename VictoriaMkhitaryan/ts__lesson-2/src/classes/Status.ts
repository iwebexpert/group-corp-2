import { timeStamp } from "console";

export class Status {
    private condition: string;
    constructor() {
        this.condition = 'pause';
    }

    setPaused() {
        this.condition = 'pause';
    }

    setPlaying() {
        this.condition = 'play';
    }

    isPlaying(): boolean {
        return this.condition === 'play';
    }

    isPaused(): boolean {
        return this.condition === 'pause';
    }
} 