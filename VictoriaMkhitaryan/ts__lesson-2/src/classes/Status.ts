import { timeStamp } from "console";

export class Status {
    private condition: string;
    constructor(){
        this.setPaused();  // закомментировала тк далее это явно делается, но наоборот это не работает
        // не совсем понимаю почему нужно явно в констукторе присваивать значение
        // если это делается в методе котооый вызывается до этого в констукторе
        this.condition = 'pause';
    }

    setPaused(){
        this.condition = 'pause';
    }

    setPlaying(){
        this.condition = 'play';
    }

    isPlaying(): boolean{
        return this.condition === 'play';
    }

    isPaused(): boolean{
        return this.condition === 'pause';
    }
} 