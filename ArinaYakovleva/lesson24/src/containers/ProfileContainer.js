import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Profile} from '../components/Profile';
import {profileLoadActions} from '../actions/profile';

class ProfileContainerClass extends Component {
    componentDidMount(){
        this.props.profileLoadActions();
    }

    render(){
        const {profile} = this.props;
        return(
            <Profile profile={profile}/>
        );

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        profileLoadActions: () => dispatch(profileLoadActions()),
    }
}

const mapStateToProps = (state) => {
    const profile = state.profile.entries;
    return {
        profile,
    };
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass);