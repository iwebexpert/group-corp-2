import React from 'react'
import { LayoutHeader } from './LayoutHeader';
import { ChatList } from './ChatList';
import { ChatForm } from './ChatForm';
import m1 from './../../img/mans/m1.png';
import m4 from './../../img/mans/m4.png';

export class Layout extends React.Component {
    state = {
        chats: [
            { name: 'Helga Källström', mess: 'We can go to the bar we were last Saturday. I like it.', image: m4, auth: false },
            { name: 'Helga Källström', mess: 'oohh so more ?', image: m4, auth: false },
        ]
    }

    addNewMessage = (mess) => {
        this.setState({ chats: [...this.state.chats, mess] })
        clearTimeout(this.time);
    }

    componentDidUpdate() {
        const state = this.state.chats;
        const lastPerson = state[state.length - 1].name;

        const defaultAnswerFromBot = {
            name: 'Helga Källström',
            mess: `${lastPerson} - oohh so more ?`,
            image: m4,
            auth: false
        }

        this.time = setTimeout(() => {
            this.addNewMessage(defaultAnswerFromBot);
        }, 4000)
    }

    render() {
        return (
            <>
                <LayoutHeader />
                <ChatList chats={this.state.chats} />
                <ChatForm onSendMessage={this.addNewMessage} />
            </>
        )
    }
}
