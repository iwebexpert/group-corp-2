import { API_URL } from '../../constants/constants';

const FETCH_PROFILE_REQUEST = 'profile/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS = 'profile/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE = 'profile/FETCH_PROFILE_FAILURE',
  SET_PROFILE_STICKER = 'prpfile/SET_PROFILE_STICKER';

const initialState = {
  data: null,
  sticker: null,
  loading: false,
  error: false
};

export const setProfileSticker = (sticker) => ({
  type: SET_PROFILE_STICKER,
  sticker
});

export const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

export const fetchProfileSuccess = (data) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: data
});

export const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error
});

export const fetchProfileInfo = (user) => {
  return async (dispatch) => {
    try {
      dispatch(fetchProfileRequest());
      const result = await fetch(`${API_URL}profiles/${user}`);
      dispatch(fetchProfileSuccess(await result.json()));
    } catch (error) {
      dispatch(fetchProfileFailure(error));
    }
  }
};

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      }
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      }
    case SET_PROFILE_STICKER:
      return {
        ...state,
        sticker: action.sticker
      }
    default:
      return state;    
  }
};

export default profileReducer;