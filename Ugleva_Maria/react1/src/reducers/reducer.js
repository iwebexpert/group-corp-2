import {combineReducers } from 'redux';
import allChatsReducer from './allChatsReducer';
import activeChatReducer from './activeChatReducer';
import profileReducer from './profileReducer';
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    allChats: allChatsReducer,
    activeChat: activeChatReducer,
    profile: profileReducer
});

export default createRootReducer;