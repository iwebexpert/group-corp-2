import React from 'react';
import { connect } from 'react-redux';
import { addChatAC, loadChatsAC } from '../actions/addChatAC';
import { Navbar } from '../components/Navbar/Navbar';
import { loadPersonAC } from '../actions/personAC';

class NavbarContainerClass extends React.Component {
    componentDidMount = () => {
        this.props.personLoadAction();
        this.props.chatsLoadAction();
    }

    addNewChat = (title) => {
        let id = Object.values(this.props.chats).length;
        const newChat = { id, title, image: 'https://vk.com/images/deactivated_100.png?ava=1', messages: [] }
        this.props.addChatAction(newChat)
    }

    render() {
        return <Navbar person={this.props.person} addNewChat={this.addNewChat} chats={this.props.chats} />;
    }
}

const mapStateToProps = (state) => ({
    chats: state.chats.data,
    person: state.profile.person
})

const mapDispatchToProps = (dispatch) => ({
    chatsLoadAction: () => dispatch(loadChatsAC()),
    addChatAction: (message) => dispatch(addChatAC(message)),
    personLoadAction: () => dispatch(loadPersonAC()),
})

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(NavbarContainerClass);