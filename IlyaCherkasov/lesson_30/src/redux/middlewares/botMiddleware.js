import { NEW_MESSAGE, setMessage } from '../actions/chatActions'
import { nanoid } from 'nanoid';
import { getRandomRobotMessage } from '../../helpers/botAnswersData'

let isAnswering = false;

export const botMiddleware = (store) => (next) => (action) => {
    if (action.type === NEW_MESSAGE) {
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