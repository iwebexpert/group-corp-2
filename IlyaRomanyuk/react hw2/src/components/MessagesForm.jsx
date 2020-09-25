import React from 'react';
import PropTypes from "prop-types";

export class MessagesForm extends React.Component {
    state = {
        text: "",
        person: "",
    };

    static propTypes = {
        onSend: PropTypes.func.isRequired,
    };

    handleInputChange = (event) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value });
    };

    sendNewMessage = (event) => {
        const { onSend } = this.props;
        const { text, person } = this.state;

        if (!text.trim() || !person.trim()) {
            alert('Введите все поля');
            return;
        }
        if (typeof onSend === "function") {
            onSend(this.state);
            this.setState({ text: "", person: "" });
        }
    }

    pressOnButton = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) this.sendNewMessage()
    }

    render() {
        const { text, person } = this.state;
        return (
            <div className="form" >
                <div className="form-textarea">
                    <textarea onKeyDown={this.pressOnButton} name="text" onChange={this.handleInputChange} placeholder="Your message ... " value={text}></textarea>
                </div>

                <div className="form-text">
                    <input onKeyDown={this.pressOnButton} name="person" type="text" onChange={this.handleInputChange} placeholder="Your name ... " value={person} />
                </div>

                <div className="form-btn">
                    <button onClick={this.sendNewMessage} className='btn'>Send</button>
                </div>
            </div>
        )
    }

}   