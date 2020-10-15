import React from 'react';
import { connect } from 'react-redux';
import { addChatTC, chatsLoadTC, deleteChatTC } from '../actions/addChatAC';
import { Navbar } from '../components/Navbar/Navbar';
import { personLoadTC } from '../actions/personAC';
import { push } from 'connected-react-router';
import { nanoid } from 'nanoid';

class NavbarContainerClass extends React.Component {
    componentDidMount = () => {
        this.props.personLoadAction();
        this.props.chatsLoadAction();
    }

    addNewChat = (title) => {
        const { chats, addChatAction } = this.props;
        let id = Object.values(chats).length.toString();
        addChatAction(id, title);

    }

    render() {
        const { person, chats, loading, loadingData, deleteChatAction } = this.props;
        return <Navbar loadingData={loadingData} loading={loading} deleteChatAction={deleteChatAction} person={person} addNewChat={this.addNewChat} chats={chats} />;
    }
}

const mapStateToProps = (state) => ({
    chats: state.chats.data,
    person: state.profile.person,
    push: state.router.push,
    loading: state.profile.loading,
    loadingData: state.chats.loadingData
})

const mapDispatchToProps = (dispatch) => ({
    chatsLoadAction: () => dispatch(chatsLoadTC()),
    addChatAction: (id, title) => dispatch(addChatTC(id, title)),
    personLoadAction: () => dispatch(personLoadTC()),
    redirect: (chatId) => dispatch(push(`/chats/${chatId}`)),
    deleteChatAction: (chatId) => dispatch(deleteChatTC(chatId))
})

export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(NavbarContainerClass);