export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATSLISTS_SEND = 'CHATSLISTS_SEND';
export const MESSAGE_UNFIRE = 'MESSAGE_UNFIRE';
export const MESSAGE_FIRE = 'MESSAGE_FIRE';

export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
});

export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});

export const chatsListSendAction = (chat) => ({
    type: CHATSLISTS_SEND,
    payload: chat,
});

export const messageFireAction = (chatId) => ({
    type: MESSAGE_FIRE,
    payload: chatId,
});

export const messageUnfireAction = (chatId) => ({
    type: MESSAGE_UNFIRE,
    payload: chatId,
});
