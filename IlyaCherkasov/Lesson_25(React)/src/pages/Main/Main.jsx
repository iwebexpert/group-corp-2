import React from 'react';

import Messenger from '../../components/Messenger/Messenger';
import ChatList from '../../components/ChatList/ChatList';
import Footer from '../../components/Footer/Footer';

const Main = ({ chatID }) => {
  return (
    <>
      <main className="main">
        <ChatList />
        <Messenger chatID={chatID} />
      </main>
      <Footer />
    </>
  );
};

export default Main;
