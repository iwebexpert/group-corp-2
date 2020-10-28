import React, { useEffect } from "react";
import { profileInfoAction } from "../actions/profile";
import { Header } from "../components/Header";
import { push } from "connected-react-router";
import { useSelector, useDispatch } from 'react-redux';

export const HeaderContainer = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.entries);
    const [isLoading, isError] = useSelector((state) => [state.profile.loading, state.profile.error]);

    useEffect(() => {
        if (profile.name == null) {
            dispatch(profileInfoAction());
        }

    }, []);

    const handleClick = (e) => {
        dispatch(push("/about"));
    };

    return <Header isLoading={isLoading} isError={isError} profile={profile} handleClick={handleClick} />
};