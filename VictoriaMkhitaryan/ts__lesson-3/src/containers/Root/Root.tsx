import React from 'react';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import { Route, Switch, Redirect } from 'react-router-dom';

import { MessengerScreen } from '../MessengerScreen/MessengerScreen';
import { NotFoundScreen } from '../NotFoundScreen/NotFoundScreen';
import { ProfileScreen } from '../ProfileScreen/ProfileScreen';

import { chatsLoad } from '../../store/messenger/actions';
import { ChatActions } from '../../store/messenger/actionTypes';
import { AppState } from '../../store/reducers';

type RootClearPropsType = {
};

type RootOwnPropsType = {
    chats: any;
};

type RootDispatchPropsType = {
  chatsLoad: () => void;
};


const RootClass = () => {
  return (
    <>
      <Switch>
        <Route exact path="/chats" component={ MessengerScreen } />
        <Route exact path="/chats/:chatId" component={ MessengerScreen } />
        <Route exact path="/profile" component={ ProfileScreen } />
        <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
        <Route path="*" >
          <NotFoundScreen />
        </Route>
      </Switch>
    </>
  )
}

function mapStateToProps(state: AppState, ownProps: RootClearPropsType): RootOwnPropsType {
  const chatsEntries = state.chats.entries;
  
  const chats = [];
  for(let key in chatsEntries){
      chats.push({title: chatsEntries[key].title, id: chatsEntries[key].id});
  }

  return {
      chats,
  };
}


function mapDispatchToProps(dispatch: ThunkDispatch<AppState, void, ChatActions>): RootDispatchPropsType{
  return {
      // chatsLoadAction: () => dispatch((chatsLoadAction() as any)),
      chatsLoad: () => dispatch(chatsLoad()),
  }
}

export const Root = connect(mapStateToProps, mapDispatchToProps)(RootClass);