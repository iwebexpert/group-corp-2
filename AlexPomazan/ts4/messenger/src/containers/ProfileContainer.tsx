import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { Profile } from "../components/Profile";
import { AppState } from "../reducers";

export const ProfileContainer: React.FC<{}> = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: AppState) => state.profile.entries);
  const [isLoading, isError] = useSelector((state: AppState) => [
    state.profile.loading,
    state.profile.error,
  ]);

  useEffect((): void => {
    dispatch(profileInfoAction());
  }, [dispatch, profile.firstName]);

  return <Profile profile={profile} isError={isError} isLoading={isLoading} />;
};
