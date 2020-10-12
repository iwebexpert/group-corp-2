import { SEND_MESSAGE, sendMessage } from '../Actions/messageActions';
import { blinkChat } from '../Actions/chatActions';
import { botPhrases } from '../utils';

export default store => next => action => {
  switch (action.type) {
  case SEND_MESSAGE: {
    if (action.sender === 'me') {
      setTimeout(() => {
        store.dispatch(blinkChat(action.chatId, true));

        setTimeout(() => store.dispatch(blinkChat(action.chatId, false)), 200);
        store.dispatch(
          sendMessage(Object.keys(store.getState().messageReducer.messages).length + 1,
            botPhrases(), 'bot',
            action.chatId),
        );
      }, 1000);
    }
  }
  }

  return next(action);
};