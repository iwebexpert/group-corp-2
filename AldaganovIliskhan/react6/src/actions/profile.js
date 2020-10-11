import axios from "axios";
export const fetchProfile = () => (dispatch) => {
  axios.get("http://localhost:3001/profile").then(({ data }) => {
    dispatch(setProfile(data));
  });
};
export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: profile,
});
