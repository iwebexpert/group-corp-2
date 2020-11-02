import { API_URL } from '../../constants/constants';
import { ActionCreator, Reducer } from 'redux';
import { RequestError } from 'redux-api-middleware';
import { AppDispatch } from '../rootReducer';

enum ProfilesActionTypes {
  FETCH_PROFILE_REQUEST = 'profile/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS = 'profile/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE = 'profile/FETCH_PROFILE_FAILURE',
  SET_PROFILE_STICKER = 'profile/SET_PROFILE_STICKER',
}

export type ProfileReducerState = {
  data: null | IProfile;
  sticker: null | string;
  loading: boolean;
  error: boolean;
};

const initialState: ProfileReducerState = {
  data: null,
  sticker: null,
  loading: false,
  error: false,
};

type setProfileStickerAction = {
  type: ProfilesActionTypes.SET_PROFILE_STICKER;
  payload: string;
};

export const setProfileSticker: ActionCreator<setProfileStickerAction> = (
  sticker: string
) => ({
  type: ProfilesActionTypes.SET_PROFILE_STICKER,
  payload: sticker,
});

type fetchProfileRequestAction = {
  type: ProfilesActionTypes.FETCH_PROFILE_REQUEST;
};

export const fetchProfileRequest: ActionCreator<fetchProfileRequestAction> = () => ({
  type: ProfilesActionTypes.FETCH_PROFILE_REQUEST,
});

type fetchProfileSuccessAction = {
  type: ProfilesActionTypes.FETCH_PROFILE_SUCCESS;
  payload: IProfile;
};

export const fetchProfileSuccess: ActionCreator<fetchProfileSuccessAction> = (
  data: IProfile
) => ({
  type: ProfilesActionTypes.FETCH_PROFILE_SUCCESS,
  payload: data,
});

type fetchProfileFailureAction = {
  type: ProfilesActionTypes.FETCH_PROFILE_FAILURE;
  payload: RequestError;
  error: boolean;
};

export const fetchProfileFailure: ActionCreator<fetchProfileFailureAction> = (
  error: RequestError
) => ({
  type: ProfilesActionTypes.FETCH_PROFILE_FAILURE,
  payload: error,
  error: true,
});

export const fetchProfileInfo = (user: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchProfileRequest());
      const result = await fetch(`${API_URL}profiles/${user}`);
      dispatch(fetchProfileSuccess(await result.json()));
    } catch (error) {
      dispatch(fetchProfileFailure(error));
    }
  };
};

type ProfileActions =
  | setProfileStickerAction
  | fetchProfileRequestAction
  | fetchProfileSuccessAction
  | fetchProfileFailureAction;

export const profileReducer: Reducer<ProfileReducerState, ProfileActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ProfilesActionTypes.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case ProfilesActionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case ProfilesActionTypes.FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case ProfilesActionTypes.SET_PROFILE_STICKER:
      return {
        ...state,
        sticker: action.payload,
      };
    default:
      return state;
  }
};
