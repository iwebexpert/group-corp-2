import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { Header } from "../components/Header";
import { AppState } from "../reducers";

export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: AppState) => state.profile.entries);
  const [isLoading, isError] = useSelector((state: AppState) => [
    state.profile.loading,
    state.profile.error,
  ]);

  useEffect((): void => {
    if (profile.firstName == null) {
      dispatch(profileInfoAction());
    }
  }, [dispatch, profile.firstName]);

  return <Header isLoading={isLoading} isError={isError} profile={profile} />;
};
