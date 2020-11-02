import * as types from './actionTypes';
import * as typesData from '../../types/types';
import { ActionCreator, Dispatch } from 'redux';
import { RequestError } from 'redux-api-middleware';

export const profilesLoadRequestAction: ActionCreator<types.profilesLoadRequestAction> = () => ({
  type: types.ProfileActionTypes.PROFILE_LOAD_REQUEST,
})

export const profilesLoadSuccessAction: ActionCreator<types.profilesLoadSuccessAction> = (data: typesData.ProfileType[]) => ({
  type: types.ProfileActionTypes.PROFILE_LOAD_SUCCESS,
  payload: data,
})

export const profilesLoadFailureAction: ActionCreator<types.profilesLoadFailureAction> = (error: RequestError) => ({
  type: types.ProfileActionTypes.PROFILE_LOAD_FAILURE,
  payload: error,
})

export const profilesLoad = () => {
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