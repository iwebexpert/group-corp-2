import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileLoadAction } from "../actions/profile";
import { Header } from "../components/Header";
import { AppState } from "../reducers";

export const HeaderContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [infoProfile, loadStatus] = useSelector((state: AppState) => [
    state.profile.entries,
    state.profile.loadStatus,
  ]);
  useEffect(() => {
    dispatch(profileLoadAction());
  }, []);

  return <Header infoProfile={infoProfile} loadStatus={loadStatus} />;
};
