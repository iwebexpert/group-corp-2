import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Profile } from "../components/Profile";
import { profileLoadAction } from "../actions/profile";

import { AppState } from "../reducers/index";

export const ProfileContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state: AppState) => state.profile.entries);

  const [isLoading, isError] = useSelector((state: AppState) => [
    state.profile.loading,
    state.profile.error,
  ]);

  useEffect((): void => {
    dispatch(profileLoadAction());
  }, [dispatch]);

  return <Profile {...profile} isError={isError} isLoading={isLoading} />;
};
