import React, { Component } from 'react'
import {Header} from '../Header'
import {Messenger} from '../Messenger'
import {ChatsList} from '../ChatsList'

import {Paper} from '@material-ui/core';

import { Route,Switch, Redirect  } from 'react-router-dom';
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
        avatar: 'https://lh3.googleusercontent.com/proxy/8hQqiCgfTJu53B_hZGovmYp8fxvNpMKvDXxojR9Mjls7URhmwHWofnzGkl3AhV1vQ40VySpyFAtzbKiVXgpKvaZfK1pkrSiJq4qcoF--gYieCTwxOcJJ255iRXAEuB3NQNgGCb3g3aN4tlBfFcfOYObmcp855ueCjtvfipBhKT0LkmhQIe6vbVf3guTuyomuIi9h6P3LqeFNxmtueOP87v5AS_DS96w4e0pgjOT4cbYIkYnQIHa9x4A6H6KLsV_JDxV1R0xRE_QaE2DzZMHIo3SoMvyW7tjRgYLRgxQos0xr451Io_qv6v9ndM6p39KrVJJwVmYeb3VDAjV47zIzI8sitcbBRR8-VFz4Y1g4cUjC'
    }

    render() {
        return (<>
            <div className="container">
                <Header person={this.state} />
                <Switch>
                    {/* <Route exact path="/chats/:id([0-9]+)" render={(props) => <Home person={this.state} {...props} />}/> */}
                    <Route exact path="/chats/:id([0-9]+)" render={(props) => <Home person={this.state} chatId={Number(props.match.params.id)} />} />
                    <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
                    <Route exact path="/About" >
                        <About person={this.state}/>
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
