import React from "react";

export default class Message extends React.Component{

    state = {
        author: '',
        time: '',
        messageList: []
    }

    onAddMessage = () => {
        const time = new Date().toLocaleTimeString();
        const msgText = this.state.messageList.push(`Some text ${time}`);

        this.setState( {
            time,
            author: 'User',
            msgText
        });
    };

    render(){
        return (
            <div>
                <ul>
                    {this.state.messageList && this.state.messageList.map((text) => (
                        <li  key={text}>{text} - <b>{this.state.author}</b></li>
                    ))}
                </ul>
                <button onClick={this.onAddMessage}>Отправить сообщение</button>
            </div>
        )
    }
}