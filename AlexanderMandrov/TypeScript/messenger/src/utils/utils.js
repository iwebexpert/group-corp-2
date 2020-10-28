import { nanoid } from 'nanoid';

export const createMessage = (text, username, chatId) => {
  return {
    text,
    username,
    id: nanoid(),
    date: new Date(),
    chatId: chatId
  }
};

export const createBotMessage = (sender, receiver, chatId) => {
  return {
    text: `⊂(✾◕ ‿ ◕✾)つ•٠· Hello, ${sender}! ${receiver} is offline, he/she will reply you soon!`,
    username: 'Bot',
    id: nanoid(),
    date: new Date(),
    chatId: chatId
  }
};

export const validateInput = (text) => {
  const regExp = /\S|(^\w$)/gi;
  return regExp.test(text);
};

export const validateNewChat = (chats, newReceiver) => {
  return findChatIdByReceiver(chats, newReceiver) === -1 ? true : false;
}

export const messageShorter = (message) => {
  return message.length < 39 ? message : `${message.slice(0, 36)}...`;
};

export const findChatByReceiver = (chats, receiver) => {
  return chats.filter(chat => chat.username === receiver)[0];
};

export const findChatIdByReceiver = (chats, receiver) => {
  let id = -1;
  chats.forEach((chat) => {
    if (chat.username === receiver) id = chat.id;
  });
  return id;
};