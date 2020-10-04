import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import About from '../pages/About';
import Error from '../pages/Error';
import Profile from '../pages/Profile';
import Header from '../components/Header';

const Routing = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/chats/:id([0-9]+)" exact>
          <Main />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="*" exact>
          <Error />
        </Route>
      </Switch>
    </>
  );
};

export default Routing;
