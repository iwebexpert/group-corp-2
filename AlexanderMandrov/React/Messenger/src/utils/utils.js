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

const findMessagesByReceiver = (chats, receiver) => {
  return chats.filter(chat => chat.id === receiver)[0];
};

const findChatIndexByReceiver = (chats, receiver) => {
  let index = -1;
  chats.forEach((chat, idx) => {
    if (chat.id === receiver) index = idx;
  });
  return index;
};

const setDelay = (chat, chats, setChats, sender, receiver, editIdx = 0) => {
  setTimeout(() => {
    const { messages } = chat;
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.username !== 'Bot') {
      chat.messages.push(createBotMessage(sender, receiver));
      setChats([...chats].map((elem, idx) => idx === editIdx ? chat : elem));
    }
  }, 2000);
}

export { createMessage, createBotMessage, validateInput, messageShorter, findMessagesByReceiver, findChatIndexByReceiver, setDelay };