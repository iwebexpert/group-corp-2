import { ADD_NEW_MESSAGE, addMessageAC, fireChatAC, isFetchingAC } from '../actions/addChatAC';
import { nanoid } from 'nanoid';

export const botMiddware = store => next => action => {
    if (action.type === ADD_NEW_MESSAGE) {

        const { author, chatId } = action.payload;
        const { title, image } = Object.values(store.getState().chats.data).find(el => el.id == chatId);


        if (author !== title && !store.getState().chats.isFetching) {
            store.dispatch(isFetchingAC(true))
            setTimeout(() => {
                store.dispatch(addMessageAC(
                    { chatId, message: `Hi, ${author}! Бот на связи...`, author: title, image, id: nanoid() }
                ));

                let arrUrl = store.getState().router.location.pathname.split('/');

                let idURL = arrUrl[arrUrl.length - 1];
                if (idURL !== chatId) {
                    store.dispatch(fireChatAC(chatId))
                }

                store.dispatch(isFetchingAC(false))

            }, 3000);
        }
    }
    return next(action);
};