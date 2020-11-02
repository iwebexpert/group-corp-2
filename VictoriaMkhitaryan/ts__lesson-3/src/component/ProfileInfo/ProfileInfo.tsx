import React from 'react';

import { ProfileType } from '../../types/types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar';

import './ProfileInfo.css';

type ProfileInfoType = {
  person: ProfileType;
};

export const ProfileInfo: React.FC<ProfileInfoType> = ({ person }) => {
  return (
    <Card className="profile__card">
      <CardContent className="profile__content">
        <Avatar className="profile__avatar" src="https://sun9-28.userapi.com/1Q5flJTbLsSbAnuUSrkW71BHBwNbc-v7yN4Kmw/7N2suGQ0XNQ.jpg" />
        <div>
          <h2>Логин: {person.name}</h2>
          <h2>Пол: {person.gender ? '♀' : '♂'}</h2>
          <h2>Возраст: {person.age}</h2>
          <h2>Город: {person.city}</h2>
        </div>
      </CardContent>
    </Card>
  );
}