import { createProfileInfo } from '../../utils/utils';

const SET_PROFILE_INFO = 'profile/SET_PROFILE_INFO',
  SET_PROFILE_STICKER = 'prpfile/SET_PROFILE_STICKER';

const initialState = {
  data: null,
  sticker: null
};

const setProfileInfo = (data) => ({
  type: SET_PROFILE_INFO,
  data
});

const setProfileSticker = (sticker) => ({
  type: SET_PROFILE_STICKER,
  sticker
});

const fetchProfileInfo = (rawProfileInfo) => {
  return async (dispatch) => {
    const rawAccount = await createProfileInfo(rawProfileInfo);
    if (rawAccount) {
      dispatch(setProfileInfo(rawAccount));
    }
  }
};

const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PROFILE_INFO:
      return {
        ...state,
        data: action.data
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
export { fetchProfileInfo, setProfileSticker };