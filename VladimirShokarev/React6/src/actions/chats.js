export const CHATS_LOAD = "CHATS_LOAD";
export const CHATS_MESSAGE_SEND = "CHATS_MESSAGE_SEND";
export const ADD_CHAT = "ADD_CHAT";
export const CHAT_FIRE = "CHAT_FIRE";
export const CHAT_UNFIRE = "CHAT_UNFIRE";

export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
});

export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});

export const addChatAction = (chat) => ({
    type: ADD_CHAT,
    payload: chat,
});

export const chatFireAction = (id) => ({
    type: CHAT_FIRE,
    payload: id,
});

export const chatUnfireAction = (id) => ({
    type: CHAT_UNFIRE,
    payload: id,
});

