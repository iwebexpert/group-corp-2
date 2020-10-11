import { sendMessage } from "../actions/chats";
import { fireChat } from "../actions/chats";

let timer = null;
export const botMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "SEND_MESSAGE": {
      const { author } = action.payload;
      const { chatId } = action.payload;
      const { pathname } = action.payload;
      console.log(pathname, chatId);
      if (author !== "Bot") {
        timer = setTimeout(() => {
          store.dispatch(
            sendMessage(
              {
                author: "Bot",
                message: `Hi ${author}`,
              },
              chatId
            )
          );
          if (pathname !== chatId) {
            store.dispatch(fireChat(pathname, chatId));
          }
          clearTimeout(timer);
        }, 1000);
      }
    }
  }
  return next(action);
};
