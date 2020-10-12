import React from "react";
import { connect } from "react-redux";
import { profileUserAction } from "../actions/profile";
import { Profile } from "../pages/Profile/Profile";

class ProfileContainerClass extends React.Component {
  componentDidMount() {
    this.props.profileUserAction();
  }
  render() {
    const { profile } = this.props;
    return <Profile profile={profile} />;
  }
}

function mapStateToProps(state, ownProps) {
  const profile = state.profile.entries;
  return {
    profile,
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
