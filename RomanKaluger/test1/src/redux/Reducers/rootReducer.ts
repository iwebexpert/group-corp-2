import {AnyAction, CombinedState, combineReducers, Reducer} from 'redux';
import {AppReducer} from "./AppReducer";
import {SystemReducer} from "./SystemReducer";
import {connectRouter, LocationChangeAction} from 'connected-react-router'
import {History} from "history";
import {ICombinedState} from "../rdx";
import {CommonAction} from "../rdxActions";

type createRootReducerFuncType = (history: History) => Reducer<ICombinedState, CommonAction>;
export const createRootReducer: createRootReducerFuncType = (history) => combineReducers<ICombinedState, CommonAction>({
    router: connectRouter(history),
    app: AppReducer,
    system: SystemReducer
});

