import React from 'react'
import { connect } from 'react-redux'

import { Profile } from 'components/ProfileTemplate'
import { } from '../actions/chats'

class ProfileContainerClass extends React.Component {
  componentDidMount() {
    this.props.profileLoadAction();
  }

  render() {
    return <Profile info={this.props.info} />
  }
}

function mapStateToProps(state, ownProps) {
  const info = state.chats.entries

  return {
    info
  }
}

function mapDispatchToProps(dispatch) {
  return {
    profileLoadAction: () => dispatch(profileLoadAction())
  }
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass)