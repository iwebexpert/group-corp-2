export const CHATS_LOAD_REQUEST = 'CHATS_LOAD_REQUEST';
export const CHATS_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS';
export const CHATS_LOAD_FAILURE = 'CHATS_LOAD_FAILURE';

export const CHATS_MESSAGE_SEND = 'CHATS_MESSAGE_SEND';
export const CHATS_ADD_DIALOG = 'CHATS_ADD_DIALOG';
export const DELETE_FRIEND_LIST_DIALOG = 'DELETE_FRIEND_LIST_DIALOG';
export const CHATS_DELETE_DIALOG = 'CHATS_DELETE_DIALOG';
export const SHOW_DELETE_BTNS = 'SHOW_DELETE_BTNS';
export const ADD_FRIEND_LIST_DIALOG = 'ADD_FRIEND_LIST_DIALOG';
export const MESSAGE_UNFIRE = 'MESSAGE_UNFIRE';
export const MESSAGE_FIRE = 'MESSAGE_FIRE';

//LOAD CHATS, MESSAGES, FRIENDS LIST
export const chatsLoadRequestAction = () => ({
    type: CHATS_LOAD_REQUEST,
})
export const chatsLoadSuccessAction = (data, friends) => ({
    type: CHATS_LOAD_SUCCESS,
    payload: data,
    friends: friends,
});
export const chatsLoadFailureAction = (error) => ({
    type: CHATS_LOAD_FAILURE,
    payload: error,
})
export const chatsLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(chatsLoadRequestAction());
            const chats = await fetch('/api/chats?_embed=messages').then(chats => chats.json());
            const friends = await fetch('/api/friends').then(friends => friends.json());

            Promise.all([chats, friends]).then(result => {
                dispatch(chatsLoadSuccessAction(result[0], result[1]));
            }, reason => console.log(reason));

        } catch (error) {
            dispatch(chatsLoadFailureAction(error));
        }
    }
};

//SEND MESSAGE
export const chatsMessageSend = (message, chats, answerCount) => ({
    type: CHATS_MESSAGE_SEND,
    payload: message,
    chats: chats,
    answerCount: answerCount
});
export const chatsMessageSendAction = (message, chats, answerCount) => {
    return async (dispatch) => {
        try {
            const newMsg = await fetch('/api/messages', {
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
                }}).then(result=>console.log(result.json()));
            const changeAnswerCount = await fetch('/api/chats/' + message.chatId, {
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
export const addDialog = (dialog) => ({
    type: CHATS_ADD_DIALOG,
    payload: dialog,
});
export const addDialogAction = (dialog) => {
    return async (dispatch) => {
        let {id, name, lastMessage, fire, answerCount, userName, botMessages, messages} = dialog;
        try {
            const result = await fetch('/api/chats', {
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
export const deleteFriendListDialog = (friendsList, idToDelete) => ({
    type: DELETE_FRIEND_LIST_DIALOG,
    payload: friendsList,
});
export const deleteFriendListDialogAction = (friendsList, idToDelete) => {
    return async (dispatch) => {
        try {
            const result = await fetch('/api/friends/' + idToDelete, {
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
export const showDeleteBtns = (show) => ({
    type: SHOW_DELETE_BTNS,
    payload: show,
});
export const deleteDialog = (dialogs) => ({
    type: CHATS_DELETE_DIALOG,
    payload: dialogs,
});
export const addFriendListDialog = (friendItem) => ({
    type: ADD_FRIEND_LIST_DIALOG,
    payload: friendItem,
});

//FIRE ACTIONS
export const messageFire = (chatId) => ({
    type: MESSAGE_FIRE,
    payload: chatId,
});
export const messageFireAction = (chatId) => {
    return async (dispatch) => {
        try {
            const result = await fetch('/api/chats/' + chatId.chatId, {
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
export const messageUnfire = (chatId) => ({
    type: MESSAGE_UNFIRE,
    payload: chatId,
});
export const messageUnfireAction = (chatId) => {
    return async (dispatch) => {
        try {
            const result = await fetch('/api/chats/' + chatId.chatId, {
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


