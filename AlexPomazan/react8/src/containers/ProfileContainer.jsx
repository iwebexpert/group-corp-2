import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { Profile } from "components/Profile";

export const ProfileContainer = (props) => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.entries);
  const [isLoading, isError] = useSelector((state) => [state.profile.loading, state.profile.error]);

  useEffect(() => {
    if (profile.firstName === null) {
        dispatch(profileInfoAction());
    }
}, []);
  return <Profile 
      profile= {profile}
      isError={isError} 
      isLoading={isLoading} 
       />;
};