import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainContainer from '../redux/containers/MainContainer';
import ProfileContainer from '../redux/containers/ProfileContainer';
import About from '../pages/About/About';
import Error from '../pages/Error';
import Header from '../components/Header/Header';

const Routing: React.FC<{}> = () => {
  return (
    <div className="wrapper">
      <Header />
      <Switch>
        <Route path="/" exact>
          <MainContainer />
        </Route>
        <Route path="/chats/:id([0-9]+)" exact>
          <MainContainer />
        </Route>
        <Route path="/profile" exact>
          <ProfileContainer />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="*" exact>
          <Error />
        </Route>
      </Switch>
    </div>
  );
};

export default Routing;
