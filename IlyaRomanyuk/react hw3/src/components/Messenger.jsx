import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import { Navbar } from './Navbar';
import { Layout } from './Layout';
import { Profile } from './../pages/Profile';
import { Home } from './../pages/Home';
import { Error } from './../pages/Error';

import { chats } from './../helpers/chatData';


const Messenger = () => {
    let info = null;
    if (localStorage.getItem('data')) {
        info = JSON.parse(localStorage.getItem('data'))
    } else {
        info = chats
        localStorage.setItem('data', JSON.stringify(chats))
    }

    const [data, setData] = useState(info);

    const updateChats = (mess, id) => {
        data[id].messages = [...data[id].messages, mess];
        let tmp = JSON.parse(localStorage.getItem('data'));
        tmp = data;
        localStorage.setItem('data', JSON.stringify(tmp));
        setData([...data])
    }

    const addNewChat = (name) => {
        let newChat = { id: data.length, title: name, image: 'https://vk.com/images/deactivated_100.png?ava=1', messages: [] }
        let tmp = JSON.parse(localStorage.getItem('data'));
        tmp.push(newChat)
        localStorage.setItem('data', JSON.stringify(tmp));
        setData([...data, newChat])
    }

    return (
        <>
            <div className="container">
                <div className="messenger">
                    <div className="messenger__navbar  navbar">
                        <Navbar addNewChat={addNewChat} dataList={data} />
                    </div>

                    <div className="content">
                        <Switch>
                            <Route path="/chats/:id([0-9]+)" render={(props) => <Layout chats={data} updateChats={updateChats} {...props} />} exact />
                            <Route path="/profile" exact><Profile /></Route>
                            <Route path="/" exact><Home /></Route>
                            <Route path="*"><Error /></Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Messenger;