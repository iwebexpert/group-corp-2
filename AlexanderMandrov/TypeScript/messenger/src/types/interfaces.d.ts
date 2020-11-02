interface IMessage {
  text: string;
  username: string;
  id: string;
  date: Date;
  chatId: string;
}

interface IProfile {
  id: string;
  firstname: string;
  lastname: string;
  BIO: string;
  username: string;
  number: string;
}

interface IChat {
  id: string;
  fired: boolean;
  username: string;
  messages: IMessage[];
}
