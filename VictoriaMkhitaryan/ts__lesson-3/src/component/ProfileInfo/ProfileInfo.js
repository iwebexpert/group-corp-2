import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar';

import './ProfileInfo.css';

import { useRouteMatch, Link } from "react-router-dom";

export default function ProfileInfo(props) {
  return (
    <Card className="profile__card">
      <CardContent className="profile__content">
        <Avatar className="profile__avatar" src="https://sun9-28.userapi.com/1Q5flJTbLsSbAnuUSrkW71BHBwNbc-v7yN4Kmw/7N2suGQ0XNQ.jpg" />
        <div>
          <h2>Логин: {props.person.name}</h2>
          <h2>Пол: {props.person.gender ? '♀' : '♂'}</h2>
          <h2>Возраст: {props.person.age}</h2>
          <h2>Город: {props.person.city}</h2>
        </div>
      </CardContent>
    </Card>
  );
}