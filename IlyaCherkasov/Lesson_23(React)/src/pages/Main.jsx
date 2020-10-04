import React, { useState } from 'react';

import Messenger from '../components/Messenger/Messenger';
import Header from '../components/Header';
import ChatList from '../components/ChatList';
import Footer from '../components/Footer';

//Получаю чаты здесь, и передаю его в useState
import { chats } from '../helpers/chatsData';

const Main = () => {
  const [allChats, setAllChats] = useState(chats); //Отсюда передаю чаты в мессенджер и список чатов
  return (
    <>
      <main className="main">
        <ChatList allChats={allChats} setAllChats={setAllChats} />
        <Messenger allChats={allChats} />
      </main>
      <Footer />
    </>
  );
};

export default Main;
