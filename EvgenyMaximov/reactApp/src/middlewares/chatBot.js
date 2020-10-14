import {
  chatsMessageSendAction,
  chatFireAction,
  chatsLoadAction,
} from "../actions/chats";
import { nanoid } from "nanoid";

let timer = null;

export const chatBotMiddware = (store) => (next) => (action) => {
  if (Object.values(action)[0].method == "POST") {
    const { router } = store.getState();
    const body = JSON.parse(Object.values(action)[0].body);

    const { author, chatId } = body;

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
      clearTimeout(timer);
      timer = setTimeout(() => {
        store.dispatch(chatsMessageSendAction(botText));
        store.dispatch(chatsLoadAction());
      }, 1500);
    }

    if (router.location.pathname !== `/chats/${chatId}`) {
      setTimeout(() => {
        store.dispatch(chatFireAction(chatId));
        store.dispatch(chatsLoadAction());
      }, 0);
    }
  }

  return next(action);
};
