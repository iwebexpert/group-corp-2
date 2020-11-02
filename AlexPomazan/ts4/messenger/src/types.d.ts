type MessageType = {
  text: string;
  author: string;
  img?: string;
  id?: string;
  chatId?: string;
};

type MessageActionType = {
  text: string;
  author: string;
  img?: string;
  id?: string;
  chatId: string;
};

type ChatType = {
  id: number;
  title: string;
  messages: Array<MesageType>;
  fire: boolean;
};

type NewChatType = {
  title: string;
  fire?: boolean;
};

type ChatNewType = {
  title: string;
};

type ProfileType = {
  id: number;
  img: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  gender: string;
};
