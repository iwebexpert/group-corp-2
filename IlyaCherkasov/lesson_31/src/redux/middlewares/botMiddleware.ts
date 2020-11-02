import { Middleware } from 'redux';
import { ChatsActionType, setMessage } from '../actions/chatActions'
import { nanoid } from 'nanoid';
import { getRandomRobotMessage } from '../../helpers/botAnswersData'

let isAnswering = false;

export const botMiddleware: Middleware = (store) => (next) => (action) => {
    if (action.type === ChatsActionType.NEW_MESSAGE) {
        const { user, chatID, author } = action.payload;
        if (user !== 'bot' && !isAnswering) {
            isAnswering = true;
            setTimeout(() => {
                store.dispatch(setMessage({
                    chatID,
                    id: nanoid(),
                    author: 'Робот',
                    text: getRandomRobotMessage(author),
                    user: 'bot',
                }))
                isAnswering = false;
            }, 1000)
        }
    }
    return next(action);
}