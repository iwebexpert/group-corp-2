export const CHATS_LOAD = "CHATS_LOAD";
export const CHATS_MESSAGE_SEND = "CHATS_MESSAGE_SEND";
export const ADD_CHAT = "ADD_CHAT";
export const CHAT_FIRE = "CHAT_FIRE";
export const CHAT_UNFIRE = "CHAT_UNFIRE";
export const DELETE_CHAT = "DELETE_CHAT";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

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

export const deleteChatAction = (chat) => ({
    type: DELETE_CHAT,
    payload: chat,
});

export const deleteMessageAction = (id) => ({
    type: DELETE_MESSAGE,
    payload: id,
});

export const chatFireAction = (id) => ({
    type: CHAT_FIRE,
    payload: id,
});

export const chatUnfireAction = (id) => ({
    type: CHAT_UNFIRE,
    payload: id,
});
