import {createAction, RequestError} from 'redux-api-middleware';

export enum AboutActionTypes {
    ABOUT_LOAD_REQUEST = 'ABOUT_LOAD_REQUEST',
    ABOUT_LOAD_SUCCESS = 'ABOUT_LOAD_SUCCESS',
    ABOUT_LOAD_FAILURE = 'ABOUT_LOAD_FAILURE',
};

export type aboutLoadRequestAction = {
    type: AboutActionTypes.ABOUT_LOAD_REQUEST;
};

export type aboutLoadSuccessAction = {
    type: AboutActionTypes.ABOUT_LOAD_SUCCESS;
    payload: any;
};

export type aboutLoadFailureAction = {
    type: AboutActionTypes.ABOUT_LOAD_FAILURE;
    payload: RequestError;
    error: boolean;
};

export type AboutActions = 
aboutLoadRequestAction
| aboutLoadSuccessAction
| aboutLoadFailureAction;


export const aboutLoadAction = () => createAction({
    endpoint: 'http://localhost:4000/profiles/0',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
        AboutActionTypes.ABOUT_LOAD_REQUEST,
        AboutActionTypes.ABOUT_LOAD_SUCCESS,
        AboutActionTypes.ABOUT_LOAD_FAILURE,
    ],
});
