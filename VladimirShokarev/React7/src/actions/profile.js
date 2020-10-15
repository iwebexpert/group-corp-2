export const PROFILE_INFO = "PROFILE_INFO";

export const PROFILES_LOAD_REQUEST = "PROFILES_LOAD_REQUEST";
export const PROFILES_LOAD_SUCCESS = 'PROFILES_LOAD_SUCCESS';
export const PROFILES_LOAD_FAILURE = 'PROFILES_LOAD_FAILURE';

export const profileInfoAction = () => ({
    type: PROFILE_INFO,
});

////////////////////////////

export const profilesLoadRequestAction = () => ({
    type: PROFILES_LOAD_REQUEST,
});

export const profilesLoadSuccessAction = (data) => ({
    type: PROFILES_LOAD_SUCCESS,
    payload: data,
});

export const profilesLoadFailureAction = (error) => ({
    type: PROFILES_LOAD_FAILURE,
    payload: error,
});

export const profilesLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(profilesLoadRequestAction());
            const result = await fetch('/api/profiles');//////
            dispatch(profilesLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(profilesLoadFailureAction(error));
        }
    }
};