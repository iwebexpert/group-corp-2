import React, {Component} from 'react';
import Message from './Message';

export default class MessagesList extends Component{
    constructor(props){
        super(props);
        this.state = {
            messagesData: ['Hello', 'Test message', 'message1'],
            input: '',
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            input: event.target.value,
        });
        
    }

    handleClick(){
        this.setState({
            messagesData: [...this.state.messagesData, this.state.input]
        });
    }

    render(){
        return(
            <div>
                <h1 className="main-header">Messenger</h1>
                <input value = {this.state.input} onChange={this.handleChange} type="text" placeholder="Enter a message" />
                <button onClick={this.handleClick}>Add a message</button>
                {this.state.messagesData.map((el, i) => <Message  key={i} text={el} author="WebDev"/>)}
            </div>
        );
    }
}