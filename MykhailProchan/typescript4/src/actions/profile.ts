import { ActionCreator, Dispatch } from "redux"

export enum ProfileActionTypes {
  PROFILE_LOAD_REQUEST = 'PROFILE_LOAD_REQUEST',
  PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS',
  PROFILE_LOAD_FAILURE = 'PROFILE_LOAD_FAILURE'
}


export type ProfileActions = profileLoadRequestAction
  | profileLoadSuccessAction
  | profileLoadFailureAction

type Profile = {
  id: number
  name: string
  email: string
}

export type profileLoadRequestAction = {
  type: ProfileActionTypes.PROFILE_LOAD_REQUEST,
}

export type profileLoadSuccessAction = {
  type: ProfileActionTypes.PROFILE_LOAD_SUCCESS,
  payload: Profile,
}

export type profileLoadFailureAction = {
  type: ProfileActionTypes.PROFILE_LOAD_FAILURE,
  payload: boolean,
}


export const profileLoadRequestAction: ActionCreator<profileLoadRequestAction> = () => ({
  type: ProfileActionTypes.PROFILE_LOAD_REQUEST,
})

export const profileLoadSuccessAction: ActionCreator<profileLoadSuccessAction> = (data: Profile) => ({
  type: ProfileActionTypes.PROFILE_LOAD_SUCCESS,
  payload: data,
})

export const profileLoadFailureAction: ActionCreator<profileLoadFailureAction> = (error: boolean) => ({
  type: ProfileActionTypes.PROFILE_LOAD_FAILURE,
  payload: error,
})

export const profileLoadAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(profileLoadRequestAction());
      const result = await fetch('http://localhost:4000/profiles/0');
      dispatch(profileLoadSuccessAction(await result.json()));
    } catch (error) {
      dispatch(profileLoadFailureAction(error));
    }
  }
}