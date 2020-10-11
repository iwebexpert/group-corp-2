import { CHATS_MESSAGE_SEND, chatsMessageSendAction } from '../actions/chats';
import { nanoid } from 'nanoid';
export const botMiddlewares = store => next => action => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const { author, chatId } = action.payload;
    const botAnswers = [
      `Привет, ${author}, как дела?`,
      `Привет, ${author}, чем займемся сегодня?`,
      `Привет, ${author}, какие планы на сегодня?`,
    ];
    if (author !== 'Bot') {
      setTimeout(() => {
        store.dispatch(chatsMessageSendAction(
          { id: nanoid(), chatId, text: botAnswers[Math.floor(Math.random() * (botAnswers.length - 0)) + 0], author: 'Bot' }
        ));
      }, 300);
    }
  }
  return next(action);
}