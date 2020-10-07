import React, {Component} from "react";
import {connect} from 'react-redux';

import {userInfoLoadAction} from "../actions/user";
import MainInfoContent from '../components/areas/mainInfo/MainInfoContent';

class MainInfoContentContainerClass extends Component{
    render() {
        let userInfo = this.props.userInfo;
        return (<MainInfoContent userInfo={userInfo}/>);
    }
}

function mapStateToProps(state, ownProps) {
    const userInfo = state.profile.entries;
    return {userInfo};
}

function mapDispatchToProps(dispatch){
    return {
        userInfoLoadAction: () => dispatch(userInfoLoadAction()),
    }
}

export const MainInfoContentContainer = connect(mapStateToProps, mapDispatchToProps)(MainInfoContentContainerClass);