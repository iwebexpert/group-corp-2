import actionTypes from "../actionTypes";
export const sortChatsMiddleware = store => next => action => {
    if(action.type === actionTypes.SET_CHATS){
       const chats = action.payload;
       chats.sort((a,b) => a.lastMessage && a.lastMessage.dateSend >  b.lastMessage && b.lastMessage.dateSend ? 1 : -1);
    }
    return next(action);
};
