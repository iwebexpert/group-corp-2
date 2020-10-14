import React from "react";
import { connect } from "react-redux";

import { Profile } from "../pages/Profile";
import { profileLoadAction } from "../actions/profile";

class ProfileContainerClass extends React.Component {
  componentDidMount() {
    if (!this.props.profile) {
      this.props.profileLoadAction();
    }
  }

  render() {
    const { profile, isLoading, isError } = this.props;
    return (
      <Profile profile={profile} isLoading={isLoading} isError={isError} />
    );
  }
}

const mapStateToProps = (state) => {
  const profile = state.profile.entries;
  return {
    profile,
    isLoading: state.profile.loading,
    isError: state.profile.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profileLoadAction: () => dispatch(profileLoadAction()),
  };
};

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainerClass);
