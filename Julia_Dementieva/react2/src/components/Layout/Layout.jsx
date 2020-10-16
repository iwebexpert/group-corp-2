import React from 'react'

import {MessengerContainer} from '../../containers/MessengerContainer'
import {AboutContainer} from '../../containers/AboutContainer'
import {HeaderContainer} from '../../containers/HeaderContainer'
import {ChatsListContainer} from '../../containers/ChatsListContainer'

import {Paper} from '@material-ui/core';

import { Route,Switch, Redirect } from 'react-router-dom';
import {Error} from '../../pages/Error';

import './Layout.css'

export const Layout = (props) => {

    return (<>
        <div className="container">
            <HeaderContainer />
            <div className="section">
                <Paper elevation={3} style={{width: "30%"}}>
                    <ChatsListContainer />
                </Paper>
                <Paper elevation={3} style={{width: "69%"}}>
                    <Switch>
                        <Route exact path="/chats/:id([0-9]+)" component={MessengerContainer}/>
                        <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
                        <Route exact path="/About" component={AboutContainer}/>
                        <Route path="*" >
                            <Error />
                        </Route>
                    </Switch>
                </Paper>
            </div>
        </div>
        </>
    )
}
