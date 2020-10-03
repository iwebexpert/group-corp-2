import React, { Component } from 'react'
import {Header} from '../Header'
import {Messenger} from '../Messenger'
import {ChatsList} from '../ChatsList'

import {Paper} from '@material-ui/core';

import { Route,Switch, Redirect, Link  } from 'react-router-dom';
import {About} from '../../pages/About';
import {Error} from '../../pages/Error';

import { nanoid } from 'nanoid';

import { chats } from '../../helper/chatsData';
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
        chats,
        person:{
            name: "Web",
            age: 28,
            city: "Москва",
            mainChat: 'Тестовый чат',
            avatar: 'https://images.squarespace-cdn.com/content/v1/55c8e052e4b01bd89f02a45e/1452208562614-J8AFSSTSMN3DJ6Q798XX/ke17ZwdGBToddI8pDm48kE7xzgWkeVHhMSpwGz7q3y4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYy7Mythp_T-mtop-vrsUOmeInPi9iDjx9w8K4ZfjXt2du1iGr6rVFVouDCrC-EYDz_rjS4LofYkqCp0pRSzPi5Jm7cT0R_dexc_UL_zbpz6JQ/image-asset.jpeg?format=1000w',    
        }
  }

    chatAddHandler = (newchat) => {
        console.log(newchat);
        const chat = {
            id: this.state.chats.length,
            author: newchat,
            avatar: 'https://cityblank.ru/upload/iblock/cc4/cc47d6df370960cbe120d01e999abfeb.gif',
            messages: [],
        };

        const newChats = [...this.state.chats, chat];
        console.log([...this.state.chats, chat]);
        this.setState({
            chats: newChats,
        });
    };

    // id-chat
    messageAddHandler = (id, message) => {
        message.id = nanoid();
        const newChats = this.state.chats;
        newChats[id].messages = newChats[id].messages ? newChats[id].messages.concat([message]) : [message];

        this.setState({
            chats: newChats,
        });

    };

    render() {
        return (<>
            <div className="container">
                <Header person={this.state.person} />
                <div style={this.style}>
                    <Paper elevation={3} style={{width: "30%"}}>
                        <ChatsList chats={this.state.chats} onAdd={this.chatAddHandler} />
                    </Paper>
                    <Paper elevation={3} style={{width: "69%"}}>
                        <Switch>
                            <Route exact path="/chats/:id([0-9]+)" render={ (props) => (Number(props.match.params.id) < this.state.chats.length) ? <Messenger person={this.state.person} chatId={Number(props.match.params.id)} chats={this.state.chats} onAdd={this.messageAddHandler}/> : <Error />} />
                            <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
                            <Route exact path="/About" render={() => (<About person={this.state.person}/>)}/>
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
