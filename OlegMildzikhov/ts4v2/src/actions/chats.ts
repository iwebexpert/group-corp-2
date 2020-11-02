import {RequestError} from 'redux-api-middleware';
import {ActionCreator, Dispatch} from 'redux';

export enum ChatsActionTypes {
    CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
    CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
    CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE',

    CHATS_ADD = 'CHATS_ADD',
    CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND',
}

export type chatsLoadRequestAction = {
    type: ChatsActionTypes.CHATS_LOAD_REQUEST;
};

export type chatsLoadSuccessAction = {
    type: ChatsActionTypes.CHATS_LOAD_SUCCESS;
    payload: any;
};

export type chatsLoadFailureAction = {
    type: ChatsActionTypes.CHATS_LOAD_FAILURE;
    payload: RequestError;
    error: boolean;
};

export type chatsAddAction = {
    type: ChatsActionTypes.CHATS_ADD;
    payload: ChatPayload;
};

export type chatsMessageSendAction = {
    type: ChatsActionTypes.CHATS_MESSAGE_SEND;
    payload: MessagePayload;
};

type ChatPayload = {
    chatId: number;
    title: string;
};

type MessagePayload = MesageType & {
    chatId: number;
};

//Все возможные действия
export type ChatsActions = chatsLoadRequestAction 
| chatsLoadSuccessAction 
| chatsLoadFailureAction 
| chatsAddAction
| chatsMessageSendAction;


export const chatsMessageSendAction: ActionCreator<chatsMessageSendAction> = (message: MessagePayload) => ({
    type: ChatsActionTypes.CHATS_MESSAGE_SEND,
    payload: message,
});

export const chatsAddAction: ActionCreator<chatsAddAction> = (chatId: number, title: string) => ({
    type: ChatsActionTypes.CHATS_ADD,
    payload: {chatId, title},
});

export const chatsLoadRequestAction: ActionCreator<chatsLoadRequestAction> = () => ({
    type: ChatsActionTypes.CHATS_LOAD_REQUEST,
});

export const chatsLoadSuccessAction: ActionCreator<chatsLoadSuccessAction> = (data) => ({
    type: ChatsActionTypes.CHATS_LOAD_SUCCESS,
    payload: data,
});

export const chatsLoadFailureAction: ActionCreator<chatsLoadFailureAction> = (error: RequestError) => ({
    type: ChatsActionTypes.CHATS_LOAD_FAILURE,
    payload: error,
    error: true,
});

export const chatsLoadAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(chatsLoadRequestAction());
            const result = await fetch('http://localhost:4000/chats?_embed=messages');
            dispatch(chatsLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(chatsLoadFailureAction(error));
        }
    }
};