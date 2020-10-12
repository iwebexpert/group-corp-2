import update from 'react-addons-update';
import { SEND_MESSAGE } from '../Actions/messageActions';

const initialStore = {
  messages: {
    0: { text: 'Привет!', sender: 'bot' },
    1: { text: 'Здравствуйте!', sender: 'bot' },
  },
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
  case SEND_MESSAGE: {
    return update(store, {
      messages: { $merge: { [action.messageId]: { text: action.text, sender: action.sender } } },
    });
  }

  default:
    return store;
  }
}