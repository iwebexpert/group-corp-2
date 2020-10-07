import profile  from "../helpers/userProfile";
const initialState = {
  entries: {},
  loading: false,
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE_LOAD':
      return {
        ...state,
        entries: profile,
      };
    default:
      return state;
  }
};
export default profileReducer;
