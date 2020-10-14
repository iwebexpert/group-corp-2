export const profilesLoadRequestAction = () => ({
    type: 'PROFILES_LOAD_REQUEST',
})

export const profilesLoadSuccessAction = (data) => ({
    type: 'PROFILES_LOAD_SUCCESS',
    payload: data,
})

export const profilesLoadFailureAction = (error) => ({
    type: 'PROFILES_LOAD_FAILURE',
    payload: error,
})

export const profilesLoadAction = () => {
    return async (dispatch) => {
        try {
            dispatch(profilesLoadRequestAction());
            const result = await fetch('/api/profiles');
            dispatch(profilesLoadSuccessAction(await result.json()));
        } catch (error) {
            dispatch(profilesLoadFailureAction(error));
        }
    }
}
