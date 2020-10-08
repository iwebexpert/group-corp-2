import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '../Button/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import EditIcon from '@material-ui/icons/Edit';

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
        {/* <Box display="flex"
            alignItems='flex-start'
            justifyContent="space-between"
        >
          <Box p={2}>
            {props.avatar ? <Avatar className="profile-info__avatar" src={"data:image/png;base64," + `${props.avatar}`} /> : <AccountCircleOutlinedIcon className="profile-info__avatar"/>}
            <Typography component="div">
              <Box fontSize='h5.fontSize' m={1} textAlign="center">
                {props.firstname}
              </Box>
              <Box fontSize='h5.fontSize' textAlign="center">
                {props.lastname}
              </Box>
            </Typography>
          </Box>  
          <Box flexGrow={2}>
            <Typography component="div">
              <Box fontSize={18} m={1}>
                {props.username}
              </Box>
              <Box fontSize={18} m={1}>
                Пол:  {props.gender ? '♀' : '♂'}
              </Box>
              <Box fontSize={18} m={1}>
                Город: {props.city}
              </Box>
              <Box fontSize={18} m={1}>
                Дата рождения: {props.date}
              </Box>
              <Box fontSize={18} m={1}>
                Любимые жанры: {props.genre}
              </Box>
              <Box fontSize={18} m={1}>
                Любимые игры: {props.game}
              </Box>
            </Typography>
          </Box>
          {button}
        </Box> */}

      </CardContent>
    </Card>
  );
}