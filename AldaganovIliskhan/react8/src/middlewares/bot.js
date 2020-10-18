import { sendMessage } from "../actions/chats";

let timer = null;
export const botMiddleware = (store) => (next) => (action) => {
  if (action.type === "SEND_MESSAGE") {
    const { author } = action.payload;
    const { chatId } = action.payload;
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

        clearTimeout(timer);
      }, 1500);
    }
  }
  return next(action);
};
