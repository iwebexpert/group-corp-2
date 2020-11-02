import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {Switch, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Layout.css';

import {chatsLoadAction} from '../../actions/chats';
import {MessengerContainer} from '../../containers/MessengerContainer';
import {ProfileContainer} from '../../containers/ProfileContainer';

class LayoutClass extends React.Component {
    componentDidMount(){
        if(!this.props.chats.length){
            this.props.chatsLoadAction();
        } 
    }

    render(){
        const {chats} = this.props;
        return <div className={'messenger__wrapper'}>
            <div className={'messenger__chat-list'}>
            <List>
                    {chats.map((chat) => (
                        <ListItem key={chat.id}>
                        <Link to={`/chats/${chat.id}`}><ListItemText primary={chat.title} /></Link>
                    </ListItem>
                    ))}
                    <ListItem>
                        <Link to="/profile"><ListItemText primary="Профиль" /></Link>
                    </ListItem>

                </List>
            </div>
            <div  className={'messenger__window'}>
                <Switch>
                    <Route path="/profile" component={ProfileContainer} exact />
                    <Route path="/chats/:id([0-9]+)" component={MessengerContainer} exact />
                </Switch>
            </div>
                
            </div>;
    }
}


function mapStateToProps(state, ownProps){
    const chatsEntries = state.chats.entries;
    
    const chats = [];
    for(let key in chatsEntries){
        chats.push({title: chatsEntries[key].title, id: chatsEntries[key].id});
    }

    return {
        chats,
    };
}

function mapDispatchToProps(dispatch){
    return {
        chatsLoadAction: () => dispatch(chatsLoadAction()),
    }
}

export const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutClass);