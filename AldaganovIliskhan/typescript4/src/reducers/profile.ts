import { Reducer } from 'redux';
import { ProfileActionsTypes , ProfileActions} from '../actions/profile';
export type ProfileReducerState = {
  profileData : null,
  isProfileError : boolean,
  isProfileLoadig : boolean
};
const initialState = {
  profileData: null,
  isProfileError: false,
  isProfileLoadig: false,
};

export const profile : Reducer<ProfileReducerState, ProfileActions>  = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActionsTypes.SET_PROFILE:
      return {
        ...state,
        profileData: action.payload,
      };
    case ProfileActionsTypes.SET_PROFILE_ERROR:
      return {
        ...state,
        isProfileError: action.payload,
      };
    case ProfileActionsTypes.SET_PROFILE_LOADING:
      return {
        ...state,
        isProfileLoading: action.payload,
      };
    default:
      return state;
  }
};
