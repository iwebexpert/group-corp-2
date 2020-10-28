import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { ProfileCard } from "../components/ProfileCard";

export const ProfileCardContainer = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.entries);
    const [isLoading, isError] = useSelector((state) => [state.profile.loading, state.profile.error]);

    const handleProfileReload = () => {
        dispatch(profileInfoAction());
    };
    return <ProfileCard profile={profile} isError={isError} isLoading={isLoading} handleProfileReload={handleProfileReload} />
};
