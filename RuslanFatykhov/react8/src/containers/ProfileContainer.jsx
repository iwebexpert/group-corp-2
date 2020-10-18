import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Profile } from "../components/Profile";
import { profileLoadAction } from "../actions/profile";

export const ProfileContainer = (props) => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.entries);
  const [isLoading, isError] = useSelector((state) => [
    state.profile.loading,
    state.profile.error,
  ]);

  useEffect(() => {
    dispatch(profileLoadAction());
  }, []);

  return <Profile {...profile} isError={isError} isLoading={isLoading} />;
};
