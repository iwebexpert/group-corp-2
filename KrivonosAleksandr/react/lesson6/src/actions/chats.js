export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATS_ADD_DIALOG = 'CHATS_ADD_DIALOG';
export const DELETE_FRIEND_LIST_DIALOG = 'DELETE_FRIEND_LIST_DIALOG';
export const CHATS_DELETE_DIALOG = 'CHATS_DELETE_DIALOG';
export const SHOW_DELETE_BTNS = 'SHOW_DELETE_BTNS';
export const ADD_FRIEND_LIST_DIALOG = 'ADD_FRIEND_LIST_DIALOG';
export const MESSAGE_UNFIRE = 'MESSAGE_UNFIRE';
export const MESSAGE_FIRE = 'MESSAGE_FIRE';

export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
});

export const chatsMessageSendAction = (message, chats, answerCount) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
    chats: chats,
    answerCount: answerCount
});

export const addDialog = (dialog) => ({
    type: CHATS_ADD_DIALOG,
    payload: dialog,
});

export const deleteFriendListDialog = (friendsList, idToDelete) => ({
    type: DELETE_FRIEND_LIST_DIALOG,
    payload: friendsList,
});

export const deleteDialog = (dialogs) => ({
    type: CHATS_DELETE_DIALOG,
    payload: dialogs,
});

export const showDeleteBtns = (show) => ({
    type: SHOW_DELETE_BTNS,
    payload: show,
});

export const addFriendListDialog = (friendItem) => ({
    type: ADD_FRIEND_LIST_DIALOG,
    payload: friendItem,
});

export const messageFireAction = (chatId) => ({
    type: MESSAGE_FIRE,
    payload: chatId,
});

export const messageUnfireAction = (chatId) => ({
    type: MESSAGE_UNFIRE,
    payload: chatId,
});
