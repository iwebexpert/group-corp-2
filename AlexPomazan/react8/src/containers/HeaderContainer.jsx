import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { push } from "connected-react-router";
import { initStore } from "../store";

import { Header } from "../components/Header";

export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.entries);
  const [isLoading, isError] = useSelector((state) => [state.profile.loading, state.profile.error]);

  useEffect(() => {
    if (profile.firstName == undefined) {
      dispatch(profileInfoAction());
    }

  }, []);

  return <Header isLoading={isLoading} isError={isError} profile={profile} />;
}