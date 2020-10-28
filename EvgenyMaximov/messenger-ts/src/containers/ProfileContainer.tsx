import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Profile } from "../pages/Profile";
import { profileLoadAction } from "../actions/profile";

export type ProfileType = {
		firstName: string,
		secondName: string,
		nickName: string,
		age: number,
}

export type ProfilePropsType = {
	profile: ProfileType,
	isLoading: boolean,
	isError: boolean,
}

export const ProfileContainer:React.FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) {
      dispatch(profileLoadAction());
    }
  }, []);

  const profile:ProfileType = useSelector((state:any) => state.profile.entries);
 
  const [isLoading, isError]:boolean[] = useSelector((state:any) => [
    state.profile.loading,
    state.profile.error,
  ]);

  return <Profile profile={profile} isLoading={isLoading} isError={isError} />;
};
