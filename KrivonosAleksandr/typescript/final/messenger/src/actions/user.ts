import {RequestError} from 'redux-api-middleware';
import {ActionCreator, Dispatch} from 'redux';

export enum UserActionTypes{
    USER_INFO_LOAD_REQUEST = 'CHATS_LOAD_REQUEST',
    USER_INFO_LOAD_SUCCESS = 'CHATS_LOAD_SUCCESS',
    USER_INFO_LOAD_FAILURE = 'CHATS_LOAD_FAILURE'
}

export type userInfoLoadRequestType = {
    type: UserActionTypes.USER_INFO_LOAD_REQUEST;
};
export type userInfoLoadSuccessType = {
    type: UserActionTypes.USER_INFO_LOAD_SUCCESS,
    payload: profilePayload,
};
export type userInfoLoadFailureType = {
    type: UserActionTypes.USER_INFO_LOAD_FAILURE;
    payload: RequestError;
    error: boolean;
};

export type ProfileActions = userInfoLoadRequestType | userInfoLoadSuccessType | userInfoLoadFailureType;

export const userInfoLoadRequestAction: ActionCreator<userInfoLoadRequestType> = () => ({
    type: UserActionTypes.USER_INFO_LOAD_REQUEST,
})

export const userInfoLoadSuccessAction: ActionCreator<userInfoLoadSuccessType> = (data: profilePayload) => ({
    type: UserActionTypes.USER_INFO_LOAD_SUCCESS,
    payload: data,
})

export const userInfoLoadFailureAction: ActionCreator<userInfoLoadFailureType> = (error: RequestError) => ({
    type: UserActionTypes.USER_INFO_LOAD_FAILURE,
    payload: error,
    error: true
})

//fetch
export const userInfoLoadAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(userInfoLoadRequestAction());
            const result = await fetch('http://localhost:4000/profile/0');
            dispatch(userInfoLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(userInfoLoadFailureAction(error));
        }
    }
};
