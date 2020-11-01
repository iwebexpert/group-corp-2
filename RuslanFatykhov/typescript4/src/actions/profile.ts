import { RequestError } from "redux-api-middleware";
import { ActionCreator, Dispatch } from "redux";

//TYPES
export enum ProfileActionTypes {
  PROFILE_LOAD_REQUEST = "PROFILE_LOAD_REQUEST",
  PROFILE_LOAD_SUCCESS = "PROFILE_LOAD_SUCCESS",
  PROFILE_LOAD_FAILURE = "PROFILE_LOAD_FAILURE",
}

export type profileLoadRequest = {
  type: ProfileActionTypes.PROFILE_LOAD_REQUEST;
};

type ProfilePayload = {
  name: string;
  age: number;
  job: string;
  github: string;
  isError: boolean;
  isLoading: boolean;
};

export type profileLoadSuccess = {
  type: ProfileActionTypes.PROFILE_LOAD_SUCCESS;
  payload: ProfilePayload;
};

export type profileLoadFailure = {
  type: ProfileActionTypes.PROFILE_LOAD_FAILURE;
  payload: RequestError;
  error: boolean;
};

//Все возможные действия
export type ProfileActions =
  | profileLoadRequest
  | profileLoadSuccess
  | profileLoadFailure;

//ACTIONS

export const profileLoadRequestAction: ActionCreator<profileLoadRequest> = () => ({
  type: ProfileActionTypes.PROFILE_LOAD_REQUEST,
});

export const profileLoadSuccessAction: ActionCreator<profileLoadSuccess> = (
  data
) => ({
  type: ProfileActionTypes.PROFILE_LOAD_SUCCESS,
  payload: data,
});

export const profileLoadFailureAction: ActionCreator<profileLoadFailure> = (
  error: RequestError
) => ({
  type: ProfileActionTypes.PROFILE_LOAD_FAILURE,
  payload: error,
  error: true,
});

export const profileLoadAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(profileLoadRequestAction());
      const result = await fetch("http://localhost:4000/profile/0");
      dispatch(profileLoadSuccessAction(await result.json()));
    } catch (error) {
      dispatch(profileLoadFailureAction(error));
    }
  };
};
