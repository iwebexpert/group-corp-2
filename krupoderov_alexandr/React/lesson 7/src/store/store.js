import {createStore, combineReducers, applyMiddleware} from 'redux';
import {ChatReducer} from './ChatsReducer';
import ProfileReducer from './ProfileReducer';
import {botMiddleWare} from './middlewares/bot';
import { connectRouter } from 'connected-react-router';
import {createBrowserHistory} from 'history';
import { routerMiddleware } from 'connected-react-router'
import {pingMiddleware} from './middlewares/ping';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';

export const history = createBrowserHistory();

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['chats', 'profile']
};

const rootReducer = combineReducers({
		router: connectRouter(history),
		chats: ChatReducer,
		profile: ProfileReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export let store = createStore(persistedReducer, applyMiddleware(routerMiddleware(history), botMiddleWare, pingMiddleware, reduxThunk));
export let persistor = persistStore(store);
