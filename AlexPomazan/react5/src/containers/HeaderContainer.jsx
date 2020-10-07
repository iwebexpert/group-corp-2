import React from "react";
import { connect } from "react-redux";
import { profileUserAction } from "../actions/profile";
import { Header } from "../components/Header";

class HeaderContainerClass extends React.Component {
  componentDidMount() {
    this.props.profileUserAction();
  }
  render() {
    const { profile } = this.props;
    return <Header profile={profile} />;
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

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainerClass);
