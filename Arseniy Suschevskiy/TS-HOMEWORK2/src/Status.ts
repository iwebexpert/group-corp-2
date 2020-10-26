export class Status {
    private condition: string;

    public constructor(){
        this.setPaused();
        this.condition = 'pause';
    }

    public setPaused(): void{
        this.condition = 'pause';
    }

    public setPlaying(): void{
        this.condition = 'play';
    }

    public isPlaying(): boolean{
        return this.condition === 'play';
    }

    public isPaused(): boolean{
        return this.condition === 'pause';
    }
}