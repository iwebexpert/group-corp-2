import React from "react";
import { connect } from "react-redux";

import { Header } from "../components/Header";
import { profileLoadAction } from "../actions/profile";

class HeaderContainerClass extends React.Component {
  componentDidMount() {
    this.props.profileLoadAction();
  }

  reloadProfile = () => {
    this.props.profileLoadAction();
  };

  render() {
    const { classheader, profile, isLoading, isError } = this.props;
    return (
      <Header
        classheader={classheader}
        profile={profile}
        isLoading={isLoading}
        isError={isError}
        reloadProfile={this.reloadProfile}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const profile = state.profile.entries;
  const { classheader } = ownProps;
  return {
    profile,
    classheader,
    isLoading: state.profile.loading,
    isError: state.profile.error,
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
