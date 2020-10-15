import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileScreen.css';

import Navbar from '../../component/Navbar/Navbar';
import Container from '../../component/Container/Container';
import Content from '../../component/Content/Content';
import ProfileInfo from '../../component/ProfileInfo/ProfileInfo';
import Loader from '../../component/Loader/Loader';

import { profilesLoad } from '../../store/profile/actions';

class ProfileScreen extends Component {
  componentDidMount() {
    if(!this.props.profile)
      this.props.profilesLoad();
  }
  render() {
    const { profile, isError, isLoading } = this.props;

    if (isError) {
      return(<div>Error... <button onClick={this.handleChatsReload}>Обновить чаты</button></div>);
    } else if (isLoading) {
      return(<Loader isLoading={isLoading} />);
    }
    return(
      <>
        <Container>
          <Navbar profile={profile} />
          <Content modifiers="content_theme_user-profile">
            {profile && <ProfileInfo person={profile} />}
          </Content>
          </Container>
      </>
    );
  }
}

function mapStateToProps(state){
  return {
    isError: state.chats.error,
    isLoading: state.chats.loading,
    profile: state.profile.profiles[0],
  }
}

function mapDispatchToProps(dispatch){
  return {
    profilesLoad: () => dispatch(profilesLoad()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
