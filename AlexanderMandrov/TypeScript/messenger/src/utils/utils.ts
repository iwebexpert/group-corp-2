import { nanoid } from 'nanoid';
import { IMessage, IChat } from '../types/interfaces';

export const createMessage: (
  text: IMessage['text'],
  username: IMessage['username'],
  chatId: IMessage['chatId']
) => IMessage = (text, username, chatId) => {
  return {
    text: text,
    username: username,
    id: nanoid(),
    date: new Date(),
    chatId: chatId,
  };
};

export const createBotMessage: (
  sender: IMessage['username'],
  receiver: string,
  chatId: IMessage['chatId']
) => IMessage = (sender, receiver, chatId) => {
  return {
    text: `⊂(✾◕ ‿ ◕✾)つ•٠· Hello, ${sender}! ${receiver} is offline, he/she will reply you soon!`,
    username: 'Bot',
    id: nanoid(),
    date: new Date(),
    chatId: chatId,
  };
};

export const validateInput: (text: string) => boolean = (text) => {
  const regExp: RegExp = /\S|(^\w$)/gi;
  return regExp.test(text);
};

export const validateNewChat: (
  chats: Array<IChat>,
  newReceiver: string
) => boolean = (chats, newReceiver) => {
  return findChatIdByReceiver(chats, newReceiver) === '' ? true : false;
};

export const messageShorter: (message: IMessage['text']) => string = (
  message
) => {
  return message.length < 39 ? message : `${message.slice(0, 36)}...`;
};

export const findChatByReceiver: (
  chats: Array<IChat>,
  receiver: string
) => IChat = (chats, receiver) => {
  return chats.filter((chat: IChat) => chat.username === receiver)[0];
};

export const findChatIdByReceiver: (
  chats: Array<IChat>,
  receiver: string
) => string = (chats, receiver) => {
  let id: string = '';
  chats.forEach((chat: IChat) => {
    if (chat.username === receiver) id = chat.id;
  });
  return id;
};
