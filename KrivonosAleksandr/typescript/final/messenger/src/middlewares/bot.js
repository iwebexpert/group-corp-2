import {CHATS_MESSAGE_SEND, chatsMessageSendAction, messageFireAction, messageUnfireAction} from '../actions/chats';
import {nanoid} from 'nanoid';

export const botMiddleware = store => next => action => {
    if (action.type === CHATS_MESSAGE_SEND) {
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

                    store.dispatch(chatsMessageSendAction({...message, chatId}, chats, numAnswers));
                    let pathname= store.getState().router.location.pathname.replace('/chats/', '');
                    if(chatId === parseInt(pathname)){
                        store.dispatch(messageFireAction(chatId));
                    } else {
                        store.dispatch(messageUnfireAction(chatId));
                    }
                }
            }, 2000);
        }
    }

    return next(action);
};