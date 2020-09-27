import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class MessageForm extends Component {

    state = {
        text : '',
        author: '',
    };

    static propTypes = {
        onSend: PropTypes.func.isRequired,
    }


    handleInputChange = (e) => {
        const fieldName = e.target.name;
        this.setState({[fieldName]: e.target.value});
        console.log(this.state);

        if(e.keyCode === 13 && e.ctrlKey) {
            this.handleMessageSend();
        }
    }

    handleMessageSend = () => {
        const {onSend} = this.props;
        const {text, author} = this.state;

        if(!text || !author) {
            alert('Enter text message / author"s name');
            return;
        }
        if(typeof onSend === "function"){
            onSend(this.state);
            this.setState({text: ''});
        }
        console.log(this.state);
    };

    render() {
        const {text, author} = this.state;

        return (<div>
                <div>
                    <input type="text" name="author" onChange={this.handleInputChange} placeholder="enter author" value={author}></input>
                </div>
                <div>
                    <textarea name="text" onChange={this.handleInputChange} onKeyDown ={this.handleInputChange} placeholder="enter text" value={text}></textarea>
                </div>
                <div>
                    <button onClick={this.handleMessageSend}>Send message</button>
                </div>
            </div>
        )
    }
}