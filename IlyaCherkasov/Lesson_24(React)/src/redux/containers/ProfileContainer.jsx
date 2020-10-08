import React from 'react';
import { useSelector } from 'react-redux';

import Profile from '../../pages/Profile/Profile';

const ProfileContainer = () => {
  const profile = useSelector((state) => state.profile.profileEntries);

  return <Profile profile={profile} />;
};

export default ProfileContainer;
