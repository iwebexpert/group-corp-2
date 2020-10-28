import CreateSagaMiddleware from "redux-saga";
import {Action, AnyAction, applyMiddleware, CombinedState, createStore, Middleware, Reducer, Store} from "redux";
import {createRootReducer} from "./Reducers/rootReducer";
import {createBrowserHistory, History} from 'history';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'
import {sagaWatcher} from "./SAGA/sagas";
import { composeWithDevTools } from 'redux-devtools-extension';
import {loggerMiddleware} from "./middlewares/logger";
import {botMiddleware} from "./middlewares/bot";
import {getChatSelectorInfo} from "./middlewares/getChatSelectorInfo";
import {sortChatsMiddleware} from "./middlewares/chatSorter";
import {Persistor, PersistorOptions, PersistState, WebStorage} from "redux-persist/es/types";
import {ICombinedState} from "./rdx";
import {CommonAction} from "./rdxActions";

interface PersistPartial {
    _persist: PersistState;
}
type persistStore_<S = any, A extends Action = AnyAction> = (store: Store<S, A>, persistorOptions?: PersistorOptions | null, callback?: () => any) => Persistor;


export const history: History = createBrowserHistory();
interface IPersistConfig {
    key: string;
    storage: WebStorage;
}
const persistConfig: IPersistConfig = {
    key: 'app',
    storage
};
const sagaMiddleware: ReturnType<typeof CreateSagaMiddleware> = CreateSagaMiddleware();
const middleware: Middleware[] = [sagaMiddleware, routerMiddleware(history), /*loggerMiddleware,*/ botMiddleware,  getChatSelectorInfo, sortChatsMiddleware];
const enhancers = [];
enhancers.push(applyMiddleware(...middleware));
const persistedReducer: Reducer<ICombinedState & PersistPartial, CommonAction> = persistReducer<ICombinedState, CommonAction>(persistConfig, createRootReducer(history));
export const store: Store<ICombinedState, CommonAction> = createStore(persistedReducer, composeWithDevTools(...enhancers));
export const persistor: Persistor = (persistStore as unknown as persistStore_<ICombinedState, CommonAction>)(store);
sagaMiddleware.run(sagaWatcher);





