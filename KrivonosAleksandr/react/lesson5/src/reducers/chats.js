import update from 'react-addons-update';

import {
    CHATS_ADD_DIALOG,
    CHATS_LOAD,
    CHATS_MESSAGE_SEND,
    DELETE_FRIEND_LIST_DIALOG,
} from '../actions/chats';

const initialState = {
    entries: {},
    loading: false,
};

import {chats} from '../helpers/chatsData';
import {friends} from '../helpers/chatFriends';

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "@@INIT":
            return {
                ...state,
                entries: chats,
                friends: friends,
            };
        case CHATS_MESSAGE_SEND:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        messages: {
                            $push: [{
                                id: action.payload.id,
                                text: action.payload.text,
                                type: action.payload.type,
                                time: action.payload.time
                            }]
                        },
                    },
                },
            });
        case CHATS_ADD_DIALOG:
            return update(state, {
                entries: {
                    $push: [
                        {
                            id: action.payload.id,
                            name: action.payload.name,
                            lastMessage: action.payload.lastMessage,
                            image: '',
                            userName: action.payload.userName,
                            botMessages: action.payload.botMessages,
                            messages: action.payload.messages,
                        }
                    ]
                }
            });
        case DELETE_FRIEND_LIST_DIALOG:
            return update(state, {
                friends: {
                    $set: action.payload.filteredFriends
                }
            });
        default:
            return state;
    }
}
















