import {combineReducers } from 'redux';
import allChatsReducer from './allChatsReducer';
import activeChatReducer from './activeChatReducer';
import profileReducer from './profileReducer';

const reducer = combineReducers({
    allChats: allChatsReducer,
    activeChat: activeChatReducer,
    profile: profileReducer
});

export default reducer;