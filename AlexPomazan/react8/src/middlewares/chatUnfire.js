import { LOCATION_CHANGE } from "connected-react-router";
import { chatUnfireAction } from "../actions/chats";

export const chatUnfireMiddleware = (store) => (next) => (action) => {
  if (action.type === LOCATION_CHANGE) {
    const str = store.getState().router.location.pathname;
    const chatPath = /\d+$/.test(str);
    if (chatPath) {
      const chatId = /\d+$/.exec(str)[0];
      if (Object.keys(store.getState().chats.entries).length) {
        const fireChat = store.getState().chats.entries[chatId].fire;
        if (fireChat) {
          store.dispatch(chatUnfireAction(chatId));
        }
      }
    }
  }

  return next(action);
};
