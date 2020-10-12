import React, { useState } from 'react'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { MessengerContainer } from 'containers/MessengerContainer'
import { LeftSiderContainer } from 'containers/LeftSiderContainer'
import { Layout, Typography, Menu, Button, Modal, Input } from 'antd'

import style from './style'

export const Wrap = (props) => {
  return <Layout style={style.mainLayout}>
    <LeftSiderContainer />
    <Switch>
      <Route exact path="/"><Redirect to="/chats/0" /></Route>
      <Route path='/chats/:id([0-9])+' component={MessengerContainer} exact />
    </Switch>
  </Layout >
}
