import React, {Component} from "react";
import {connect} from 'react-redux';

import {userInfoLoadAction} from "../actions/user";
import MainInfoContent from '../components/areas/mainInfo/MainInfoContent';
import Avatar from "../components/areas/mainInfo/Avatar";
import Lottie from "react-lottie";
import error from "../assets/lottie/error-404.json"
import loading from "../assets/lottie/loading.json"

class MainInfoContentContainerClass extends Component{
    componentDidMount() {
        this.props.userInfoLoadAction();
    }

    render() {
        const {userInfo, isLoading, isError} = this.props;
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

        if(isError){
            return (
                <Lottie options={errorLottieOptions}
                        height={500}
                        width={500}
                />
            );
        }

        if(isLoading){
            return (
                <Lottie options={loadingLottieOptions}
                        height={350}
                        width={350}
                />
            );
        }

        return (
            <div className="main-info">
                <Avatar />
                <MainInfoContent userInfo={userInfo}/>
            </div>);
    }
}

function mapStateToProps(state, ownProps) {
    const userInfo = state.profile.entries;
    const isLoading = state.profile.loading;
    const isError = state.profile.error;
    return {userInfo, isLoading, isError};
}

function mapDispatchToProps(dispatch){
    return {
        userInfoLoadAction: () => dispatch(userInfoLoadAction()),
    }
}

export const MainInfoContentContainer = connect(mapStateToProps, mapDispatchToProps)(MainInfoContentContainerClass);