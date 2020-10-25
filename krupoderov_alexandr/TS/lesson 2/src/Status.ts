interface IStatus {
    condition: string | undefined;
    setPaused(): void;
}

export abstract class Status implements IStatus{
    condition: string | undefined;
    protected constructor(){
        this.setPaused();
    }

    setPaused(){
        this.condition = 'pause';
    }

    protected setPlaying(){
        this.condition = 'play';
    }

    protected isPlaying(){
        return this.condition === 'play';
    }

    protected isPaused(){
        return this.condition === 'pause';
    }
}