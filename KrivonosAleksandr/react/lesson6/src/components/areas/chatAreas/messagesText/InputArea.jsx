import React, {Component} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";
import {faImage, faPaperPlane, faSmileWink} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

export class InputArea extends Component{
    state = {
        text: '',
    }

    handleInputChange = (event) => {
        this.setState({text: event.target.value});
    }

    handleInputSend = () => {
        const {onSend} = this.props;
        const {text} = this.state;

        if(!text){
            return;
        }

        if(typeof onSend === 'function'){
            onSend(this.state);
            this.setState({text: ''});
        }
    }

    onHandleKeyDown = (event) => {
        if(event.ctrlKey && event.keyCode === 13){
            this.handleInputSend();
        }
    }

    render(){
        let {text} = this.state;
        let placeholderText;
        if(this.props.userName && this.props.userName !== ''){
            placeholderText = this.props.userName + ', напишите сообщение';
        } else {
            placeholderText = 'Напишите сообщение...'
        }

        return(
            <div className="input_area">
                <div className="input_area__actions">
                    <Link to="/chats/new" className="attach_file icon_template"><FontAwesomeIcon icon={faPaperclip}/></Link>
                    <Link to="/chats/new" className="type_smile icon_template"><FontAwesomeIcon icon={faSmileWink}/></Link>
                    <Link to="/chats/new" className="attach_img icon_template"><FontAwesomeIcon icon={faImage}/></Link>
                </div>
                <div className="message_area">
                    <textarea name="sendMessage"
                              className="message_send"
                              placeholder={placeholderText} value={text}
                              onChange={this.handleInputChange}
                              onKeyDown={this.onHandleKeyDown}/>
                    <button className="message_send__btn" onClick={this.handleInputSend} ><FontAwesomeIcon icon={faPaperPlane}/></button>
                </div>
            </div>
        );
    }
}