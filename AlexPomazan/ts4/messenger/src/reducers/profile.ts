import { Reducer } from "redux";
import { ProfileActionTypes } from "../actions/profile";

type ProfileType = {
  id: number;
  img: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  gender: string;
};

export type ActionProfileType = {
  type: string;
  payload: ProfileType;
};

export type InitailProfileStateType = {
  entries: any;
  loading: boolean;
  error: boolean;
};

const initialState: InitailProfileStateType = {
  entries: {},
  loading: false,
  error: false,
};

export const profileReducer: Reducer<
  InitailProfileStateType,
  ActionProfileType
> = (state = initialState, action) => {
  switch (action.type) {
    case ProfileActionTypes.PROFILE_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case ProfileActionTypes.PROFILE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };
    case ProfileActionTypes.PROFILE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
