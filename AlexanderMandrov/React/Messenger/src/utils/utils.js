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

const validateInput = (text) => {
  const regExp = /\S|(^\w$)/gi;
  return regExp.test(text);
};

const messageShorter = (message) => {
  return message.length < 39 ? message : `${message.slice(0, 36)}...`;
};

const findChatByReceiver = (chats, receiver) => {
  return chats.filter(chat => chat.username === receiver)[0];
};

const findChatIndexByReceiver = (chats, receiver) => {
  let index = -1;
  chats.forEach((chat, idx) => {
    if (chat.username === receiver) index = idx;
  });
  return index;
};

const createProfileInfo = (profileInfo) => {
  return {
    ...profileInfo,
    date: new Date().toLocaleString(),
    image: 'https://source.unsplash.com/random',
  };
};

export { createMessage, createBotMessage, validateInput, messageShorter, 
  findChatByReceiver, findChatIndexByReceiver, createProfileInfo };