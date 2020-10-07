import {combineReducers} from 'redux';
import {AppReducer} from "./AppReducer";
import {SystemReducer} from "./SystemReducer";

export const rootReducer = combineReducers({
        app: AppReducer,
        system: SystemReducer
    }
);
