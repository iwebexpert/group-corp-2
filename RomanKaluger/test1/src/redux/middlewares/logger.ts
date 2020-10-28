import {AnyAction, Dispatch, Middleware, MiddlewareAPI} from "redux";
import {ICombinedState} from "../rdx";
import {CommonAction} from "../rdxActions";

export const loggerMiddleware: Middleware = (store: MiddlewareAPI<Dispatch<AnyAction>, ICombinedState>) => (next: Dispatch) => (action: CommonAction) => {
    console.group('---loggerMiddware---');
    console.log('Action', action);
    console.log('Store (before)', store.getState());
    const result = next(action);
    console.log('Store (after)', store.getState());
    console.log('Result', result);
    console.groupEnd();
    return result;
};
