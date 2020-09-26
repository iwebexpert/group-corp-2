import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MessageForm extends Component {
    state = {
        text: '',
        author: '',
    };

    static propTypes = {
        onSend: PropTypes.func.isRequired,
    };

    // handleInputChange = (event) => {
    //     this.setState({text: event.target.value});

    // };

    handleInputChange = (event) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value });
    };

    handleMessageSend = () => {
        const { onSend } = this.props;
        const { text } = this.state;

        if (!text) {
            alert('Введите текст сообщения');
            return;
        }

        if (typeof onSend === 'function') {
            onSend(this.state);

            this.setState({ text: '' });
        }

    };
    handleKeyDownEnter = (event) => {
        if (event.keyCode === 13) {
            this.handleMessageSend();
        }
    }

    render() {
        const { text, author } = this.state;

        return (<>
            <div>
                <input name="author" type="text" onChange={this.handleInputChange} placeholder="Введите имя автора" value={author} />
            </div>
            <div>
                <textarea onKeyDown={this.handleKeyDownEnter} name="text" onChange={this.handleInputChange} placeholder="Введите текст сообщения" value={text} />
            </div>
            <div>
                <button onClick={this.handleMessageSend}>Отправить сообщение</button>
            </div>
        </>);
    }
}

// MessageForm.propTypes = {
//     onSend: PropTypes.func.isRequired,
// };