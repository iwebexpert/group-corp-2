import React from "react";
import { connect } from "react-redux";
import { ProfileSimple } from "../components/ProfileSimple";
import { profileLoadAction } from "../actions/profile";

class ProfileContainerClass extends React.Component {
  componentDidMount() {
    this.props.profileLoadAction();
  };

  render() {
    const { name, age } = this.props;
    return <ProfileSimple name={name} age={age}/>;
  };
};

function mapStateToProps(state, ownProps) {
  const user = state.profile.entries;
  const { match } = ownProps;
  let name = '';
  let age = '';
  if (match && user) {
    name = user.name;
    age = user.age;
  };
  return {name, age};
};

function mapDispatchToProps(dispatch) {
  return {
    profileLoadAction: () => dispatch(profileLoadAction()),
  };
};

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass);