import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {chatsLoadAction} from '../../actions/chats';
import {Error} from '../../pages/Error/Error';
import {MessengerContainer} from '../../containers/MessengerContainer';
import {ProfileContainer} from '../../containers/ProfileContainer';

class LayoutClass extends React.Component {
    componentDidMount(){
        if(!this.props.chats.length){
            this.props.chatsLoadAction();
        } 
    }

    render(){
        return <div>
            <div>
                <Switch>
                    <Route path="/" component={MessengerContainer} exact />
                    <Route path="/profile" component={ProfileContainer} exact />
                    <Route path="/chats/:id([0-9]+)" component={MessengerContainer} exact />
                    <Route path="*"><Error /></Route>
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