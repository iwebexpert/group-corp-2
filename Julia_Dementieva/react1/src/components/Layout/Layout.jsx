import React, { Component } from 'react'
import {Header} from '../Header'
import {Messenger} from '../Messenger'
import {ChatsList} from '../ChatsList'

import {Paper} from '@material-ui/core';

import { Route,Switch } from 'react-router-dom';
import {Home} from '../../pages/Home';
import {About} from '../../pages/About';
import {Error} from '../../pages/Error';
import {chats} from '../../helper/chatsData'

import './Layout.css'

export class Layout extends Component {
    state={
        name: "Web",
        age: 28,
        city: "Moscow",
        chatId: '0',
    }
    render() {
        return (<>
            <div className="container">
                <Header person={this.state} />
                <Switch>
                    {/* <Route exact path="/chats/:id([0-9]+)" render={(props) => <Home person={this.state} {...props} />}/> */}
                    <Route exact path="/" render={() => <Home person={this.state} />}></Route>
                    <Route exact path="/About" >
                        <About />
                    </Route>
                    <Route path="*" >
                        <Error />
                    </Route>
                    
                </Switch>
            </div>
            
            
            </>
        )
    }
}
