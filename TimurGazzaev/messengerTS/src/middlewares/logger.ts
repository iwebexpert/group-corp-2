import {Middleware, MiddlewareAPI, Dispatch, Action} from 'redux'

export function loggerMiddware(store: MiddlewareAPI){
    return function wrapDispatch(next: Dispatch){
        return function dispatchAction(action: Action){
            console.group('---loggerMiddware---');
            console.log('Action', action);
            console.log('Store (before)', store.getState());
            const result = next(action);
            console.log('Store (after)', store.getState());
            console.log('Result', result);
            console.groupEnd();
            return result;
        }
    }
}
