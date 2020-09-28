import {createStore, combineReducers} from 'redux';
import {MessageReducer} from './MessageReducer';

const reducers = combineReducers({
		messagePage: MessageReducer
});

export const store = createStore(reducers);
