import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { MessengerContainer } from 'containers/MessengerContainer'
import { LeftSiderContainer } from 'containers/LeftSiderContainer'
import { Layout } from 'antd'

import style from './style'

export const Wrap = (props) => {
  return <Layout style={style.mainLayout}>
    <LeftSiderContainer />
    <Switch>
      <Route path='/' component={MessengerContainer} exact />
      <Route path='/chats/:id([0-9])+' component={MessengerContainer} exact />
    </Switch>
  </Layout >
}
