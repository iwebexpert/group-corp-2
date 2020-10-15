import React, {Component} from 'react';
import {connect} from 'react-redux';
import {chatsLoadAction, chatsMessageSendAction, chatsAddFormAction} from '../actions/chats';
import {ChatAddForm} from "../components/ChatForm/ChatForm"


class ChatAddFormContainer extends Component {
constructor(props) {
    super(props);

    this.maxId = 3;
    this.userId = 451;
}


    addItem = (body) => {
        const newItem = {
            id: this.maxId++,
            title: body,
            messages: [
                {
                    id: 0,
                    author: 'NewUser',
                    text: 'Привет!'
                },
                {
                    id: 1,
                    author: 'NewUser',
                    text: 'Что нового?'
                },
            ],
            info: [
                {
                    userId: this.userId++,
                    firstName: 'Это новый пользователь',
                    lastName: 'Я пока не знаю как внести инф',
                    age: 25,
                    photo: 'none'
                }
                ]
        };
        console.log(newItem);
        this.props.chatsAddFormAction({
                title: body,
            ...newItem
        })
    }

    render() {
        return (
            <ChatAddForm
            addNewChat = {this.addItem}
            />
        )
    }
}

const mapStateProps = state =>{
 return {
     ...state
 }
}

function mapDispatchToProps(dispatch) {
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
        chatsAddFormAction: (newItem) => dispatch(chatsAddFormAction(newItem)),
    }
}
export default connect(mapStateProps, mapDispatchToProps)(ChatAddFormContainer);
