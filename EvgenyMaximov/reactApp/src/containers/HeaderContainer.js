import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../components/Header";
import { profileLoadAction } from "../actions/profile";

export const HeaderContainer = ({ classheader }) => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.entries);
  const [isLoading, isError] = useSelector((state) => [
    state.profile.loading,
    state.profile.error,
  ]);

  useEffect(() => {
    if (profile) {
      dispatch(profileLoadAction());
    }
  }, []);

  const reloadProfile = () => {
    dispatch(profileLoadAction());
  };

  return (
    <Header
      classheader={classheader}
      profile={profile}
      isLoading={isLoading}
      isError={isError}
      reloadProfile={reloadProfile}
    />
  );
};
