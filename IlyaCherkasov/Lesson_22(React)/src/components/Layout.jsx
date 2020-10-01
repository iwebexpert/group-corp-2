import React from 'react';
import Messenger from './Messenger/Messenger';
import Header from './Header';
import ChatList from './ChatList';
import Footer from './Footer';

export default function Layout() {
  return (
    <div>
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <ChatList />
        <Messenger />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}
