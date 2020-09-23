import CreateSagaMiddleware from "redux-saga";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./Reducers/rootReducer";
import {sagaWatcher} from "./SAGA/sagas";

const saga=CreateSagaMiddleware();
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();//process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null;
export const store = createStore(rootReducer, compose(
    applyMiddleware(
        saga,
    )
    //, devTools
));

saga.run(sagaWatcher);

