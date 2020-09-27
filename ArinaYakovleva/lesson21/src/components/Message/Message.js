import React, {Component} from 'react';
import './Message.css';
import PropTypes from 'prop-types';

export const messageType = {
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

export default class Message extends Component{
      render(){
        return(
            <div className="text">
               <b>{this.props.author}</b>: {this.props.message}
            </div>
        );
    }
}

Message.propTypes = messageType;