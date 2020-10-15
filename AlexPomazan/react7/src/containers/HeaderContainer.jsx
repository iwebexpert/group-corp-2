import React from "react";
import { connect } from "react-redux";
import { profileUserAction } from "../actions/profile";
import { push } from "connected-react-router";
import { initStore } from "../store";

import { Header } from "../components/Header";

class HeaderContainerClass extends React.Component {
  componentDidMount() {
    if (this.props.profile.firstName === undefined) {
      this.props.profileUserAction();
    }
  }

  render() {
    const { profile, isError, isLoading } = this.props;
    return <Header isLoading={isLoading} isError={isError} profile={profile} />;
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

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainerClass);
