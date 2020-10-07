import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Switch, Route, Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {Star} from "@material-ui/icons";
import SaveIcon from '@material-ui/icons/Save';
import {chats} from '../Chats-data/ChatData';

export class ChatList extends React.Component {
constructor(props) {
    super(props);
}
    render() {
        const chatsList = this.props.nameOfChats;
        // const {info} = this.props.nameOfChats;
        // console.log('chatlist',chatsList, this.props.nameOfChats);
        // const {chatsList} = this.state;
        return (
            <div className={'chatNmess'}>
                    <List>
                        {chatsList.map((chat) => (
                            <ListItem  key={chat.id}>
                                <Link   to={`/chats/${chat.id}`}>
                                    <span className={"chat__item"} >{chat.title}</span>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                {/* <div className={'sfs'}>
                    <Switch>
                        <Route path="/chats/:id([0-9]+)" component={Messenger} exact></Route>
                        <Route path="/profile/:title" render={(props) => <Profile {...props} name={info}/>}
                               exact></Route>
                    </Switch>
                </div> */}
             
                {/*<div>*/}
                {/*    <Switch>*/}
                {/*        <Route path="/profile/:title" render={(props) => <Profile {...props} name={author}/>}  exact></Route>*/}
                {/*    </Switch>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <Link to={`/profile/${author}`}>*/}
                {/*        <ListItemText primary='Открыть профиль'></ListItemText>*/}
                {/*    </Link>*/}
                {/*</div>*/}
                {/*<List component="nav" aria-label="main mailbox folders">*/}
                {/*    <ListItem button>*/}
                {/*        <ListItemIcon>*/}
                {/*            <SaveIcon />*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary="Сохраненные сообщения" />*/}
                {/*    </ListItem>*/}
                {/*    <ListItem button>*/}
                {/*        <ListItemIcon>*/}
                {/*            <Star />*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary="Важные сообщения" />*/}
                {/*    </ListItem>*/}
                {/*</List>*/}
                {/*<Divider />*/}
                {/*<List component="nav" aria-label="secondary mailbox folders">*/}
                {/*    <ListItem button>*/}
                {/*        <Link to="/chat/1/">*/}
                {/*            <ListItemText primary="Софи" />*/}
                {/*        </Link>*/}
                {/*    </ListItem>*/}
                {/*    <ListItem button>*/}
                {/*        <Link to="/chat/2/">*/}
                {/*            <ListItemText primary="Вова" />*/}
                {/*        </Link>*/}
                {/*    </ListItem>*/}
                {/*    <ListItem button>*/}
                {/*        <Link to="/chat/3/">*/}
                {/*            <ListItemText primary="Сергей" />*/}
                {/*        </Link>*/}
                {/*    </ListItem>*/}
                {/*    <ListItem button>*/}
                {/*        <Link to="/chat/4/">*/}
                {/*            <ListItemText primary="Илья" />*/}
                {/*        </Link>*/}
                {/*    </ListItem>*/}
                {/*</List>*/}
            </div>
        );
    }
}