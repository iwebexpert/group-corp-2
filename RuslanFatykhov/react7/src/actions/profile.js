import { createAction } from "redux-api-middleware";

export const PROFILE_LOAD_REQUEST = "PROFILE_LOAD_REQUEST";
export const PROFILE_LOAD_SUCCESS = "PROFILE_LOAD_SUCCESS";
export const PROFILE_LOAD_FAILURE = "PROFILE_LOAD_FAILURE";

export const profileLoadRequestAction = () => ({
  type: PROFILE_LOAD_REQUEST,
});

export const profileLoadSuccessAction = (data) => ({
  type: PROFILE_LOAD_SUCCESS,
  payload: data,
});

export const profileLoadFailureAction = (error) => ({
  type: PROFILE_LOAD_FAILURE,
  payload: error,
});

export const PROFILE_LOAD = "PROFILE_LOAD";

export const profileLoadAction = () => {
  return async (dispatch) => {
    try {
      dispatch(profileLoadRequestAction());
      const profile = await fetch("http://localhost:3000/profile/0");

      dispatch(profileLoadSuccessAction(await profile.json()));
    } catch (error) {
      dispatch(profileLoadFailureAction(error));
    };
  };
};
