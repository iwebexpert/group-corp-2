import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Profile } from "../pages/Profile";
import { profileLoadAction } from "../actions/profile";

export const ProfileContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) {
      dispatch(profileLoadAction());
    }
  }, []);

  const profile = useSelector((state) => state.profile.entries);
  const [isLoading, isError] = useSelector((state) => [
    state.profile.loading,
    state.profile.error,
  ]);

  return <Profile profile={profile} isLoading={isLoading} isError={isError} />;
};
