class Status {
    protected condition: string = 'pause';
    constructor(){
        this.setPaused();
    }

    setPaused(){
        this.condition = 'pause';
    }

    setPlaying(){
        this.condition = 'play';
    }

    isPlaying(){
        return this.condition === 'play';
    }

    isPaused(){
        return this.condition === 'pause';
    }
}

export default Status;