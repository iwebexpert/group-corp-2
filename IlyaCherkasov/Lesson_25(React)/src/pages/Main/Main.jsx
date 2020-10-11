import React from 'react';

import MessengerContainer from '../../redux/containers/MessengerContainer';
import ChatListContainer from '../../redux/containers/ChatListContainer';
import Footer from '../../components/Footer/Footer';

const Main = () => {
  return (
    <>
      <main className="main">
        <ChatListContainer />
        <MessengerContainer />
      </main>
      <Footer />
    </>
  );
};

export default Main;
