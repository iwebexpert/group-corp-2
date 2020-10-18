import React, { useEffect } from 'react';
import { addChatTC, chatsLoadTC, deleteChatTC } from '../actions/addChatAC';
import { Navbar } from '../components/Navbar/Navbar';
import { personLoadTC } from '../actions/personAC';
import { useSelector, useDispatch } from 'react-redux';

export const NavbarContainer = (props) => {
    const dispatch = useDispatch();
    const [loadingData, chats] = useSelector((state) => [state.chats.loadingData, state.chats.data]);
    const [loading, person] = useSelector((state) => [state.profile.loading, state.profile.person])

    const addNewChat = (title) => {
        dispatch(addChatTC(title));
    }

    const deleteChat = (id) => {
        dispatch(deleteChatTC(id));
    }

    useEffect(() => {
        dispatch(chatsLoadTC());
        dispatch(personLoadTC());
    }, [])

    return <Navbar loadingData={loadingData}
        loading={loading} deleteChatAction={deleteChat}
        person={person} addNewChat={addNewChat} chats={chats} />;
}