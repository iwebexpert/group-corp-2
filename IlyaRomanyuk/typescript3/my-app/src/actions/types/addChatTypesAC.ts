import { ChatActionTypes } from './../addChatAC';

// Types for AC
export type addChatACTYPE = {
    type: ChatActionTypes.ADD_NEW_CHAT,
    chat: NavbarListChat
}

export type addMessageACTYPE = {
    type: ChatActionTypes.ADD_NEW_MESSAGE,
    payload: NavbarItemMessage
}

export type isFetchingACTYPE = {
    type: ChatActionTypes.IS_FETCHING,
    bool: boolean
}

export type fireChatACTYPE = {
    type: ChatActionTypes.CHAT_FIRE,
    chatId: number
}

export type unfireChatACTYPE = {
    type: ChatActionTypes.CHAT_UNFIRE,
    chatId: number
}

export type deleteChatACTYPE = {
    type: ChatActionTypes.DELETE_CHAT,
    chatId: number,
}

export type deleteMessageACTYPE = {
    type: ChatActionTypes.DELETE_MESSAGE,
    chatId: number,
    messageId: string
}

export type chatsLoadRequestActionTYPE = {
    type: ChatActionTypes.CHATS_LOAD_REQUEST
}

export type chatsLoadSuccessActionTYPE = {
    type: ChatActionTypes.CHATS_LOAD_SUCCESS,
    payload: Array<NavbarListChat>
}

export type chatsLoadFailureActionTYPE = {
    type: ChatActionTypes.CHATS_LOAD_FAILURE,
    payload: boolean
}