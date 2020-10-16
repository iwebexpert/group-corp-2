import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {chatsReducer} from './chats';
import {aboutReducer} from './about';
import {robotReducer} from './robot';

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    chats: chatsReducer,
    about: aboutReducer, 
    robot: robotReducer,
});