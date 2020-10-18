import { highlightChat, unhighlightChat } from "../actions/chatActions";
import { SEND_MESSAGE } from "../actions/messageActions";

export default store => next => (action) => {
   switch (action.type) {
       case SEND_MESSAGE:
           if (action.sender === 'bot') {
               store.dispatch(highlightChat(action.chatId));
               setTimeout(() => store.dispatch(unhighlightChat(action.chatId)), 300);
           }
   }
   return next(action)
}