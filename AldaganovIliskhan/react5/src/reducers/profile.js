const initialState = {
  profileData: null,
};
export const profile = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profileData: action.payload,
      };
    default:
      return state;
  }
};
