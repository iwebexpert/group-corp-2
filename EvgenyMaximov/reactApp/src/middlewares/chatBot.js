import {
  chatsMessageSendAction,
  CHATS_MESSAGE_SEND,
  chatFireAction,
} from "../actions/chats";
import { nanoid } from "nanoid";

let timer = null;

export const chatBotMiddware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const { author, chatId } = action.payload;
    const { router } = store.getState();

    const botAnswers = [
      `Привет, ${author}! Я чат-бот...`,
      `Как скажешь, ${author}!`,
      `Чем я могу тебе помочь, ${author}?`,
      `${author}, а какая погода больше всего нравится тебе?`,
      `Это сообщение сгенерирована случайным образом, ${author}, не жди от меня объективности =(`,
      `Рад приветствовать тебя, ${author}! Добро пожаловать в Telegraf!`,
      `Как настроение, ${author}?`,
      `Отлично что ты зашел, ${author}, дашь списать тест Тьюринга?`,
      `Приём-приём, как слышишь, ${author}?`,
      `Плохие новости, ${author}, вчера Facebook разработал чат-бота маминой подруги...`,
    ];

    const rnd = () => Math.floor(Math.random() * botAnswers.length);
    const time = new Date();

    const botText = {
      text: `${botAnswers[rnd()]} `,
      author: "Бот",
      chatId,
      id: nanoid(),
      time: time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour24: true,
      }),
    };

    if (author !== "Бот") {
      timer = setTimeout(() => {
        store.dispatch(chatsMessageSendAction(botText));
      }, 1500);
    }

    if (action.type === CHATS_MESSAGE_SEND && author === "Бот") {
      clearTimeout(timer);
    }

    if (router.location.pathname !== `/chats/${chatId}`) {
      setTimeout(() => {
        store.dispatch(chatFireAction(chatId));
      }, 0);
    }
  }

  return next(action);
};
