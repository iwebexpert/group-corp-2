import {ActionCreator, Dispatch} from 'redux'

export type profilesLoadRequestAction = {
    type: string;
}

export type profilesLoadSuccessAction = {
    type: string;
    payload: any;
}

export type profilesLoadFailureAction = {
    type: string;
    payload: any;
    error: boolean;
}

export type ProfileActions = profilesLoadRequestAction | profilesLoadSuccessAction | profilesLoadFailureAction

export const profilesLoadRequestAction: ActionCreator<profilesLoadRequestAction> = () => ({
    type: 'PROFILES_LOAD_REQUEST',
})

export const profilesLoadSuccessAction: ActionCreator<profilesLoadSuccessAction> = (data) => ({
    type: 'PROFILES_LOAD_SUCCESS',
    payload: data,
})

export const profilesLoadFailureAction: ActionCreator<profilesLoadFailureAction> = (error: any) => ({
    type: 'PROFILES_LOAD_FAILURE',
    payload: error,
    error: true,
})

export const profilesLoadAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(profilesLoadRequestAction());
            const result = await fetch('http://localhost:4000/profiles');
            dispatch(profilesLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(profilesLoadFailureAction(error));
        }
    }
}
