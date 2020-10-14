import update from 'react-addons-update';
import { SEND_MESSAGE } from '../actions/messageActions';
import { SUCCESS_CHATS_LOADING } from '../actions/chatActions';


const initialStore = {
    messages: {},
};


export default function messageReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            return update(store, {
                messages: { $merge: { [action.messageId]: {text: action.text, sender: action.sender} } },
            });
        }
        case SUCCESS_CHATS_LOADING: {
            return update(store, {
                messages: { $set: action.payload.entities.messages },
            });
        }
        default:
            return store;
    }
}