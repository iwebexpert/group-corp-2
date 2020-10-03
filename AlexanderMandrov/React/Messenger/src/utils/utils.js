import { nanoid } from 'nanoid';

const createMessage = (text, username) => {
  return {
    text,
    username,
    id: nanoid(),
    date: new Date()
  }
};

const createBotMessage = (sender, receiver) => {
  return {
    text: `⊂(✾◕ ‿ ◕✾)つ•٠· Hello, ${sender}! ${receiver} is offline, he/she will reply you soon!`,
    username: 'Bot',
    id: nanoid(),
    date: new Date()
  }
};

const validateMessage = (message) => {
  const regExp = /\S|(^\w$)/gi;
  return regExp.test(message);
};

const messageShorter = (message) => {
  return message.length < 39 ? message : `${message.slice(0, 36)}...`;
};

const findMessagesByReceiver = (chats, receiver) => {
  return chats.filter(chat => chat.id === receiver)[0];
};

const findChatIndexByReceiver = (chats, receiver) => {
  let index = -1;
  chats.forEach((chat, idx) => {
    if (chat.id === receiver) index = idx;
  });
  return index === -1 ? undefined : index;
};

export { createMessage, createBotMessage, validateMessage, messageShorter, findMessagesByReceiver, findChatIndexByReceiver };