import axios from "axios";
export const setProfileError = (payload) => ({
  type: "SET_PROFILE_ERROR",
  payload,
});
export const setProfileLoading = (payload) => ({
  type: "SET_PROFILE_LOADING",
  payload,
});
export const fetchProfile = () => (dispatch) => {
  dispatch(setProfileLoading(true));
  dispatch(setProfileError(false));
  axios
    .get("http://localhost:3001/profile")
    .then(({ data }) => {
      dispatch(setProfile(data));
      dispatch(setProfileLoading(false));
    })
    .catch(() => {
      dispatch(setProfileError(true));
    });
};
export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: profile,
});
