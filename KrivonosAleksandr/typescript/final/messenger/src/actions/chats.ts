import {RequestError} from 'redux-api-middleware';
import {ThunkAction} from 'redux-thunk';
import {ActionCreator, Dispatch} from 'redux';
import {AppState} from "../reducers";

export enum ChatsActionTypes{
    CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
        CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
        CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE',

        CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND',
        CHATS_ADD_DIALOG = 'CHATS_ADD_DIALOG',
        DELETE_FRIEND_LIST_DIALOG = 'DELETE_FRIEND_LIST_DIALOG',
        CHATS_DELETE_DIALOG = 'CHATS_DELETE_DIALOG',
        SHOW_DELETE_BTNS = 'SHOW_DELETE_BTNS',
        ADD_FRIEND_LIST_DIALOG = 'ADD_FRIEND_LIST_DIALOG',
        MESSAGE_UNFIRE = 'MESSAGE_UNFIRE',
        MESSAGE_FIRE = 'MESSAGE_FIRE'
}

export type chatsLoadRequest = {
    type: ChatsActionTypes.CHATS_LOAD_REQUEST;
};
export type chatsLoadSuccess = {
    type: ChatsActionTypes.CHATS_LOAD_SUCCESS;
    payload: any;
    friends: any;
};
export type chatsLoadFailure = {
    type: ChatsActionTypes.CHATS_LOAD_FAILURE;
    payload: RequestError;
    error: boolean;
};

export type chatsMessageSendType = {
    type: ChatsActionTypes.CHATS_MESSAGE_SEND;
    payload: messagePayload;
    chats: chatsPayload;
    answerCount: number;
};

export type addDialogType = {
    type: ChatsActionTypes.CHATS_ADD_DIALOG;
    payload: chatsPayload;
};
export type deleteFriendListDialogType = {
    type: ChatsActionTypes.DELETE_FRIEND_LIST_DIALOG;
    payload: friendsPayload[];
};

export type showDeleteBtnsType = {
    type: ChatsActionTypes.SHOW_DELETE_BTNS;
    payload: boolean;
};
export type deleteDialogType = {
    type: ChatsActionTypes.CHATS_DELETE_DIALOG;
    payload: chatsPayload;
};
export type addFriendListDialogType = {
    type: ChatsActionTypes.ADD_FRIEND_LIST_DIALOG;
    payload: friendsPayload;
};

export type messageFireType = {
    type: ChatsActionTypes.MESSAGE_FIRE;
    payload: chatIdPayload;
};
export type messageUnfireType = {
    type: ChatsActionTypes.MESSAGE_UNFIRE;
    payload: chatIdPayload;
};

export type ChatsActions = chatsLoadRequest
    | chatsLoadSuccess
    | chatsLoadFailure
    | chatsMessageSendType
    | addDialogType
    | deleteFriendListDialogType
    | showDeleteBtnsType
    | deleteDialogType
    | addFriendListDialogType
    | messageFireType
    | messageUnfireType

//LOAD CHATS, MESSAGES, FRIENDS LIST
export const chatsLoadRequestAction: ActionCreator<chatsLoadRequest> = () => ({
    type: ChatsActionTypes.CHATS_LOAD_REQUEST,
})
export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccess> = (data: chatsPayload[], friends: friendsPayload[]) => ({
    type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
    payload: data,
    friends: friends,
});
export const chatsLoadFailureAction: ActionCreator<chatsLoadFailure> = (error: RequestError) => ({
    type: ChatsActionTypes.CHATS_LOAD_FAILURE,
    payload: error,
    error: true
})
export const chatsLoadAction = (): ThunkAction<void, AppState, void, ChatsActions> => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(chatsLoadRequestAction());
            const chats = await fetch('http://localhost:4000/chats?_embed=messages').then(chats => chats.json());
            const friends = await fetch('http://localhost:4000/friends').then(friends => friends.json());


            Promise.all([chats, friends]).then(result => {
                dispatch(chatsLoadSuccessAction(result[0], result[1]));
            }, reason => console.log(reason));

        } catch (error) {
            dispatch(chatsLoadFailureAction(error));
        }
    }
};

//SEND MESSAGE
export const chatsMessageSend: ActionCreator<chatsMessageSendType> = (message: any, chats: chatsPayload, answerCount: number) => ({
    type: ChatsActionTypes.CHATS_MESSAGE_SEND,
    payload: message,
    chats: chats,
    answerCount: answerCount
});
export const chatsMessageSendAction = (message: any, chats: chatsPayload[], answerCount: number): ThunkAction<void, AppState, void, ChatsActions> => {
    return async (dispatch: Dispatch) => {
        try {
            const newMsg = await fetch('http://localhost:4000/messages', {
                method: 'POST',
                body: JSON.stringify({
                    text: message.text,
                    type: message.type,
                    time: message.time,
                    id: message.id,
                    chatId: message.chatId,
                }),
                headers: {
                    'Content-type': 'application/json',
                }}).then();
            const changeAnswerCount = await fetch('http://localhost:4000/chats/' + message.chatId, {
                method: 'PATCH',
                body: JSON.stringify({
                    answerCount: answerCount
                }),
                headers: {
                    'Content-type': 'application/json',
                }});

            Promise.all([newMsg, changeAnswerCount]).then((result) => {
                dispatch(chatsMessageSend(message, chats, answerCount));
            },reason => console.log(reason));
        } catch (error) {

        }
    }
};

//ADD DIALOG ACTIONS
export const addDialog: ActionCreator<addDialogType> = (dialog: chatsPayload) => ({
    type: ChatsActionTypes.CHATS_ADD_DIALOG,
    payload: dialog,
});
export const addDialogAction = (dialog: chatsPayload): ThunkAction<void, AppState, void, ChatsActions> => {
    return async (dispatch: Dispatch) => {
        let {id, name, lastMessage, fire, answerCount, userName, botMessages, messages} = dialog;
        try {
            await fetch('http://localhost:4000/chats', {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    name: name,
                    lastMessage: lastMessage,
                    fire: fire,
                    answerCount: answerCount,
                    userName: userName,
                    botMessages: botMessages,
                    messages: messages
                }),
                headers: {
                    'Content-type': 'application/json',
                }});
            dispatch(addDialog(dialog));
        } catch (error) {

        }
    }
};

export const deleteFriendListDialog: ActionCreator<deleteFriendListDialogType> = (filteredFriends: friendsPayload[]) => ({
    type: ChatsActionTypes.DELETE_FRIEND_LIST_DIALOG,
    payload: filteredFriends,
});
export const deleteFriendListDialogAction = (friendsList: [], idToDelete: number): ThunkAction<void, AppState, void, ChatsActions> => {
    return async (dispatch: Dispatch) => {
        try {
            await fetch('http://localhost:4000/friends/' + idToDelete, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                }});
            dispatch(deleteFriendListDialog(friendsList));
        } catch (error) {

        }
    }
};

//DELETE DIALOGS ACTIONS
export const showDeleteBtns: ActionCreator<showDeleteBtnsType> = (show: boolean) => ({
    type: ChatsActionTypes.SHOW_DELETE_BTNS,
    payload: show,
});
export const deleteDialog: ActionCreator<deleteDialogType> = (dialogs: chatsPayload) => ({
    type: ChatsActionTypes.CHATS_DELETE_DIALOG,
    payload: dialogs,
});
export const addFriendListDialog: ActionCreator<addFriendListDialogType> = (friendItem: friendsPayload) => ({
    type: ChatsActionTypes.ADD_FRIEND_LIST_DIALOG,
    payload: friendItem,
});

//FIRE ACTIONS
export const messageFire: ActionCreator<messageFireType> = (chatId: chatIdPayload) => ({
    type: ChatsActionTypes.MESSAGE_FIRE,
    payload: chatId,
});
export const messageFireAction = (chatId: chatIdPayload): ThunkAction<void, AppState, void, ChatsActions> => {
    return async (dispatch: Dispatch) => {
        try {
            await fetch('http://localhost:4000/chats/' + chatId.chatId, {
                method: 'PATCH',
                body: JSON.stringify({
                    fire: true
                }),
                headers: {
                    'Content-type': 'application/json',
                }});
            dispatch(messageFire(chatId));
        } catch (error) {

        }
    }
};

//UNFIRE ACTIONS
export const messageUnfire: ActionCreator<messageUnfireType> = (chatId: chatIdPayload) => ({
    type: ChatsActionTypes.MESSAGE_UNFIRE,
    payload: chatId,
});
export const messageUnfireAction = (chatId: chatIdPayload): ThunkAction<void, AppState, void, ChatsActions> => {
    return async (dispatch: Dispatch) => {
        try {
            await fetch('http://localhost:4000/chats/' + chatId.chatId, {
                method: 'PATCH',
                body: JSON.stringify({
                    fire: true
                }),
                headers: {
                    'Content-type': 'application/json',
                }});
            dispatch(messageUnfire(chatId));
        } catch (error) {

        }
    }
};