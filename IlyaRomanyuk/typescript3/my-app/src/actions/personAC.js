//DAL
import { profileAPI } from '../dal/api';

//Constants
export const PERSON_LOAD_REQUEST = 'PERSON_LOAD_REQUEST';
export const PERSON_LOAD_SUCCESS = 'PERSON_LOAD_SUCCESS';
export const PERSON_LOAD_FAILURE = 'PERSON_LOAD_FAILURE';

//AC
export const personLoadRequestAction = () => ({ type: PERSON_LOAD_REQUEST });
export const personLoadSuccessAction = (data) => ({ type: PERSON_LOAD_SUCCESS, payload: data });
export const personLoadFailureAction = (error) => ({ type: PERSON_LOAD_FAILURE, payload: error });


//TC
export const personLoadTC = () => async (dispatch) => {
    try {
        dispatch(personLoadRequestAction());
        const result = await profileAPI.getProfile();
        dispatch(personLoadSuccessAction(result.data));
    } catch (error) {
        dispatch(personLoadFailureAction(error));
    }
};