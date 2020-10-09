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
    const { profile } = this.props;
    return <Profile profile={profile} />;
  }
}

const mapStateToProps = (state) => {
  const profile = state.profile.entries;
  return {
    profile,
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
