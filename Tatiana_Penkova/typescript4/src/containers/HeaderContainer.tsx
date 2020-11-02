import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { Header } from "../components/Header";
import { DefaultRootState } from "../types";

export const HeaderContainer: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: DefaultRootState) => state.profile.entries);
    const [isLoading, isError] = useSelector((state: DefaultRootState) => [state.profile.loading, state.profile.error]);

    useEffect((): void => {
        if (profile.name == null) {
            dispatch(profileInfoAction());
        }
    }, [dispatch, profile.name]);

    return <Header isLoading={isLoading} isError={isError} profile={profile} />
};

