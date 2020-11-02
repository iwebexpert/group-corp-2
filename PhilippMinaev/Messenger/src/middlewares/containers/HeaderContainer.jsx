import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileLoadAction } from "../actions/profile";
import { Header } from "../components/Header";

export const HeaderContainer = () => {
  const dispatch = useDispatch();
  const [infoProfile, loadStatus] = useSelector((state) => [
    state.profile.entries,
    state.profile.loadStatus,
  ]);
  useEffect(() => {
    if (loadStatus == null) {
      dispatch(profileLoadAction());
    }
  });

  return <Header infoProfile={infoProfile} loadStatus={loadStatus} push />;
};
