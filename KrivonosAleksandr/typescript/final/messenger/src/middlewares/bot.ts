import {ChatsActionTypes, chatsMessageSendAction, messageFireAction, messageUnfireAction} from '../actions/chats';
import {nanoid} from 'nanoid';
import {Middleware} from "redux";

export const botMiddleware: Middleware = store => next => action => {
    if (action.type === ChatsActionTypes.CHATS_MESSAGE_SEND) {
        const {type, chatId} = action.payload;
        if (type !== 'botMsg' && action.chats[chatId].botMessages) {
            const chats = action.chats;
            const chat = chats[chatId];
            setTimeout(() => {
                if (chat.answerCount < chat.botMessages.length) {
                    let message= {
                        id:'',
                        type:'',
                        time:'',
                        text:'',
                    };

                    message.id = nanoid();
                    message.type = 'botMsg';
                    message.time = new Date().toLocaleTimeString();
                    message.text = chat.botMessages[chat.answerCount];

                    let numAnswers = chat.answerCount + 1;

                    store.dispatch(chatsMessageSendAction({...message, chatId}, chats, numAnswers) as any);
                    let pathname= store.getState().router.location.pathname.replace('/chats/', '');
                    if(chatId === parseInt(pathname)){
                        store.dispatch(messageFireAction(chatId) as any);
                    } else {
                        store.dispatch(messageUnfireAction(chatId) as any);
                    }
                }
            }, 2000);
        }
    }

    return next(action);
};