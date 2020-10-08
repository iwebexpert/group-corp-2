import React, { Component } from 'react';
import { connect } from "react-redux";

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import ProfileInfo from '../../component/ProfileInfo/ProfileInfo';
import './ProfileScreen.css';

class ProfileScreen extends Component {
  render() {
    const { profile } = this.props;
    return(
      <>
        <Container>
          <Navbar profile={profile} />
          <Content modifiers="content_theme_user-profile">
            <ProfileInfo person={profile} />
            </Content>
          </Container>
      </>
    );
  }
}

function mapStateToProps(state){
  return {
      profile: state.profile.profiles[0]
  }
}

export default connect(mapStateToProps, null)(ProfileScreen)
