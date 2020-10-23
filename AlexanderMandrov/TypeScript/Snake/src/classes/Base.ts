import { Settings } from './Settings';

export abstract class Base extends Settings {
  protected boardElement: HTMLElement;
  public constructor(protected divId?: string) {
    super();
    if (divId) this.boardElement = document.getElementById(divId);
  }
}
