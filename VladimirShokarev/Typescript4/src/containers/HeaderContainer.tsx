import React, { useEffect } from "react";
import { profileInfoAction } from "../actions/profile";
import { Header } from "../components/Header";
import { useSelector, useDispatch } from 'react-redux';
import {AppState} from '../reducers';

export const HeaderContainer = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state: AppState) => state.profile.entries);
    const [isLoading, isError] = useSelector((state: AppState) => [state.profile.loading, state.profile.error]);

    useEffect(() => {
        if (profile.name == null) {
            dispatch(profileInfoAction());
        }

    }, []);

    return <Header />
};