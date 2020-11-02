import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Profile } from "../pages/Profile";
import { profileLoadAction } from "../actions/profile";
import { AppState } from "../reducers";

export const ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [infoProfile, loadStatus] = useSelector((state: AppState) => {
    return [state.profile.entries, state.profile.loadStatus];
  });

  useEffect(() => {
    if (!infoProfile) dispatch(profileLoadAction());
  }, []);

  return <Profile infoProfile={infoProfile} loadStatus={loadStatus} />;
};
