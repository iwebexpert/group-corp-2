import React, { Component } from "react";
import { connect } from "react-redux";
import { nanoid } from "nanoid";
import { Profile } from "../components/Profile";
import { profileLoadAction } from "../actions/profile";

class ProfileContainerClass extends Component {
  componentDidMount() {
    this.props.profileLoadAction();
  }

  render() {
    const { name, age, job, github } = this.props;
    return <Profile name={name} age={age} job={job} github={github} />;
  }
};

function mapStateToProps(state, ownProps) {
  const user = state.profile.entries;
  const { match } = ownProps;

  let name = null;
  let age = null;
  let job = null;
  let github = null;

  if (match && user[0]) {
    name = user[0].name;
    age = user[0].age;
    job = user[0].job;
    github = user[0].github;
  };

  return {
    name,
    age,
    job,
    github,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    profileLoadAction: () => dispatch(profileLoadAction()),
  };
};

export const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainerClass);
