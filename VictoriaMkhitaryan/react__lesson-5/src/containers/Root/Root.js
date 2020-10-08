import React, { Component } from 'react';
import MessengerScreen from '../MessengerScreen/MessengerScreen';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFoundScreen from '../NotFoundScreen/NotFoundScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

// import { chats } from '../../helpers/chats';
// import { nanoid } from 'nanoid';
// import { ChatSharp } from '@material-ui/icons';

export default class Root extends Component {
    state={
  //     chats,
      person:{
        name: "Person",
        gender: true,
        age: 25,
        city: "Москва"
      }
  }

  // messageSend = (id, message) => {
  //   message.id = nanoid();

  //   const chat = this.state.chats;
  //   console.log(message, id);
  //   chat[id].messages = chat[id].messages.length ? chat[id].messages.concat([message]) : [message];

  //   this.setState({ chats: chat });

  // }

  // addChat = (title) => {
  //   const chat = {
  //     id: chats[this.state.chats.length - 1].id + 1,
  //     title: title,
  //     messages: [],
  //   };

  //   const newChats = [...this.state.chats, chat];
  //       this.setState({
  //           chats: newChats,
  //       });
  // };

  render() {
    return (
      <>
        <Switch>
        <Route exact path="/chats" render={ 
          (props) => <MessengerScreen 
                                person={ this.state.person } 
                                // chats={ this.state.chats }
                                id={ Number(props.match.params.id) } />
          } />
          <Route exact path="/chats/:id" render={ 
            (props) => <MessengerScreen 
                              person={ this.state.person } 
                              //     chats={ this.state.chats }
                                  id={ Number(props.match.params.id) }
                                  // messageSend={ this.messageSend }
                                  // addChat={ this.addChat }
                                   />
          } />
          <Route exact path="/profile" render={() => (<ProfileScreen person={ this.state.person }/>)}/>
          <Route exact path="/" render={() => (<Redirect to="/chats/0" />)} />
          <Route path="*" >
            <NotFoundScreen />
          </Route>
        </Switch>
      </>
    )
  }
}
