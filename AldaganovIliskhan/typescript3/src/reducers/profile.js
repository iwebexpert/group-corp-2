const initialState = {
  profileData: null,
  isProfileError: false,
  isProfileLoadig: false,
};
export const profile = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profileData: action.payload,
      };
    case "SET_PROFILE_ERROR":
      return {
        ...state,
        isProfileError: action.payload,
      };
    case "SET_PROFILE_LOADING":
      return {
        ...state,
        isProfileLoading: action.payload,
      };
    default:
      return state;
  }
};
