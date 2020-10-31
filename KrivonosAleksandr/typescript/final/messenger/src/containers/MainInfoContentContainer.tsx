import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';

import {userInfoLoadAction} from "../actions/user";
import MainInfoContent from '../components/areas/mainInfo/MainInfoContent';
import Avatar from "../components/areas/mainInfo/Avatar";
import Lottie from "react-lottie";
import error from "../assets/lottie/error-404.json"
import loading from "../assets/lottie/loading.json"
import {AppState} from "../reducers";

export const MainInfoContentContainer: React.FC = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: AppState) => state.profile.entries);
    const [isLoading, isError] = useSelector((state: AppState) => [state.profile.loading, state.profile.error]);

    useEffect(() => {
        dispatch(userInfoLoadAction());
    }, []);

    const errorLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const loadingLottieOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    if (isError) {
        return (
            <Lottie options={errorLottieOptions}
                    height={500}
                    width={500}
            />
        );
    }

    if (isLoading) {
        return (
            <Lottie options={loadingLottieOptions}
                    height={350}
                    width={350}
            />
        );
    }

    return (
        <div className="main-info">
            <Avatar/>
            <MainInfoContent userInfo={userInfo}/>
        </div>
    );

}