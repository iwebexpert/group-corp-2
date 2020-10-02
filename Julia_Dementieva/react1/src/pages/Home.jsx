import React, { Component } from 'react'
import {Messenger} from '../components/Messenger'
import {ChatsList} from '../components/ChatsList'

import {Paper} from '@material-ui/core';

import {chats} from '../helper/chatsData'
export class Home extends Component {
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

    render() {
        
        return (<>
                <div style={this.style}>
                
                <Paper elevation={3} style={{width: "30%"}}>
                    <ChatsList chatId={this.props.chatId}/>
                </Paper>
                <Paper elevation={3} style={{width: "69%"}}>
                    {/* <Messenger person={this.props.person} infoChats={this.props.match}/> */}
                    <Messenger person={this.props.person} chatId={this.props.chatId}/>
                </Paper>
                    
                </div>    
            </>
        )
    }
}
