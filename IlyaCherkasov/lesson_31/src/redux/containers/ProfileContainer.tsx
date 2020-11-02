import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Profile from '../../pages/Profile/Profile';
import { profileLoadAction, profilePostAction } from '../actions/profileActions';

import { DefaultProfileRootState } from '../../types'

const ProfileContainer: React.FC<{}> = () => {
  const [author, setAuthor] = useState('');
  const [age, setAge] = useState('');

  const profile = useSelector((state: DefaultProfileRootState) => state.profile.profileEntries);
  const isProfileError = useSelector((state: DefaultProfileRootState) => state.profile.error);
  const isProfileLoading = useSelector((state: DefaultProfileRootState) => state.profile.loading);
  const dispatch = useDispatch();

  const submitProfile = (): void => {
    if (age === '' && author === '') {
      alert('Вы оставили пустые формы');
      return;
    }
    if (/^[0-9]+$/.test(age) === true) {
      dispatch(profilePostAction({
        author: author,
        age: age,
      }));
      setAuthor('');
      setAge('');
      return;
    } else {
      alert('Введите корректный возраст');
    }
  };

  const handlerProfileRepeat = (): void => {
    dispatch(profileLoadAction());
  }

  if (isProfileLoading) {
    return <Profile isLoading={true} />
  }

  if (isProfileError) {
    return <Profile isError={true} handlerProfileRepeat={handlerProfileRepeat} />
  }

  return (
    <Profile
      author={author}
      setAuthor={setAuthor}
      age={age}
      setAge={setAge}
      submitProfile={submitProfile}
      profile={profile}
      isError={false}
    />
  )
};

export default ProfileContainer;
