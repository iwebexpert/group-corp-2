import React from "react";
import { connect } from "react-redux";
import { profileInfoAction } from "../actions/profile";
import { ProfileCard } from "../components/ProfileCard";

class ProfileCardContainerClass extends React.Component {
    componentDidMount() {
        if (this.props.profile.name === undefined) {
            this.props.profileInfoAction();
        }
    };
    handleProfileReload = () => {
        this.props.profileInfoAction();
    };

    render() {
        const { profile, isError, isLoading, handleProfileReload } = this.props;
        return <ProfileCard profile={profile} isError={isError} isLoading={isLoading} handleProfileReload={this.handleProfileReload} />
    };
};



function mapStateToProps(state, ownProps) {
    const profile = state.profile.entries;
    return {
        profile,
        isLoading: state.profile.loading,
        isError: state.profile.error,
    }
};

function mapDispatchToProps(dispatch) {
    return {
        profileInfoAction: () => dispatch(profileInfoAction()),
    }
};

export const ProfileCardContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileCardContainerClass);