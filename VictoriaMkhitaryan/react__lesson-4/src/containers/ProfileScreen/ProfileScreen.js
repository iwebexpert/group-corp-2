import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import ProfileInfo from '../../component/ProfileInfo/ProfileInfo';
import './ProfileScreen.css';

export default class ProfileScreen extends Component {
  render() {
    return(
      <>
        <Container>
          <Navbar />
          <Content modifiers="content_theme_user-profile">
            <ProfileInfo person={this.props.person} />
            </Content>
          </Container>
      </>
    );
  }
}