import React from "react";
import { connect } from "react-redux";
import { profileInfoAction, profilesLoadAction } from "../actions/profile";
import { ProfileCard } from "../components/ProfileCard";

class ProfileCardContainerClass extends React.Component {
    componentDidMount() {
        this.props.profilesLoadAction();
    }

    handleProfilesReload = () => {
        this.props.profilesLoadAction();
    }

    render() {
        const { profile, isLoading, isError } = this.props;
        return <ProfileCard profile={profile} isError={isError} isLoading={isLoading}
        handleProfilesReload={this.handleProfilesReload}/>
    }
}

function mapStateToProps(state, ownProps) {
    const profile = state.profile.entries;

    return {
        profile,
        isLoading: state.chats.loading,
        isError: state.chats.error,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        profilesLoadAction: () => dispatch(profilesLoadAction()),
    }
}


export const ProfileCardContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileCardContainerClass);