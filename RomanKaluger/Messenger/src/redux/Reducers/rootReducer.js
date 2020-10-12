import {combineReducers} from 'redux';
import {AppReducer} from "./AppReducer";
import {SystemReducer} from "./SystemReducer";
import { connectRouter } from 'connected-react-router'

export const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    app: AppReducer,
    system: SystemReducer
});

