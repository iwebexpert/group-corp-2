import React, {Component} from 'react';
import { Message, messageType} from '../Message';
import './MessagesList.css';
import PropTypes from 'prop-types';

export class MessagesList extends Component{
    render(){
        const {items,title} = this.props;
        return(<>
            <h3 className="chat-bot">{title}</h3>
            <div className="messages-list">
                {items.map((el) => <Message  key={el.id} message={el.text} author={el.author} />)} 
            </div>

            </>
        );
    }
}
  
MessagesList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(messageType)),
}