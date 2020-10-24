export class Status {

    private _condition: string = 'pause';

    public constructor(){
        this.setPaused();
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