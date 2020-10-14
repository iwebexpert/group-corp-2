import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';

export default (history) => combineReducers({
    router: connectRouter(history),
    chatReducer,
    messageReducer,
});