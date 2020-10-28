import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { ProfileCard } from "../components/ProfileCard";
import { DefaultRootState } from "../types";

export const ProfileCardContainer: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: DefaultRootState) => state.profile.entries);
    const [isLoading, isError] = useSelector((state: DefaultRootState) => [state.profile.loading, state.profile.error]);

    useEffect((): void => {
        if (profile.name == null) {
            dispatch(profileInfoAction());
        }
    }, [dispatch, profile.name]);

    const handleProfileReload = (): void => {
        dispatch(profileInfoAction());
    };
    return <ProfileCard profile={profile} isError={isError} isLoading={isLoading} handleProfileReload={handleProfileReload} />
};

