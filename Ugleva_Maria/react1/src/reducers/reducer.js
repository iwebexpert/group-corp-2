import {combineReducers } from 'redux';
import allChatsReducer from './allChatsReducer';
import activeChatReducer from './activeChatReducer';

const reducer = combineReducers({
    allChats: allChatsReducer,
    activeChat: activeChatReducer
});

export default reducer;