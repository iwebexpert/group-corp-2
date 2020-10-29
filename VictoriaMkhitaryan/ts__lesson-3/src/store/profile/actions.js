import * as types from './actionTypes';

export const profilesLoadRequestAction = () => ({
  type: types.PROFILE_LOAD_REQUEST,
})

export const profilesLoadSuccessAction = (data) => ({
  type: types.PROFILE_LOAD_SUCCESS,
  payload: data,
})

export const profilesLoadFailureAction = (error) => ({
  type: types.PROFILE_LOAD_FAILURE,
  payload: error,
})

export const profilesLoad = () => {
  return async (dispatch) => {
      try {
          dispatch(profilesLoadRequestAction());
          const result = await fetch('http://localhost:4000/profiles');
          dispatch(profilesLoadSuccessAction(await result.json()));
      } catch (error) {
          dispatch(profilesLoadFailureAction(error));
      }
  }
}