// export type MessageData = {
//   id: number;
//   author: string;
//   message: string;
// };

export type NewChatType = {
  title: string;
};

export type ChatType = NewChatType & {
  id: number;
};

export type ChatsData = {
  id: number;
  title: string;
  messages: ChatType[];
};

export type NewMessageType = {
  author: string;
  message: string;
};

export type MessageType = NewMessageType & {
  id: number;
  chatId: number;
};

export type ProfileType ={
  id: number;
  name: string;
  age: number;
  gender: boolean;
  city: string;
};