import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { ProfileCard } from "../components/ProfileCard";

export const ProfileCardContainer = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.entries);
    const [isLoading, isError] = useSelector((state) => [state.profile.loading, state.profile.error]);

    useEffect(() => {
        if (profile.name == null) {
            dispatch(profileInfoAction());
        }
    }, []);

    const handleProfileReload = () => {
        dispatch(profileInfoAction());
    };
    return <ProfileCard profile={profile} isError={isError} isLoading={isLoading} handleProfileReload={handleProfileReload} />
};

