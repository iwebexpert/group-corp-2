import {createAction} from 'redux-actions';
import {Dispatch} from 'redux';

export const profileRequestAction = createAction('[Profile] Request');
export const profileSuccessAction = createAction('[Profile] Success');
export const profileFailureAction = createAction('[Profile] Failure');

export const profileLoadAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(profileRequestAction());
            const result = await fetch('http://localhost:4000/profiles/0');
            dispatch(profileSuccessAction(await result.json()));
        } catch (error) {
            dispatch(profileFailureAction(error));
        }
    }
};