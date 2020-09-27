import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class MessageForm extends Component {
    state = {
        author: '',
        text: ''
    }

    static propTypes = {
        onSend: PropTypes.func.isRequired
    }

    handleInputChange = (event) => {
        const fieldName = event.target.name
        this.setState({[fieldName]: event.target.value})
    }

    handleMessageSend = () => {
        const {onSend} = this.props
        const {text} = this.state

        if(!text){
            alert('Введите текст сообщения')
            return
        }

        if(typeof onSend === 'function'){
            onSend(this.state)

            this.setState({text: ''})
        }
    }

    onKeyPress = (event) => {
        const {onSend} = this.props
        const {text} = this.state

        if(event.keyCode===13 && event.ctrlKey) {

        if(!text){
            alert('Введите текст сообщения')
            return
        }
            if(typeof onSend === 'function'){
                onSend(this.state)

                this.setState({text: ''})
            }
        }
    }

    render(){
        const {text, author} = this.state

        return (<>
            <div>
                <input name="author" type="text" onChange={this.handleInputChange} placeholder="Введите имя автора" value={author} />
            </div>
            <div>
                <textarea onKeyDown={this.onKeyPress} name="text" onChange={this.handleInputChange} placeholder="Введите текст сообщения" value={text} />
            </div>
            <div>
                <button onClick={this.handleMessageSend}>Отправить сообщение</button>
            </div>
        </>)
    }
}
