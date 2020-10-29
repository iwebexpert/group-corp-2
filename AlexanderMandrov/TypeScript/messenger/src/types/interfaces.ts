export interface IMessage {
  text: string;
  username: string;
  id: string;
  date: Date;
  chatId: string;
}

export interface IProfile {
  id: string;
  firstname: string;
  lastname: string;
  BIO: string;
  username: string;
  number: string;
}

export interface IChat {
  id: string;
  fired: boolean;
  username: string;
  messages: IMessage[];
}
