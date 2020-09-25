import React, { Component } from 'react'

export class Message extends Component {
    
    render(){
        const {text, author} = this.props;
        return (
            <div className="chat">
                <ul>
                    <li  key={text}>{text} - <b>{author}</b></li>
                </ul>
            </div>
        )
    }
}

export default Message
