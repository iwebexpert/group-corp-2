import React, {Component} from 'react';
import Message, {messageType} from '../Message/Message';
import './MessagesList.css';
import PropTypes from 'prop-types';

export default class MessagesList extends Component{
    render(){
        const {items} = this.props;
        return(
            <div>
                {items.map((el,i) => <Message  key={`${el.author}${i}`} message={el.message} author={el.author} />)} 
            </div>
        );
    }
}

MessagesList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape(messageType)),
}