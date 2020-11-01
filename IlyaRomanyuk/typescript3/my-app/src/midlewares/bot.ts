import { ChatActionTypes, addMessageAC, fireChatAC, isFetchingAC } from '../actions/addChatAC';
import { nanoid } from 'nanoid';
import { Middleware } from 'redux';



export const botMiddware: Middleware = store => next => action => {
    if (action.type === ChatActionTypes.ADD_NEW_MESSAGE) {

        const { author, chatId } = action.payload;
        const arr: Array<NavbarListChat> = Object.values(store.getState().chats.data);
        const obj = arr.find(el => el.id == chatId);

        if (obj) {
            const { title, image } = obj;
            if (author !== title && !store.getState().chats.isFetching) {
                store.dispatch(isFetchingAC(true))
                setTimeout(async () => {

                    const response = await fetch(`http://localhost:4000/messages`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ chatId, message: `Hi, ${author}! Бот на связи...`, author: title, image, id: nanoid() })
                    });
                    if (response.ok) {
                        const data = await response.json()
                        store.dispatch(addMessageAC({ ...data, chatId }));
                    }

                    let arrUrl = store.getState().router.location.pathname.split('/');

                    let idURL = arrUrl[arrUrl.length - 1];
                    if (idURL != chatId) {
                        store.dispatch(fireChatAC(chatId))
                    }

                    store.dispatch(isFetchingAC(false))

                }, 3000);
            }
        }
    }
    return next(action);
};