import React, { Component } from 'react'
import {Header} from '../Header'
import {Messenger} from '../Messenger'
import {ChatsList} from '../ChatsList'

import {Paper} from '@material-ui/core';

import { Route,Switch, Redirect  } from 'react-router-dom';
import {About} from '../../pages/About';
import {Error} from '../../pages/Error';

import './Layout.css'

export class Layout extends Component {
    constructor(props){
        super(props);
        this.style = 
        {
            width: '100%',
            marginTop: '25px',
            display: 'flex',
            justifyContent: 'space-between',
            height: '500px',
        }
    }

    state={
        name: "Web",
        age: 28,
        city: "Москва",
        chatId: '0',
        avatar: 'https://images.squarespace-cdn.com/content/v1/55c8e052e4b01bd89f02a45e/1452208562614-J8AFSSTSMN3DJ6Q798XX/ke17ZwdGBToddI8pDm48kE7xzgWkeVHhMSpwGz7q3y4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2du1iGr6rVFVouDCrC-EYDz_rjS4LofYkqCp0pRSzPi5Jm7cT0R_dexc_UL_zbpz6JQ/image-asset.jpeg?format=1000w'
    }

    render() {
        return (<>
            <div className="container">
                <Header person={this.state} />
                <div style={this.style}>
                    <Paper elevation={3} style={{width: "30%"}}>
                        <ChatsList chatId={this.state.chatId}/>
                    </Paper>
                    <Paper elevation={3} style={{width: "69%"}}>
                        <Switch>
                            <Route exact path="/chats/:id([0-9]+)" render={(props) => <Messenger person={this.state} chatId={(props.match.params.id)} />} />
                            <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
                            <Route exact path="/About" render={() => (<About person={this.state}/>)}>
                                <Route exact path="/About/chats/:id([0-9]+)" render={(props) => <Messenger person={this.state} chatId={(props.match.params.id)} />} />
                            </Route>
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
}
