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

    render() {
        const { profile } = this.props;
        return <ProfileCard profile={profile} />
    };
};

function mapStateToProps(state, ownProps) {
    const profile = state.profile.entries;
    return {
        profile
    }
};

function mapDispatchToProps(dispatch) {
    return {
        profileInfoAction: () => dispatch(profileInfoAction()),
    }
};

export const ProfileCardContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileCardContainerClass);