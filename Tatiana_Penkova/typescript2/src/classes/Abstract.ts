import { Settings } from "./Settings";

export abstract class AbstractClass extends Settings {
    protected boardElement: HTMLElement | null | undefined;
    public constructor(protected el?: string) {
        super();
        if (el) {
            this.boardElement = document.getElementById(el);
        }
    }
};