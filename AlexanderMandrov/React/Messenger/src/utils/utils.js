import { nanoid } from 'nanoid';

const createMessage = (text, username) => {
  return {
    text,
    username,
    id: nanoid(),
    date: new Date()
  }
};

const createBotMessage = (text, username) => {
  return {
    text: `⊂(✾◕ ‿ ◕✾)つ•٠· ${username} said: ${text}`,
    username: 'Bot',
    id: nanoid(),
    date: new Date()
  }
};

const validateMessage = (message) => {
  const regExp = /\S|(^\w$)/gi;
  return regExp.test(message);
}

export { createMessage, createBotMessage, validateMessage };