import {CHATS_MESSAGE_SEND, chatsMessageSendAction, messageFireAction, messageUnfireAction} from '../actions/chats'
import {nanoid} from 'nanoid';

// массив хранит id чатов, в которых бот уже ответил
let answerBot = [];

export const botMiddlewares = store => next => action => {

    if(action.type === CHATS_MESSAGE_SEND){
        const {author, chatId} = action.payload;
        let answerRobot = ['Чем могу помочь?','Привет, какая хорошая погода!','Добрый день!', 'Hi'];
        const indexAns = Math.floor(Math.random() * answerRobot.length);

        if (author !== 'Robot' && !answerBot.includes(chatId)){
            answerBot.push(chatId);
            setTimeout(() => {
                    store.dispatch(chatsMessageSendAction(
                        {id: nanoid(), chatId, text: `${author}, ${answerRobot[indexAns]}`, author: 'Robot'}
                        ));
                

                    const pathname = store.getState().router.location.pathname || '';
                    const parts = pathname.match(/\/chats\/(.*?)$/) || [];
                    const currentChat = parts[1] || '';

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