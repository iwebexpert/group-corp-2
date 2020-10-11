import React from 'react';
import { connect } from 'react-redux';
import { addChatAC, loadChatsAC, deleteChatAC } from '../actions/addChatAC';
import { Navbar } from '../components/Navbar/Navbar';
import { loadPersonAC } from '../actions/personAC';
import { push } from 'connected-react-router';

class NavbarContainerClass extends React.Component {
    componentDidMount = () => {
        this.props.personLoadAction();
        if (!Object.values(this.props.chats).length) {
            this.props.chatsLoadAction();
        }
    }

    addNewChat = (title) => {
        const { chats, addChatAction, redirect } = this.props;
        let id = Object.values(chats).length;
        addChatAction({ id, title, image: 'https://vk.com/images/deactivated_100.png?ava=1', messages: [] });
        redirect(id)
    }

    render() {
        const { redirectOnHome, person, chats, deleteChatAction } = this.props;
        return <Navbar redirectOnHome={redirectOnHome} deleteChatAction={deleteChatAction} person={person} addNewChat={this.addNewChat} chats={chats} />;
    }
}

const mapStateToProps = (state) => ({
    chats: state.chats.data,
    person: state.profile.person,
    push: state.router.push
})

const mapDispatchToProps = (dispatch) => ({
    chatsLoadAction: () => dispatch(loadChatsAC()),
    addChatAction: (message) => dispatch(addChatAC(message)),
    personLoadAction: () => dispatch(loadPersonAC()),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
    redirectOnHome: () => dispatch(push('/')),
    deleteChatAction: (chatId) => {
        dispatch(deleteChatAC(chatId))
        dispatch(push('/'))
    }
})

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(NavbarContainerClass);