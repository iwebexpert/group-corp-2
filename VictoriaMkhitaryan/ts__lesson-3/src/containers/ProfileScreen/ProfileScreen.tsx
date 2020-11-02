import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './ProfileScreen.css';

import { ProfileType } from '../../types/types';

import { Navbar } from '../../component/Navbar/Navbar';
import { Container } from '../../component/Container/Container';
import { Content } from '../../component/Content/Content';
import { ProfileInfo } from '../../component/ProfileInfo/ProfileInfo';
// import { BlockLoading } from 'react-loadingg';

import { AppState } from '../../store/reducers';

import { profilesLoad } from '../../store/profile/actions';

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const profile: ProfileType = useSelector((state: AppState) => state.profile.profiles[0]);  
  const [isLoading, isError] = useSelector((state: AppState) => [state.profile.loading, state.profile.error]);

  useEffect(() => {
    if(profile)
      dispatch(profilesLoad());
  }, []);

  const handleChatsReload = () => {
    dispatch(profilesLoad());
  }

  if(isError) return <div>Error... <button onClick={handleChatsReload}>Обновить чаты</button></div>;
  return(
    <>
      { isLoading && 
          <div className="loader">
            {/* <BlockLoading size="large" /> */}
          </div> }
      <Container>
        <Navbar profile={profile} />
        <Content modifiers="content_theme_user-profile">
          {profile && <ProfileInfo person={profile} />}
        </Content>
      </Container>
    </>
  );
}
