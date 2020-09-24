import React, { Component } from "react";
import PropTypes from "prop-types";

export class MessageForm extends Component {
    state = {
        text: "",
        author: "",
    };

    static propTypes = {
        onSend: PropTypes.func.isRequired,
    };



    handleInputChange = (event) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value });
    };

    handleMessageSend = () => {
        const { onSend } = this.props;
        const { text, author } = this.state;

        if (!text) {
            alert("Введите текст сообщения");
            return;
        }

        if (!author) {
            alert("Введите автора сообщения!");
            return;
        }

        if (typeof onSend === "function") {
            onSend(this.state);

            this.setState({ text: "", author: "" });
        }

    };

    keydownHandler = (event) => {
        if (event.keyCode === 13 && event.ctrlKey) {
            console.log(123)
            this.handleMessageSend()
        }

    }

    render() {
        const { text, author } = this.state;

        return (<>
            <div>
                <input onKeyDown={this.keydownHandler} name="author" type="text" onChange={this.handleInputChange} placeholder="Введите имя автора" value={author} />
            </div>
            <div>
                <textarea onKeyDown={this.keydownHandler} name="text" onChange={this.handleInputChange} placeholder="Введите текст сообщения" value={text} />
            </div>
            <div>
                <button onClick={this.handleMessageSend}>Отправить сообщение</button>
            </div>
        </>);
    }
}