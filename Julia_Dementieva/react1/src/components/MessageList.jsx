import React, { Component } from 'react';
import {Message} from './Message';

export class MessageList extends Component {
    
    render() {
        const {items} = this.props;
        return (
            items.map((item, index) => (<Message text={item.text} author={item.author} key={index} />)) 
           
        );
    }
}

export default MessageList


