import { nanoid } from 'nanoid';

export const createMessage: CreateMessage = (text, username, chatId) => {
  return {
    text: text,
    username: username,
    id: nanoid(),
    date: new Date(),
    chatId: chatId,
  };
};

export const createBotMessage: CreateBotMessage = (
  sender,
  receiver,
  chatId
) => {
  return {
    text: `⊂(✾◕ ‿ ◕✾)つ•٠· Hello, ${sender}! ${receiver} is offline, he/she will reply you soon!`,
    username: 'Bot',
    id: nanoid(),
    date: new Date(),
    chatId: chatId,
  };
};

export const validateInput: ValidateInput = (text) => {
  const regExp: RegExp = /\S|(^\w$)/gi;
  return regExp.test(text);
};

export const validateNewChat: ValidateNewChat = (chats, newReceiver) => {
  return findChatIdByReceiver(chats, newReceiver) === '' ? true : false;
};

export const messageShorter: MessageShorter = (message) => {
  return message.length < 39 ? message : `${message.slice(0, 36)}...`;
};

export const findChatByReceiver: FindChatByReceiver = (chats, receiver) => {
  return chats.filter((chat: IChat): boolean => chat.username === receiver)[0];
};

export const findChatIdByReceiver: FindChatIdByReceiver = (chats, receiver) => {
  let id: string = '';
  chats.forEach((chat: IChat): void => {
    if (chat.username === receiver) id = chat.id;
  });
  return id;
};
