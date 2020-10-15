import React from "react";
import { connect } from "react-redux";

import { Profile } from "../pages/Profile";

import { mapStateToProps } from "../mapForConnect/mapStateToProps";
import { mapDispatchToProps } from "../mapForConnect/mapDispatchToProps";

class ProfileContainerClass extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.profileLoadAction();
  }

  render() {
    return <Profile {...this.props} />;
  }
}

export const ProfileContainer = connect(
  mapStateToProps("ProfileContainer"),
  mapDispatchToProps("ProfileContainer")
)(ProfileContainerClass);
