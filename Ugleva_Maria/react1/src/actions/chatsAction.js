export const addChatsToState = (data) => ({
    type: 'ADD_CHATS_TO_STATE',
    data: data
});
export const addNewMessageToChat = (data, id) => ({
    type: 'ADD_MESSAGE_TO_CHAT',
    data: data,
    id: id
});
export const addNewChat = (data) => ({
    type: 'ADD_NEW_CHAT',
    data: data
})