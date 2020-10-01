import React, { Component } from 'react'
import {Header} from '../Header'
import {Messenger} from '../Messenger'
import {ChatsList} from '../ChatsList'

import {Paper} from '@material-ui/core';

import './Layout.css'

export class Layout extends Component {
    render() {
        return (<>
            <div className="container">
                <Header name='Web' />
                <div className="section">
                <Paper elevation={3} style={{width: "30%"}}>
                    <ChatsList />
                </Paper>
                <Paper elevation={3} style={{width: "69%"}}>
                    <Messenger />
                </Paper>
                    
                </div>
            </div>
            
            
            </>
        )
    }
}
