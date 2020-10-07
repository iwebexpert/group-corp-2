export const CHATS_LOAD = 'CHATS_LOAD';
export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATS_ADD_DIALOG = 'CHATS_ADD_DIALOG';
export const DELETE_FRIEND_LIST_DIALOG = 'DELETE_FRIEND_LIST_DIALOG';

export const chatsLoadAction = () => ({
    type: CHATS_LOAD,
});

export const chatsMessageSendAction = (message) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
});

export const addDialog = (dialog) => ({
    type: CHATS_ADD_DIALOG,
    payload: dialog,
});

export const deleteFriendListDialog = (friendsList, idToDelete) => ({
    type: DELETE_FRIEND_LIST_DIALOG,
    payload: friendsList,
});

