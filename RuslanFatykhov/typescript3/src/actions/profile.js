import { createAction } from "redux-actions";

export const profileRequestAction = createAction("PROFILE_LOAD_REQUEST");
export const profileSuccessAction = createAction("PROFILE_LOAD_SUCCESS");
export const profileFailureAction = createAction("PROFILE_LOAD_FAILURE");

export const profileLoadAction = () => {
  return async (dispatch) => {
    try {
      dispatch(profileRequestAction());
      const result = await fetch("http://localhost:4000/profile/0");
      dispatch(profileSuccessAction(await result.json()));
    } catch (error) {
      dispatch(profileFailureAction(error));
    }
  };
};
