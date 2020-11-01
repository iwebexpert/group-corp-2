type MessageType = {
  text: string;
  author: string;
  id?: string;
};

type ContactType = {
  name: string;
  online: string;
  id: string;
};

type ChatType = {
  title: string;
  id: string;
  chatId?: number;
};
