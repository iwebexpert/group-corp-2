import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Profile } from "../pages/Profile";
import { profileLoadAction } from "../actions/profile";
import { AppState } from "../reducers/index";


export const ProfileContainer:React.FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) {
      dispatch(profileLoadAction());
    }
  }, []);

  const profile:ProfileType = useSelector((state:AppState) => state.profile.entries);
 
  const [isLoading, isError] = useSelector((state:AppState) => [
    state.profile.loading,
    state.profile.error,
  ]);

  return <Profile profile={profile} isLoading={isLoading} isError={isError} />;
};
