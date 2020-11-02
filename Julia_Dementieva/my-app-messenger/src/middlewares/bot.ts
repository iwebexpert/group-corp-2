import {nanoid} from 'nanoid';
import { Middleware } from 'redux';
import {ChatsActionTypes, chatsMessageSendAction, messageFireAction, messageUnfireAction} from '../actions/chats';

// массив хранит id чатов, в которых бот уже ответил
let answerBot: Array<number> = [];

export const botMiddlewares: Middleware = store => next => action => {

    if(action.type === ChatsActionTypes.CHATS_MESSAGE_SEND){
        const {author, chatId} = action.payload;
        let answerRobot: Array<String> = ['Чем могу помочь?','Привет, какая хорошая погода!','Добрый день!', 'Hi'];
        const indexAns: number = Math.floor(Math.random() * answerRobot.length);

        if (author !== 'Robot' && !answerBot.includes(chatId)){
            answerBot.push(chatId);
            setTimeout(() => {
                    store.dispatch(chatsMessageSendAction(
                        {id: nanoid(), chatId, text: `${author}, ${answerRobot[indexAns]}`, author: 'Robot'}
                        ));
                
                    const pathname: string = store.getState().router.location.pathname || '';
                    const parts: Array<string> = pathname.match(/\/chats\/(.*?)$/) || [];
                    const currentChat: string = parts[1] || '';

                    if (chatId !== currentChat) {
                            store.dispatch(messageFireAction({chatId}));
                    } else {
                        store.dispatch(messageUnfireAction({chatId}));
                    }
                answerBot = answerBot.filter(i => i !== chatId);
            }, 1000);
        }
    }
    return next(action);
};