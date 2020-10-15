import React from "react";
import { connect } from "react-redux";
import { profileUserAction } from "../actions/profile";
import { Profile } from "../pages/Profile/Profile";

class ProfileContainerClass extends React.Component {
  componentDidMount() {
    if (this.props.profile.name === undefined) {
      this.props.profileUserAction();
    }
  }

  handleProfileReload = () => {
    this.props.profileUserAction();
  };

  render() {
    const { profile, isError, isLoading, handleProfileReload } = this.props;
    return (
      <Profile
        profile={profile}
        isError={isError}
        isLoading={isLoading}
        handleProfileReload={this.handleProfileReload}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const profile = state.profile.entries;
  return {
    profile,
    isLoading: state.profile.loading,
    isError: state.profile.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    profileUserAction: () => dispatch(profileUserAction()),
  };
}

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainerClass);
