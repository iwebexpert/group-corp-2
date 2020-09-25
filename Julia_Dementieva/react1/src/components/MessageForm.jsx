import React, { Component } from 'react';

export class MessageForm extends Component {
    state={
        author: '',
        text: '',
    }

    handleInputChange = (event) => {
        const fieldName = event.target.name;
        this.setState({[fieldName]: event.target.value}); 
    };
    // Проверка введенных данных
    isEmpty(str) {
        return (!str || /^\s*$/.test(str));
    }

    handleMessageSend = () => {
        const {onSend} = this.props;
        const {author, text} = this.state;

        if(this.isEmpty(text) || this.isEmpty(author)){
            alert('Нужно заполнить все поля');
            
            return;
        }

        if(typeof onSend === 'function'){
            onSend(this.state);

            this.setState({
                text: '',
                author: '',
            });
        }
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') this.handleMessageSend();
    };

    render() {
        const {text, author} = this.state;

        return (<>
            <div>
                <input onKeyDown={this.handleKeyDown} name="author" type="text" onChange={this.handleInputChange} placeholder="Введите имя автора" value={author} />
            </div>
            <div>
                <textarea onKeyDown={this.handleKeyDown} name="text" onChange={this.handleInputChange} placeholder="Введите текст сообщения" value={text} />
            </div>
            <div>
                <button onClick={this.handleMessageSend}>Отправить сообщение</button>
            </div>
        </>);
    }
}

export default MessageForm
