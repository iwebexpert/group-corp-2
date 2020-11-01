import React, { useEffect } from 'react';
import { addChatTC, chatsLoadTC, deleteChatTC } from '../actions/addChatAC';
import { Navbar } from '../components/Navbar/Navbar';
import { personLoadTC } from '../actions/personAC';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './../reducers';

export const NavbarContainer: React.FC = () => {
    const dispatch = useDispatch();
    const [loadingData, chats] = useSelector((state: AppState): [boolean, Array<NavbarListChat>] => [state.chats.loadingData, state.chats.data]);
    const [loading, person] = useSelector((state: AppState): [boolean, Person] => [state.profile.loading, state.profile.person])

    const addNewChat = (title: string) => {
        dispatch(addChatTC(title));
    }

    const deleteChat = (id: number) => {
        dispatch(deleteChatTC(id));
    }

    useEffect(() => {
        dispatch(chatsLoadTC());
        dispatch(personLoadTC());
    }, [])

    return (
        <Navbar loadingData={loadingData}
            loading={loading} deleteChatAction={deleteChat}
            person={person} addNewChat={addNewChat} chats={chats} />
    )
}