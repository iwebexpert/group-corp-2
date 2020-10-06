import React from "react";
import { connect } from "react-redux";

import { Header } from "../components/Header";
import { profileLoadAction } from "../actions/profile";

class HeaderContainerClass extends React.Component {
  componentDidMount() {
    this.props.profileLoadAction();
  }

  render() {
    const { classheader, profile } = this.props;
    return <Header classheader={classheader} profile={profile} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const profile = state.profile.entries;
  const { classheader } = ownProps;
  return {
    profile,
    classheader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    profileLoadAction: () => dispatch(profileLoadAction()),
  };
};

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainerClass);
