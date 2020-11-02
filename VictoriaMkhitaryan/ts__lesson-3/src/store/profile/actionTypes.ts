import * as typesData from '../../types/types';
import { RequestError } from 'redux-api-middleware';

export enum ProfileActionTypes {
  PROFILE_LOAD_REQUEST = 'chats.PROFILE_LOAD_REQUEST',
  PROFILE_LOAD_SUCCESS = 'chats.PROFILE_LOAD_SUCCESS',
  PROFILE_LOAD_FAILURE = 'chats.PROFILE_LOAD_FAILURE',
}

export type profilesLoadRequestAction = {
  type: ProfileActionTypes.PROFILE_LOAD_REQUEST;
};

export type profilesLoadSuccessAction = {
  type: ProfileActionTypes.PROFILE_LOAD_SUCCESS;
  payload: typesData.ProfileType[];
};

export type profilesLoadFailureAction = {
  type: ProfileActionTypes.PROFILE_LOAD_FAILURE;
  payload: RequestError;
};


export type ProfileActions = profilesLoadRequestAction |
                              profilesLoadSuccessAction |
                              profilesLoadFailureAction;