import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { ProfileCard } from "../components/ProfileCard";
import {AppState} from '../reducers';

export const ProfileCardContainer: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: AppState) => state.profile.entries);
    const [isLoading, isError] = useSelector((state: AppState) => [state.profile.loading, state.profile.error]);

    const handleProfilesReload = (): void => {
        dispatch(profileInfoAction());
    };
    return <ProfileCard profile={profile} isError={isError} isLoading={isLoading} handleProfilesReload={handleProfilesReload} />
};
