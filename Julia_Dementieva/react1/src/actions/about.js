import {createAction} from 'redux-api-middleware';

export const ABOUT_LOAD_REQUEST = 'ABOUT_LOAD_REQUEST';
export const ABOUT_LOAD_SUCCESS = 'ABOUT_LOAD_SUCCESS';
export const ABOUT_LOAD_FAILURE = 'ABOUT_LOAD_FAILURE';

export const aboutLoadAction = () => createAction({
    endpoint: 'http://localhost:3000/profiles/0',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
        ABOUT_LOAD_REQUEST,
        ABOUT_LOAD_SUCCESS,
        ABOUT_LOAD_FAILURE,
    ],
});
