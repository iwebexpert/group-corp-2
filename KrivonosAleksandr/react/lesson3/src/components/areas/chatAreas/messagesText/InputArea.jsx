import React, {Component} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";
import {faImage, faPaperPlane, faSmileWink} from "@fortawesome/free-regular-svg-icons";

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
            onSend(this.state.text);
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
        if(this.props.userName !== ''){
            placeholderText = this.props.userName + ', напишите сообщение';
        } else {
            placeholderText = 'Напишите сообщение...'
        }

        return(
            <div className="input_area">
                <div className="input_area__actions">
                    <a href="/#" className="attach_file icon_template"><FontAwesomeIcon icon={faPaperclip}/></a>
                    <a href="/#" className="type_smile icon_template"><FontAwesomeIcon icon={faSmileWink}/></a>
                    <a href="/#" className="attach_img icon_template"><FontAwesomeIcon icon={faImage}/></a>
                </div>
                <div className="message_area">
                    <textarea name="sendMessage"
                              className="message_send"
                              placeholder={placeholderText} value={text}
                              onChange={this.handleInputChange}
                              onKeyDown={this.onHandleKeyDown}/>
                    <a href="/#" className="message_send__btn" onClick={this.handleInputSend} ><FontAwesomeIcon icon={faPaperPlane}/></a>
                </div>
            </div>
        );
    }
}