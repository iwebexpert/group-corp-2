export class Status {

    private _condition: string;

    public constructor(){
        this.setPaused();
        this._condition = 'pause';
    }

    public setPaused(): void{
        this._condition = 'pause';
    }

    public setPlaying(): void{
        this._condition = 'play';
    }

    public isPlaying(): boolean{
        return this._condition === 'play';
    }

    public isPaused(): boolean{
        return this._condition === 'pause';
    }
}