//DAL
import { profileAPI } from '../dal/api';
import { Dispatch, ActionCreator } from 'redux';

export enum ProfileActionTypes {
    PERSON_LOAD_REQUEST = 'PERSON_LOAD_REQUEST',
    PERSON_LOAD_SUCCESS = 'PERSON_LOAD_SUCCESS',
    PERSON_LOAD_FAILURE = 'PERSON_LOAD_FAILURE',
}

export type personLoadRequestAction = {
    type: ProfileActionTypes.PERSON_LOAD_REQUEST
}

export type personLoadSuccessAction = {
    type: ProfileActionTypes.PERSON_LOAD_SUCCESS,
    payload: Person
}

export type personLoadFailureAction = {
    type: ProfileActionTypes.PERSON_LOAD_FAILURE,
    payload: boolean
}

// All types
export type PersonActions = personLoadRequestAction | personLoadSuccessAction | personLoadFailureAction;

//AC
export const personLoadRequestAction: ActionCreator<personLoadRequestAction> = () => ({ type: ProfileActionTypes.PERSON_LOAD_REQUEST });
export const personLoadSuccessAction: ActionCreator<personLoadSuccessAction> = (data: Person) => ({ type: ProfileActionTypes.PERSON_LOAD_SUCCESS, payload: data });
export const personLoadFailureAction: ActionCreator<personLoadFailureAction> = (error: boolean) => ({ type: ProfileActionTypes.PERSON_LOAD_FAILURE, payload: error });

//TC
export const personLoadTC = () => async (dispatch: Dispatch) => {
    try {
        dispatch(personLoadRequestAction());
        const result = await profileAPI.getProfile();
        dispatch(personLoadSuccessAction(result.data));
    } catch (error) {
        dispatch(personLoadFailureAction(error));
    }
};