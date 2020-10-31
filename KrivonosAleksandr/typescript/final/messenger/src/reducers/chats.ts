import update from 'react-addons-update';
import {Reducer} from 'redux';

import {ChatsActions, ChatsActionTypes} from '../actions/chats';

import {activateDelete} from '../helpers/showDeleteBtns';

export type ChatsReducerState = {
    entries: any;
    friends: any;
    loading: boolean;
    error: boolean;
}

const initialState: ChatsReducerState = {
    entries: {},
    friends: {},
    loading: false,
    error: false,
};

export const chatsReducer: Reducer<ChatsReducerState, ChatsActions> = (state = initialState, action) => {
    switch (action.type) {
        case ChatsActionTypes.CHATS_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case ChatsActionTypes.CHATS_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                entries: action.payload,
                activateDelete: activateDelete,
                friends: action.friends,
            };

        case ChatsActionTypes.CHATS_LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case ChatsActionTypes.SHOW_DELETE_BTNS:
            return update(state, {
                activateDelete: {
                    $set: action.payload
                }
            });
        case ChatsActionTypes.CHATS_MESSAGE_SEND:
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
                        answerCount: {$set: action.answerCount},
                    },
                },
            });
        case ChatsActionTypes.MESSAGE_FIRE:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        fire: {$set: true},
                    },
                },
            });
        case ChatsActionTypes.MESSAGE_UNFIRE:
            return update(state, {
                entries: {
                    [action.payload.chatId]: {
                        fire: {$set: false},
                    },
                },
            });
        case ChatsActionTypes.CHATS_ADD_DIALOG:
            console.log(action.payload);
            return update(state, {
                entries: {
                    $merge: {
                        [action.payload.id]: {
                            id: action.payload.id,
                            name: action.payload.name,
                            lastMessage: action.payload.lastMessage,
                            image: '',
                            fire: action.payload.fire,
                            userName: action.payload.userName,
                            botMessages: action.payload.botMessages,
                            messages: action.payload.messages,
                        }
                    }
                }
            });
        case ChatsActionTypes.CHATS_DELETE_DIALOG:
            return update(state, {
                entries: {
                    $set: action.payload,
                }
            });
        case ChatsActionTypes.ADD_FRIEND_LIST_DIALOG:
            return update(state, {
                friends: {
                    $merge: {
                        [action.payload.id]: {
                                id: action.payload.id,
                                name: action.payload.name
                            }
                    }
                }
            });
        case ChatsActionTypes.DELETE_FRIEND_LIST_DIALOG:
            console.log(action.payload);
            return update(state, {
                friends: {
                    $set: action.payload
                }
            });
        default:
            return state;
    }
}










// import update from 'react-addons-update';
//
// import {
//     CHATS_LOAD_REQUEST,
//     CHATS_LOAD_SUCCESS,
//     CHATS_LOAD_FAILURE,
//     CHATS_ADD_DIALOG,
//     CHATS_DELETE_DIALOG,
//     SHOW_DELETE_BTNS,
//     CHATS_MESSAGE_SEND,
//     MESSAGE_FIRE,
//     MESSAGE_UNFIRE,
//     ADD_FRIEND_LIST_DIALOG,
//     DELETE_FRIEND_LIST_DIALOG,
// } from '../actions/chats';
//
// import {activateDelete} from '../helpers/showDeleteBtns';
//
// const initialState = {
//     entries: {},
//     loading: false,
//     error: false,
// };
//
// export const chatsReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case CHATS_LOAD_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: false,
//             };
//
//         case CHATS_LOAD_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 entries: action.payload,
//                 activateDelete: activateDelete,
//                 friends: action.friends,
//             };
//
//         case CHATS_LOAD_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: true,
//             };
//         case SHOW_DELETE_BTNS:
//             return update(state, {
//                 activateDelete: {
//                     $set: action.payload.activateDelete
//                 }
//             });
//         case CHATS_MESSAGE_SEND:
//             return update(state, {
//                 entries: {
//                     [action.payload.chatId]: {
//                         messages: {
//                             $push: [{
//                                 id: action.payload.id,
//                                 text: action.payload.text,
//                                 type: action.payload.type,
//                                 time: action.payload.time
//                             }]
//                         },
//                         answerCount: {$set: action.answerCount},
//                     },
//                 },
//             });
//         case MESSAGE_FIRE:
//             return update(state, {
//                 entries: {
//                     [action.payload.chatId]: {
//                         fire: {$set: true},
//                     },
//                 },
//             });
//         case MESSAGE_UNFIRE:
//             return update(state, {
//                 entries: {
//                     [action.payload.chatId]: {
//                         fire: {$set: false},
//                     },
//                 },
//             });
//         case CHATS_ADD_DIALOG:
//             return update(state, {
//                 entries: {
//                     $push: [
//                         {
//                             id: action.payload.id,
//                             name: action.payload.name,
//                             lastMessage: action.payload.lastMessage,
//                             image: '',
//                             fire: action.payload.fire,
//                             userName: action.payload.userName,
//                             botMessages: action.payload.botMessages,
//                             messages: action.payload.messages,
//                         }
//                     ]
//                 }
//             });
//         case CHATS_DELETE_DIALOG:
//             return update(state, {
//                 entries: {
//                     $set: action.payload,
//                 }
//             });
//         case ADD_FRIEND_LIST_DIALOG:
//             return update(state, {
//                 friends: {
//                     $push: [
//                         {
//                             id: action.payload.id,
//                             name: action.payload.name
//                         }
//                     ]
//                 }
//             });
//         case DELETE_FRIEND_LIST_DIALOG:
//             return update(state, {
//                 friends: {
//                     $set: action.payload.filteredFriends
//                 }
//             });
//         default:
//             return state;
//     }
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
