import React from 'react'
import { connect } from 'react-redux'
import { Profile } from 'components/ProfileTemplate'

import { profileLoadAction } from '../actions/profile'

class ProfileContainerClass extends React.Component {
  componentDidMount() {
    this.props.profileLoadAction()
  }

  render() {
    return <Profile
      info={this.props.info}
      error={this.props.error}
      isLoading={this.props.isLoading}
    />
  }
}

function mapStateToProps(state, ownProps) {
  return {
    info: state.profile.entries,
    isLoading: state.chats.loading,
    error: state.chats.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    profileLoadAction: () => dispatch(profileLoadAction())
  }
}

export const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainerClass) 